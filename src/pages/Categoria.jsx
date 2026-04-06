import React, { useState } from 'react';
import "../Estilos/Categorias.css"; 


import { productos } from "../Data/Productos.js"; 
import { Link } from 'react-router-dom'; // <--- IMPORTANTE: Importamos Link

import logoNegro from "../Imagenes/logo_polirrubro_1.jpg"; 

const categorias = [
  { id: 1, nombre: 'BAZAR', imagen: logoNegro, desc: 'Todo para tu hogar' },
  { id: 2, nombre: 'ELECTRONICA', imagen: logoNegro, desc: 'Artículos Electrónicos' },
  { id: 3, nombre: 'REGALERÍA', imagen: logoNegro, desc: 'Regalos y detalles' },
  { id: 4, nombre: 'TEXTIL', imagen: logoNegro, desc: 'Ropa de cama y mantas' },
  { id: 5, nombre: 'HERRAMIENTAS', imagen: logoNegro, desc: 'Herramientas y accesorios' },
  { id: 6, nombre: 'OCIO', imagen: logoNegro, desc: 'Juguetes y detalles' }


];

const Categorias = () => {
  const [seleccionada, setSeleccionada] = useState(null);

  const productosFiltrados = productos.filter(p => p.categoria === seleccionada);

  return ( 
    <section className="categorias-section">
      <h2 className="section-title">
        {seleccionada ? `Productos de ${seleccionada}` : "Nuestras Categorías"}
      </h2>

      {seleccionada && (
        <div className="contenedor-volver">
          <button className="btn-volver" onClick={() => setSeleccionada(null)}>
            ⬅ Volver a Categorías
          </button>
        </div>
      )}

      <div className="categorias-grid">
        {!seleccionada ? (
          categorias.map(cat => (
            <div key={cat.id} className="categoria-card">
              <div className="card-image-container">
                <img src={cat.imagen} alt={cat.nombre} className="card-img" /> 
              </div>
              <div className="card-info">
                <h3>{cat.nombre}</h3>
                <p>{cat.desc}</p>
                <button 
                  className="btn-ver-mas" 
                  onClick={() => setSeleccionada(cat.nombre)}
                >
                  Ver {cat.nombre}
                </button>
              </div>
            </div>
          ))
        ) : (
          productosFiltrados.map(prod => {
            return (
              <div key={prod.id} className="producto-card">
                <div className="card-image-container">
                   {prod.envioGratis && <span className="badge-envio">Envío Gratis</span>}
                   <img src={prod.imagen} alt={prod.nombre} className="card-img" />
                </div>
                <div className="card-info">
                  <h3>{prod.nombre}</h3>
                  <p className="precio-tag">${prod.precio}</p>
                  
                  {/* QUITAMOS LA DESCRIPCIÓN DE ACÁ PARA QUE QUEDE LIMPIO */}
                  
                  {/* ESTE BOTÓN LLEVA A LA PÁGINA NUEVA */}
                  <Link to={`/producto/${prod.id}`} className="btn-ver-detalle">
                    Ver más detalles
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
      
      {seleccionada && productosFiltrados.length === 0 && (
        <p className="msj-vacio">Próximamente cargaremos productos en este rubro...</p>
      )}
    </section>
  );
};

export default Categorias;