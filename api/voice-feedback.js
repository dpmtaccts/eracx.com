import { getSupabase } from "./lib/supabase-server.js";

const STORAGE_BUCKET = "voice-feedback";

export const config = {
  api: { bodyParser: { sizeLimit: "8mb" } },
};

export const maxDuration = 60;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    name, slug, recording_number, duration_seconds, timestamp,
    audio_base64, audio_url, audio_type, filename, storage_path,
  } = req.body || {};

  if (!name || (!audio_base64 && !audio_url)) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const mimeType = audio_type || "audio/webm";
  const safeName = filename || `feedback-${slug || "unknown"}-${recording_number || 1}.webm`;
  const supabase = getSupabase();

  let fileUrl = audio_url || null;
  let audioBuffer = null;

  // Path A: Browser already uploaded to Supabase — just download for transcription
  if (audio_url) {
    try {
      const audioRes = await fetch(audio_url);
      if (audioRes.ok) {
        audioBuffer = Buffer.from(await audioRes.arrayBuffer());
      } else {
        console.error("Failed to download audio from Supabase:", audioRes.status);
      }
    } catch (err) {
      console.error("Failed to download audio for transcription:", err.message);
    }
  }

  // Path B: Browser sent base64 — upload to Supabase Storage
  if (audio_base64 && !fileUrl) {
    audioBuffer = Buffer.from(audio_base64, "base64");
    const uploadPath = storage_path || `${slug || "unknown"}/${Date.now()}-${safeName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(uploadPath, audioBuffer, {
          contentType: mimeType,
          upsert: false,
        });

      if (uploadError) {
        console.error("Supabase upload error:", uploadError.message);
        return res.status(500).json({ ok: false, error: "Failed to save audio recording. Please try again." });
      }

      const { data: urlData } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(uploadPath);
      fileUrl = urlData?.publicUrl || null;
    } catch (err) {
      console.error("Supabase storage failed:", err.message);
      return res.status(500).json({ ok: false, error: "Failed to save audio recording. Please try again." });
    }
  }

  // 2. Transcribe with OpenAI Whisper (non-critical — audio is already saved)
  let transcript = "";

  if (process.env.OPENAI_API_KEY && audioBuffer) {
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
  } else if (!process.env.OPENAI_API_KEY) {
    console.warn("OPENAI_API_KEY not set, skipping transcription");
    transcript = "[No API key — listen to audio]";
  } else {
    transcript = "[Audio not available for transcription]";
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
      storage_path: storage_path || `${slug || "unknown"}/${safeName}`,
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
