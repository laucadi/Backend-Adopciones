const { Router } = require("express");
const router = Router();
const usuariosCtrl = require("../controller/usuarios.controller");

router.post("/crearUsuario", usuariosCtrl.crear);
router.post("/loginUsuario", usuariosCtrl.login);
router.get("/listar", usuariosCtrl.listarUsuario);
router.get("/listarNombre/:nombres", usuariosCtrl.listarNombre);
router.put("/actualizarUsuario/:id", usuariosCtrl.actualizarUsuario);
router.get("/listarUsuario/:id", usuariosCtrl.listarId);
router.delete("/eliminarUsuario/:id", usuariosCtrl.eliminarUsuario);

module.exports = router;
