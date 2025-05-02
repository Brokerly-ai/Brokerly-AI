
function generateText() {
  const input = document.getElementById("text-input").value;
  const out = document.getElementById("text-output");
  out.innerText = "🧠 “This is your AI-generated caption based on: " + input + "”";
}

function generateImage() {
  const prompt = document.getElementById("image-prompt").value;
  const imgBox = document.getElementById("image-output");
  imgBox.innerHTML = '<img src="https://via.placeholder.com/500x300?text=' + encodeURIComponent(prompt) + '" width="100%" />';
}

function generateVoice() {
  const text = document.getElementById("voice-input").value;
  const voiceBox = document.getElementById("voice-output");
  voiceBox.innerHTML = '<audio controls src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"></audio>';
}
