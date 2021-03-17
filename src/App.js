import React, { useState } from 'react';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config.js';
import GoogleAuthentication from './components/GoogleAuthentication/GoogleAuthentication.js';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


function App() {
  const [user, setUser] = useState({})
  const provider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const gitHubProvider = new firebase.auth.GithubAuthProvider();
  const handleGoogleSignIn = () =>{
        firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        console.log(user);
        setUser(user);
        // ...
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode , errorMessage , email);
      });
  }
  const handleFacebookSignIn = () => {
    firebase.auth()
   .signInWithPopup(fbProvider)
   .then((result) => {
       /** @type {firebase.auth.OAuthCredential} */
       var credential = result.credential;
       var user = result.user;
       var accessToken = credential.accessToken;
       console.log('fb user', user);
       setUser(user)
   })
   .catch((error) => {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       var email = error.email;
       var credential = error.credential;
       console.log(errorCode, errorMessage,email,credential);
   });
}
const handleGithubSignIn = () => {
      firebase.auth()
      .signInWithPopup(gitHubProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        // console.log('github user', user);
        setUser(user);
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        // console.log('error',errorCode,errorMessage,email,credential);
      });
    }
    const buttonStyle = {
      color: 'black',
      backgroundColor: 'tomato',
      borderRadius: 5,
      border: 'none',
      margin: '10px',
      padding: '20px',
      fontSize: '15px',
      cursor: 'pointer'
    }
  return (

    <div className="App">
     <button style ={buttonStyle} onClick = {handleGoogleSignIn}>Google-Authentication</button>
     <button style ={buttonStyle} onClick = {handleFacebookSignIn}>Facebook-Authentication</button>
     <button style ={buttonStyle} onClick = {handleGithubSignIn}>Github-Authentication</button>
     <h3>User Name : {user.displayName}</h3>
     <p>user email: {user.email}</p>
     <img src={user.photoURL} alt=""/>
    </div>
  );
}

export default App;
