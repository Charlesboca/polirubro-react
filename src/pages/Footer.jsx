import React from 'react';
import { useNavigate, useLocation } from "react-router-dom"; // Agregamos useLocation
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import "../Estilos/Footer.css";
import logoNegro from "../Imagenes/logo_polirrubro.jpg"; 

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Detectamos la ubicación actual

  // Función idéntica a la del Header para mantener la coherencia
  const manejarClicLogo = () => {
    if (location.pathname === "/") {
      // Si ya está en inicio, sube suavemente
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Si está en otra página, navega al inicio
      navigate("/");
    }
  };

  const socialLinks = [
    { id: 1, platform: "Instagram", url: "https://www.instagram.com/lleva_tetodo99", color: "#E4405F" },
    { 
      id: 2, 
      platform: "WhatsApp", 
      url: "https://api.whatsapp.com/send?phone=5493795337995&text=!Hola%20Polirubro%20Tutu!%20Quisiera%20consultarles%20sobre...", 
      color: "#25D366" 
    }
  ];

  return (
    <footer className="main-footer">
      <div className="footer-layout">
        
        <div className="footer-left">
          {/* Vinculamos la nueva función al contenedor del logo */}
          <div onClick={manejarClicLogo} className="footer-logo-container" style={{ cursor: 'pointer' }}>
            <img src={logoNegro} alt="Logo Polirrubro" className="footer-logo" />
          </div>
        </div>

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
            <p>Desarrollado por <b>XXXXXXXX</b></p> 
            <p className="footer-copy">
              &copy; {new Date().getFullYear()} - Todos los derechos reservados
            </p>
          </div>
        </div>

        <div className="footer-right-spacer"></div>
      </div>
    </footer>
  );
};

export default Footer;