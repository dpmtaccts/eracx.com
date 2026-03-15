import { getSupabase } from "./lib/supabase-server.js";

const STORAGE_BUCKET = "voice-feedback";

export const config = {
  api: { bodyParser: { sizeLimit: "8mb" } },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, slug, recording_number, duration_seconds, timestamp, audio_base64, audio_type, filename } = req.body || {};

  if (!audio_base64 || !name) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const audioBuffer = Buffer.from(audio_base64, "base64");
  const mimeType = audio_type || "audio/webm";
  const safeName = filename || `feedback-${slug || "unknown"}-${recording_number || 1}.webm`;
  const storagePath = `${slug || "unknown"}/${Date.now()}-${safeName}`;

  // 1. Store audio in Supabase Storage — this is critical, fail if it doesn't work
  let fileUrl = null;
  const supabase = getSupabase();

  try {
    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(storagePath, audioBuffer, {
        contentType: mimeType,
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError.message);
      return res.status(500).json({ ok: false, error: "Failed to save audio recording. Please try again." });
    }

    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(storagePath);
    fileUrl = urlData?.publicUrl || null;
  } catch (err) {
    console.error("Supabase storage failed:", err.message);
    return res.status(500).json({ ok: false, error: "Failed to save audio recording. Please try again." });
  }

  // 2. Transcribe with OpenAI Whisper (non-critical — audio is already saved)
  let transcript = "";

  if (process.env.OPENAI_API_KEY) {
    try {
      const formData = new FormData();
      formData.append("file", new Blob([audioBuffer], { type: mimeType }), safeName);
      formData.append("model", "whisper-1");
      formData.append("language", "en");
      formData.append("response_format", "text");

      const whisperRes = await fetch("https://api.openai.com/v1/audio/transcriptions", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
        body: formData,
      });

      if (whisperRes.ok) {
        transcript = (await whisperRes.text()).trim();
      } else {
        const errText = await whisperRes.text();
        console.error("Whisper API error:", whisperRes.status, errText);
        transcript = "[Transcription failed — listen to audio]";
      }
    } catch (err) {
      console.error("Whisper transcription failed:", err.message);
      transcript = "[Transcription failed — listen to audio]";
    }
  } else {
    console.warn("OPENAI_API_KEY not set, skipping transcription");
    transcript = "[No API key — listen to audio]";
  }

  // 3. Save metadata to Supabase table (non-critical — audio is already saved)
  try {
    const { error: insertError } = await supabase.from("voice_feedback").insert({
      reviewer_name: name,
      slug,
      recording_number,
      duration_seconds,
      transcript,
      file_url: fileUrl,
      storage_path: storagePath,
      created_at: timestamp || new Date().toISOString(),
    });
    if (insertError) {
      console.error("Supabase insert error:", insertError.message);
    }
  } catch (err) {
    console.error("Supabase insert failed:", err.message);
  }

  // 4. Forward to Zapier webhook (non-critical)
  const zapierUrl = process.env.ZAPIER_WEBHOOK_URL;
  if (zapierUrl) {
    try {
      const zapierRes = await fetch(zapierUrl, {
        method: "POST",
        body: JSON.stringify({
          name,
          slug,
          recording_number,
          duration_seconds,
          timestamp,
          filename: safeName,
          transcript,
          audio_url: fileUrl,
        }),
      });

      if (!zapierRes.ok) {
        console.error("Zapier webhook error:", zapierRes.status);
      }
    } catch (err) {
      console.error("Zapier webhook failed:", err.message);
    }
  }

  return res.status(200).json({ ok: true, transcript, audio_url: fileUrl });
}
