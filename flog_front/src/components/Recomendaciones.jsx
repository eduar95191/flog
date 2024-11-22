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

    // Agregar los valores reales de los datos recibidos
    datos.forEach((fila) => {
      const hoyo = fila.N_Hoyo;
      if (hoyo && hoyosCompletos[hoyo]) {
        hoyosCompletos[hoyo].Resultado_Handicap = fila.Resultado_Handicap || 0;
      }
    });

    // Convertir a un array para facilitar el renderizado
    return Object.values(hoyosCompletos);
  };

  const consultarDatos = async () => {
    if (!idJugador) {
      setError("Por favor ingrese el ID del jugador");
      return;
    }

    // Reiniciar estados
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

      // Verificar si el resultado está vacío
      if (!Array.isArray(result) || result.length === 0) {
        setError("No se encontraron resultados para este jugador.");
        return;
      }

      // Procesar los datos para asegurar los 18 hoyos
      const datosProcesados = procesarDatos(result);
      setDatos({ generales: result, hoyos: datosProcesados }); // Dividir en datos generales y hoyos
    } catch (err) {
      setError("Ocurrió un error al consultar los datos.");
      console.error(err);
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
                <th>Golpes Totales en un juego</th>
                <th>Golpes Esperados en un juego</th>
                <th>Palo más usado</th>
                <th>Par Predicho</th>
                <th>Porcentaje de Mejora en Golpes</th>
                <th>Porcentaje de Mejora en Par</th>
                <th>Tipo de Clima</th>
              </tr>
            </thead>
            <tbody>
              {datos.generales.map((fila, index) => (
                <tr key={index}>
                  <td>{fila.Golpes_Total_Hoyo}</td>
                  <td>{parseFloat(fila.Golpes_predichos).toFixed(0)}</td>
                  <td>{fila.Palo_mas_usado}</td>
                  <td>{fila.Par_predicho}</td>
                  <td>{fila.Porcentaje_mejora_golpes}</td>
                  <td>{fila.Porcentaje_mejora_par}</td>
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
        </div>
      )}
    </div>
  );
};
