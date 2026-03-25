import { useEffect } from "react"; // 1. Importamos useEffect
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./pages/Header";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Carrito from "./pages/Carrito";
import Navbar from "./pages/NavBar";
import WhatsAppButton from "./pages/WhatsAppButton";
import Footer from "./pages/Footer";
import { CarritoProvider } from "./context/CarritoContext";
import "./App.css";

// 2. Definimos el componente que resetea el scroll
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <CarritoProvider>
      <BrowserRouter>
        {/* 3. Lo colocamos dentro del Router para que escuche los cambios de ruta */}
        <ScrollToTop />
        
        <div className="layout">
          <Header />
          <div className="nav-container">
            <Navbar />
          </div>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/carrito" element={<Carrito />} />
          </Routes>
          <WhatsAppButton />
          <Footer />
        </div>
      </BrowserRouter>
    </CarritoProvider>
  );
}