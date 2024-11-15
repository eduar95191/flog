import { useState } from "react";
import "../estilos/Registro.css";
import { Link } from "react-router-dom";

export const Registro = () => {
  const [documento, setDocumento] = useState("");
  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [estatura, setEstatura] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmcontrasena, setConfirmContrasena] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contrasena !== confirmcontrasena) {
      alert("Las contraseñas no coinciden");
    } else {
      const userData = {
        documento,
        correo,
        nombre,
        edad,
        estatura,
        contrasena,
      };

      fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Registro exitoso");
          } else {
            alert("Hubo un error en el registro");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Hubo un error en el registro");
        });
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Registro</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="documento"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            className="form-input"
            placeholder="Introduce su documento"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            id="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="form-input"
            placeholder="Introduce tu correo electrónico"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="form-input"
            placeholder="Introduce tu nombre completo"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="number"
            id="edad"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            className="form-input"
            placeholder="Introduce tu edad"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="number"
            id="estatura"
            value={estatura}
            onChange={(e) => setEstatura(e.target.value)}
            className="form-input"
            placeholder="Introduce tu estatura en metros"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            id="contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className="form-input"
            placeholder="Crea una contraseña segura"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            id="contraseñaConfirmada"
            value={confirmcontrasena}
            onChange={(e) => setConfirmContrasena(e.target.value)}
            className="form-input"
            placeholder="Confirma tu contraseña"
            required
          />
        </div>

        <button type="submit" className="form-button">
          Registrarse
        </button>

        <Link to="/login">
          <button type="button" className="form-button">
            Iniciar sesión
          </button>
        </Link>
      </form>
    </div>
  );
};
