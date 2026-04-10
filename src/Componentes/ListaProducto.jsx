import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { eliminarProducto, editarProducto } from "../services/firebaseService";

import "../Estilos/ListaProducto.css";
import "../Estilos/Formulario.css"; // Reutilizamos estilos de modales

function ListaProductos() {
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [formEdit, setFormEdit] = useState({
    nombre: "",
    precio: "",
    categoria: "",
    descripcion: ""
  });

  // 🔹 NUEVOS ESTADOS PARA EL MODAL DE ELIMINAR
  const [modalEliminar, setModalEliminar] = useState({
    show: false,
    id: null,
    nombre: ""
  });

  const handleChangeEdit = (e) => {
    setFormEdit({ ...formEdit, [e.target.name]: e.target.value });
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

  // 🔹 1. Esta función ahora solo ABRE el modal
  const abrirModalEliminar = (id, nombre) => {
    setModalEliminar({ show: true, id, nombre });
  };

  // 🔹 2. Esta función es la que ejecuta la eliminación REAL
  const confirmarEliminacion = async () => {
    try {
      await eliminarProducto(modalEliminar.id);
      setModalEliminar({ show: false, id: null, nombre: "" }); // Cerramos modal
      obtenerProductos(); // Recargamos lista
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  return (
    <>
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
              
              <div className="lp-card-botones">
                {/* 🔹 Cambiamos la llamada a abrir el modal */}
                <button className="lp-btn-eliminar" onClick={() => abrirModalEliminar(prod.id, prod.nombre)}>
                  Eliminar
                </button>
                <button className="lp-btn-editar" onClick={() => setProductoEditando(prod)}>
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ MODAL DE EDICIÓN (El que ya tenías) */}
      {productoEditando && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Editar producto</h3>
            <input type="text" name="nombre" value={formEdit.nombre} onChange={handleChangeEdit} />
            <input type="number" name="precio" value={formEdit.precio} onChange={handleChangeEdit} />
      {/* 🔹 CAMBIO AQUÍ: Mostramos la categoría pero quitamos el input editable */}
            <label>Categoría:</label>
            <div className="categoria-readonly">
              {formEdit.categoria.toUpperCase()}
            </div>   
           <textarea name="descripcion" value={formEdit.descripcion} onChange={handleChangeEdit} />
            
            <div className="modal-botones">
              <button onClick={guardarCambios} className="btn-confirmar">Guardar</button>
              <button onClick={() => setProductoEditando(null)} className="btn-cancelar">Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ NUEVO MODAL DE ELIMINACIÓN (Confirmación) */}
      {modalEliminar.show && (
        <div className="modal-overlay">
          <div className="modal-content error"> {/* Usamos la clase error para el borde rojo */}
            <h3 style={{ color: "#ff4444" }}>⚠️ ¿Estás seguro?</h3>
            <p style={{ color: "white", margin: "20px 0" }}>
              Vas a eliminar <strong style={{ color: "#facc15" }}>"{modalEliminar.nombre}"</strong>. 
              Esta acción no se puede deshacer.
            </p>
            
            <div className="modal-botones" style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <button onClick={confirmarEliminacion} className="lp-btn-eliminar" style={{ padding: "10px 20px" }}>
                Sí, Eliminar
              </button>
              <button onClick={() => setModalEliminar({ show: false, id: null, nombre: "" })} className="btn-modal" style={{ background: "#555", color: "white" }}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ListaProductos;