import { useState, useEffect } from "react";
import { agregarProducto } from "../services/firebaseService";
import { db } from "../firebase";
import { getAuth } from "firebase/auth"; 
import "../Estilos/Formulario.css";
import "../Estilos/ListaProducto.css";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { capitalizar } from "../utils/format";

function AgregarProducto() {
  const auth = getAuth(); 

  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    categoria: "",
    categoriaNueva: "",
    descripcion: ""
  });

  const [imagenFile, setImagenFile] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [modalAviso, setModalAviso] = useState({ show: false, mensaje: "" });
  
  // 🔹 NUEVO ESTADO: Para controlar el spinner y bloquear el botón
  const [cargando, setCargando] = useState(false);

  const [modal, setModal] = useState({
    show: false,
    mensaje: "",
    tipo: "exito",
    nombreProducto: "" 
  });

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

  const mostrarModal = (mensaje, tipo = "exito", nombre = "") => {
    setModal({ show: true, mensaje, tipo, nombreProducto: nombre });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usuarioActivo = auth.currentUser;

    // Validaciones iniciales
    if (!form.nombre || !form.precio || !form.categoria) {
      setModalAviso({ show: true, mensaje: "⚠️ Por favor, completa nombre, precio y categoría." });
      return;
    }

    if (form.categoria === "nueva" && !form.categoriaNueva.trim()) {
      setModalAviso({ show: true, mensaje: "⚠️ Escribí el nombre de la nueva categoría." });
      return;
    }

    // 🕒 PASO A: ACTIVAR SPINNER
    // Encendemos el estado de carga para avisar al usuario y bloquear el botón.
    setCargando(true);

    try {
      let imageUrl = "";

      // ☁️ PASO B: SUBIDA A CLOUDINARY
      if (imagenFile) {
        const formData = new FormData();
        formData.append("file", imagenFile);
        formData.append("upload_preset", "polirubro_upload");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/djl3xx2lo/image/upload",
          { method: "POST", body: formData }
        );

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(`Error en Cloudinary: ${errorData.error?.message || "Fallo en la subida"}`);
        }

        const data = await res.json();
        imageUrl = data.secure_url;
      }

      // 📂 PASO C: GESTIÓN DE CATEGORÍA
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

      // 📦 PASO D: ARMAR OBJETO Y GUARDAR EN FIREBASE
      const productoConFecha = {
        nombre: form.nombre,
        precio: Number(form.precio),
        categoria: categoriaFinal,
        descripcion: form.descripcion,
        imagen: imageUrl,
        fechaRegistro: new Date().toLocaleString("es-AR"),
        timestamp: Date.now(),
        creadoPor: {
          email: usuarioActivo ? usuarioActivo.email : "anonimo",
          nombre: usuarioActivo?.displayName || "Admin"
        }
      };

      await agregarProducto(productoConFecha);

      // ✅ PASO E: ÉXITO Y LIMPIEZA
      mostrarModal("¡Producto agregado con éxito! 🔥", "exito", form.nombre);
      setForm({ nombre: "", precio: "", categoria: "", categoriaNueva: "", imagen: "", descripcion: "" });
      setImagenFile(null);

    } catch (error) {
      console.error("Error capturado:", error);
      let mensajeAMostrar = "❌ Error inesperado al guardar.";

      if (error.code === 'permission-denied' || error.message.includes('permissions')) {
        mensajeAMostrar = "🚫 Acceso Denegado: Tu usuario no tiene permisos.";
      } 
      else if (error.message.includes("Cloudinary")) {
        mensajeAMostrar = `⚠️ Problema con la imagen: ${error.message.split(":")[1] || error.message}`;
      }

      setModalAviso({ show: true, mensaje: mensajeAMostrar });
    } finally {
      // 🕒 PASO F: APAGAR SPINNER
      // Pase lo que pase (éxito o error), liberamos el botón para que pueda volver a usarse.
      setCargando(false);
    }
  };

  return (
    <>  
      <div className="form-container">
        <h2>Agregar Producto al Polirrubro</h2>

        <form onSubmit={handleSubmit}>
          <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
          <input type="number" name="precio" placeholder="Precio" value={form.precio} onChange={handleChange} required />

          <select name="categoria" value={form.categoria} onChange={handleChange} required>
            <option value="">Seleccionar categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.nombreNormalizado}>
                {cat.nombreNormalizado ? capitalizar(cat.nombreNormalizado) : ""}
              </option>
            ))}
            <option value="nueva">+ Nueva categoría</option>
          </select>

          {form.categoria === "nueva" && (
            <input type="text" name="categoriaNueva" placeholder="Escribí la nueva categoría" value={form.categoriaNueva} onChange={handleChange} required />
          )}

          <div className="file-input-group">
            <label>Imagen:</label>
            <input type="file" accept="image/*" onChange={(e) => setImagenFile(e.target.files[0])} required />
          </div>
          
          <textarea name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} required />

          {/* 🔘 BOTÓN CON SPINNER DINÁMICO */}
          {/* Usamos 'disabled={cargando}' para que no se pueda enviar dos veces mientras procesa */}
          <button type="submit" className="btn-guardar" disabled={cargando}>
            {cargando ? (
              <span className="spinner-mini"></span> // Si está cargando, mostramos el giro
            ) : (
              "Guardar Producto" // Si no, el texto normal
            )}
          </button>
        </form>

        {modal.show && (
          <div className="modal-overlay">
            <div className={`modal-content ${modal.tipo}`}>
              <div className="modal-body">
                {modal.tipo === "exito" ? (
                  <>
                    <span className="mensaje-exito">{modal.mensaje}</span>
                    <div className="producto-confirmado">"{modal.nombreProducto}"</div>
                  </>
                ) : (
                  <p className="mensaje-error">{modal.mensaje}</p>
                )}
              </div>
              <button className="btn-modal" onClick={() => setModal({ ...modal, show: false })}>Aceptar</button>
            </div>
          </div>
        )}
      </div>

      {modalAviso.show && (
        <div className="modal-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', zIndex: 1000 }}>
          <div className="modal-content" style={{ borderRadius: "15px", padding: "30px", maxWidth: "400px", background: "#1e1e1e", textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
            <div style={{ fontSize: "50px", marginBottom: "15px" }}>
              {modalAviso.mensaje.includes("🚫") ? "🚫" : "⚠️"}
            </div>
            <h3 style={{ color: "#ff4444", margin: "0 0 10px" }}>Atención</h3>
            <p style={{ color: "#ccc", fontSize: "15px" }}>
              {modalAviso.mensaje.includes(":") ? modalAviso.mensaje.split(":")[1].trim() : modalAviso.mensaje}
            </p>
            <button 
              onClick={() => setModalAviso({ show: false, mensaje: "" })} 
              style={{ background: "linear-gradient(45deg, #facc15, #eab308)", border: "none", padding: "12px 30px", borderRadius: "8px", cursor: "pointer", width: "100%", fontWeight: "bold", marginTop: "20px" }}
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AgregarProducto;