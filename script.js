
function generate() {
  const input = document.getElementById('input').value;
  const output = document.getElementById('output');
  if (!input.trim()) {
    output.innerText = 'Please enter something first.';
    return;
  }

  // Simulated AI response
  output.innerText = '🧠 Generating caption for: "' + input + '"\n\n' + '“Unlock your potential with Brokerly AI.”';
}
