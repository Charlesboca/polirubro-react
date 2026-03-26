import React from 'react';
// Importamos los módulos de Swiper (esto queda igual)
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Importamos los estilos de Swiper (esto queda igual)
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "../Estilos/Carrusel.css"; // <--- IMPORTANTE: Vinculamos el jsx con su CSS

// --- 1. IMPORTAMOS LAS IMÁGENES ---
// Asegurate de que la ruta sea correcta según tu carpeta assets
import imagenBazar from '../Imagenes/banner-bazar.jpg';
import imagenLibreria from '../Imagenes/banner-libreria.jpg';
import imagenRegaleria from '../Imagenes/banner-regaleria.jpg';

const Carrusel = () => {
  return (
    
    <div className="carrusel-contenedor">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation // Flechitas amarillas
        pagination={{ clickable: true }} // Puntitos amarillos
        autoplay={{ delay: 4000 }} // 4 segundos por foto
        loop={true} 
      >
        {/* --- 2. USAMOS LAS IMÁGENES EN CADA SLIDE --- */}
        
        {/* Slide 1: Bazar */}
        <SwiperSlide>
          <div className="slide-image-wrapper">
            <img src={imagenBazar} alt="Ofertas en artículos de Bazar" className="slide-image" />
            {/* Opcional: Podés dejar un texto encima de la imagen */}
            <div className="slide-text-overlay">
              <h2>Todo para tu Hogar</h2>
              <p>Vení a ver la nueva colección de Bazar</p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2: Librería */}
        <SwiperSlide>
          <div className="slide-image-wrapper">
            <img src={imagenLibreria} alt="Útiles escolares y oficina" className="slide-image" />
             <div className="slide-text-overlay">
              <h2>Librería Completa</h2>
              <p>Los mejores precios en útiles y oficina</p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3: Regalería */}
        <SwiperSlide>
          <div className="slide-image-wrapper">
            <img src={imagenRegaleria} alt="Juguetes y regalos" className="slide-image" />
             <div className="slide-text-overlay">
              <h2>Regalos y Juguetes</h2>
              <p>Sorprendé a alguien especial</p>
            </div>
          </div>
        </SwiperSlide>

      </Swiper>
    </div>
  );
};

export default Carrusel;