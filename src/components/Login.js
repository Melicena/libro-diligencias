import React, { useState } from 'react'

import firebase from '../credenciales'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'

const auth = getAuth(firebase)

const Login = () => {

  const [registro, setRegistro] = useState(false)

  const handlerSubmit = async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const pass = e.target.pass.value

    if(registro){
      await createUserWithEmailAndPassword(auth, email, pass)
    } else {
      await signInWithEmailAndPassword(auth, email, pass)
    }
  }

  return (
    <div className='row container p-4'>
      <div className='col-md-8'>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/EscudoGuardiaCivil.svg/1200px-EscudoGuardiaCivil.svg.png" className="tamaño-imagen" alt="20%" />
      </div>
      <div className='col-md-4'>
        <div className='mt-5 ms-5'>
          <h1>{registro ? 'registrate' : 'inicia sesión'}</h1>
          <form onSubmit={handlerSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Email: </label>
              <input type="email" className="form-control" placeholder="Ingresar email" id="email" required/>
            </div>
            <div className='mb-3'>
              <label className='form-label'>Contraseña: </label>
              <input type="password" className="form-control" placeholder="Ingresar contraseña" id="pass" required/>
            </div>
            <button className='btn btn-primary' type='submit'>
              {registro ? 'Regístrate' : 'Inicia sesión'}
            </button>
          </form>
          <div className="form-group">
            <button className='btn btn-secondary mt-4 form-control' onClick={()=> setRegistro(!registro)}>
              {registro ? 'ya tienes una cuenta? Inicia sesión' : 'no tienes cuenta? Regístrate'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login