        // Set up the text to be typed
        const text = "EmoFit: Your Personalized Workout Companion using Biofeedback and Machine Learning";

        // Get the element that will display the text
        const typewriter = document.querySelector(".typewriter");
        
        // Set up a variable to keep track of which character to type next
        let i = 0;
        
        // Start typing the text
        function type() {
          // Add the next character to the text
          typewriter.innerHTML += text.charAt(i);
        
          // Move to the next character
          i++;
        
          // If there are still characters left to type, schedule the next character to be added
          if (i < text.length) {
            setTimeout(type, 100); // Change the typing speed here
          }
        }
        
        // Start the animation when the page loads
        window.onload = function() {
          type();
        };
        
        
        