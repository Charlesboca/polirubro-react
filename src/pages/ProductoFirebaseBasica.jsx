import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import "../Estilos/ProductoFirebaseBasica.css"; // Crearemos este archivo

function ProductoFirebaseBasica() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const snapshot = await getDocs(collection(db, "productos"));
        const lista = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProductos(lista);
      } catch (error) {
        console.error("Error al traer productos:", error);
      }
    };
    obtenerProductos();
  }, []);

 // ... (imports y lógica de useEffect iguales)

  return (
    <div className="catalogo-dark-container">
      <h2 className="catalogo-titulo-dark">Nuestros Productos Simple conexion de Firebase Sin agrupar nada</h2>

      <div className="productos-grid">
        {productos.map((p) => (
          <div key={p.id} className="producto-card-dark">
            <div className="producto-img-container">
              <img 
                src={p.imagen || "https://via.placeholder.com/150"} 
                alt={p.nombre} 
                className="producto-img"
              />
            </div>

            <div className="producto-info-dark">
              <span className="producto-cat-dark">{p.categoria || "General"}</span>
              <h3 className="producto-nombre-dark">{p.nombre}</h3>
              <p className="producto-precio-dark">${Number(p.precio).toLocaleString("es-AR")}</p>
              
              <button className="btn-comprar-dark">
                Consultar por WhatsApp
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductoFirebaseBasica;