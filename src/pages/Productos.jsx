import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import "../Estilos/Productos.css";
import Categorias from "../pages/Categoria.jsx"; // Asegúrate de que la ruta sea correcta


const data=[
 {id:1,nombre:"Auriculares",precio:5000},
 {id:2,nombre:"Mouse",precio:3000},
 {id:3,nombre:"Teclado",precio:7000}
];

function Productos(){
 const {agregarProducto}=useContext(CarritoContext);

 return(

  <> 
{/* 2. ACÁ USAMOS LAS CATEGORÍAS */}
      <Categorias />

  <div className="grid">
   {data.map(p=>(
    <div className="card" key={p.id}>
      <h3>{p.nombre}</h3>
      <p>${p.precio}</p>
      <button onClick={()=>agregarProducto(p)}>Agregar</button>
    </div>
   ))}
  </div>

 </>

 )
}

export default Productos