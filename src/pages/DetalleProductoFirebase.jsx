import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import "../Estilos/DetalleProductoFirebase.css";

const DetalleProductoFirebase = () => {
  const { id } = useParams(); // Captura el ID de la URL
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerProducto = async () => {
      const docRef = doc(db, "productos", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProducto({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No existe el producto");
      }
      setLoading(false);
    };

    obtenerProducto();
  }, [id]);

  if (loading) return <p className="loading">Cargando detalle...</p>;
  if (!producto) return <p className="error">Producto no encontrado.</p>;

  return (
    <div className="detalle-container">
      <button className="btn-volver" onClick={() => navigate(-1)}>
        ⬅ Volver
      </button>

      <div className="detalle-card">
        <div className="detalle-img-col">
          <img src={producto.imagen} alt={producto.nombre} />
        </div>
        
        <div className="detalle-info-col">
          <span className="detalle-cat">{producto.categoria}</span>
          <h1 className="titulo-producto">{producto.nombre}</h1>
          <p className="detalle-precio">${producto.precio}</p>
          <p className="detalle-desc">
            {producto.descripcion || "Sin descripción disponible."}
          </p>
          
          <a 
            href={`https://wa.me/5493794069660?text=!Hola%20Polirubro%20Llevate!%20todo%20 Me interesa el producto: ${producto.nombre}`}
            target="_blank"
            rel="noreferrer"
            className="btn-whatsapp-detalle"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default DetalleProductoFirebase;