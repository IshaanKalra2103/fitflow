// Load the Google API client library
gapi.load('client:auth2', initAuth);

// Initialize the API client library and set up sign-in listeners
function initAuth() {
  gapi.client.init({
    apiKey: 'AIzaSyBU9ZOVki3meCJ9ylchp94aU0qj3GI3eM0',
    clientId: '428360630604-01h0rpcavi8mfo6mc8gih2b7c4j3ag7e.apps.googleusercontent.com',
    scope: 'email'
  }).then(function () {
    // Listen for sign-in state changes
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle initial sign-in state
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

    // Attach sign-in listener to login button
    document.getElementById('login-with-google-btn').addEventListener('click', function () {
      gapi.auth2.getAuthInstance().signIn();
    });
  });
}

// Update the UI sign-in state
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    var profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
    document.getElementById('email').value = profile.getEmail();
    document.getElementById('password').value = profile.getId();
    document.getElementById('login-form').submit();
  }
}
