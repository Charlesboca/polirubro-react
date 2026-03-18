import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Carrito from "./pages/Carrito";
import Navbar from "./pages/NavBar";
import WhatsAppButton from "./pages/WhatsAppButton";
import Footer from "./pages/Footer";
import { CarritoProvider } from "./context/CarritoContext";
import "./App.css";

export default function App(){
 return(
  <CarritoProvider>
    <BrowserRouter>

        <div className="layout">

      <Header/>
       <div className="nav-container">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path="/productos" element={<Productos/>}/>
        <Route path="/carrito" element={<Carrito/>}/>
      </Routes>
      <WhatsAppButton/>
      <Footer/>
      </div>
    </BrowserRouter>
  </CarritoProvider>
 )
}
