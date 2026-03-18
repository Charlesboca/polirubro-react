import { Link } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { FaShoppingCart } from "react-icons/fa";
import "./Header.css";

export default function Header(){
 const {carrito}=useContext(CarritoContext);

 return(
  <header className="header">
    <h1>Tienda</h1>
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/productos">Productos</Link>
      <Link to="/carrito">
        <FaShoppingCart/> ({carrito.length})
      </Link>
    </nav>
  </header>
 )
}
