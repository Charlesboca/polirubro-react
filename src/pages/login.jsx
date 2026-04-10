import React, { useState } from 'react';
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../Estilos/Login.css"; // Ahora te paso un estilo acorde

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Si entra acá, el login fue exitoso
      navigate("/admin"); 
    } catch (err) {
      console.error(err);
      // Mensajes de error amigables
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("Credenciales incorrectas. Revisá el mail y la clave.");
      } else {
        setError("Hubo un error al intentar ingresar.");
      }
    }
  };

  return (
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
  );
};

export default Login;