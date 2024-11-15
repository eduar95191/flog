const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const mysql = require("../db/db");

router.post("/register", async function (req, res, next) {
  const { documento, correo, nombre, edad, estatura, contrasena } = req.body;

  if (!documento || !correo || !nombre || !edad || !estatura || !contrasena) {
    return res
      .status(400)
      .json({ success: false, message: "Faltan datos en el formulario" });
  }

  try {
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const connection = await mysql.createConnection();

    const [result] = await connection.execute(
      "INSERT INTO jugador (id_jugador, nombre, edad, estatura, correo, contrasena) VALUES (?, ?, ?, ?, ?, ?)",
      [
        documento,
        nombre,
        parseInt(edad),
        parseFloat(estatura),
        correo,
        hashedPassword,
      ]
    );

    await connection.end();

    res
      .status(201)
      .json({ success: true, message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.status(500).json({
      success: false,
      message: "Hubo un error al registrar el usuario",
    });
  }
});

module.exports = router;
