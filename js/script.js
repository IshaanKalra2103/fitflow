function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
   $(".picture").attr(profile.getImageUrl());
   $(".name").text(profile.getName());
   $(".data").css("display","block");
   $(".sign-in").css("display","none");
  }

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      alert("You have been successfully signed out!")
      $(".sign-in").css("display","block");
    });
  }

  