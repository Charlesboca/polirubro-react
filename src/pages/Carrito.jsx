import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";

export default function Carrito(){
 const {carrito,eliminarProducto,total}=useContext(CarritoContext);

 return(
  <div style={{padding:"20px"}}>
   <h2>Carrito</h2>
   {carrito.map(p=>(
    <div key={p.id}>
      {p.nombre} x{p.cantidad} - ${p.precio*p.cantidad}
      <button onClick={()=>eliminarProducto(p.id)}>X</button>
    </div>
   ))}
   <h3>Total: ${total}</h3>
  </div>
 )
}
