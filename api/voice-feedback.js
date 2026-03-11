export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, slug, recording_number, duration_seconds, timestamp, audio_base64, audio_type, filename } = req.body || {};

  if (!audio_base64 || !name) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Decode base64 audio to buffer
  const audioBuffer = Buffer.from(audio_base64, "base64");
  const mimeType = audio_type || "audio/webm";
  const safeName = filename || `feedback-${slug || "unknown"}-${recording_number || 1}.webm`;

  // Transcribe with OpenAI Whisper
  let transcript = "Transcription failed. Please check the audio manually.";

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
      }
    } catch (err) {
      console.error("Whisper transcription failed:", err.message);
    }
  } else {
    console.warn("OPENAI_API_KEY not set, skipping transcription");
  }

  // Forward transcript + metadata to Zapier webhook
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
        }),
      });

      if (!zapierRes.ok) {
        console.error("Zapier webhook error:", zapierRes.status);
      }
    } catch (err) {
      console.error("Zapier webhook failed:", err.message);
    }
  } else {
    console.warn("ZAPIER_WEBHOOK_URL not set, skipping webhook");
  }

  return res.status(200).json({ ok: true, transcript });
}
