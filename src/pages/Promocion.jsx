import React from 'react';
import "../Estilos/Promocion.css";

const promocionesData = [
  {
    id: 1,
    titulo: "Combo Limpieza",
    descripcion: "Lavandina 1L + Detergente + Esponja de regalo",
    precio: 2500,
    imagen: "https://via.placeholder.com/200", // Acá va la ruta de tu imagen
    vence: "Sábado 31/03"
  },
  {
    id: 2,
    titulo: "Set de Mates",
    descripcion: "Mate de madera + Termo acero + Yerba 500g",
    precio: 8500,
    imagen: "https://via.placeholder.com/200",
    vence: "Hasta agotar stock"
  }
];

export default function Promociones() {
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
            <img src={promo.imagen} alt={promo.titulo} className="promo-img" />
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
    </div>
  );
}