import React, { useState } from 'react'; // 1. IMPORTAMOS useState
import { Link } from "react-router-dom"; 

import "../Estilos/Promocion.css";

// --- IMPORTAMOS LAS IMÁGENES (tus rutas originales) ---
import imagenBazar from '../Imagenes/promo_limpieza.jpg';
import promo_set_mate from '../Imagenes/promo_set_mate.jpg';

const promocionesData = [
  {
    id: 1,
    titulo: "Combo Limpieza",
    descripcion: "Lavandina 1L + Detergente + Esponja de regalo",
    precio: 2500,
    imagen: imagenBazar, // Ruta original
    vence: "Sábado 31/03"
  },
  {
    id: 2,
    titulo: "Set de Mates",
    descripcion: "Mate de madera + Termo acero + Yerba 500g",
    precio: 8500,
    imagen: promo_set_mate, // Ruta original
    vence: "Hasta agotar stock"
  }
];

export default function Promociones() {
  // 2. CREAMOS EL ESTADO PARA LA IMAGEN AMPLIADA (arranca en null)
  const [imagenExpandida, setImagenExpandida] = useState(null);

  const mensajeWhatsApp = (promo) => {
    const texto = `Hola! Me interesa la promo: ${promo.titulo} a $${promo.precio}`;
    return `https://api.whatsapp.com/send?phone=5493795337995&text=${encodeURIComponent(texto)}`;
  };

  return (
    <div className="promociones-container">
      <h2 className="titulo-seccion">🔥 Ofertas de la Semana</h2>
      <div className="promos-grid">
        {promocionesData.map((promo) => (
          <div key={promo.id} className="promo-card">
            <div className="promo-badge">¡OFERTA!</div>
            
            {/* 3. MODIFICAMOS LA IMAGEN PARA QUE RESPONDA AL CLIC */}
            <img 
              src={promo.imagen} 
              alt={promo.titulo} 
              className="promo-img" 
              onClick={() => setImagenExpandida(promo.imagen)} // Setea la imagen de ESTA promo
              style={{ cursor: 'zoom-in' }} // Cambia el cursor para avisar que se puede agrandar
            />
            
            <h3>{promo.titulo}</h3>
            <p>{promo.descripcion}</p>
            <span className="promo-vence">Vence: {promo.vence}</span>
            <div className="promo-precio">${promo.precio}</div>
            <a 
              href={mensajeWhatsApp(promo)}
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-pedir-promo"
            >
              Pedir Promo
            </a>
          </div>
        ))}
      </div>

      {/* 4. AGREGAMOS EL MODAL (solo se muestra si imagenExpandida no es null) */}
      {imagenExpandida && (
        <div className="modal-overlay" onClick={() => setImagenExpandida(null)}>
          <div className="modal-content">
            <span className="cerrar-modal">&times;</span>
            <img src={imagenExpandida} alt="Producto ampliado" />
          </div>
        </div>
      )}


  {/* Contenedor del botón centrado al final */}
      <div className="contenedor-boton-final">
        <Link to="/" className="btn-inicio-estilo">
          Volver al Inicio
        </Link>
      </div>


    </div>
  );
}