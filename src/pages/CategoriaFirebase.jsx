import React, { useState, useEffect } from 'react';
import "../Estilos/CategoriaFirebase.css";
import { Link } from 'react-router-dom';
import { db } from "../firebase"; 
import { collection, getDocs, query, where, limit, startAfter } from "firebase/firestore";
import { capitalizar } from "../utils/format";
import logoNegro from "../Imagenes/logo_polirrubro_1.jpg"; 
import { useRef } from "react";

const CategoriaFirebase = () => {
  const [seleccionada, setSeleccionada] = useState(null);
  const [productosBD, setProductosBD] = useState([]); 
  const [categoriasBD, setCategoriasBD] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [hayMas, setHayMas] = useState(true);

  const categoriasCache = useRef(null);

  // 🔥 TRAER CATEGORÍAS
useEffect(() => {
  const obtenerCategorias = async () => {

    // 1️⃣ CACHE EN MEMORIA (más rápido)
    if (categoriasCache.current) {
      setCategoriasBD(categoriasCache.current);
      return;
    }

    // 2️⃣ CACHE EN LOCALSTORAGE
    const cacheLocal = localStorage.getItem("categorias");

    if (cacheLocal) {
      const parsed = JSON.parse(cacheLocal);

      setCategoriasBD(parsed);
      categoriasCache.current = parsed; // también lo pasamos a memoria

      return;
    }

    // 3️⃣ SI NO HAY CACHE → FIREBASE
    setLoading(true);

    try {
      const catSnapshot = await getDocs(collection(db, "categorias"));

      const listaCats = catSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setCategoriasBD(listaCats);

      // 🔥 guardamos en ambos caches
      categoriasCache.current = listaCats;
      localStorage.setItem("categorias", JSON.stringify(listaCats));

    } catch (error) {
      console.error("Error al traer categorías:", error);
    }

    setLoading(false);
  };

  obtenerCategorias();
}, []);

  // 🔥 TRAER PRIMEROS 6 PRODUCTOS
  useEffect(() => {
    if (!seleccionada) return;

    const obtenerProductos = async () => {
      setLoading(true);

      try {
        // limpiar estado
        setProductosBD([]);
        setLastDoc(null);

        const q = query(
          collection(db, "productos"),
          where("categoria", "==", seleccionada),
          limit(6)
        );

        const snapshot = await getDocs(q);

        const lista = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
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

  // 🔥 CARGAR MÁS (paginación)
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

      const nuevos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setProductosBD(prev => [...prev, ...nuevos]);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      setHayMas(snapshot.docs.length === 6);

    } catch (error) {
      console.error("Error al traer más productos:", error);
    }

    setLoading(false);
  };

  return ( 
    <section className="categorias-section">

      <h2 className="section-title">
        {seleccionada 
          ? `Productos de ${capitalizar(seleccionada)}`
          : "Nuestras Categorías"}
      </h2>

      {seleccionada && (
        <div className="contenedor-volver">
          <button className="btn-volver" onClick={() => setSeleccionada(null)}>
            ⬅ Volver a Categorías
          </button>
        </div>
      )}

      {loading && productosBD.length === 0 ? (
        <p className="msj-vacio">Cargando...</p>
      ) : (
        <div className="categorias-grid">

          {!seleccionada ? (
            categoriasBD.map(cat => (
              <div key={cat.id} className="categoria-card">
                <div className="card-image-container">
                  <img
                    src={cat.imagen || logoNegro}
                    alt={cat.nombre}
                    className="card-img"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = logoNegro;
                    }}
                  />
                </div>

                <div className="card-info">
                  <h3 style={{ textTransform: 'uppercase' }}>
                    {cat.nombre}
                  </h3>

                  <p>{cat.desc}</p>

                  <button 
                    className="btn-ver-mas" 
                    onClick={() => setSeleccionada(cat.nombreNormalizado)}
                  >
                    Ver {capitalizar(cat.nombreNormalizado)}
                  </button>
                </div>
              </div>
            ))
          ) : (
            productosBD.map(prod => (
              <div key={prod.id} className="producto-card">
                <div className="card-image-container">
                  <img
                    src={prod.imagen || "https://via.placeholder.com/150"}
                    alt={prod.nombre}
                    className="card-img"
                  />
                </div>

                <div className="card-info">
                  <h3>{prod.nombre}</h3>
                  <p className="precio-tag">${prod.precio}</p>

                  <Link to={`/producto/${prod.id}`} className="btn-ver-detalle">
                    Ver más detalles
                  </Link>
                </div>
              </div>
            ))
          )}

        </div>
      )}

      {/* 🔥 BOTÓN VER MÁS */}
      {seleccionada && hayMas && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button className="btn-ver-mas" onClick={cargarMas}>
            Ver más
          </button>
        </div>
      )}

      {seleccionada && !loading && productosBD.length === 0 && (
        <p className="msj-vacio">
          Próximamente cargaremos productos en este rubro...
        </p>
      )}

    </section>
  );
};

export default CategoriaFirebase;