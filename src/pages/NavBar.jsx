import { Link } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { FaShoppingCart } from "react-icons/fa";
import "../Estilos/Navbar.css";


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