import React, { useState } from 'react';
import { auth } from "../firebase";
// 1. Agregamos setPersistence y browserSessionPersistence a los imports
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../Estilos/Login.css";
import { Link } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 2. Configuramos la persistencia ANTES de loguear.
      // browserSessionPersistence hace que la sesión dure solo mientras la pestaña esté abierta.
      await setPersistence(auth, browserSessionPersistence);
      
      // 3. Ahora sí, intentamos el login normal
      await signInWithEmailAndPassword(auth, email, password);
      
      navigate("/admin"); 
    } catch (err) {
      console.error(err);
      // Firebase a veces unifica errores en 'auth/invalid-credential' por seguridad
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setError("Credenciales incorrectas. Revisá el mail y la clave.");
      } else {
        setError("Hubo un error al intentar ingresar.");
      }
    }
  };

  return (
   <> 

    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Acceso Administrador</h2>
        
        {error && <p className="error-msg">{error}</p>}

        <div className="input-group">
          <label>Email</label>
          <input 
            type="email" 
            placeholder="admin@lacasadecata.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Contraseña</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-login">Ingresar</button>
      </form>



    </div>

  
    <div className="contenedor-boton-final">
            <Link to="/" className="btn-inicio-estilo">
              Volver al Inicio
            </Link>
          </div>

    </>
  );
};

export default Login;