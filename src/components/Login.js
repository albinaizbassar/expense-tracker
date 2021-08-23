import React from 'react';
import {createUser} from "../config/firebase";
import {auth} from "../config/firebase";
import firebase from "firebase";
import google from './../images/google.svg'

function Login() {

  const signIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider)
    const order = {
      uid: auth.currentUser.uid,
      displayName: auth.currentUser.displayName,
    }
    await createUser(order, auth.currentUser.uid)
    console.log(auth.currentUser)
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    }}>
      <button onClick={signIn} style={{
        display: 'flex',
        alignItems: 'center',
        padding: '5px',
        width: '180px',
        backgroundColor: '#fff',
        border: '1px solid gray',
        borderRadius: '7px',
        cursor: 'pointer'
      }}>
        <img src={google} width='25' alt="google icon" style={{
          marginRight: '10px'
        }}/>
        <span style={{
          fontWeight: 'bold',
          color: '#4E4E4EFF'
        }}>
          Sign In with Google
        </span>
      </button>
    </div>
  );
}

export default Login;
