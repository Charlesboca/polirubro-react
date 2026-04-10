import { useState, useEffect } from "react";
import { agregarProducto } from "../services/firebaseService";
import { db } from "../firebase";
import { getAuth } from "firebase/auth"; // 🔹 Importamos Auth
import "../Estilos/Formulario.css";
import "../Estilos/ListaProducto.css";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { capitalizar } from "../utils/format";
import { registrarLog } from "../utils/registrarLog"; // 🔹 Importamos la función de logs

function AgregarProducto() {
  const auth = getAuth(); // 🔹 Inicializamos Auth

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
  const [modalAviso, setModalAviso] = useState({ show: false, mensaje: "" });
  
  // 🔹 ESTADO PARA EL MODAL
  const [modal, setModal] = useState({
    show: false,
    mensaje: "",
    tipo: "exito",
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

  const mostrarModal = (mensaje, tipo = "exito", nombre = "") => {
    setModal({ show: true, mensaje, tipo, nombreProducto: nombre });
  };

  // 🔥 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔹 Capturamos al usuario logueado justo antes de enviar
    const usuarioActivo = auth.currentUser;

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

      // 🔥 3. PRODUCTO (Con datos del usuario)
      const productoConFecha = {
        nombre: form.nombre,
        precio: Number(form.precio),
        categoria: categoriaFinal,
        descripcion: form.descripcion,
        imagen: imageUrl,
        fechaRegistro: new Date().toLocaleString("es-AR"),
        timestamp: Date.now(),
        // 🔹 Aquí sumamos la información del creador
        creadoPor: {
          email: usuarioActivo ? usuarioActivo.email : "anonimo",
          nombre: usuarioActivo?.displayName || "Admin"
        }
      };

    // 1. Guardamos el nombre en una constante fija
      const nombreParaLog = form.nombre;

     // 2. Guardamos el producto
      await agregarProducto(productoConFecha);

    // TODO: Activar auditoría cuando sea necesario
    /// 3. Registramos el log con esa constante
     /// await registrarLog("ALTA", `Producto agregado: ${nombreParaLog}`);

    // 4. Recién ahora mostramos el modal y limpiamos el formulario, para asegurarnos que el mensaje tenga el nombre correcto y no se pierda por un cambio de estado rápido.
      mostrarModal("¡Producto agregado con éxito! 🔥", "exito", form.nombre);
      setForm({ nombre: "", precio: "", categoria: "", categoriaNueva: "", imagen: "", descripcion: "" });
      setImagenFile(null);

    } catch (error) {
      console.error("Error:", error);
      // 🔹 Verificamos si el error es por falta de permisos
      if (error.code === 'permission-denied' || error.message.includes('permissions')) {
          setModalAviso({ 
            show: true, 
            mensaje: "🚫 Acceso Denegado: Tu usuario no tiene permisos para modificar productos." 
          });
        } else {
    setModalAviso({ show: true, mensaje: "❌ Error inesperado al guardar." });
  }
}
    
  };

  return (

    <>  
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


{/* ✅ MODAL DE AVISO / ERROR CON ESTILO */}
{modalAviso.show && (
  <div className="modal-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
    <div className="modal-content" style={{ 
      border: "none", 
      borderRadius: "15px", 
      padding: "30px",
      maxWidth: "400px",
      background: "#1e1e1e", // Fondo oscuro sólido
      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
      textAlign: "center" 
    }}>
      {/* Icono de Alerta */}
      <div style={{ 
        fontSize: "50px", 
        marginBottom: "15px",
        background: "rgba(255, 68, 68, 0.1)",
        width: "80px",
        height: "80px",
        lineHeight: "80px",
        borderRadius: "50%",
        margin: "0 auto 20px"
      }}>
        🚫
      </div>

      <h3 style={{ color: "#ff4444", fontSize: "22px", margin: "0 0 10px" }}>
        Acceso Denegado
      </h3>
      
      <p style={{ color: "#ccc", fontSize: "15px", lineHeight: "1.5", marginBottom: "25px" }}>
        {modalAviso.mensaje.split(":")[1] || modalAviso.mensaje}
      </p>
      
      <button 
        onClick={() => setModalAviso({ show: false, mensaje: "" })} 
        style={{ 
          background: "linear-gradient(45deg, #facc15, #eab308)", 
          color: "#000", 
          fontWeight: "bold", 
          border: "none",
          padding: "12px 30px",
          borderRadius: "8px",
          cursor: "pointer",
          width: "100%",
          fontSize: "16px",
          transition: "transform 0.2s"
        }}
        onMouseEnter={(e) => e.target.style.transform = "scale(1.03)"}
        onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
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