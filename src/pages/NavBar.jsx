import { Link } from "react-router-dom";
import { useContext } from "react";
// 1. Agregamos el .jsx al context
import { CarritoContext } from "../context/CarritoContext.jsx";
import { FaShoppingCart } from "react-icons/fa";
import "../Estilos/NavBar.css";


function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Inicio</Link>
      <Link to="/productos">Productos</Link>
{/*       <Link to="/carrito">Carrito</Link>
 */}    </nav>
  );
}

export default Navbar;