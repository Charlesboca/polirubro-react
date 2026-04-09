import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { eliminarProducto, editarProducto } from "../services/firebaseService"; // Import simplificado

import "../Estilos/ListaProducto.css";

function ListaProductos() {
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [formEdit, setFormEdit] = useState({
    nombre: "",
    precio: "",
    categoria: "",
    descripcion: ""
  });

  // ✅ 1. Moví esta función aquí para que sea accesible por el Modal
  const handleChangeEdit = (e) => {
    setFormEdit({
      ...formEdit,
      [e.target.name]: e.target.value
    });
  };

  const obtenerProductos = async () => {
    try {
      const snapshot = await getDocs(collection(db, "productos"));
      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProductos(lista);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  const guardarCambios = async () => {
    try {
      await editarProducto(productoEditando.id, {
        ...formEdit,
        precio: Number(formEdit.precio)
      });
      alert("Producto actualizado ✏️");
      setProductoEditando(null);
      obtenerProductos();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  useEffect(() => {
    if (productoEditando) {
      setFormEdit({
        nombre: productoEditando.nombre || "",
        precio: productoEditando.precio || "",
        categoria: productoEditando.categoria || "",
        descripcion: productoEditando.descripcion || ""
      });
    }
  }, [productoEditando]);

  const handleEliminar = async (id, nombre) => {
    const confirmar = confirm(`⚠️ Vas a eliminar "${nombre}". ¿Continuar?`);
    if (!confirmar) return;
    try {
      await eliminarProducto(id);
      obtenerProductos();
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Error al eliminar el producto");
    }
  };

  return (
    <> {/* ✅ Agregamos Fragment para envolver todo */}
      <div className="lp-container">
        <h2 className="lp-titulo">📦 Listado y Edicion de Productos</h2>
        <div className="lp-lista">
          {productos.map((prod) => (
            <div key={prod.id} className="lp-card">
              {prod.imagen && (
                <img src={prod.imagen} alt={prod.nombre} className="lp-img" />
              )}
              <h3 className="lp-nombre">{prod.nombre}</h3>
              <p className="lp-precio">
                ${Number(prod.precio).toLocaleString("es-AR")}
              </p>
              {prod.categoria && <p className="lp-categoria">{prod.categoria}</p>}
              
              <button className="lp-btn-eliminar" onClick={() => handleEliminar(prod.id, prod.nombre)}>
                Eliminar
              </button>
              <button className="lp-btn-editar" onClick={() => setProductoEditando(prod)}>
                Editar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ El Modal ahora está dentro del Fragment */}
      {productoEditando && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Editar producto</h3>
            <input type="text" name="nombre" value={formEdit.nombre} onChange={handleChangeEdit} />
            <input type="number" name="precio" value={formEdit.precio} onChange={handleChangeEdit} />
            <input type="text" name="categoria" value={formEdit.categoria} onChange={handleChangeEdit} />
            <textarea name="descripcion" value={formEdit.descripcion} onChange={handleChangeEdit} />
            
            <div className="modal-botones">
              <button onClick={guardarCambios} className="btn-confirmar">Guardar</button>
              <button onClick={() => setProductoEditando(null)} className="btn-cancelar">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ListaProductos;