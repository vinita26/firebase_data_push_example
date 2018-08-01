import firebase from 'firebase';
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDvtr-W-vY9z-NxJpdocwSGraJ7MCYRaXA",
    authDomain: "quiz-social-cdcc0.firebaseapp.com",
    databaseURL: "https://quiz-social-cdcc0.firebaseio.com",
    projectId: "quiz-social-cdcc0",
    storageBucket: "",
    messagingSenderId: "490519306337"
  };
  firebase.initializeApp(config);


  var database = firebase.database();

function login(){
  function newLogin(user){
    if(user){
      app(user);
    } else{
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider).then(function(result){
          console.login('result', result);
        } 
      )
    }
    
  }
  firebase.auth().onAuthStateChanged(newLogin);
}
function app(user){

  function updateStatus(e){
    var myUpdate = {};
    myUpdate.email = user.email;
    myUpdate.displayName = user.displayName;
    myUpdate.status = document.getElementById('clientStatus').value;
    fb.child(user.uid).set(myUpdate);

  }

  function receivevalue(received){
    var data = received.val();
    console.log('data:',data);
    document.getElementById('messages').innerHTML='';
    for(var key in data){
      var person = data[key];
      var p = `<p> ${person.displayName} with emailId: ${person.email} said=> ${person.status}</p>`;
      document.getElementById('messages').innerHTML+= p;
    }
  }
  document.getElementById('clientName').innerHTML = user.displayName;
  // document.getElementById('clientPhoto').setAttribute("src",user.photoURL);
  var fb = database.ref('whatsMyStatus');
  document.getElementById('clientStatus').addEventListener('input',updateStatus);
  fb.on('value',receivevalue);
}
window.onload=login;