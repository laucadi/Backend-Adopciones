const mongoose = require('mongoose');
const {Schema} = mongoose

const mascotasSchema = new Schema({
    nombre: String,
    edad: String,
    especie: String,
    raza: String,
    tamano: String,
    usuario: String,
    date: { type: Date, defaut: Date.now }
})

module.exports = mongoose.model('mascotas',mascotasSchema);