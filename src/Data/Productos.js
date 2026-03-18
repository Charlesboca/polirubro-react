// 1. Importá las fotos de los productos (asegurate de que existan en Imagenes)
import pava from "../Imagenes/Stock/pava.jpg";
import cuaderno from "../Imagenes/Stock/cuaderno.jpg";
import detergente from "../Imagenes/Stock/detergente.jpg";

export const productos = [
  {
    id: 1,
    nombre: "Pava Eléctrica",
    precio: "18.500",
    categoria: "BAZAR",
    imagen: pava,
    descripcion: "Acero inoxidable, corte automático.",
    envioGratis: true
  },
  {
    id: 2,
    nombre: "Cuaderno Universitario",
    precio: "3.200",
    categoria: "LIBRERÍA",
    imagen: cuaderno,
    descripcion: "80 hojas rayadas, tapa dura.",
    envioGratis: false
  },
  {
    id: 3,
    nombre: "Detergente Multiuso 5L",
    precio: "4.800",
    categoria: "LIMPIEZA",
    imagen: detergente,
    descripcion: "Ideal para sanitizar superficies.",
    envioGratis: false
  }
];