import { useState, useEffect } from "react";
import { agregarProducto } from "../services/firebaseService";
import { db } from "../firebase";
import "../Estilos/Formulario.css";
import "../Estilos/eliminarProducto.css";
import { collection, query, where, getDocs, addDoc ,doc, setDoc } from "firebase/firestore";

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

  // 🔹 IMAGEN
  const [imagenFile, setImagenFile] = useState(null);

  // 🔹 CATEGORIAS
  const [categorias, setCategorias] = useState([]);
  

  // 🔥 TRAER CATEGORÍAS DESDE FIRESTORE
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

  // 🔹 HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.precio) {
      alert("Por favor, completa el nombre y el precio.");
      return;
    }

    try {
      let imageUrl = "";

      // 🔥 1. SUBIR IMAGEN A CLOUDINARY
      if (imagenFile) {
        const formData = new FormData();
        formData.append("file", imagenFile);
        formData.append("upload_preset", "polirubro_upload");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/djl3xx2lo/image/upload",
          {
            method: "POST",
            body: formData
          }
        );

        const data = await res.json();
        imageUrl = data.secure_url;
      }

   // 🔥 2. MANEJO DE CATEGORÍA
          let categoriaFinal = form.categoria;
          let categoriaId = "";

          if (form.categoria === "nueva" && form.categoriaNueva) {

            categoriaFinal = form.categoriaNueva.trim();
            const nombreNormalizado = categoriaFinal.toLowerCase();

            // 🔥 ID único (evita duplicados SIEMPRE)
            const docRef = doc(db, "categorias", nombreNormalizado);
            
          
            let categoriaId = "";

            let categoriaIdIngresada  = "";


            await setDoc(docRef, {
              categoriaIdIngresada: categoriaFinal,
              nombreNormalizado: nombreNormalizado,
              fechaRegistro: new Date().toLocaleString("es-AR"),
             timestamp: Date.now()

            });

            categoriaId = nombreNormalizado;

          } else {
            // 🔥 si eligió una existente
            const catEncontrada = categorias.find(
              (cat) => cat.nombre === form.categoria
            );

            if (catEncontrada) {
              categoriaId = catEncontrada.id;
            }
          }

      // 🔥 3. CREAR PRODUCTO
          const productoConFecha = {
            nombre: form.nombre,
            precio: Number(form.precio),
            categoria: categoriaFinal,
            categoriaId: categoriaId, // 🔥 NUEVO (MUY IMPORTANTE)
            descripcion: form.descripcion,
            imagen: imageUrl,
            fechaRegistro: new Date().toLocaleString("es-AR"),
            timestamp: Date.now()
          };
      await agregarProducto(productoConFecha);

      alert("Producto agregado 🔥");

      // 🔄 LIMPIAR
      setForm({
        nombre: "",
        precio: "",
        categoria: "",
        categoriaNueva: "",
        imagen: "",
        descripcion: ""
      });

      setImagenFile(null);

    } catch (error) {
      console.error("Error:", error);
      alert("Error al guardar");
    }
  };

  return (
    <div className="form-container">
      <h2>Agregar Producto al Polirrubro</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre del producto"
          value={form.nombre}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          required
        />

        {/* 🔥 SELECT CATEGORÍAS */}
        <select
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
        >
          <option value="">Seleccionar categoría</option>

          {categorias.map((cat) => (
            <option key={cat.id} value={cat.nombreNormalizado}>
              {cat.nombreNormalizado}
            </option>
          ))}

          <option value="nueva">+ Nueva categoría</option>
        </select>

        {/* 🔥 INPUT NUEVA CATEGORÍA */}
        {form.categoria === "nueva" && (
          <input
            type="text"
            name="categoriaNueva"
            placeholder="Nueva categoría"
            value={form.categoriaNueva}
            onChange={handleChange}
          />
        )}

        {/* 🔥 IMAGEN */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagenFile(e.target.files[0])}
        />

        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
        />

        <button type="submit" className="btn-guardar">
          Guardar Producto
        </button>

      </form>
    </div>
  );
}

export default AgregarProducto;