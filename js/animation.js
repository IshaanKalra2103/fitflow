
VANTA.GLOBE({
  el: "#vanta-canvas",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  color: 0xf5f5f5,
  size: 0.80,
  backgroundColor: "#212E3A"
})


const typingText = document.getElementById('typing-text');
const text = typingText.innerText;
typingText.innerText = '';

let i = 0;
const typingInterval = setInterval(() => {
    if (i < text.length) {
        if (text.charAt(i) === ' ') {
          typingText.innerHTML += '&nbsp;';
        } else {
          typingText.innerText += text.charAt(i);
        }
        i++;
      } else {
    clearInterval(typingInterval);
    const inputBox = document.querySelector('input[type="text"]');
    inputBox.style.opacity = 0;
    inputBox.style.transition = 'opacity 0.5s ease-in-out';
    inputBox.style.visibility = 'visible';
    inputBox.style.opacity = 1;
  }
}, 70);

        
        
