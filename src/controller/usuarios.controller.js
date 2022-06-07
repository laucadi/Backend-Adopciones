const usuariosCtrl = {};
const usuariosModels = require("../models/usuarios.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

usuariosCtrl.crear = async (req, res) => {
  const {
    nombres,
    primerApellido,
    segundoApellido,
    cedula,
    correo,
    ciudad,
    contrasena,
    rol,
  } = req.body;
  const nuevoUsuario = new usuariosModels({
    nombres,
    primerApellido,
    segundoApellido,
    cedula,
    correo,
    ciudad,
    contrasena,
    rol,
  });
  const correoUsuario = await usuariosModels.findOne({ correo: correo });
  if (correoUsuario) {
    res.json({
      mensaje: " Este usuario ya existe, trata con un nuevo correo",
    });
  } else {
    nuevoUsuario.contrasena = await bcrypt.hash(contrasena, 10);
    const token = jwt.sign({ _id: nuevoUsuario._id }, "Secreta");
    await nuevoUsuario.save();
    res.json({
      mensaje: "Bienvenido",
      id: nuevoUsuario._id,
      nombre: nuevoUsuario.nombres,
      token,
      rol,
    });
  }
};

usuariosCtrl.login = async (req, res) => {
  const { correo, contrasena } = req.body;
  const usuario = await usuariosModels.findOne({ correo: correo });
  if (!usuario) {
    return res.json({
      mensaje: "correo Incorrecto",
    });
  }
  const coincide = await bcrypt.compare(contrasena, usuario.contrasena);
  if (coincide) {
    const token = jwt.sign({ _id: usuario._id }, "Secreta");
    res.json({
      mensaje: "Bienvenido",
      id: usuario.id,
      nombre: usuario.nombres,
      rol: usuario.rol,
      token,
    });
  } else {
    res.json({
      mensaje: "Contrasena incorrecta",
    });
  }
};

usuariosCtrl.listarUsuario = async (req, res) => {
  const respuesta = await usuariosModels.find();
  res.json(respuesta);
};

usuariosCtrl.listarId = async (req, res) => {
  const id = req.params.id;
  const respuesta = await usuariosModels.findById({ _id: id });
  res.json(respuesta);
};

usuariosCtrl.listarNombre = async (req, res) => {
  const { nombres } = req.params;
  const respuesta = await usuariosModels.find({
    nombres: { $regex: "^" + nombres, $options: "i" },
  });
  res.json(respuesta);
};

usuariosCtrl.actualizarUsuario = async (req, res) => {
  const id = req.params.id;
  await usuarioModel.findByIdAndUpdate({ _id: id }, req.body);
  const respuesta = await usuariosModels.findById({ _id: id });
  res.json({
    mensaje: "Usuario actualizado",
    respuesta,
  });
};

usuariosCtrl.listarId = async (req, res) => {
  const id = req.params.id;
  const respuesta = await usuariosModels.findById({ _id: id });
  res.json(respuesta);
};

usuariosCtrl.eliminarUsuario = async (req, res) => {
  const id = req.params.id;
  await usuariosModels.findByIdAndRemove({ _id: id });
  res.json({
    mensaje: "Usuario eliminado",
  });
};

module.exports = usuariosCtrl;
