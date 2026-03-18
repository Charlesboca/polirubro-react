import { createContext, useState } from "react";

export const CarritoContext = createContext();

export function CarritoProvider({children}){
 const [carrito,setCarrito]=useState([]);

 const agregarProducto=(prod)=>{
  const existe = carrito.find(p=>p.id===prod.id);
  if(existe){
    setCarrito(carrito.map(p=>p.id===prod.id ? {...p,cantidad:p.cantidad+1}:p))
  }else{
    setCarrito([...carrito,{...prod,cantidad:1}])
  }
 }

 const eliminarProducto=(id)=>{
  setCarrito(carrito.filter(p=>p.id!==id))
 }

 const total = carrito.reduce((acc,p)=>acc + p.precio*p.cantidad,0)

 return(
  <CarritoContext.Provider value={{carrito,agregarProducto,eliminarProducto,total}}>
    {children}
  </CarritoContext.Provider>
 )
}
