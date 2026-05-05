import React, { useMemo, useEffect, useState } from 'react'; // Agregamos useEffect y useState aquí
import "../Estilos/Mapa.css";
import "../Estilos/Horarios.css";
import "../Estilos/Inicio.css";
import Carrusel from "../pages/Carrusel.jsx";

// --- AGREGAR ESTOS IMPORTS ARRIBA ---
import { db } from "../firebase"; 
import { collection, query, orderBy, limit, getDocs,updateDoc, increment,doc } from "firebase/firestore";
import { Link } from 'react-router-dom';



// 1. IMPORTAMOS EL JSON (Asegurate de que la ruta sea esta)
import productosData from '../Data/Productos.js'; 

export default function Inicio(){

  // 2. LÓGICA PARA SACAR LOS 4 ÚLTIMOS
const [ingresosRecientes, setIngresosRecientes] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const obtenerUltimos = async () => {
    try {
      const q = query(collection(db, "productos"), orderBy("timestamp", "desc"), limit(4));
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setIngresosRecientes(docs);
    } catch (error) {
      console.error("Error novedades:", error);
    } finally {
      setLoading(false);
    }
  };
  obtenerUltimos();
}, []);

useEffect(() => {
    // 1. Preguntamos al navegador si ya tiene la marca
    const yaVisito = sessionStorage.getItem("visitaRegistrada");
    console.log("¿Ya visitó antes?:", yaVisito); // <--- AGREGÁ ESTO

    // 2. Si NO existe la marca (!yaVisito), entramos al bloque
    if (!yaVisito) {
      
      const registrarVisita = async () => {
        console.log("Intentando sumar visita en Firebase..."); // <--- AGREGÁ ESTO
        const docRef = doc(db, "metricas", "visitas");
        try {
          await updateDoc(docRef, { contador: increment(1) });
          
          // 3. IMPORTANTISIMO: Guardamos la marca para la próxima vez
          sessionStorage.setItem("visitaRegistrada", "true");
          
          console.log("Visita contada correctamente");
        } catch (error) {
          console.error("Error:", error);
        }
      };

      // 4. Ejecutamos la función que definimos arriba
      registrarVisita();
    }
  }, []);


  return(
    <> 

<h1 className="titulo-principal">
  Bienvenido a la tienda Polirrubro Llevate Todo 
  <span className="sr-only"> en Corrientes Capital. Encontrá bazar, electrónica y mucho más con los mejores precios.</span>
</h1>

<section className="novedades-section" data-nosnippet>

  <h2 className="titulo-home">LO ÚLTIMO QUE INGRESÓ</h2>
  
  {loading ? (
    <p className="cargando">Cargando novedades...</p>
  ) : (
    <div className="productos-grid-home">
      {ingresosRecientes.map(prod => (
        <div key={prod.id} className="producto-card-home">
          <div className="img-container">
            <img src={prod.imagen} alt={prod.nombre} />
          </div>
          <div className="info-home">
            <span className="categoria-tag-home">{prod.categoria?.toUpperCase()}</span>
            <h3>{prod.nombre?.toUpperCase()}</h3>
            <p className="precio-home">${prod.precio}</p>
            <Link to={`/producto/${prod.id}`} className="btn-ver-mas-home">
              Ver Producto
            </Link>
          </div>
        </div>
      ))}
    </div>
  )}

  <div className="ver-todos-container">
    <Link to="/productos" className="btn-ver-todo">VER TODO EL CATÁLOGO</Link>
  </div>
</section>
       
      <div>

      {/*<ProductoFirebase />  👈 ACA se muestra */}
      
    </div>

      


     
     

      <section className="texto-pagina">
        <h2>Dirección</h2>
        <p className="direccion">
          📍 Av. Regimiento Cazadores Correntinos 4457, Corrientes Capital
        </p>

        <div className="botones-mapa">
          <a href="https://www.google.com/maps/dir/?api=1&destination=Av.+Regimiento+Cazadores+Correntinos+4457,+W3400+Corrientes" target="_blank" rel="noopener noreferrer" className="btn-mapa-secundario">
            Cómo llegar
          </a>
        </div>
      </section>

      <div className="map-screen">
        <div className="map-wrapper">
          <iframe
            src= "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.4130202610077!2d-58.80121832553252!3d-27.48752781746426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94456ba71e411b2d%3A0x55a84ac82a2097e!2sAv.%20Regimiento%20Cazadores%20Correntinos%204457%2C%20W3400%20Corrientes!5e0!3m2!1ses!2sar!4v1773864358995!5m2!1ses!2sar"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Ubicación Polirrubro"
          />
        </div>
      </div>

      <section className="horarios-section">
        <div className="horarios-card">
          <h2 className="horarios-titulo">🕒 Horarios de Atención</h2>
          <div className="horarios-grid">
            <div className="horario-item">
              <span>Lunes a Sábado</span>
              <span className="hora">09:00 - 13:00 | 17:00 - 21:00</span>
            </div>
            <div className="horario-item">
              <span>Domingos</span>
              <span className="hora">Cerrado</span>
            </div>
          </div>
        </div>
      </section>

     


    </>
  );
}