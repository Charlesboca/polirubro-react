import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      const snapshot = await getDocs(collection(db, "productos"));

      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setProductos(lista);
    };

    obtenerProductos();
  }, []);

  return (
    <div>
      <h2>Productos</h2>

      {productos.map((p) => (
        <div key={p.id}>
          <h3>{p.nombre}</h3>
          <p>${p.precio}</p>
        </div>
      ))}
    </div>
  );
}

export default Productos;