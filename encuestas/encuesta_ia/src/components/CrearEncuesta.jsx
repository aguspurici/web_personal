import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CrearEncuesta = ({ agregarEncuesta }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const preguntas = [];
    for (let i = 1; i <= 2; i++) {
      const pregunta = getValues(`pregunta${i}`);
      const opciones = [];
      for (let j = 1; j <= 4; j++) {
        const opcion = getValues(`opcion${j}-${i}`);
        if (opcion) {
          opciones.push({ id: j, texto: opcion });
        }
      }
      if (pregunta && opciones.length === 4) {
        preguntas.push({
          id: i,
          pregunta,
          opciones,
        });
      }
    }

    if (preguntas.length === 2) {
      const nuevaEncuesta = {
        id: Date.now(),
        titulo: data.titulo,
        descripcion: data.descripcion,
        preguntas,
      };

      agregarEncuesta(nuevaEncuesta);

      navigate("/");
    } else {
      alert("Debes ingresar 2 preguntas con 4 opciones de respuesta cada una.");
    }
  };

  return (
    <div>
      <h1>Crear Nueva Encuesta</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Título:</label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          {...register("titulo", {
            required: "Este campo es obligatorio",
            maxLength: {
              value: 50,
              message: "El título debe tener menos de 50 caracteres",
            },
          })}
        />
        {errors.titulo && <p>{errors.titulo.message}</p>}
        <label>Descripción:</label>
        <textarea
          id="descripcion"
          name="descripcion"
          {...register("descripcion", {
            maxLength: {
              value: 200,
              message: "La descripción debe tener menos de 200 caracteres",
            },
          })}
        />
        {errors.descripcion && <p>{errors.descripcion.message}</p>}

        {[1, 2].map((i) => (
          <div key={i}>
            <label>Pregunta {i}:</label>
            <input
              type="text"
              id={`pregunta${i}`}
              name={`pregunta${i}`}
              {...register(`pregunta${i}`, {
                required: "Este campo es obligatorio",
                maxLength: {
                  value: 100,
                  message: "La pregunta debe tener menos de 100 caracteres",
                },
              })}
            />
            {errors[`pregunta${i}`] && <p>{errors[`pregunta${i}`].message}</p>}
            {[1, 2, 3, 4].map((j) => (
              <div key={j}>
                <label>Opción {j}:</label>
                <input
                  type="text"
                  id={`opcion${j}-${i}`}
                  name={`opcion${j}-${i}`}
                  {...register(`opcion${j}-${i}`, {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors[`opcion${j}-${i}`] && (
                  <p>{errors[`opcion${j}-${i}`].message}</p>
                )}
              </div>
            ))}
          </div>
        ))}

        <button type="submit">Guardar Encuesta</button>
      </form>
    </div>
  );
};

export default CrearEncuesta;
