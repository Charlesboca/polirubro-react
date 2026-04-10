import { db } from "../firebase";
import { collection, addDoc,doc, deleteDoc,updateDoc } from "firebase/firestore";

export const agregarProducto = async (producto) => {
  await addDoc(collection(db, "productos"), producto);
};

export const eliminarProducto = async (id) => {
  try {
    await deleteDoc(doc(db, "productos", id));
    console.log("Producto eliminado");
  } catch (error) {
    console.error("Error al eliminar:", error);
  }
};

export const editarProducto = async (id, datosActualizados) => {
  try {
    const ref = doc(db, "productos", id);
    await updateDoc(ref, datosActualizados);
    console.log("Producto actualizado");
  } catch (error) {
    console.error("Error al editar:", error);
  }
};