import { useParams, Link } from 'react-router-dom';

const Encuesta = ({ listaEncuestas, responderEncuesta }) => {
  const { id } = useParams();
  const encuesta = listaEncuestas.find((enc) => enc.id === parseInt(id));

  return (
    <div>
      <div className="encuesta-item-container">
        <div className="encuesta-item">
          <h2>{encuesta.titulo}</h2>
          <p>{encuesta.descripcion}</p>
          <br />
        </div>
      </div>
      <div className="encuesta-item-container">
        <div className="encuesta-item">
          <h2>Preguntas</h2>
          <p>
            {!encuesta.preguntas && <p>Sin preguntas definidas.</p>}
            {encuesta.preguntas &&
              encuesta.preguntas.map((pregunta) => (
                <div key={pregunta.id}>
                  <p>{pregunta.pregunta}</p>
                  <ol> {/* Cambia de ul (lista desordenada) a ol (lista ordenada) */}
                    {pregunta.opciones.map((opcion) => (
                      <div key={opcion.id}>
                        <li>{opcion.texto}</li> {/* Usa li para elementos de lista */}
                      </div>
                    ))}
                  </ol>
                </div>
              ))}
          </p>
          <br />
        </div>
      </div>
      <Link to="/">Volver</Link>
    </div>
  );
};

export default Encuesta;
