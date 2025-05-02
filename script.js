
// Load keys from environment (used only in secure environments like Vercel)
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const REPLICATE_API_TOKEN = import.meta.env.VITE_REPLICATE_API_TOKEN;
const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;

async function generateCaption() {
  const input = document.getElementById("caption-input").value;
  const output = document.getElementById("caption-output");

  output.innerText = "Generating...";

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user",
        content: `Write a high-converting ad caption for: "${input}"`
      }]
    })
  });

  const data = await res.json();
  output.innerText = data.choices?.[0]?.message?.content || "Error generating caption.";
}

async function generateImage() {
  const prompt = document.getElementById("image-input").value;
  const output = document.getElementById("image-output");

  output.innerHTML = "Generating image...";

  const res = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Authorization": `Token ${REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      version: "db21e45e55b286de1f4f7eaa8666eaa177b35bfcfa3fe955c88c75b2d1699f74",
      input: { prompt: prompt }
    })
  });

  const data = await res.json();
  const url = data?.urls?.get || "";

  if (url) {
    const poll = await fetch(url);
    const final = await poll.json();
    const image = final.output?.[0];
    output.innerHTML = image
      ? `<img src="${image}" style="width:100%; border-radius:10px;" />`
      : "Image generation failed.";
  } else {
    output.innerHTML = "Image request failed.";
  }
}

async function generateVoice() {
  const script = document.getElementById("voice-input").value;
  const output = document.getElementById("voice-output");

  output.innerHTML = "Generating voiceover...";

  const res = await fetch("https://api.elevenlabs.io/v1/text-to-speech/pNInz6obpgDQGcFmaJgB", {
    method: "POST",
    headers: {
      "xi-api-key": ELEVENLABS_API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text: script,
      voice_settings: {
        stability: 0.4,
        similarity_boost: 0.75
      }
    })
  });

  const blob = await res.blob();
  const audioUrl = URL.createObjectURL(blob);
  output.innerHTML = `<audio controls src="${audioUrl}"></audio>`;
}
