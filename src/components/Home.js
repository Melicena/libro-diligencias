import React, { useEffect, useState } from "react";

import firebase from "../credenciales";
import { getAuth, signOut } from "firebase/auth";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  getFirestore,
  addDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";

const auth = getAuth(firebase);
const db = getFirestore(firebase);

const Home = ({ correoUsuario }) => {
  const valorInicial = {
    numero: 0,
    descripcion: "",
    hecho: "",
    instructor: "",
    evento: "",
  };

  const [dgs, setDgs] = useState(valorInicial);
  const [lista, setLista] = useState([]);

  const capturarInputs = (e) => {
    const { name, value } = e.target;
    setDgs({ ...dgs, [name]: value });
  };

  const guardarDatos = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "dgs"), {
        ...dgs,
      });
    } catch (error) {
      console.log(error);
    }
    setDgs({ ...valorInicial });
  };

  useEffect(() => {
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "diligencias"));
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({...doc.data(), id: doc.id });
        });
        setLista(docs);
        lista.sort((x,y) => x.numero.localCompare(y.numero));
      } catch (error) {
        console.log(error);
      }
    };
    getLista();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <p className="mt-2">
            Bienvenido, <strong>{correoUsuario}.</strong> Has iniciado sesión.
          </p>
        </div>
        <div className="col-md-4">
          <button
            className="btn btn-primary mt-2"
            onClick={() => signOut(auth)}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-4 text-center">
          <h3>Ingresar diligencias</h3>
          <form onSubmit={guardarDatos}>
            <div className="card card-body">
              <div className="form-group">
                <input
                  type="text"
                  name="numero"
                  className="form-control mt-2"
                  placeholder="Ingresa el número de las diligencias"
                  onChange={capturarInputs}
                  value={dgs.numero}
                ></input>
                <input
                  type="text"
                  name="descripcion"
                  className="form-control mt-2"
                  placeholder="Ingresa una descripción de las diligencias"
                  onChange={capturarInputs}
                  value={dgs.descripcion}
                ></input>
                <input
                  type="text"
                  name="hecho"
                  className="form-control mt-2"
                  placeholder="Ingresa el número de hecho"
                  onChange={capturarInputs}
                  value={dgs.hecho}
                ></input>
                <input
                  type="text"
                  name="instructor"
                  className="form-control mt-2"
                  placeholder="Ingresa el instructor de las diligencias"
                  onChange={capturarInputs}
                  value={dgs.instructor}
                ></input>
                <input
                  type="text"
                  name="evento"
                  className="form-control mt-2"
                  placeholder="Ingresa los eventos (opcional)"
                  onChange={capturarInputs}
                  value={dgs.evento}
                ></input>
              </div>
              <button className="btn btn-primary mt-2">Ingresar</button>
            </div>
          </form>
        </div>
        <div className="col-md-8 text-center">
          <h3>Lista de diligencias</h3>
          <div className="container card">
            <table>
              <thead>
                <tr>
                  <th>Número</th>
                  <th>Descripción</th>
                  <th>Hecho</th>
                  <th>Instructor</th>
                  <th>Evento</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {lista.map((list) => (
                  <tr key={list.id}>
                    <td>{list.numero}</td>
                    <td>{list.descripcion}</td>
                    <td>{list.hecho}</td>
                    <td>{list.instructor}</td>
                    <td>{list.evento}</td>
                    <td>
                      <button className="btn btn-danger">Eliminar</button>
                      <button className="btn btn-success m-1">Editar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Home;
