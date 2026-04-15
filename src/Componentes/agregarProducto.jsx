import { useState, useEffect, useRef } from "react"; // 👈 Agregamos useRef
import { agregarProducto } from "../services/firebaseService";
import { db } from "../firebase";
import { getAuth } from "firebase/auth"; 
import "../Estilos/Formulario.css";
import "../Estilos/ListaProducto.css";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { capitalizar } from "../utils/format";

function AgregarProducto({ alAgregar }) {
  const auth = getAuth(); 
  const fileInputRef = useRef(null); // 👈 Referencia para el input de imagen

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
  const [cargando, setCargando] = useState(false);

  // 🔹 TU MODAL DE ÉXITO ORIGINAL
  const [modal, setModal] = useState({
    show: false,
    mensaje: "",
    tipo: "exito",
    nombreProducto: "" 
  });

  useEffect(() => {
    const obtenerCategorias = async () => {
      const snapshot = await getDocs(collection(db, "categorias"));
      const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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

    if (!form.nombre || !form.precio || !form.categoria) {
      setModalAviso({ show: true, mensaje: "⚠️ Por favor, completa nombre, precio y categoría." });
      return;
    }

    setCargando(true);

    try {
      let imageUrl = "";
      if (imagenFile) {
        const formData = new FormData();
        formData.append("file", imagenFile);
        formData.append("upload_preset", "polirubro_upload");
        const res = await fetch("https://api.cloudinary.com/v1_1/djl3xx2lo/image/upload", { method: "POST", body: formData });
        const data = await res.json();
        imageUrl = data.secure_url;
      }

      let categoriaFinal = form.categoria;
      if (form.categoria === "nueva" && form.categoriaNueva) {
        const nombreIngresado = form.categoriaNueva.trim();
        const nombreNormalizado = nombreIngresado.toLowerCase();
        await setDoc(doc(db, "categorias", nombreNormalizado), {
          nombreIngresado, nombreNormalizado, fechaRegistro: new Date().toLocaleString("es-AR"), timestamp: Date.now()
        });
        categoriaFinal = nombreNormalizado;
      }

      const productoConFecha = {
        nombre: form.nombre,
        precio: Number(form.precio),
        categoria: categoriaFinal,
        descripcion: form.descripcion,
        imagen: imageUrl,
        fechaRegistro: new Date().toLocaleString("es-AR"),
        timestamp: Date.now(),
        creadoPor: { email: usuarioActivo?.email || "anonimo", nombre: usuarioActivo?.displayName || "Admin" }
      };

      await agregarProducto(productoConFecha);

      // 🔄 Dispara el refresco en la lista
      if (alAgregar) alAgregar();

      // ✅ ÉXITO Y LIMPIEZA TOTAL
      mostrarModal("¡Producto agregado con éxito! 🔥", "exito", form.nombre);
      
      // Limpiamos estados
      setForm({ nombre: "", precio: "", categoria: "", categoriaNueva: "", descripcion: "" });
      setImagenFile(null);

      // 🧹 LIMPIEZA FÍSICA DEL INPUT (Para que no quede el nombre del archivo viejo)
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    } catch (error) {
      setModalAviso({ show: true, mensaje: "❌ Error al guardar." });
    } finally {
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
              <option key={cat.id} value={cat.nombreNormalizado}>{capitalizar(cat.nombreNormalizado)}</option>
            ))}
            <option value="nueva">+ Nueva categoría</option>
          </select>

          {form.categoria === "nueva" && (
            <input type="text" name="categoriaNueva" placeholder="Escribí la nueva categoría" value={form.categoriaNueva} onChange={handleChange} required />
          )}

          <div className="file-input-group">
            <label>Imagen:</label>
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} // 👈 Conectamos la referencia aquí
              onChange={(e) => setImagenFile(e.target.files[0])} 
              required 
            />
          </div>

          <textarea name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} required />
          
          <button type="submit" className="btn-guardar" disabled={cargando}>
            {cargando ? <span className="spinner-mini"></span> : "Guardar Producto"}
          </button>
        </form>

        {/* ✅ TU MODAL DE ÉXITO ORIGINAL */}
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

        {/* Modal de Aviso */}
        {modalAviso.show && (
           <div className="modal-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', zIndex: 1000 }}>
             <div className="modal-content" style={{ borderRadius: "15px", padding: "30px", maxWidth: "400px", background: "#1e1e1e", textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
               <h3 style={{ color: "#ff4444", margin: "0 0 10px" }}>Atención</h3>
               <p style={{ color: "#ccc" }}>{modalAviso.mensaje}</p>
               <button onClick={() => setModalAviso({ show: false, mensaje: "" })} className="btn-guardar" style={{ marginTop: "20px" }}>Entendido</button>
             </div>
           </div>
        )}
      </div>
    </>
  );
}

export default AgregarProducto;