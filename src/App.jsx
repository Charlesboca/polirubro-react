import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Carrito from "./pages/Carrito";
import { CarritoProvider } from "./context/CarritoContext";
import "./App.css";

export default function App(){
 return(
  <CarritoProvider>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path="/productos" element={<Productos/>}/>
        <Route path="/carrito" element={<Carrito/>}/>
      </Routes>
    </BrowserRouter>
  </CarritoProvider>
 )
}
