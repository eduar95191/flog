import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import "../estilos/Login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMessage("");

    Axios.post("http://localhost:4000/api/login", {
      correo: email,
      contrasena: password,
    })
      .then((response) => {
        if (response.data.success) {
          alert("Inicio de sesión exitoso");
          navigate("/home");
        }
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Hubo un error en la conexión al servidor");
        }
      });
  };

  return (
    <div className="login-container">
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Introduce tu correo electrónico"
            required
          />
        </div>
        <div className="input-field">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Introduce tu contraseña"
            required
          />
        </div>

        {/* Mensaje de error si ocurre */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit" className="login-btn">
          Iniciar sesión
        </button>

        <Link to="/Registro">
          <button type="button" className="registro-btn">
            Registrarse
          </button>
        </Link>
      </form>
    </div>
  );
};
