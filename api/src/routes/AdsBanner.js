const express = require("express");
const upload = require("../middleware/uploadBanner");  // El middleware para las imágenes
const { getAdsBanner, createAdBanner, updateAdBanner, deleteAdBanner } = require("../Controllers/AdsBanner");

const router = express.Router();

// Ruta para obtener todas las propagandas del banner
router.get("/", getAdsBanner);

// Ruta para crear una nueva propaganda del banner
router.post("/upload", createAdBanner);

// Ruta para actualizar una propaganda del banner
router.put("/:id", upload.single("image"), updateAdBanner);

// Ruta para eliminar una propaganda del banner
router.delete("/:id", deleteAdBanner);

module.exports = router;
