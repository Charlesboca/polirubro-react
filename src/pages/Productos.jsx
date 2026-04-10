import { useContext } from "react";
import { Link } from "react-router-dom"; 
// 1. Agregamos el .jsx al context
import { CarritoContext } from "../context/CarritoContext.jsx";
import "../Estilos/Productos.css";
import Categorias from "../pages/Categoria.jsx";
import CategoriaFirebase from "./CategoriaFirebase.jsx";

function Productos() {
  const { agregarProducto } = useContext(CarritoContext);

  return (
    <div className="productos-container"> 
    
      {/* Las categorías de la vieja forma o sea subido en git y en el array esta duro eso  */}
      {/* <Categorias /> */}

      {/* Las categorías se traen llamando al componente nuevo que usa firebase  */}
       <CategoriaFirebase /> 



      {/* Contenedor del botón centrado al final */}
      <div className="contenedor-boton-final">
        <Link to="/" className="btn-inicio-estilo">
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}

export default Productos;