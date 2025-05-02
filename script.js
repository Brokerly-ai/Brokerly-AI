// brokerly-ai/src/script.js

// ✅ Environment variable references (must be declared in Vercel)
const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;
const replicateKey = import.meta.env.VITE_REPLICATE_API_TOKEN;
const elevenKey = import.meta.env.VITE_ELEVENLABS_API_KEY;

// 🧠 Example: generate ad caption using OpenAI
export async function generateCaption(prompt) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openaiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() || "Error generating caption.";
}

// 🖼️ Example: generate image using Replicate
export async function generateImage(prompt) {
  const res = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${replicateKey}`,
    },
    body: JSON.stringify({
      version: "a9758cb5...", // replace with your actual model version
      input: { prompt },
    }),
  });
  const data = await res.json();
  return data.urls?.get || null;
}

// 🔊 Example: generate voiceover using ElevenLabs
export async function generateVoiceover(text) {
  const res = await fetch("https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": elevenKey,
    },
    body: JSON.stringify({
      text,
      voice_settings: {
        stability: 0.4,
        similarity_boost: 0.75,
      },
    }),
  });

  const blob = await res.blob();
  return URL.createObjectURL(blob);
}
