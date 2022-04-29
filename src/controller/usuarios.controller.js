const usuariosCtrl = {};
const usuariosModels = require('../models/usuarios.models');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

usuariosCtrl.crear = async (req,res) =>{
    const{nombres, primerApellido, segundoApellido, cedula, correo, municipio, ciudad,contrasena} = req.body;
    const nuevoUsuario = new usuariosModels ({
        nombres,
        primerApellido,
        segundoApellido,
        cedula,
        correo,
        municipio,
        ciudad,
        contrasena
    })
   const correoUsuario = await usuariosModels.findOne({correo: correo})
   if(correoUsuario) {
       res.json({
           mensaje: " Este usuario ya existe, trata con un nuevo correo",
       })
   }else{
       nuevoUsuario.contrasena = await bcrypt.hash(contrasena,10)
       const token = jwt.sign({_id:nuevoUsuario._id}, "Secreta")
       await nuevoUsuario.save()
       res.json({
           mensaje: "Bienvenido",
           id: nuevoUsuario._id,
           nombre: nuevoUsuario.nombres,
           token

       })
   }
}

usuariosCtrl.login = async(req,res)=>{
    const{correo,contrasena}=req.body
    const usuario = await usuariosModels.findOne({correo:correo})
    if(!usuario){
        return res.json({
            mensaje: 'correo Incorrecto'
        })
    }
    const coincide = await bcrypt.compare(contrasena,usuario.contrasena)
    if(coincide){
        const token = jwt.sign({_id: usuario._id}, 'Secreta')
        res.json({
            mensaje: 'Bienvenido',
            id: usuario.id,
            nombre: usuario.nombres,
            token
        })
    }
    else{
        res.json({
            mensaje: 'Contrasena incorrecta'
        })
    }
}




module.exports = usuariosCtrl