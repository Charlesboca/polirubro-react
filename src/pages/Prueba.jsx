import { agregarProducto } from "../services/firebaseService";

function Prueba() {

  const handleClick = async () => {
    await agregarProducto({
      nombre: "Pava",
      precio: 10000
    });

    alert("Guardado 🔥");
  };

  return (
    <div>
      <h1>Inicio</h1>

      <button onClick={handleClick}>
        Guardar producto
      </button>
      
    </div>
  );
}

export default Prueba;