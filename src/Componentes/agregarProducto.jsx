import { useState } from "react";
import { agregarProducto } from "../services/firebaseService";
import "../Estilos/Formulario.css";

function AgregarProducto() {
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    categoria: "",
    imagen: "",
    descripcion: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validamos que los campos básicos no estén vacíos
    if (!form.nombre || !form.precio) {
      alert("Por favor, completa el nombre y el precio.");
      return;
    }

    // 2. Creamos el objeto final sumando la FECHA y HORA
    const productoConFecha = {
      ...form,
      precio: Number(form.precio), // Convertimos a número
      fechaRegistro: new Date().toLocaleString("es-AR"), // "31/3/2026, 16:45:00"
      timestamp: Date.now() // Útil para ordenar por "más nuevos" después
    };

    try {
      // 3. Mandamos el objeto completo a tu servicio de Firebase
      await agregarProducto(productoConFecha);

      alert("Producto agregado 🔥");

      // 4. Limpiamos el formulario
      setForm({
        nombre: "",
        precio: "",
        categoria: "",
        imagen: "",
        descripcion: ""
      });
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Hubo un error al guardar en la base de datos.");
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
          placeholder="Precio (ej: 1500)"
          value={form.precio}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="categoria"
          placeholder="Categoría (Bazar, Librería...)"
          value={form.categoria}
          onChange={handleChange}
        />

        <input
          type="text"
          name="imagen"
          placeholder="URL de la imagen"
          value={form.imagen}
          onChange={handleChange}
        />

        <textarea
          name="descripcion"
          placeholder="Breve descripción"
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