import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// Agregamos .jsx a todas las importaciones de componentes
import Header from "./pages/Header.jsx";
import Inicio from "./pages/Inicio.jsx";
import Productos from "./pages/Productos.jsx";
import DetalleProducto from './pages/DetalleProducto'; // El componente que vamos a crear
import Carrito from "./pages/Carrito.jsx";
import Navbar from "./pages/NavBar.jsx";
import WhatsAppButton from "./pages/WhatsAppButton.jsx";
import Footer from "./pages/Footer.jsx";
import Promociones from "./pages/Promocion.jsx";
import NotFound from "./pages/NotFound.jsx"; // Página para rutas no encontradas  `
import { CarritoProvider } from "./context/CarritoContext.jsx";
import "./App.css";

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
        <ScrollToTop />
           <Header />
          <div className="nav-container">
            <Navbar />
          </div>
        <div className="layout">
       
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/producto/:id" element={<DetalleProducto />} />
            <Route path="/carrito" element={<Carrito />} />
{/*             <Route path="/promociones" element={<Promociones />} />
 */}
        {/* Ruta para capturar cualquier otra ruta */}
                <Route path="*" element={<NotFound />} />


          </Routes>
          <WhatsAppButton />
         
        </div>
        <Footer />
      </BrowserRouter>
    </CarritoProvider>
  );
}