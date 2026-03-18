import { Link } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { FaShoppingCart } from "react-icons/fa";
import logo from "../Imagenes/logo_polirrubro.jpg";
import "../Estilos/Header.css";


 function Header() {
  const { carrito } = useContext(CarritoContext);

  return (
    <header className="header">

      <img src={logo} alt="logo" className="logo-img" />

      {/* <Link to="/carrito" className="carrito-header">
        <FaShoppingCart />
        <span>({carrito.length})</span>
      </Link> */}

    </header>
  );
}
export default  Header ;
