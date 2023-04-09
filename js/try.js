const ACCESS_KEY = "cklXmJYgMX1haJvgpte9N1QkEKSNJfQ-d-Qag2uL_gk";

let apiKey = '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';
const input = document.querySelector('.emotional-state');
let emotionalState;

fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    let quote = document.querySelector(".motivation");
    quote.textContent = data[Math.floor(Math.random() * 99) + 1].text;
  });

  function fader(){
    let check = document.querySelector(".data");
    check.style.display = "block";
  }

const stepCount = 1000;
const sleepDuration = 2;
const waterIntake = 0.5;
const calorieBurn = 1500;

const structure = " Please only suggest workouts.I understand you are an AI, so don't mention that.Don't add additional ."+ "The goal is to produce one single workout string as follows. The format should follow like this: (Workout1$Workout2%definitionofWorkout1#definitionofWorkout2).Please follow this format strictly and do not make your own format. Make sure that there are a total of 2 separate workout suggestions and the definitions for each workout session is no longer than one sentence. Nothing else should be mentioned this includes parentheses, other symbols and format, except workout, definitions, ,and symbols mentioned above. Dont use lines such as Certainly, here are four workout suggestions based on the provided information: or anything related, just present me with answer. Use this format Workout1$Workout2%definitionofWorkout1#definitionofWorkout2. For example - Walking$Cardio%Low-impact aerobic exercise that involves brisk walking#Breathing and relaxation techniques with gentle stretching to improve balance and flexibility.";
const prompt = `I am feeling ${emotionalState}. My step count is ${stepCount} steps. 
My sleep duration is ${sleepDuration} hours.
My water intake is ${calorieBurn} ounces. 
My calories burned is 200.`+ structure;
        
let messages = [];

submitBtn = document.querySelector("#submitBtn");

submitBtn.addEventListener('click', () => {
  console.log("In");
  handle_QUERY();
});

function image_process(q1){
  const query = q1;
  const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${ACCESS_KEY}`;
  
  fetch(apiUrl)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data.results);
      // Use the first image's URL to create an img tag
      const imgSrc = data.results[0].urls.regular;
      const img = document.querySelector('#workout-image');
      img.src = imgSrc;
      img.style.width = '200px';
      img.style.height = '200px';
      img.style.borderRadius = '50%';

      // Add the img tag to the document body
      document.body.appendChild(img);
    })
    .catch(error => {
      console.log(error);
    });
}

function handle_QUERY() {

  messages.push({
    'role': 'user',
    'content': prompt
  })

  fetch(`https://api.openai.com/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages 
    })
  })
  .then(response => response.json())
  .then(data => {
    messages.push({
        'role': 'assistant',
        'content': data.choices[0].message.content 
      });

      console.log(data.choices);
  
      const array1 = data.choices[0].message.content.split("%");
      const workouts = array1[0].split("$");
      console.log(workouts);
      const definitions = array1[1].split("#");
      console.log(definitions);
      const boxes = document.querySelectorAll('.box'); // select all the box divs

      for (let i = 0; i < 2; i++) {
      if(workouts[i] != ""){
        const box = boxes[i]; // select the box div at index i
        
        const workoutName = box.querySelector('.workout'); // select the h2 element within the box div
        workoutName.textContent = workouts[i]; // set the text content of the h2 element

        image_process(workouts[i]);
      }
      }

      for (let i = 0; i < 2; i++){
        if(definitions[i] != ""){
          const box = boxes[i]; // select the box div at index i    
          const definition = box.querySelector('.definition'); // select the p element within the box div
          definition.textContent = definitions[i]; // set the text content of the p element
        }
      }

  
  });

}

