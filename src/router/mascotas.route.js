const { Router } = require("express");
const router = Router();
const mascotaCtrl = require("../controller/mascotas.controller");
const auth = require('../helper/auth');

router.post("/crearMascota",auth.verificarToken,mascotaCtrl.crearMascota);
router.get('/listarMascotas',mascotaCtrl.listar);
router.put('/actualizarMascota',auth.verificarToken,mascotaCtrl.actualizarMascota);
router.delete('/eliminarMascota/:id',auth.verificarToken,mascotaCtrl.eliminarMascota);
router.get('/buscarPorCoincidencia/:especie',mascotaCtrl.buscarPorCoincidencia)

module.exports = router