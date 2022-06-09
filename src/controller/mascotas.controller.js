const mascotaCtrl = {};
const imagenCtrl = {};
const mascotaModels = require("../models/mascotas.models");
const uploadController = require("../controller/uploads.controller");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

mascotaCtrl.crearMascota = async (req, res) => {
  const {
    nombre,
    edad,
    especie,
    raza,
    estadoDeEsterilizacion,
    estadoDeVacunacion,
    descripcionDeLaMascota,
    fechaDeNacimiento,
    imagen,
    idusuario,
  } = req.body;
  const nuevaMascota = new mascotaModels({
    nombre,
    edad,
    especie,
    raza,
    estadoDeEsterilizacion,
    estadoDeVacunacion,
    descripcionDeLaMascota,
    fechaDeNacimiento,
    imagen,
    idusuario,
  });
  /*  const respuesta = await nuevaMascota.save();
  res.json({
    mensaje: "mascota creada",
    respuesta,
  }); */
  //imagen:

  const documentomascota = await mascotaModels.findOne({ nombre: nombre });
  if (documentomascota) {
    res.json({
      mensaje: "la mascota ya existe",
    });
  } else if (req.files) {
    const imagen_path = req.files.imagen.path;
    const name = imagen_path.split("\\");
    const imagenCargada = name[3];

    const nuevaMascota = new mascotaModels({
      nombre,
      edad,
      especie,
      raza,
      estadoDeEsterilizacion,
      estadoDeVacunacion,
      descripcionDeLaMascota,
      fechaDeNacimiento,
      imagen: imagenCargada,
      idusuario,
    });
    await nuevaMascota.save();
    res.json({
      mensaje: "Creado" + "en req files" + imagenCargada,
      nombre: nombre,
    });
  } else {
    const nuevaMascota = new mascotaModels({
      nombre,
      edad,
      especie,
      raza,
      estadoDeEsterilizacion,
      estadoDeVacunacion,
      descripcionDeLaMascota,
      fechaDeNacimiento,
      imagen: null,
      idusuario,
    });

    await nuevaMascota.save();
    res.json({
      mensaje: "Creado",
      nombre: nombre,
    });
  }
};

mascotaCtrl.listar = async (req, res) => {
  const respuesta = await mascotaModels.find();
  res.json(respuesta);
};
mascotaCtrl.actualizarMascota = async (req, res) => {
  const id = req.params.id;
  await mascotaModels.findByIdAndUpdate({ _id: id }, req.body);
  const respuesta = await mascotaModels.findById({ _id: id });
  res.json({
    mensaje: "Mascota actualizada",
    respuesta,
  });
};
mascotaCtrl.eliminarMascota = async (req, res) => {
  const id = req.params.id;
  await mascotaModels.findByIdAndRemove({ _id: id });
  res.json({
    mensaje: "Mascota eliminada",
  });
};
mascotaCtrl.buscarPorCoincidencia = async (req, res) => {
  const { especie } = req.params;
  const respuesta = await mascotaModels.find({
    especie: { $regex: "^" + especie, $options: "i" },
  });
  res.json(respuesta);
};
module.exports = mascotaCtrl;
