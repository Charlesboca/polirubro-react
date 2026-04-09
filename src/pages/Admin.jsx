import { useState } from "react";
import AgregarProducto from "../Componentes/agregarProducto.jsx";
import ListaProducto from "../Componentes/ListaProducto.jsx";


function Admin() {
  const [logueado, setLogueado] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === "1234") {
      setLogueado(true);
    } else {
      alert("Contraseña incorrecta");
    }
  };

  if (!logueado) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Panel Admin 🔐</h2>

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Ingresar
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Panel Admin</h2>
      <AgregarProducto />
      <ListaProducto />
   
    </div>
  );
}

export default Admin;