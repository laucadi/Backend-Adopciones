const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
    nombres: String,
    primerApellido: String,
    segundoApellido: String,
    cedula: String,
    correo: String,
    municipio: String,
    ciudad: String,
    contrasena: String
})

module.exports = mongoose.model("usuarios", usuariosSchema);