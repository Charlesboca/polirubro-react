import React from "react";
import AgregarProducto from "../Componentes/agregarProducto.jsx";
import ListaProducto from "../Componentes/ListaProducto.jsx";
import { auth ,db} from "../firebase"; // Importamos auth para poder cerrar sesión
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc,getDoc } from "firebase/firestore";


function Admin() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Al salir, te manda al login
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const [visitas, setVisitas] = useState(0);

  useEffect(() => {
    const obtenerVisitas = async () => {
      try {
        const docRef = doc(db, "metricas", "visitas");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setVisitas(docSnap.data().contador);
        }
      } catch (error) {
        console.error("Error al obtener visitas:", error);
      }
    };

    obtenerVisitas();
  }, []);


  // Ya no necesitamos el estado 'logueado' ni el password '1234'
  // Porque si llegaste acá, es porque RutaProtegida ya te validó.

  return (
  <>  
    <div style={{ padding: "20px" }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        borderBottom: "2px solid #facc15",
        marginBottom: "20px",
        paddingBottom: "10px"
      }}>
        <h2 style={{ margin: 0 }}>Panel de Administración 🔐</h2>
        
        <button 
          onClick={handleLogout}
          style={{
            backgroundColor: "#facc15",
            color: "#000",
            border: "none",
            padding: "8px 15px",
            fontWeight: "bold",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Cerrar Sesión
        </button>
      </div>

      <AgregarProducto />
      <hr style={{ borderColor: "#333", margin: "30px 0" }} />
      <ListaProducto />
    </div>
   
  <div className="admin-stats" style={{ display: 'flex', justifyContent: 'center', width: '100%', margin: '20px 0' }}>
  <div className="stat-card">
    <h3>📈 Visitas Totales</h3>
    <p className="stat-number">{visitas.toLocaleString("es-AR")}</p>
  </div>
</div>
</>
  );
}

export default Admin;