import { useState } from "react";

export const Recomendaciones = () => {
  const [idJugador, setIdJugador] = useState("");
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(null);

  const procesarDatos = (datos) => {
    const hoyosCompletos = {};

    for (let i = 1; i <= 18; i++) {
      hoyosCompletos[i] = {
        N_Hoyo: i,
        Resultado_Handicap: i, 
      };
    }

  
    datos.forEach((fila) => {
      const hoyo = fila.N_Hoyo;
      if (hoyo && hoyosCompletos[hoyo]) {
        hoyosCompletos[hoyo].Resultado_Handicap = fila.Resultado_Handicap || 0;
      }
    });

  
    return Object.values(hoyosCompletos);
  };

  const consultarDatos = async () => {
    if (!idJugador) {
      setError("Por favor ingrese el ID del jugador");
      return;
    }

  
    setDatos(null);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/resumen_jugadores?id_jugador=${idJugador}`
      );

      if (!response.ok) {
        throw new Error("No se pudo obtener la información del jugador.");
      }

      const result = await response.json();

      
      if (!Array.isArray(result) || result.length === 0) {
        setError("No se encontraron resultados para este jugador.");
        return;
      }

      
      const datosProcesados = procesarDatos(result);
      setDatos({ generales: result, hoyos: datosProcesados }); 
    } catch (err) {
      setError("Ocurrió un error al consultar los datos.");
      console.error(err);
    }
  };

  return (
    <div>
      {/* Formulario para ingresar los parámetros */}
      <div>
        <label htmlFor="idJugador">Ingrese el ID del Jugador, saldran resultados de jugadas y se le darán recomendaciones para mejorar en el juego de GOLF:</label>
        <input
          type="number"
          id="idJugador"
          value={idJugador}
          onChange={(e) => setIdJugador(e.target.value)}
        />
      </div>
      <button onClick={consultarDatos}>Consultar</button>

      {/* Mostrar errores */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Mostrar los resultados en formato tabla */}
      {datos && datos.generales.length > 0 && (
        <div>
          <h2>Resultados para el jugador {datos.generales[0]?.ID_Jugador}</h2>
          <div>
            <p><strong>Edad:</strong> {datos.generales[0].Edad}</p>
            <p><strong>Estatura:</strong>{parseFloat(datos.generales[0].Estatura).toFixed(2)} m</p>
            <p><strong>Par del campo:</strong> {datos.generales[0].Par}</p>
          </div>

          <p>A continuación, se presentan las partidas de golf junto con sus resultados, incluyendo información detallada como el número total de golpes de cada juego, promedio de golpes, palo más utilizado, porcentajes de mejora en golpes , así como el tipo de clima durante la partida:</p>

          {/* Tabla con datos generales */}
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
                <th>Código de jugada</th>
                <th>Golpes Totales </th>
                <th>Golpes Promedios</th>
                <th>Palo más usado</th>
                <th>Porcentaje de Mejora en Golpes</th>
                <th>Tipo de Clima</th>
              </tr>
            </thead>
            <tbody>
              {datos.generales.map((fila, index) => (
                <tr key={index}>
                  <td>{fila.ID_Juego}</td>
                  <td>{fila.Golpes_Total_Hoyo}</td>
                  <td>{parseFloat(fila.Golpes_predichos).toFixed(0)}</td>
                  <td>{fila.Palo_mas_usado}</td>  
                  <td>{fila.Porcentaje_mejora_golpes}</td>
                  <td>{fila.Tipo_clima}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Tabla con los golpes por hoyo */}
          <h3>Historial de Golpes por Hoyo</h3>
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
                <th>Hoyo</th>
                <th>Golpes</th>
              </tr>
            </thead>
            <tbody>
              {datos.hoyos.map((hoyo, index) => (
                <tr key={index}>
                  <td>{hoyo.N_Hoyo}</td>
                  <td>{hoyo.Resultado_Handicap}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h1>Recomendaciones dadas al jugador para mejorar</h1>
        </div>
      )}
    </div>
      
  );
};
