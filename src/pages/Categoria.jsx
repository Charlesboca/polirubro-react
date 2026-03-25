import React, { useState } from 'react'; // <--- Importamos useState
import "../Estilos/Categorias.css"; 
import { productos } from "../Data/Productos.js"; // <--- Importamos tus productos locales

import logoNegro from "../Imagenes/logo_polirrubro_1.jpg"; 

const categorias = [
  { id: 1, nombre: 'BAZAR', imagen: logoNegro, desc: 'Todo para tu hogar' },
  { id: 2, nombre: 'LIBRERÍA', imagen: logoNegro, desc: 'Útiles y oficina' },
  { id: 3, nombre: 'LIMPIEZA', imagen: logoNegro, desc: 'Artículos sueltos y marcas' },
  { id: 4, nombre: 'REGALERÍA', imagen: logoNegro, desc: 'Juguetes y detalles' },
];

const Categorias = () => {
  const telefono = "5493794019159";
  
  // ESTADO: null significa "viendo categorías", un nombre (ej: 'BAZAR') significa "viendo productos"
  const [seleccionada, setSeleccionada] = useState(null);

  // Filtramos los productos según lo que el usuario clickeó
  const productosFiltrados = productos.filter(p => p.categoria === seleccionada);

  return ( 
    <section className="categorias-section">
      <h2 className="section-title">
        {seleccionada ? `Productos de ${seleccionada}` : "Nuestras Categorías"}
      </h2>

      {/* BAJAMOS EL BOTÓN ACÁ: Debajo del título */}
  {seleccionada && (
    <div className="contenedor-volver">
      <button className="btn-volver" onClick={() => setSeleccionada(null)}>
        ⬅ Volver a Categorías
      </button>
    </div>
      )}

      <div className="categorias-grid">
        
        {/* LÓGICA: Si NO hay seleccionada, mostramos categorías */}
        {!seleccionada ? (
          categorias.map(cat => (
            <div key={cat.id} className="categoria-card">
              <div className="card-image-container">
                <img src={cat.imagen} alt={cat.nombre} className="card-img" /> 
              </div>
              <div className="card-info">
                <h3>{cat.nombre}</h3>
                <p>{cat.desc}</p>
                {/* Cambiamos el link por un botón que "elige" la categoría */}
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
          /* LÓGICA: Si HAY seleccionada, mostramos los productos de ese rubro */
          productosFiltrados.map(prod => {
            const msjProd = `Hola! Quería consultar por el producto: ${prod.nombre}`;
            const urlProd = `https://wa.me/${telefono}?text=${encodeURIComponent(msjProd)}`;
            
            return (
              <div key={prod.id} className="producto-card">
                <div className="card-image-container">
                   {prod.envioGratis && <span className="badge-envio">Envío Gratis</span>}
                   <img src={prod.imagen} alt={prod.nombre} className="card-img" />
                </div>
                <div className="card-info">
                  <h3>{prod.nombre}</h3>
                  <p className="precio-tag">${prod.precio}</p>
                  <p>{prod.descripcion}</p>
                  <a href={urlProd} target="_blank" rel="noopener noreferrer" className="btn-comprar">
                    Consultar WhatsApp
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
      
      {/* Mensaje por si no hay productos cargados en esa categoría */}
      {seleccionada && productosFiltrados.length === 0 && (
        <p>Próximamente cargaremos productos en este rubro...</p>
      )}
    </section>
  );
};

export default Categorias;