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
