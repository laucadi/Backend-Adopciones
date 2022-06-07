const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
  nombres: String,
  primerApellido: String,
  segundoApellido: String,
  cedula: String,
  correo: String,
  ciudad: String,
  contrasena: String,
  rol: String,
});

module.exports = mongoose.model("usuarios", usuariosSchema);
