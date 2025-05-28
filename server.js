//Llamado e inicializacion d dependenccias
const express = require("express"); // se incluye el framework express
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express(); //instancia de Express

//configuraciones
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.set("port", process.env.PORT || 4000);

//Middlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.use("/api/users", require("./api/users")); //se incluye el router de usuarios
app.use("/api/v1/users", require("./api/v1/routes/user.routes"));
app.use('/api/v1/articles', require('./api/v1/routes/articles.routes'));
app.use('/api/v1/category', require('./api/v1/routes/categorys.routes'));

// ✅ Ruta principal para que Render no muestre "Cannot GET /"
app.get("/", (req, res) => {
  res.send("Servidor activo. Bienvenido a la API 🟢");
});

//Se inicia el servidor en el puerto 4000
app.listen(app.get("port"), () => {
  console.log(`server running on port ${app.get("port")}  🐺`);
});
