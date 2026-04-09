import React, { useMemo } from 'react';
import "../Estilos/Mapa.css";
import "../Estilos/Horarios.css";
import "../Estilos/Inicio.css";
import Carrusel from "../pages/Carrusel.jsx";

import ProductoFirebase from "./ProductoFirebaseBasica.jsx";
import CategoriaFirebase from './CategoriaFirebase.jsx';
import AgregarProducto from "../Componentes/agregarProducto.jsx";

// 1. IMPORTAMOS EL JSON (Asegurate de que la ruta sea esta)
import productosData from '../Data/Productos.js'; 

export default function Inicio(){

  // 2. LÓGICA PARA SACAR LOS 4 ÚLTIMOS
  const ingresosRecientes = useMemo(() => {
    return [...productosData]
      .sort((a, b) => b.id - a.id) // Ordena de mayor a menor por ID
      .slice(0, 4);                // Toma los primeros 4
  }, []);

  return(
    <> 

       
       {/*  <Carrusel /> */}

     

      <div>

      {/*<ProductoFirebase />  👈 ACA se muestra */}
      
    </div>


      <h1 className="titulo-principal">
        Bienvenido a la tienda Polirrubro Llevate Todo.
      </h1>


      <div className="inicio-container">
        {/* SECCIÓN DE INGRESOS */}
        <section className="novedades-section">
          <div className="novedades-header">
            <h2 className="titulo-seccion">NUEVOS INGRESOS 📦</h2>
          </div>

          <div className="novedades-grid">
            {ingresosRecientes.map((prod) => (
              <div key={prod.id} className="card-novedad">
                <span className="tag-nuevo">NUEVO</span>
                <div className="img-container">
                  {/* Si tus imágenes están en public/img/ usá la ruta normal */}
                  <img src={prod.imagen} alt={prod.nombre} />
                </div>
                <div className="card-body">
                  <span className="cat-label">{prod.categoria}</span>
                  <h3>{prod.nombre}</h3>
                  <p className="precio">${prod.precio.toLocaleString('es-AR')}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
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