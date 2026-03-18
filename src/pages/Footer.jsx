import React from 'react';
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import "../Estilos/Footer.css";

import logoNegro from "../Imagenes/logo_polirrubro.jpg"; // <--- Importá tu imagen acá


const Footer = () => {
  const socialLinks = [
    { id: 1, platform: "Instagram", url: "https://www.instagram.com/lleva_tetodo99", color: "#E4405F" },
    { 
      id: 2, 
      platform: "WhatsApp", 
      url: "https://api.whatsapp.com/send?phone=5493794019159&text=Hola%20del%20Polirrubro!", 
      color: "#25D366" 
    }
  ];

  return (
    <footer className="main-footer">
      {/* Nuevo contenedor para organizar izquierda y centro */}
      <div className="footer-layout">
        
        {/* LADO IZQUIERDO: La imagen */}
        <div className="footer-left">
          <img src={logoNegro} alt="Logo Polirrubro" className="footer-logo" />
        </div>

        {/* CENTRO: Todo lo que ya tenías */}
        <div className="footer-container">
          <div className="footer-title">CONTACTANOS</div>

          <div className="footer-social-group">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                style={{ color: link.color }}
              >
                {link.platform === "Instagram" ? <FaInstagram size={40} /> : <FaWhatsapp size={40} />}
              </a>
            ))}
          </div>

          <div className="footer-separator"></div>

          <div className="footer-credits"> 
            <p>Desarrollado por <b>Carlos Avalos</b></p> 
            <p className="footer-copy">
              &copy; {new Date().getFullYear()} - Todos los derechos reservados
            </p>
          </div>
        </div>

        {/* ESPACIO DERECHO: Para equilibrar el logo de la izquierda y que el centro sea real */}
        <div className="footer-right-spacer"></div>

      </div>
    </footer>
  );
};

export default Footer;