const { Router } = require("express");
const router = Router();
const mascotaCtrl = require("../controller/mascotas.controller");
const auth = require("../helper/auth");
const multipart = require("connect-multiparty");
const path = multipart({ uploadDir: "src/uploads/mascotas" });
const controller = require("../controller/uploads.controller");

const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.post("/upload", controller.upload);

router.post("/crearMascota", path, mascotaCtrl.crearMascota);
router.get("/listarMascotas", mascotaCtrl.listar);
router.put(
  "/actualizarMascota/:id",
  auth.verificarToken,
  mascotaCtrl.actualizarMascota
);
router.delete(
  "/eliminarMascota/:id",
  auth.verificarToken,
  mascotaCtrl.eliminarMascota
);
router.get(
  "/buscarPorCoincidencia/:especie",
  mascotaCtrl.buscarPorCoincidencia
);

module.exports = router;
