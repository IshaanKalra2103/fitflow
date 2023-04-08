const form = document.querySelector('form');
const input = document.querySelector('.emotional-state');
let emotionalState;

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (input.value.toLowerCase() === "happy" || input.value.toLowerCase() === "joyful" || input.value.toLowerCase() === "excited" 
  || input.value.toLowerCase() === "sad" || input.value.toLowerCase() === "depressed" || input.value.toLowerCase() === "down" 
  || input.value.toLowerCase() === "angry" || input.value.toLowerCase() === "frustrated"|| input.value.toLowerCase() === "irritated"){
    emotionalState = input.value.toLowerCase();
  } else{
    alert("Please enter a valid emotional state");
  }
});

const startTimeMillis = new Date().setHours(0,0,0,0);
const endTimeMillis = new Date().getTime();

// Authenticate with Google Sign-In
gapi.load('auth2', function() {
  gapi.auth2.init({
    client_id: 'AIzaSyBU9ZOVki3meCJ9ylchp94aU0qj3GI3eM0',
  }).then(function(authInstance) {
    // Load the Google Fit API
    gapi.client.load('fitness', 'v1', function() {
      // Get the user's fitness data from Google Fit
      gapi.client.fitness.users.dataset.aggregate({
        userId: 'me',
        requestBody: {
          aggregateBy: [{
            dataTypeName: 'com.google.step_count.delta',
            dataSourceId: 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps'
          }, {
            dataTypeName: 'com.google.calories.expended',
            dataSourceId: 'derived:com.google.calories.expended:com.google.android.gms:from_activities'
          }, {
            dataTypeName: 'com.google.hydration',
            dataSourceId: 'derived:com.google.hydration:com.google.android.gms:merge_hydration'
          }, {
            dataTypeName: 'com.google.sleep.segment',
            dataSourceId: 'derived:com.google.sleep.segment:com.google.android.gms:sleep_from_activity_segments'
          }],
          bucketByTime: { durationMillis: 86400000 },
          startTimeMillis: startTimeMillis,
          endTimeMillis: endTimeMillis
        }
      }).then(function(response) {
        // Get the fitness data from the response
        const data = response.result.bucket[0].dataset[0].point[0].value[0];
        const stepCount = data.intVal;
        const calorieBurn = data.fpVal;
        const waterIntake = response.result.bucket[0].dataset[1].point[0].value[0].fpVal;
        const sleepDuration = response.result.bucket[0].dataset[2].point[0].value[0].intVal;

        // Use the OpenAI GPT API to generate personalized workout recommendations based on the user's emotional state and fitness data
        const prompt = `I am feeling ${emotionalState}. My step count is ${stepCount.reduce((acc, cur) => acc + cur.steps, 0)} steps. 
        My sleep duration is ${sleepDuration.reduce((acc, cur) => acc + cur.sleepDuration, 0)} minutes.
        My water intake is ${waterIntake.reduce((acc, cur) => acc + cur.waterIntake, 0)} ounces. 
        My calories burned is ${calorieBurn.reduce((acc, cur) => acc + cur.caloriesBurned, 0)}.`;
        const requestBody = JSON.stringify({
          prompt: prompt,
          max_tokens: 50,
          temperature: 0.7,
          n: 1,
          stop: ['\n']
        });

        const options = {
          hostname: 'api.openai.com',
          port: 443,
          path: '/v1/engines/davinci-codex/completions',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': requestBody.length,
            'Authorization': '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'
          }
        };

        const req = request(options, res => {
          let body = '';
          res.on('data', data => {
            body += data;
          });
          res.on('end', () => {
            const result = JSON.parse(body);
            const workoutRecommendations = result.choices[0].text;
            console.log(workoutRecommendations);
            handleGptResponse(workoutRecommendations);
          });
        });

        req.on('error', error => {
          console.error(error);
        });

        req.write(requestBody);
        req.end();


    function handleGptResponse(workoutRecommendations) {
    // Do something with the generated workout recommendations
    console.log(`Workout recommendations: ${workoutRecommendations}`);
      }
      });
    });
  });
});




