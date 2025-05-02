
// 🚨 DEMO ONLY: Hardcoded API keys — DO NOT USE IN PRODUCTION
const openaiKey = "sk-proj-xxx";  // insert yours
const replicateKey = "r8_xxx";    // insert yours
const elevenKey = "sk_xxx";       // insert yours

async function generateCaption() {
  const input = document.getElementById("caption-input").value;
  const output = document.getElementById("caption-output");
  output.innerText = "Generating...";

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${openaiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `Write an ad caption for: ${input}` }]
    })
  });

  const data = await res.json();
  output.innerText = data.choices?.[0]?.message?.content || "Failed to generate.";
}

async function generateImage() {
  const prompt = document.getElementById("image-input").value;
  const output = document.getElementById("image-output");
  output.innerHTML = "Loading image...";

  const res = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Authorization": `Token ${replicateKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      version: "db21e45e55b286de1f4f7eaa8666eaa177b35bfcfa3fe955c88c75b2d1699f74",
      input: { prompt }
    })
  });

  const data = await res.json();
  const statusURL = data?.urls?.get;

  if (!statusURL) {
    output.innerHTML = "Image generation failed.";
    return;
  }

  let result;
  for (let i = 0; i < 10; i++) {
    await new Promise(r => setTimeout(r, 1000));
    const check = await fetch(statusURL);
    result = await check.json();
    if (result?.output) break;
  }

  if (result?.output?.[0]) {
    output.innerHTML = `<img src="${result.output[0]}" width="100%" />`;
  } else {
    output.innerHTML = "Image not ready or failed.";
  }
}

async function generateVoice() {
  const text = document.getElementById("voice-input").value;
  const output = document.getElementById("voice-output");
  output.innerHTML = "Generating voice...";

  const res = await fetch("https://api.elevenlabs.io/v1/text-to-speech/pNInz6obpgDQGcFmaJgB", {
    method: "POST",
    headers: {
      "xi-api-key": elevenKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text,
      voice_settings: { stability: 0.4, similarity_boost: 0.75 }
    })
  });

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  output.innerHTML = `<audio controls src="${url}"></audio>`;
}
