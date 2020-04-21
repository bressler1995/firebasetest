https://console.firebase.google.com/project/fir-test-4bfaa/database/fir-test-4bfaa/data

let nodeData; // object we will push to firebase
let fbData; // data we pull from firebase
let fbDataArray; // firebase data values converted to an array
let database; // reference to our firebase database
let folderName; // name of folder you create in db

function setup() {
  noCanvas();

  var firebaseConfig = {
    apiKey: "AIzaSyBzXhyxgomkg_5N15f4jLIBwipmkddaw5U",
    authDomain: "fir-test-4bfaa.firebaseapp.com",
    databaseURL: "https://fir-test-4bfaa.firebaseio.com",
    projectId: "fir-test-4bfaa",
    storageBucket: "fir-test-4bfaa.appspot.com",
    messagingSenderId: "166112797619",
    appId: "1:166112797619:web:01dd09294926c500cce1c6",
    measurementId: "G-JR8NP0Z4SY"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
}

function draw() {
  
}