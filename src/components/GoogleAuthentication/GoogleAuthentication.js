import React, { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  

const GoogleAuthentication = () => {
    const [user, setUser] = useState({})
    const provider = new firebase.auth.GoogleAuthProvider();
    
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
  
    return (
     <div className="App">
        <button onClick = {handleGoogleSignIn}>Sign in Using Google</button>
        <h3>User Name : {user.displayName}</h3>
        <p>user email: {user.email}</p>
        <img src={user.photoURL} alt=""/>
    </div>
    );
};

export default GoogleAuthentication;