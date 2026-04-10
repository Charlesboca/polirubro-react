import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// Agregamos .jsx a todas las importaciones de componentes
import Header from "./pages/Header.jsx";
import Inicio from "./pages/Inicio.jsx";
import Productos from "./pages/Productos.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import RutaProtegida from "./pages/RutaProtegida.jsx";

import DetalleProducto from './pages/DetalleProducto.jsx'; 

import DetalleProductoFirebase from './pages/DetalleProductoFirebase.jsx'; 

// Tus componentes
import CategoriaFirebase from "./pages/CategoriaFirebase.jsx"; // Componente para mostrar categorías desde Firebase

import Login from "./pages/login.jsx"; // Página de login


import Carrito from "./pages/Carrito.jsx";
import Navbar from "./pages/NavBar.jsx";
import WhatsAppButton from "./pages/WhatsAppButton.jsx";
import Footer from "./pages/Footer.jsx";
import Promociones from "./pages/Promocion.jsx";
import NotFound from "./pages/NotFound.jsx"; // Página para rutas no encontradas  `
import { CarritoProvider } from "./context/CarritoContext.jsx";
import Admin from "./pages/Admin.jsx";

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
    <AuthProvider>
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

  {/* este anda a la vieja forma  */}
  {/*  <Route path="/producto/:id" element={<DetalleProducto />} />*/}        

          {/* este anda usando firebase  */}  
          <Route path="/producto/:id" element={<DetalleProductoFirebase />} />



            <Route path="/carrito" element={<Carrito />} />
{/*         <Route path="/promociones" element={<Promociones />} />*/}  

         {/*   <Route path="/admin" element={<Admin />} /> */}



         {/* 🚀 ESTA ES LA RUTA QUE TE FALTABA AGREGAR */}
              <Route path="/login" element={<Login />} />

<Route 
		  path="/admin" 
		 element={
		  
		  <RutaProtegida>
                <Admin />
              </RutaProtegida>
		  
		  }
 />
 
        

 
        {/* Ruta para capturar cualquier otra ruta */}
                <Route path="*" element={<NotFound />} />


          </Routes>
          <WhatsAppButton />
         
        </div>
        <Footer />
      </BrowserRouter>
    </CarritoProvider>
    </AuthProvider>
  );
}