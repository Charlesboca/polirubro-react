// 1. Importá las fotos de los productos (asegurate de que existan en Imagenes)
import cafetera from "../Imagenes/Stock/01-cafetera-llevate-todo.jpg";
import caloventor from "../Imagenes/Stock/02-caloventor-llevate-todo.jpg";
import cocina from "../Imagenes/Stock/03-cocina-llevate.todo.jpg";
import escurre from "../Imagenes/Stock/04-escurre-plato-llevate-todo.jpg";
import focoCamara from "../Imagenes/Stock/05-foco-camara-llevate-todo.jpg";
import jarraVidrio from "../Imagenes/Stock/06-jarra-vidrio-llevate-todo.jpg";
import juego27 from "../Imagenes/Stock/07-juego-herramientas-27-piezas-llevate-todo.jpg";
import sabanaAmericano from "../Imagenes/Stock/08-juego-sabana-americano-500.jpg";
import yenga from "../Imagenes/Stock/09-juego-yenga-llevate-todo.jpg";
import mantaAcanalada from "../Imagenes/Stock/10-manta-acanalada-llevate-todo.jpg";
import panquequera from "../Imagenes/Stock/11-panquequera-llevate-todo.jpg";
import camara180 from "../Imagenes/Stock/12-camara-digital-180-llevate-todo.jpg";
import glucometro from "../Imagenes/Stock/13-glucometro-llevate-todo.jpg";
import SacaCorcho from "../Imagenes/Stock/14-sacacorcho-llevate-todo.jpg";







export const productos = [
  {
    id: 1,
    nombre: "Cafetera",
    precio: "28.000",
    categoria: "BAZAR",
    imagen: cafetera,
    descripcion: "VT-103S Capacidad para entre 2 y 6 tazas de café, diseño compacto tamaño reducido la hace perfecta para espacios pequeños, ideal para el hogar o la oficina. Cuenta con una jarra de vidrio resistente al calor con capacidad de 600 ml, lo que equivale a aproximadamente 6 tazas de café. Además, tiene una función de apagado automático para mayor seguridad y eficiencia energética.",
    envioGratis: true
  },
  {
    id: 2,
    nombre: "Caloventor",
    precio: "17.000",
    categoria: "ELECTRONICA",
    imagen: caloventor,
    descripcion: "Disfrutá de un ambiente cálido y confortable en tu hogar u oficina con el caloventor eléctrico Vestax. Su diseño compacto y portátil permite trasladarlo fácilmente a cualquier ambiente, mientras que su termostato regulable te ayuda a mantener la temperatura ideal. Con una potencia de 1500W, este caloventor es capaz de calentar rápidamente cualquier espacio, brindándote el confort que necesitas durante los días fríos. Además, su función de oscilación distribuye el calor de manera uniforme, asegurando que cada rincón de la habitación se mantenga cálido y acogedor.",
    envioGratis: false
  },
  {
    id: 3,
    nombre: "Cocina",
    precio: "200.000",
    categoria: "BAZAR",
    imagen: cocina,
    descripcion: `Con las cocinas Atlas 4 Hornallas, disfrutá de la combinación perfecta entre funcionalidad y estilo. Su diseño moderno y elegante se adapta a cualquier cocina, mientras que su rendimiento excepcional te permite cocinar tus platos favoritos con facilidad. Con cuatro hornallas de diferentes tamaños, podrás preparar múltiples platillos al mismo tiempo, ahorrando tiempo y esfuerzo en la cocina. Además, su encendido electrónico garantiza una chispa rápida y segura, brindándote la confianza que necesitas para cocinar sin preocupaciones. Ya sea que estés preparando una cena para tu familia o experimentando con nuevas recetas, las cocinas Atlas 4 Hornallas son tu mejor aliado en la cocina.`, 
  envioGratis: false
  },
   {  
    id: 4,
    nombre: "Escurre plato",
    precio: "18.500",
    categoria: "BAZAR",
    imagen: escurre,
    descripcion: "escurridor de platos de dos niveles de la marca Utilux, diseñado en acero inoxidable con una estructura reforzada .",
    envioGratis: false
  }
  ,
   {
    id: 5,
    nombre: "Foco Camara",
    precio: "13.500",
    categoria: "ELECTRONICA",
    imagen: focoCamara,
    descripcion: "Vision nocturna Gira 360 Monitoreo desde tu celular desde donde estes. Fácil instalación.Indispensable tener wifi",
    envioGratis: false
  },
   {
    id: 6,
    nombre: "Jarra Vidrio",
    precio: "30.000",
    categoria: "BAZAR",
    imagen: jarraVidrio,
    descripcion: "Capacidad: 2.0 litros. Potencia: 1500W para un rápido hervido. Seguridad: Cuenta con apagado automático y protección contra ebullición en seco. Diseño: Base giratoria de 360 grados e iluminación LED. Material: Jarra de vidrio resistente al calor con filtro antical incluido. Ideal para preparar infusiones, té y café de manera rápida y segura.",
    envioGratis: true
  } ,
  {
    id: 7,
    nombre: "juego de herramientas 27 piezas",
    precio: "10.000",
    categoria: "HERRAMIENTAS",
    imagen: juego27,
    descripcion: "Contenido: Incluye varios tubos intercambiables, una llave de fuerza (o mango) y extensiones en un estuche de transporte. Función: Diseñado para apretar o aflojar tuercas y pernos hexagonales de distintos tamaños.  Medidas: Contiene herramientas con encastres de 1/2 Pulgada y 1/4 Pulgada para trabajar con diferentes pares de apriete.  Material: Fabricado en acero de alta calidad para garantizar durabilidad y resistencia. Uso: Ideal para tareas de mantenimiento, reparación y bricolaje en el hogar o taller.",
    envioGratis: true
  },
  {
    id: 8,
    nombre: "Sabana Americana",
    precio: "18.000",
    categoria: "TEXTIL",
    imagen: sabanaAmericano,
    descripcion: "Características: Diseñadas para colchones de hasta 40 cm de alto y etiquetadas con alta cuenta de hilos. Material: Confeccionadas en algodón con tecnología de resistencia al encogimiento.",
    envioGratis: false
  },
  {
    id: 9,
    nombre: "Yenga",
    precio: "10.000",
    categoria: "OCIO",
    imagen: yenga,
    descripcion: "Juego de mesa clásico que consiste en apilar bloques de madera y retirarlos sin derribar la torre. Ideal para todas las edades, fomenta la concentración, la destreza manual y la diversión en familia o con amigos.",
    envioGratis: false
  },
   {
    id: 10,
    nombre: "Manta Acanalada",
    precio: "17.000",
    categoria: "TEXTIL",
    imagen: mantaAcanalada,
    descripcion: " Manta acanalada lisa con ovejero en su interior, ideal para mantener el calor durante las noches frías. Con un diseño elegante y suave al tacto, esta manta es perfecta para usar en la cama o como una capa adicional de abrigo en el sofá. Su tamaño queen (dos plazas y media) la hace ideal para compartir con tu pareja o para disfrutar de una noche de descanso en solitario. Además, su tejido acanalado le da un toque de estilo y sofisticación a cualquier habitación.Tamaño Queen (dos plazas y media)",
    envioGratis: true
  }
  ,{
    id: 11,
    nombre: "Panquequera",
    precio: "20.000",
    categoria: "ELECTRONICA",
    imagen: panquequera,
    descripcion: "Panquequera eléctrica de Llevate Todo es la herramienta perfecta para preparar deliciosos panqueques de manera rápida y sencilla. Con su diseño compacto y fácil de usar, esta panquequera te permite cocinar panqueques perfectos en cuestión de minutos. Su superficie antiadherente garantiza que los panqueques se cocinen de manera uniforme y se despeguen fácilmente, mientras que su control de temperatura ajustable te permite obtener el nivel de cocción deseado. Ya sea para un desayuno especial o una merienda deliciosa, la panquequera eléctrica de Llevate Todo es tu aliada ideal en la cocina.",
    envioGratis: true
  },
  {
    id: 12,
    nombre: "Cámara Digital 180",
    precio: "42.000",
    categoria: "ELECTRONICA",
    imagen: camara180,
    descripcion: "Cámara digital de 180 megapíxeles de Llevate Todo es la herramienta perfecta para capturar momentos especiales con calidad profesional. Con su diseño compacto y fácil de usar, esta cámara te permite tomar fotos y videos de alta calidad en cualquier lugar. Su sensor avanzado garantiza imágenes nítidas y detalladas, mientras que su sistema de enfoque automático te permite obtener fotos perfectas en todos los escenarios. Ya sea para un desayuno especial o una merienda deliciosa, la cámara digital de Llevate Todo es tu aliada ideal en la cocina.",
    envioGratis: true
  } ,
  {
    id: 13,
    nombre: "Glugometro",
    precio: "19.000",
    categoria: "ELECTRONICA",
    imagen: glucometro,
    descripcion: "Glugómetro de Llevate Todo es la herramienta perfecta para medir el nivel de glucosa en sangre de manera rápida y precisa. Con su diseño compacto y fácil de usar, este glugómetro te permite monitorear tus niveles de glucosa en cualquier momento y lugar. Su tecnología avanzada garantiza resultados confiables, mientras que su pantalla clara y fácil de leer te permite interpretar tus resultados con facilidad. Ya sea para un desayuno especial o una merienda deliciosa, el glugómetro de Llevate Todo es tu aliado ideal en la cocina.",
    envioGratis: true
  }
  ,
  {
    id: 14,
    nombre: "Saca Corcho",
    precio: "11.500",
    categoria: "ELECTRONICA",
    imagen: SacaCorcho,
    descripcion: "Saca corcho de Llevate Todo es la herramienta perfecta para sacar corchos de manera rápida y sencilla. Con su diseño compacto y fácil de usar, este saca corcho te permite abrir botellas con facilidad en cualquier momento y lugar. Su tecnología avanzada garantiza resultados confiables, mientras que su pantalla clara y fácil de leer te permite interpretar tus resultados con facilidad. Ya sea para un desayuno especial o una merienda deliciosa, el saca corcho de Llevate Todo es tu aliado ideal en la cocina.",
    envioGratis: true
  }
];

export default productos; // ESTA LÍNEA ES LA QUE TE FALTA