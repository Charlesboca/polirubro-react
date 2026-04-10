import { useState, useEffect } from "react";
import { agregarProducto } from "../services/firebaseService";
import { db } from "../firebase";
import "../Estilos/Formulario.css";
import "../Estilos/ListaProducto.css";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { capitalizar } from "../utils/format";

function AgregarProducto() {
  // 🔹 FORM
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    categoria: "",
    categoriaNueva: "",
    imagen: "",
    descripcion: ""
  });

  // 🔹 ESTADOS ADICIONALES
  const [imagenFile, setImagenFile] = useState(null);
  const [categorias, setCategorias] = useState([]);
  
  // 🔹 ESTADO PARA EL MODAL (Agregamos nombreProducto)
  const [modal, setModal] = useState({
    show: false,
    mensaje: "",
    tipo: "exito", // "exito" o "error"
    nombreProducto: "" 
  });

  // 🔥 TRAER CATEGORÍAS
  useEffect(() => {
    const obtenerCategorias = async () => {
      const snapshot = await getDocs(collection(db, "categorias"));
      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCategorias(lista);
    };
    obtenerCategorias();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Función para mostrar el modal (ahora acepta el nombre del producto)
  const mostrarModal = (mensaje, tipo = "exito", nombre = "") => {
    setModal({ show: true, mensaje, tipo, nombreProducto: nombre });
  };

  // 🔥 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.precio) {
      mostrarModal("Por favor, completa el nombre y el precio.", "error");
      return;
    }

    try {
      let imageUrl = "";

      // 🔥 1. CLOUDINARY
      if (imagenFile) {
        const formData = new FormData();
        formData.append("file", imagenFile);
        formData.append("upload_preset", "polirubro_upload");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/djl3xx2lo/image/upload",
          { method: "POST", body: formData }
        );
        const data = await res.json();
        imageUrl = data.secure_url;
      }

      // 🔥 2. CATEGORÍA
      let categoriaFinal = form.categoria;
      if (form.categoria === "nueva" && form.categoriaNueva) {
        const nombreIngresado = form.categoriaNueva.trim();
        const nombreNormalizado = nombreIngresado.toLowerCase();
        const docRef = doc(db, "categorias", nombreNormalizado);

        await setDoc(docRef, {
          nombreIngresado,
          nombreNormalizado,
          fechaRegistro: new Date().toLocaleString("es-AR"),
          timestamp: Date.now()
        });
        categoriaFinal = nombreNormalizado;
      }

      // 🔥 3. PRODUCTO
      const productoConFecha = {
        nombre: form.nombre,
        precio: Number(form.precio),
        categoria: categoriaFinal,
        descripcion: form.descripcion,
        imagen: imageUrl,
        fechaRegistro: new Date().toLocaleString("es-AR"),
        timestamp: Date.now()
      };

      await agregarProducto(productoConFecha);

      // ✅ MOSTRAR ÉXITO (Pasamos el nombre antes de limpiar el form)
      mostrarModal("¡Producto agregado con éxito! 🔥", "exito", form.nombre);

      // 🔄 LIMPIAR
      setForm({ nombre: "", precio: "", categoria: "", categoriaNueva: "", imagen: "", descripcion: "" });
      setImagenFile(null);

    } catch (error) {
      console.error("Error:", error);
      mostrarModal("Ocurrió un error al intentar guardar.", "error");
    }
  };

  return (
    <div className="form-container">
      <h2>Agregar Producto al Polirrubro</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <input type="number" name="precio" placeholder="Precio" value={form.precio} onChange={handleChange} required />

        <select name="categoria" value={form.categoria} onChange={handleChange}>
          <option value="">Seleccionar categoría</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.nombreNormalizado}>
              {cat.nombreNormalizado ? capitalizar(cat.nombreNormalizado) : ""}
            </option>
          ))}
          <option value="nueva">+ Nueva categoría</option>
        </select>

        {form.categoria === "nueva" && (
          <input type="text" name="categoriaNueva" placeholder="Nueva categoría" value={form.categoriaNueva} onChange={handleChange} />
        )}

        <input type="file" accept="image/*" onChange={(e) => setImagenFile(e.target.files[0])} required />
        <textarea name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} required />

        <button type="submit" className="btn-guardar">Guardar Producto</button>
      </form>

      {/* 🔹 ESTRUCTURA DEL MODAL DINÁMICO */}
      {modal.show && (
        <div className="modal-overlay">
          <div className={`modal-content ${modal.tipo}`}>
            <div className="modal-body">
              {modal.tipo === "exito" ? (
                <>
                  <span className="mensaje-exito">{modal.mensaje}</span>
                  <div className="producto-confirmado">
                    "{modal.nombreProducto}"
                  </div>
                </>
              ) : (
                <p className="mensaje-error">{modal.mensaje}</p>
              )}
            </div>
            
            <button className="btn-modal" onClick={() => setModal({ ...modal, show: false })}>
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AgregarProducto;