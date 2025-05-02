
function generateCaption() {
  const input = document.getElementById("caption-input").value;
  const output = document.getElementById("caption-output");
  output.innerText = `“Unlock your potential with Brokerly AI.”\n\n(Generated from: "${input}")`;
}

function generateImage() {
  const prompt = document.getElementById("image-input").value;
  const output = document.getElementById("image-output");
  output.innerHTML = '<img src="https://via.placeholder.com/600x300?text=' + encodeURIComponent(prompt) + '" width="100%" />';
}

function generateVoice() {
  const output = document.getElementById("voice-output");
  output.innerHTML = '<audio controls src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"></audio>';
}
