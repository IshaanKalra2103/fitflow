const form = document.querySelector('form');
const input = document.querySelector('.emotional-state');
let emotionalState;

input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    if (input.value.toLowerCase() === "happy" || input.value.toLowerCase() === "joyful" || input.value.toLowerCase() === "excited" 
    || input.value.toLowerCase() === "sad" || input.value.toLowerCase() === "depressed" || input.value.toLowerCase() === "down" 
    || input.value.toLowerCase() === "angry" || input.value.toLowerCase() === "frustrated"|| input.value.toLowerCase() === "irritated"){
      emotionalState = input.value.toLowerCase();
      window.location.href = "http://127.0.0.1:5500/second-screen.html";//Change this.
    } else{
      alert("Please enter a valid emotional state");
    }
  }
});







