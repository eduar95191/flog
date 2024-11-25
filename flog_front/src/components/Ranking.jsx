import { useState, useEffect } from "react";

export const Ranking = () => {
  const [ranking9, setRanking9] = useState([]); // Estado para el ranking de los 9 hoyos
  const [ranking18, setRanking18] = useState([]); // Estado para el ranking de los 18 hoyos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHoles, setSelectedHoles] = useState("9"); // Estado para controlar la selección de hoyos (9 o 18)

  // Obtener el ranking desde el servidor Flask
  useEffect(() => {
    fetchRanking();
  }, [selectedHoles]);

  // Función para hacer la solicitud y obtener el ranking
  const fetchRanking = () => {
    fetch(`http://localhost:5000/ranking?hoyos=${selectedHoles}`)
      .then((response) => {
        // Verificar que la respuesta sea correcta
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Datos recibidos:", data); // Verificar que los datos se reciban correctamente
        setRanking9(data.ranking_9); // Guardar ranking de 9 hoyos
        setRanking18(data.ranking_18); // Guardar ranking de 18 hoyos
        setLoading(false);
      })
      .catch((err) => {
        setError("Hubo un error al obtener los datos.");
        setLoading(false);
      });
  };

  // Filtrar el ranking dependiendo de los hoyos seleccionados
  const displayedRanking = selectedHoles === "9" ? ranking9 : ranking18;

  // Si estamos cargando los datos o hay un error, mostramos un mensaje
  if (loading) {
    return <div style={styles.loadingMessage}>Cargando ranking...</div>;
  }

  if (error) {
    return <div style={styles.errorMessage}>{error}</div>;
  }

  // Manejar la selección del número de hoyos
  const handleHoleSelection = (holes) => {
    setSelectedHoles(holes);
  };

  return (
    <div style={styles.rankingContainer}>
      <h1 style={styles.heading}>Ranking de los mejores jugadores</h1>

      {/* Botones para seleccionar los hoyos */}
      <div style={styles.buttonGroup}>
        <button
          onClick={() => handleHoleSelection("9")}
          style={selectedHoles === "9" ? styles.activeButton : styles.button}
        >
          Primeros 9 Hoyos
        </button>
        <button
          onClick={() => handleHoleSelection("18")}
          style={selectedHoles === "18" ? styles.activeButton : styles.button}
        >
          18 Hoyos Totales
        </button>
      </div>

      {/* Mostrar la tabla solo si hay datos */}
      {displayedRanking.length > 0 ? (
        <table style={styles.rankingTable}>
          <thead>
            <tr>
              <th style={styles.rankingTableTh}>Rank</th>
              <th style={styles.rankingTableTh}>ID Jugador</th>
              <th style={styles.rankingTableTh}>Golpes Predichos</th>
              <th style={styles.rankingTableTh}>Golpes Totales</th>
              <th style={styles.rankingTableTh}>
                Porcentaje Mejora en Golpes (%)
              </th>
              <th style={styles.rankingTableTh}>
                Porcentaje Mejora en Par (%)
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedRanking.map((jugador, index) => (
              <tr
                key={index}
                style={index % 2 === 0 ? styles.rankingTableRowEven : {}}
              >
                <td style={styles.rankingTableTd}>{index + 1}</td>
                <td style={styles.rankingTableTd}>{jugador.ID_Jugador}</td>
                <td style={styles.rankingTableTd}>
                  {jugador.Golpes_predichos}
                </td>
                <td style={styles.rankingTableTd}>
                  {jugador.Golpes_Total_Hoyo}
                </td>
                <td style={styles.rankingTableTd}>
                  {jugador.Porcentaje_mejora_golpes}%
                </td>
                <td style={styles.rankingTableTd}>
                  {jugador.Porcentaje_mejora_par}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay jugadores para mostrar con los criterios seleccionados.</p>
      )}
    </div>
  );
};

const styles = {
  rankingContainer: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  loadingMessage: {
    textAlign: "center",
    fontSize: "18px",
    color: "#666",
  },
  errorMessage: {
    textAlign: "center",
    fontSize: "18px",
    color: "#d9534f",
  },
  buttonGroup: {
    textAlign: "center",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    margin: "0 10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  activeButton: {
    backgroundColor: "#0056b3",
  },
  rankingTable: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  rankingTableTh: {
    padding: "12px",
    textAlign: "center",
    border: "1px solid #ddd",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
  },
  rankingTableTd: {
    padding: "12px",
    textAlign: "center",
    border: "1px solid #ddd",
    fontSize: "14px",
  },
  rankingTableRowEven: {
    backgroundColor: "#f2f2f2",
  },
};
