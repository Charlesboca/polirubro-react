import React from 'react';
import "../Estilos/Categorias.css"; 

import logoNegro from "../Imagenes/logo_polirrubro.jpg"; // <--- Importá tu imagen acá


// 1. Definimos las categorías (Podés cambiar las rutas de las imágenes aquí)
const categorias = [
  { id: 1, nombre: 'BAZAR', imagen: logoNegro, desc: 'Todo para tu hogar' },
  { id: 2, nombre: 'LIBRERÍA', imagen: 'ruta-libros.jpg', desc: 'Útiles y oficina' },
  { id: 3, nombre: 'LIMPIEZA', imagen: 'ruta-limp.jpg', desc: 'Artículos sueltos y marcas' },
  { id: 4, nombre: 'REGALERÍA', imagen: 'ruta-regalo.jpg', desc: 'Juguetes y detalles' },
];

const Categorias = () => {
  // Tu número de contacto
  const telefono = "5493794019159";

  return ( 
    <section className="categorias-section">
      <h2 className="section-title">Nuestras Categorías</h2>
      <div className="categorias-grid">
        {categorias.map(cat => {
          // Creamos el mensaje personalizado para cada categoría
          const mensaje = `Hola! Vi la web del Polirrubro y quería consultar por artículos de ${cat.nombre}`;
          const urlWhatsapp = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

          return (
            <div key={cat.id} className="categoria-card">
              {/* Contenedor de imagen (o placeholder) */}
              <div className="card-image-container">
                {/* Cuando tengas las fotos, cambiá el div de abajo por:  */}
                    <img src={cat.imagen} alt={cat.nombre} className="card-img" /> 
               

               {/*  <div 
                className="card-image-placeholder">📸
                </div> 
 */}
              </div>

              <div className="card-info">
                <h3>{cat.nombre}</h3>
                <p>{cat.desc}</p>
                
                {/* Botón convertido en Link de WhatsApp */}
                <a 
                  href={urlWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ver-mas"
                  style={{ textDecoration: 'none', display: 'inline-block' }}
                >
                  Consultar {cat.nombre}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Categorias;