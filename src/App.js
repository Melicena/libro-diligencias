import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import firebase from "./credenciales";
import { IP_CASA, IP_GUARDIA_CIVIL } from "./data";

const auth = getAuth(firebase);

function App() {
  const [user, setUser] = useState(null);

  // EN ESTE BLOQUE SE OBTIENE LA IP DEL CLIENTE Y SE ALMACENA EN LA CONSTANTE 'ip'
  const [ip, setIP] = useState("");
  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    setIP(res.data.IPv4);
  };
  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
  }, []);

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      setUser(usuarioFirebase);
    } else {
      setUser(null);
    }
  });

  console.log(ip);
  if (ip === IP_CASA || ip === IP_GUARDIA_CIVIL) {
    console.log("DENTRO");
    return (
      <div className="">
        {user ? <Home correoUsuario={user.email} /> : <Login />}
      </div>
    );
  } else {
    return (
      <div className="text-center">
        <h1>IP BLOCKED. CONTACT THE ADMINISTRATOR</h1>
      </div>
    );
  }
}

export default App;
