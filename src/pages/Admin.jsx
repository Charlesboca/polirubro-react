import React, { useEffect, useState } from "react";
import AgregarProducto from "../Componentes/agregarProducto.jsx";
import ListaProducto from "../Componentes/ListaProducto.jsx";
import { auth, db } from "../firebase"; 
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

function Admin() {
  const navigate = useNavigate();
  const [visitas, setVisitas] = useState(0);
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [esperandoAuth, setEsperandoAuth] = useState(true);
  
  // 🔄 ESTADO PARA SINCRONIZAR COMPONENTES
  const [actualizar, setActualizar] = useState(0);
  const refrescarLista = () => setActualizar(prev => prev + 1);

  useEffect(() => {
    const desuscribir = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuarioLogueado(user);
      } else {
        setUsuarioLogueado(null);
      }
      setEsperandoAuth(false);
    });
    return () => desuscribir();
  }, []);

  useEffect(() => {
    const obtenerVisitas = async () => {
      try {
        const docRef = doc(db, "metricas", "visitas");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setVisitas(docSnap.data().contador);
      } catch (error) {
        console.error("Error visitas:", error);
      }
    };
    obtenerVisitas();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* SECCIÓN DE USUARIO */}
      <div style={{ 
        backgroundColor: "#1e1e1e", padding: "10px 20px", borderRadius: "8px", 
        marginBottom: "20px", display: "flex", justifyContent: "space-between", 
        alignItems: "center", border: "1px solid #333" 
      }}>
        <div>
          {esperandoAuth ? (
            <span style={{ color: "#777" }}>Verificando sesión...</span>
          ) : usuarioLogueado ? (
            <span style={{ color: "#facc15", fontWeight: "500" }}>
              Conectado como: <strong style={{ fontWeight: "bold" }}>{usuarioLogueado.email}</strong>
            </span>
          ) : (
            <span style={{ color: "#ff4444" }}>Sesión no detectada</span>
          )}
        </div>
        <button onClick={handleLogout} style={{
          backgroundColor: "#facc15", color: "#000", border: "none",
          padding: "5px 12px", fontWeight: "bold", borderRadius: "4px", cursor: "pointer"
        }}>
          Cerrar Sesión
        </button>
      </div>

      <div style={{ borderBottom: "2px solid #facc15", marginBottom: "20px", paddingBottom: "10px" }}>
        <h2 style={{ margin: 0 }}>Panel de Administración Polirrubro 🔐</h2>
      </div>

      {/* 🔹 PASAMOS LA FUNCIÓN PARA REFRESCAR */}
      <AgregarProducto alAgregar={refrescarLista} />
      
      <hr style={{ borderColor: "#333", margin: "30px 0" }} />
      
      {/* 🔹 PASAMOS EL TRIGGER PARA QUE LA LISTA SE ENTERE */}
      <ListaProducto trigger={actualizar} />

    {/* ✅ Stats rápidas Centradas - CORREGIDO */}
      <div style={{ 
        marginTop: "30px", 
        marginBottom: "30px", 
        textAlign: "center",
        backgroundColor: "#f4f4f4", // Un fondito gris claro para que resalte
        padding: "15px",
        borderRadius: "10px",
        border: "1px solid #ddd"
      }}>
        <p style={{ margin: 0, color: "#333", fontSize: "1.2rem", fontWeight: "500" }}>
          📈 Visitas Totales: <span style={{ 
            color: "#eab308", // Un dorado más fuerte
            fontWeight: "bold", 
            fontSize: "1.5rem",
            textShadow: "1px 1px 1px rgba(0,0,0,0.1)" 
          }}>{visitas}</span>
        </p>
      </div>
    </div>
  );
}

export default Admin;