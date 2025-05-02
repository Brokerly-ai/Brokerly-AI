
function generate() {
  const input = document.getElementById("input").value;
  const output = document.getElementById("output");
  if (!input.trim()) {
    output.innerText = "Please enter some text to generate content.";
    return;
  }
  const response = `🧠 Generating copy for: "${input}"\n\n“Unlock your potential with Brokerly AI.”`;
  output.innerText = response;
}
