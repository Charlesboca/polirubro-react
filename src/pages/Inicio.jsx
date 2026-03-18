import React, { useState, useEffect } from 'react';
import "../Estilos/Mapa.css";
import "../Estilos/Horarios.css";
import Carrusel from "../pages/Carrusel.jsx"; // Asegúrate de que la ruta sea correcta
import Categorias from "../pages/Categoria.jsx"; // Asegúrate de que la ruta sea correcta



export default function Inicio(){

 return(
 <> 
 <h2 style={{textAlign:"center"}}>Bienvenido a la tienda Polirrubro</h2>

{/* 2. LO USAMOS COMO UNA ETIQUETA */}
      <Carrusel />

  
      <section className="texto-pagina">
        <h2>Direccion</h2>
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
