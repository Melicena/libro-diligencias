import firebase from "../credenciales";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IP_CASA, IP_COMTE_PUSTO, IP_GUARDIA_CIVIL, IP_PUERTAS } from "../data";

const auth = getAuth(firebase);

const Login = () => {
  console.log("LOGIN");
  const handlerSubmit = async (e) => {
    try {
      e.preventDefault();
      const email = e.target.email.value;
      const pass = e.target.pass.value;

      await signInWithEmailAndPassword(auth, email, pass);
    } catch (error) {
      alert("El usuario o la contraseña no son correctos");
      e.target.email.reset();
      e.target.pass.reset();
    }
  };

 
    return (
      <div className="">
          <div className="container d-flex justify-content-center align-items-center">
            <div className="col-md-4">
              <div className="mt-5 ms-5">
                <h1>Inicia sesión</h1>
                <form onSubmit={handlerSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Email: </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Ingresar email"
                      id="email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Contraseña: </label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Ingresar contraseña"
                      id="pass"
                      required
                    />
                  </div>
                  <button className="btn btn-primary" type="submit">
                    Inicia sesión
                  </button>
                </form>
              </div>
            </div>
          </div>
      </div>
    );
  
  
};

export default Login;
