import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que buscas no existe.</p>
      {/* Botón para ir al inicio */}
      
    {/* Contenedor del botón centrado al final */}
      <div className="contenedor-boton-final">
        <Link to="/" className="btn-inicio-estilo">
          Volver al Inicio
        </Link>
      </div>



    </div>
  );
};

export default NotFound;
