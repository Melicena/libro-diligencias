import React, { useState } from 'react';
import './App.css';
import Home from "./components/Home";
import Login from "./components/Login";

import firebase from './credenciales';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth(firebase)

function App() {

  const [user, setUser] = useState(null)

  onAuthStateChanged(auth, (usuarioFirebase) =>{
    if(usuarioFirebase){
      setUser(usuarioFirebase)
    } else {
      setUser(null)
    }
  })

  return (
    <div className="">
      {user ? <Home correoUsuario= {user.email}/> : <Login />}
    </div>
  );
}

export default App;
