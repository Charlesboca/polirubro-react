import { db, auth } from "../firebase"; // Ajustá la ruta según tu carpeta
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * Función universal para registrar actividad en la base de datos
 * @param {string} accion - Ejemplo: "ALTA", "BAJA", "MODIFICACION"
 * @param {string} detalle - Descripción de lo que pasó
 */
export const registrarLog = async (accion, detalle) => {
  try {
    const usuarioActual = auth.currentUser;
    
    await addDoc(collection(db, "logs"), {
      fecha: serverTimestamp(),
      usuario: usuarioActual ? usuarioActual.email : "Anónimo",
      uid: usuarioActual ? usuarioActual.uid : "N/A",
      accion: accion,
      detalle: detalle
    });
    
    console.log(`Log registrado: ${accion} - ${detalle}`);
  } catch (error) {
    console.error("Error crítico al guardar el log:", error);
  }
};