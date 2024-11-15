import { useState } from 'react';
import '../estilos/Partida.css';

const initialHoleState = {
  distance: '',
  flagLocation: '',
  clubsUsed: [],
  quantity: [],
  totalStrokes: 0,
};

const distanceTable = {
  Negras: [390, 567, 450, 240, 602, 430, 410, 160, 390, 305, 590, 210, 385, 545, 470, 490, 175, 445],
  Azules: [382, 552, 429, 234, 602, 423, 403, 156, 383, 297, 566, 189, 379, 540, 448, 458, 166, 413],
  Blancas: [318, 514, 374, 204, 541, 380, 367, 154, 357, 251, 530, 175, 355, 500, 414, 411, 143, 362],
  Doradas: [282, 438, 314, 157, 423, 318, 315, 128, 335, 187, 454, 123, 303, 440, 360, 366, 89, 299],
  Rojas: [292, 479, 342, 173, 497, 333, 345, 128, 337, 192, 486, 146, 333, 460, 365, 374, 129, 320],
};

export const Partida = () => {
  const [estimatedTime, setEstimatedTime] = useState('');
  const [weather, setWeather] = useState('');
  const [teeColor, setTeeColor] = useState('');
  const [date, setDate] = useState('');
  const [holes, setHoles] = useState(Array(18).fill().map(() => ({ ...initialHoleState })));

  const handleHoleChange = (index, field, value) => {
    const updatedHoles = [...holes];
    updatedHoles[index][field] = value;
    setHoles(updatedHoles);
  };

  const handleClubChange = (index, club, checked) => {
    const updatedHoles = [...holes];
    if (checked) {
      updatedHoles[index].clubsUsed.push(club);
      updatedHoles[index].quantity.push(0); // Inicializar con 0 golpes para el nuevo palo
    } else {
      const clubIndex = updatedHoles[index].clubsUsed.indexOf(club);
      if (clubIndex !== -1) {
        updatedHoles[index].clubsUsed.splice(clubIndex, 1);
        updatedHoles[index].quantity.splice(clubIndex, 1);
      }
    }
    updateTotalStrokes(index, updatedHoles);
    setHoles(updatedHoles);
  };

  const handleQuantityChange = (index, clubIndex, value) => {
    const updatedHoles = [...holes];
    updatedHoles[index].quantity[clubIndex] = Number(value);
    updateTotalStrokes(index, updatedHoles);
    setHoles(updatedHoles);
  };

  const updateTotalStrokes = (holeIndex, updatedHoles) => {
    const totalStrokes = updatedHoles[holeIndex].quantity.reduce((sum, q) => sum + q, 0);
    updatedHoles[holeIndex].totalStrokes = totalStrokes;
  };

  const getDistance = (holeIndex) => {
    return teeColor ? distanceTable[teeColor][holeIndex] : '';
  };

  return (
    <div className="partida-container">
      <div className="form-container-partida">
        <h1 className="titulo-partida">Partida de GOLF</h1>
        <form>
          <div className="input-container-partida">
            <label className="label-partida">Fecha:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input-partida"
            />
          </div>
          <div className="input-container-partida">
            <label className="label-partida">Hora Estimada:</label>
            <input
              type="time"
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(e.target.value)}
              className="input-partida"
            />
          </div>
          <div className="input-container-partida">
            <label className="label-partida">Clima:</label>
            <select
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
              className="input-partida"
            >
              <option value="">Seleccione un clima</option>
              <option value="Soleado">Soleado</option>
              <option value="Nublado">Nublado</option>
              <option value="Lluvioso">Lluvioso</option>
            </select>
          </div>
          <div className="input-container-partida">
            <label className="label-partida">Color de Tee:</label>
            <select
              value={teeColor}
              onChange={(e) => setTeeColor(e.target.value)}
              className="input-partida"
            >
              <option value="">Seleccione un color de tee</option>
              <option value="Negras">Negras</option>
              <option value="Azules">Azules</option>
              <option value="Blancas">Blancas</option>
              <option value="Doradas">Doradas</option>
              <option value="Rojas">Rojas</option>
            </select>
          </div>
          {holes.map((hole, index) => (
            <div key={index} className="hole-container">
              <h2 className="hoyo-titulo">Hoyo {index + 1}</h2>
              <div className="input-container-partida">
                <label className="label-partida">Distancia:</label>
                <input
                  type="text"
                  value={getDistance(index)}
                  readOnly
                  className="input-partida"
                />
              </div>
              <div className="input-container-partida">
                <label className="label-partida">Ubicación de la bandera:</label>
                <select
                  value={hole.flagLocation}
                  onChange={(e) => handleHoleChange(index, 'flagLocation', e.target.value)}
                  className="input-partida"
                >
                  <option value="">Seleccione una ubicación</option>
                  <option value="Centro">Centro</option>
                  <option value="Adelante">Adelante</option>
                  <option value="Atrás">Atrás</option>
                </select>
              </div>
              <div className="clubs-container">
                <label className="label-partida">Palos utilizados:</label>
                <ul className="clubs-list">
                  {['Driver', 'Hibrido', 'Madera3', 'Madera5', 'Hierro2', 'Hierro3', 'Hierro4', 'Hierro5', 'Hierro6', 'Hierro7', 'Hierro8', 'Hierro9', 'Pitching Wedge', 'Sand Wedge', 'Putt', 'Castigo'].map((club, clubIndex) => (
                    <li key={club} className="club-item">
                      <input
                        type="checkbox"
                        checked={hole.clubsUsed.includes(club)}
                        onChange={(e) => handleClubChange(index, club, e.target.checked)}
                        className="club-checkbox"
                      />
                      <span className="club-name">{club}</span>
                      {hole.clubsUsed.includes(club) && (
                        <input
                          type="number"
                          value={hole.quantity[hole.clubsUsed.indexOf(club)] || ''}
                          onChange={(e) =>
                            handleQuantityChange(index, hole.clubsUsed.indexOf(club), e.target.value)
                          }
                          className="quantity-input" 
                          placeholder="# de veces" 
                          
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="input-container-partida">
                <label className="label-partida">Golpes totales del hoyo {index + 1} :</label>
                <input
                  type="number"
                  value={hole.totalStrokes}
                  readOnly
                  className="input-partida"
                />
              </div>
            </div>
          ))}
          <button type="button" className="guardar-btn">Guardar Partida</button>
        </form>
      </div>
    </div>
  );

};

