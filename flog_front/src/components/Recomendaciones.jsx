import { useState } from "react";

export const Recomendaciones = () => {
  const [idJugador, setIdJugador] = useState("");
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(null);

  const tablaDatos = [
    [3, 7, 4, 4, 4, 4],
    [6, 6, 6, 6, 4, 6],
    [4, 5, 6, 4, 4, 4],
    [3, 5, 2, 5, 3, 5],
    [8, 7, 4, 5, 5, 6],
    [5, 5, 6, 6, 5, 6],
    [5, 6, 6, 5, 4, 5],
    [3, 3, 2, 3, 3, 3],
    [4, 6, 5, 6, 5, 5],
    [3, 3, 5, 4, 4, 4],
    [5, 7, 7, 7, 5, 7],
    [4, 4, 3, 4, 3, 3],
    [4, 6, 5, 5, 5, 5],
    [7, 8, 6, 7, 4, 6],
    [5, 5, 6, 6, 5, 6],
    [5, 8, 6, 5, 5, 7],
    [3, 2, 5, 3, 2, 8],
    [6, 7, 5, 5, 4, 4],
  ];

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

  // Calcular el total de golpes para cada jugador en base al idJugador
  const calcularTotalGolpes = (idJugador) => {
    const golpesJugador = tablaDatos.map((fila) => fila[idJugador - 1]);
    const totalGolpes = golpesJugador.reduce((acc, val) => acc + val, 0);
    return totalGolpes;
  };

  return (
    <div>
      {/* Formulario para ingresar los parámetros */}
      <div>
        <br />
        <label htmlFor="idJugador">
          Ingrese el ID del Jugador, saldrán resultados de jugadas y se le darán
          recomendaciones para mejorar en el juego de GOLF:
        </label>
        <br />
        <input
          type="number"
          id="idJugador"
          value={idJugador}
          onChange={(e) => setIdJugador(e.target.value)}
        />
      </div>
      <br />
      <button onClick={consultarDatos} style={{
        backgroundColor: "#3b9769",
        color: "white",
        padding: "10px 20px",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
      }}>Consultar</button>

      {/* Mostrar errores */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Mostrar los resultados en formato tabla */}
      {datos && datos.generales.length > 0 && (
        <div>
          <h2 style={{ textAlign: "center" }}>
            Resultados para el jugador {datos.generales[0]?.ID_Jugador}
          </h2>
          <div style={{ textAlign: "center" }}>
            <p>
              <strong>Edad:</strong> {datos.generales[0].Edad}
            </p>
            <p>
              <strong>Estatura:</strong>
              {parseFloat(datos.generales[0].Estatura).toFixed(2)} m
            </p>
            <p>
              <strong>Par del campo:</strong> {datos.generales[0].Par}
            </p>
          </div>

          <p>
            A continuación, se presentan los resultados de juegos de golf,
            incluyendo información detallada como el número total de golpes,
            promedio de golpes, palo más utilizado, porcentajes de mejora en
            golpes, así como el tipo de clima durante la partida:
          </p>

          {/* Tabla con datos generales */}
          <table
            border="1"
            style={{
              marginTop: "20px",
              width: "100%",
              textAlign: "center",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#3b9769", color: "white" }}>
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
          <h3 style={{ textAlign: "center", marginTop: "30px" }}>
            Historial de Mejor Jugada por hoyo
          </h3>
          <table
            border="1"
            style={{
              marginTop: "20px",
              width: "50%",
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#3b9769", color: "white" }}>
                <th>Hoyo</th>
                <th>Golpes</th>
              </tr>
            </thead>
            <tbody>
              {datos.hoyos.map((hoyo, index) => (
                <tr key={index}>
                  <td>{hoyo.N_Hoyo}</td>
                  <td>
                    {
                      tablaDatos[index][idJugador - 1] // Accede a la columna correspondiente al ID del jugador
                    }
                  </td>
                </tr>
              ))}
              {/* Fila total de golpes */}
              <tr style={{ fontWeight: "bold" }}>
                <td>Total Golpes</td>
                <td>{calcularTotalGolpes(idJugador)}</td>
              </tr>
            </tbody>
          </table>

          <h1 style={{ textAlign: "center", marginTop: "40px" }}>
          Recomendaciones dadas al jugador para mejorar
          </h1>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h2>Mejora en los golpes</h2>
            <p>
              Basándonos en los datos del jugador, podemos observar las siguientes áreas para mejorar:
            </p>
            <ul style={{ listStyleType: "none", padding: 0 }}>
            <li><strong>Optimización de la estrategia:</strong> Practicar una estrategia más conservadora en hoyos largos como el hoyo 5 y 14 podría reducir la cantidad de golpes.</li>
            </ul>

            <h2>Palo más recomendado</h2>
            <ul style={{ listStyleType: "none", padding: 0 }}>
            <li><strong>Explorar otros palos:</strong> Prueba diferentes combinaciones para situaciones en las que el palo más usado que se encuentra en la primera tabla no sea el más adecuado.</li>
            </ul>

            <h2>Ajustes según el clima</h2>
            <p>
              Según las condiciones del clima, es recomendable:
             </p>
            <ul style={{ listStyleType: "none", padding: 0 }}>
            <li><strong>Clima cálido:</strong> Mantén un ritmo constante y controla la hidratación. Intenta mantener un golpe suave para evitar el agotamiento.</li>
            <li><strong>Clima frío:</strong> Considera utilizar un palo de más flexibilidad para obtener mayor control y precisión en el golpe.</li>
            </ul>
          </div>

        </div>
      )}
    </div>
  );
};
