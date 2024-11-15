const express = require("express");
const router = express.Router();
const mysql = require("../db/db");
const bcrypt = require("bcryptjs");

router.post("/login", async function (req, res) {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res
      .status(400)
      .json({ success: false, message: "Correo y contraseña son requeridos" });
  }

  try {
    const connection = await mysql.createConnection();

    const [user] = await connection.execute(
      "SELECT * FROM jugador WHERE correo = ?",
      [correo]
    );

    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      contrasena,
      user[0].contrasena
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Contraseña incorrecta",
      });
    }

    res.status(200).json({
      success: true,
      message: "Inicio de sesión exitoso",
      user: user[0],
    });

    await connection.end();
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({
      success: false,
      message: "Hubo un error al iniciar sesión",
    });
  }
});

module.exports = router;
