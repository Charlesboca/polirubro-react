import React, { useState, useEffect } from 'react';
import "../Estilos/CategoriaFirebase.css";
import { Link } from 'react-router-dom';
import { db } from "../firebase"; 
import { collection, getDocs, query, where, limit, startAfter } from "firebase/firestore";
import { capitalizar } from "../utils/format";
import logoNegro from "../Imagenes/logo_polirrubro_1.jpg"; 

const CategoriaFirebase = () => {
  const [seleccionada, setSeleccionada] = useState(null);
  const [productosBD, setProductosBD] = useState([]); 
  const [categoriasBD, setCategoriasBD] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [hayMas, setHayMas] = useState(true);

  // 🔍 ESTADOS PARA BÚSQUEDA GLOBAL
  const [busqueda, setBusqueda] = useState("");
  const [todosLosProductos, setTodosLosProductos] = useState([]);

  // 🔥 TRAER CATEGORÍAS (Limpio, sin cache)
  useEffect(() => {
    const obtenerCategorias = async () => {
      setLoading(true);
      try {
        const catSnapshot = await getDocs(collection(db, "categorias"));
        const listaCats = catSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCategoriasBD(listaCats);
      } catch (error) {
        console.error("Error al traer categorías:", error);
      }
      setLoading(false);
    };

    obtenerCategorias();
  }, []);

  // 🔥 TRAER TODOS LOS PRODUCTOS PARA LA BÚSQUEDA
  useEffect(() => {
    if (busqueda.length > 0 && todosLosProductos.length === 0) {
      const traerTodoParaBuscar = async () => {
        try {
          const snapshot = await getDocs(collection(db, "productos"));
          const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setTodosLosProductos(docs);
        } catch (error) {
          console.error("Error en búsqueda global:", error);
        }
      };
      traerTodoParaBuscar();
    }
  }, [busqueda, todosLosProductos.length]);

  // 🔥 TRAER PRODUCTOS POR CATEGORÍA
  useEffect(() => {
    if (!seleccionada) return;

    const obtenerProductos = async () => {
      setLoading(true);
      try {
        setProductosBD([]);
        setLastDoc(null);
        const q = query(
          collection(db, "productos"),
          where("categoria", "==", seleccionada),
          limit(6)
        );
        const snapshot = await getDocs(q);
        const lista = snapshot.docs.map(doc => ({
          id: doc.id, ...doc.data()
        }));
        setProductosBD(lista);
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
        setHayMas(snapshot.docs.length === 6);
      } catch (error) {
        console.error("Error al traer productos:", error);
      }
      setLoading(false);
    };

    obtenerProductos();
  }, [seleccionada]);

  const cargarMas = async () => {
    if (!lastDoc) return;
    setLoading(true);
    try {
      const q = query(
        collection(db, "productos"),
        where("categoria", "==", seleccionada),
        startAfter(lastDoc),
        limit(6)
      );
      const snapshot = await getDocs(q);
      const nuevos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProductosBD(prev => [...prev, ...nuevos]);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      setHayMas(snapshot.docs.length === 6);
    } catch (error) {
      console.error("Error al traer más productos:", error);
    }
    setLoading(false);
  };

  // 🔍 FILTRADO GLOBAL
  const resultadosBusqueda = todosLosProductos.filter(prod => 
    prod.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const mostrarResultadosGlobales = busqueda.length > 0;

  return ( 
    <section className="categorias-section">

      <div className="buscador-global-container">
        <input 
          type="text" 
          placeholder="Buscar en toda la tienda..." 
          className="input-buscador-global"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <h2 className="section-title">
        {mostrarResultadosGlobales 
          ? `Resultados para: "${busqueda}"`
          : (seleccionada ? `Productos de ${capitalizar(seleccionada)}` : "Nuestras Categorías")}
      </h2>

      {seleccionada && !mostrarResultadosGlobales && (
        <div className="contenedor-volver">
          <button className="btn-volver" onClick={() => setSeleccionada(null)}>
            ⬅ Volver a Categorías
          </button>
        </div>
      )}

      {loading && productosBD.length === 0 && !mostrarResultadosGlobales ? (
        <p className="msj-vacio">Cargando...</p>
      ) : (
        <div className="categorias-grid">

          {mostrarResultadosGlobales ? (
            resultadosBusqueda.length > 0 ? (
              resultadosBusqueda.map(prod => (
                <div key={prod.id} className="producto-card">
                  <div className="card-image-container">
                    <img src={prod.imagen || logoNegro} alt={prod.nombre} className="card-img" />
                  </div>
                  <div className="card-info">
                    <span className="categoria-tag-busqueda">{prod.categoria}</span>
                    <h3>{prod.nombre}</h3>
                    <p className="precio-tag">${prod.precio}</p>
                    <Link to={`/producto/${prod.id}`} className="btn-ver-detalle">Ver más detalles</Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="msj-vacio">No se encontraron productos para "{busqueda}"</p>
            )
          ) : (
            !seleccionada ? (
              categoriasBD.map(cat => (
                <div key={cat.id} className="categoria-card">
                  <div className="card-image-container">
                    <img src={cat.imagen || logoNegro} alt={cat.nombre} className="card-img" loading="lazy" />
                  </div>
                  <div className="card-info">
                    <h3 style={{ textTransform: 'uppercase' }}>{cat.nombre}</h3>
                    <p>{cat.desc}</p>
                    <button className="btn-ver-mas" onClick={() => setSeleccionada(cat.nombreNormalizado)}>
                      Ver {capitalizar(cat.nombreNormalizado)}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              productosBD.map(prod => (
                <div key={prod.id} className="producto-card">
                  <div className="card-image-container">
                    <img src={prod.imagen || logoNegro} alt={prod.nombre} className="card-img" />
                  </div>
                  <div className="card-info">
                    <h3>{prod.nombre}</h3>
                    <p className="precio-tag">${prod.precio}</p>
                    <Link to={`/producto/${prod.id}`} className="btn-ver-detalle">Ver más detalles</Link>
                  </div>
                </div>
              ))
            )
          )}
        </div>
      )}

      {!mostrarResultadosGlobales && seleccionada && hayMas && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button className="btn-ver-mas" onClick={cargarMas}>Ver más</button>
        </div>
      )}

    </section>
  );
};

export default CategoriaFirebase;