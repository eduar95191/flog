const mysql = require("mysql2/promise");

async function createConnection() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "769360141",
      database: "flog",
    });
    console.log("Conexión establecida con la base de datos");
    return connection;
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    throw error;
  }
}

module.exports = { createConnection };
