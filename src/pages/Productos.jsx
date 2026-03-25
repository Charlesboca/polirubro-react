import { useContext } from "react";
import { Link } from "react-router-dom"; 
import { CarritoContext } from "../context/CarritoContext";
import "../Estilos/Productos.css";
import Categorias from "../pages/Categoria.jsx";

function Productos() {
  const { agregarProducto } = useContext(CarritoContext);

  return (
    <div className="productos-container"> 
      {/* Las categorías primero */}
      <Categorias />

      {/* Contenedor del botón centrado al final */}
      <div className="contenedor-boton-final">
        <Link to="/" className="btn-inicio-estilo">
          Volver al Inicioo
        </Link>
      </div>
    </div>
  );
}

export default Productos;