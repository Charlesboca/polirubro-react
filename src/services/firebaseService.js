import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export const agregarProducto = async (producto) => {
  await addDoc(collection(db, "productos"), producto);
};