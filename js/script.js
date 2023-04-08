// Load the Google API client library
gapi.load('client:auth2', initAuth);

// Initialize the API client library and set up sign-in listeners
function initAuth() {
  gapi.client.init({
    apiKey: 'YOUR_API_KEY',
    clientId: 'YOUR_CLIENT_ID',
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
