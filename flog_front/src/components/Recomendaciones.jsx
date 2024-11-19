import { useState } from "react";

export const Recomendaciones = () => {
  const [idJugador, setIdJugador] = useState("");
  const [tipoClima, setTipoClima] = useState("");
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(null);

  const consultarDatos = async () => {
    if (!idJugador || !tipoClima) {
      setError(
        "Por favor ingrese tanto el ID del jugador como el tipo de clima"
      );
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/resumen_jugadores?id_jugador=${idJugador}&tipo_clima=${tipoClima}`
      );
      if (!response.ok) {
        throw new Error("No se pudo obtener la información del jugador.");
      }
      const result = await response.json();

      if (result.length === 0) {
        setError("No se encontraron resultados para este jugador.");
      } else {
        setDatos(result[0]);
        setError(null);
      }
    } catch (err) {
      setError(err.message);
      setDatos(null);
    }
  };

  return (
    <div>
      <h1>Recomendaciones dadas al jugador para mejorar</h1>

      {/* Formulario para ingresar los parámetros */}
      <div>
        <label htmlFor="idJugador">ID del Jugador:</label>
        <input
          type="number"
          id="idJugador"
          value={idJugador}
          onChange={(e) => setIdJugador(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="tipoClima">Tipo de Clima:</label>
        <select
          id="tipoClima"
          value={tipoClima}
          onChange={(e) => setTipoClima(e.target.value)}
        >
          <option value="">Selecciona un clima</option>
          <option value="Cálido">Cálido</option>
          <option value="Frío">Frío</option>
        </select>
      </div>

      <button onClick={consultarDatos}>Consultar</button>

      {/* Mostrar errores */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Mostrar los resultados en formato tabla */}
      {datos && (
        <div>
          <h2>Resultados para el jugador {datos.ID_Jugador}</h2>
          <table
            border="1"
            style={{
              marginTop: "20px",
              width: "100%",
              textAlign: "left",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th>Golpes Totales en el Hoyo</th>
                <th>Golpes Predichos</th>
                <th>Palo más usado</th>
                <th>Par</th>
                <th>Par Predicho</th>
                <th>Porcentaje de Mejora en Golpes</th>
                <th>Porcentaje de Mejora en Par</th>
                <th>Tipo de Clima</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{datos.Golpes_Total_Hoyo}</td>
                <td>{datos.Golpes_predichos}</td>
                <td>{datos.Palo_mas_usado}</td>
                <td>{datos.Par}</td>
                <td>{datos.Par_predicho}</td>
                <td>{datos.Porcentaje_mejora_golpes}%</td>
                <td>{datos.Porcentaje_mejora_par}%</td>
                <td>{datos.Tipo_clima}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
