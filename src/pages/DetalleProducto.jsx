// src/pages/DetalleProducto.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productos from '../Data/Productos.js'; // Traemos tu lista
import '../Estilos/DetalleProducto.css';

export default function DetalleProducto() {
  const { id } = useParams(); // Agarramos el ID de la URL
  const navigate = useNavigate();

  // Buscamos el producto que coincida con ese ID
  const producto = productos.find((p) => p.id === parseInt(id));

  if (!producto) {
    return <h2 style={{color: "white", textAlign: "center"}}>Producto no encontrado</h2>;
  }

  return (
    <div className="detalle-container">
      <button className="btn-volver" onClick={() => navigate(-1)}>← Volver</button>
      
      <div className="detalle-flex">
        <div className="detalle-img">
          <img src={producto.imagen} alt={producto.nombre} />
        </div>

        <div className="detalle-info">
          <span className="detalle-cat">{producto.categoria}</span>
          <h1>{producto.nombre}</h1>
          <p className="detalle-desc">{producto.descripcion}</p>
          <p className="detalle-precio">${producto.precio}</p>
          
          {producto.envioGratis && (
            <span className="detalle-envio">🚚 Envío Gratis en Corrientes Capital</span>
          )}

          <a 
            href={`https://wa.me/TU_NUMERO?text=Hola! Me interesa el producto: ${producto.nombre}`}
            target="_blank"
            rel="noreferrer"
            className="btn-whatsapp"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}