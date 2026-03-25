import { useNavigate, useLocation } from "react-router-dom"; // Agregamos useLocation
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { FaShoppingCart } from "react-icons/fa";
import logo from "../Imagenes/logo_polirrubro_1.jpg";
import "../Estilos/Header.css";

function Header() {
  const { carrito } = useContext(CarritoContext);
  const navigate = useNavigate();
  const location = useLocation(); // Esto nos dice en qué página estamos

  const manejarClicLogo = () => {
    if (location.pathname === "/") {
      // Si ya estás en el inicio, scrolleá hacia arriba suavemente
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Si estás en otra página, navegá al inicio
      navigate("/");
    }
  };

  return (
    <header className="header">
      <img 
        src={logo} 
        alt="logo" 
        className="logo-img" 
        onClick={manejarClicLogo} // Usamos la nueva función
      />

      {/* Carrito (opcional) */}
      {/* <div className="carrito-header" onClick={() => navigate("/carrito")} style={{cursor: 'pointer'}}>
        <FaShoppingCart />
        <span>({carrito.length})</span>
      </div> */}
    </header>
  );
}

export default Header;