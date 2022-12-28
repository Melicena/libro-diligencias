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
    numero: "",
    descripcion: "",
    hecho: "",
    instructor: "",
    evento: "",
  };

  const [dgs, setDgs] = useState(valorInicial);
  const [lista, setLista] = useState([]);
  const [dgsId, setDgsId] = useState("");
  const [filtro, setFiltro] = useState("");
  const [filtrada, setFiltrada] = useState([]);

  useEffect(() => {
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "diligencias"));
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setLista(docs.sort((a, b) => b.numero - a.numero));
      } catch (error) {
        console.log(error);
      }
    };
    getLista();
  }, []);

  useEffect(() => {
    if (filtro !== "") {
      const listaFiltrada = lista.filter(
        (item) =>
          item.numero.includes(filtro) ||
          item.descripcion.includes(filtro) ||
          item.hecho.includes(filtro) ||
          item.instructor.includes(filtro) ||
          item.evento.includes(filtro)
      );
      setFiltrada(listaFiltrada);
    } else {
      setFiltrada(lista);
    }
  }, [filtro, lista]);

  const capturarInputs = (e) => {
    const { name, value } = e.target;
    setDgs({ ...dgs, [name]: value });
  };

  useEffect(() => {
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "diligencias"));
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setLista(docs.sort((a, b) => b.numero - a.numero));
      } catch (error) {
        console.log(error);
      }
    };
    getLista();
  }, []);

  const guardarDatos = async (e) => {
    e.preventDefault();
    if (dgsId === "") {
      try {
        await addDoc(collection(db, "diligencias"), {
          numero: dgs.numero.toUpperCase(),
          descripcion: dgs.descripcion.toUpperCase(),
          hecho: dgs.hecho.toUpperCase(),
          instructor: dgs.instructor.toUpperCase(),
          evento: dgs.evento.toUpperCase()
        });

      } catch (error) {
        console.log(error);
      }
    }
    else {
      await setDoc(doc(db, "diligencias", dgsId), {
        numero: dgs.numero.toUpperCase(),
        descripcion: dgs.descripcion.toUpperCase(),
        hecho: dgs.hecho.toUpperCase(),
        instructor: dgs.instructor.toUpperCase(),
        evento: dgs.evento.toUpperCase()
      })
    }
    setDgs({ ...valorInicial });
    setDgsId("")
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "diligencias"));
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setLista(docs.sort((a, b) => b.numero - a.numero));
      } catch (error) {
        console.log(error);
      }
    };
    getLista();

  };

  const deleteDgs = async (id) => {
    await deleteDoc(doc(db, "diligencias", id));
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "diligencias"));
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setLista(docs.sort((a, b) => b.numero - a.numero));
      } catch (error) {
        console.log(error);
      }
    };
    getLista();
  };

  const getOne = async (id) => {
    try {
      const docRef = doc(db, "diligencias", id)
      const docSnap = await getDoc(docRef)
      setDgs(docSnap.data())
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if (dgsId !== "") {
      getOne(dgsId);
    }
  }, [dgsId]);

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
        <div className=" text-center">
          <h3>Ingresar diligencias</h3>
          <form onSubmit={guardarDatos}>
            <div className="card card-body">
              <div
                className="form-group"
                style={{ display: "flex", flexWrap: "wrap" }}>
                <input
                  type="text"
                  name="numero"
                  className="form-control mt-2 mx-1"
                  placeholder="Número"
                  onChange={capturarInputs}
                  value={dgs.numero}
                  style={{ flexBasis: "20%" }} />
                <input
                  type="text"
                  name="descripcion"
                  className="form-control mt-2"
                  placeholder="Descripción"
                  onChange={capturarInputs}
                  value={dgs.descripcion}
                  style={{ flexBasis: "78%" }} />
                <input
                  type="text"
                  name="hecho"
                  className="form-control mt-2"
                  placeholder="Número de hecho"
                  onChange={capturarInputs}
                  value={dgs.hecho}
                  style={{ flexBasis: "25%" }} />
                <input
                  type="text"
                  name="instructor"
                  className="form-control mt-2 mx-1"
                  placeholder="Instructor"
                  onChange={capturarInputs}
                  value={dgs.instructor}
                  style={{ flexBasis: "25%" }} />
                <input
                  type="text"
                  name="evento"
                  className="form-control mt-2 mx-1"
                  placeholder="Eventos (opcional)"
                  onChange={capturarInputs}
                  value={dgs.evento}
                  style={{ flexBasis: "25%" }} />
                <button
                  className="btn btn-primary mt-2 "
                  style={{ flexBasis: "20%" }}>
                  {dgsId === "" ? "Insertar" : "Actualizar"}
                </button>

              </div>
            </div>
          </form>
        </div>
        <div className="col-md-12 text-center">
          <div className="row">
            <div className="col-md-6 text-end">
              <h3>Lista de diligencias</h3>
            </div>
            <div className="col-md-5 text-end mt-1">
              <label>
                Filtrar:
                <input
                  type="text"
                  value={filtro}
                  onChange={(e) => setFiltro(e.target.value)}
                />
              </label>
            </div>
          </div>

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

                {filtrada.map((list) => (

                  <tr key={list.id}>
                    <td>{list.numero}</td>
                    <td>{list.descripcion}</td>
                    <td>{list.hecho}</td>
                    <td>{list.instructor}</td>
                    <td>{list.evento}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteDgs(list.id)}>
                        Eliminar
                      </button>

                      <button
                        className="btn btn-success m-1"
                        onClick={() => setDgsId(list.id)}>
                        Editar
                      </button>

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
