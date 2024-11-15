let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let cors = require("cors");
let port = 4000;

let registerRouter = require("./routes/register");
let loginRouter = require("./routes/login");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", registerRouter);
app.use("/api", loginRouter);

// Manejo de errores
app.use(function (req, res, next) {
  next(createError(404));
});

app.listen(port, function () {
  console.log(`http://localhost:${port}`);
});
1;

module.exports = app;
