const {Router} = require("express");
const router = Router();
const usuariosCtrl = require("../controller/usuarios.controller");

router.post("/crearUsuario", usuariosCtrl.crear);
router.post("/loginUsuario",usuariosCtrl.login);

module.exports = router;