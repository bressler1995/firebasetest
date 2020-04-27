// https://console.firebase.google.com/project/fir-test-4bfaa/database/fir-test-4bfaa/data

let nodeData; // object we will push to firebase
let fbData; // data we pull from firebase
let fbDataArray; // firebase data values converted to an array
let fbCount = 0;
let database; // reference to our firebase database
let folderName = "messages"; // name of folder you create in db
let myinput, mybutton, chat_opt, close_opt, secret_win, my_x = [], my_y = [], drawn = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

   // Initialize firebase
  // support for Firebase Realtime Database 4 web here: https://firebase.google.com/docs/database/web/start
  // Copy and paste your config here (replace object commented out)
  // ---> directions on finding config below

  // paste your config file here
  let config = {
    apiKey: "AIzaSyBzXhyxgomkg_5N15f4jLIBwipmkddaw5U",
    authDomain: "fir-test-4bfaa.firebaseapp.com",
    databaseURL: "https://fir-test-4bfaa.firebaseio.com",
    projectId: "fir-test-4bfaa",
    storageBucket: "fir-test-4bfaa.appspot.com",
    messagingSenderId: "166112797619",
    appId: "1:166112797619:web:01dd09294926c500cce1c6"
  };

  firebase.initializeApp(config);

  database = firebase.database();

  // this references the folder you want your data to appear in
  let ref = database.ref(folderName);
  // **** folderName must be consistant across all calls to this folder

  ref.on('value', gotData, errData);


  // ---> To find your config object:
  // They will provide it during Firebase setup
  // or (if your project already created)
  // 1. Go to main console page
  // 2. Click on project
  // 3. On project home page click on name of app under project name (in large font)
  // 4. Click the gear icon --> it's in there!
  secret_win = select("#secret_win");
  myinput = select('#myinput');
  mybutton = select('#mybutton');
  chat_opt = select("#chat_opt");
  close_opt = select("#close_opt");

  mybutton.mousePressed(
    function() {

      if(myinput.value() != null & myinput.value() != "") {
        let mydate = new Date();
        fbCount++;
        createNode(folderName, fbCount, 
          {
            text: myinput.value(),
            timestamp: String(mydate.getMonth() + 1) + '/' + String(mydate.getDate()) + '/' + String(mydate.getFullYear()),
          }
        );
        myinput.value('');
      } else {
        alert("Field can't be blank! Nom nom nom.")
      }
      
    }
  );

  chat_opt.mousePressed(toggle_chat);
  close_opt.mousePressed(toggle_chat);

  setTimeout(toggle_chat, 1000);
  
}

function draw() {
  if(fbDataArray != null) {

    fill(0);
    textSize(14);
    textFont('Arial');

    for(let i = 0; i < fbDataArray.length; i++) {

      if(drawn[i] != true) {
        drawn[i] = true;
        let temp_p;
        //text(fbDataArray[i].text.toString(), my_x[i], my_y[i]);
        temp_p = createP('<span style="margin-bottom:5px; font-size:11px; font-weight:700;">' + fbDataArray[i].timestamp.toString() + '</span><span font-size:15px; font-weight:400>' + fbDataArray[i].text.toString() + '</span>');
        temp_p.addClass('temp_p');
        temp_p.style('background: rgb(' + random(0, 230) + ',' + random(0, 230) + ',' + random(0, 230) + ');left:' + my_x[i] + 'px;top:' + my_y[i] + 'px;');
        //temp_p.position(my_x, my_y);
        setTimeout(function() {
          temp_p.addClass('temp_p_transition')
        }, 300);

        setTimeout(function() {
          temp_p.addClass('show_temp_p')
        }, 500);

      }
    }

  }
}

function windowResize() {
  resizeCanvas(windowWidth, windowHeight);
}

function toggle_chat() {
  secret_win.toggleClass("hide_secret_win");
  setTimeout(function() {
    chat_opt.toggleClass("hide_chat_opt");
  }, 400);
}