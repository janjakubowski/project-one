  // Project One Database 
  // Owned by Jan -- janskis@gmail.com
  //
  // phantasmagoria firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBMpnRdH4Wwx8r0QnAyR_iQwt_ZI9K4Y-E",
    authDomain: "phantasmagoria-a090b.firebaseapp.com",
    databaseURL: "https://phantasmagoria-a090b.firebaseio.com",
    projectId: "phantasmagoria-a090b",
    storageBucket: "phantasmagoria-a090b.appspot.com",
    messagingSenderId: "769458791647",
    appId: "1:769458791647:web:6ce660bc86164598"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var dbRef = firebase.database();