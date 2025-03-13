const express = require("express");
const upload = require("../middleware/uploadLateral"); // Middleware para subir imágenes
const { getAds, createAd, deleteAd } = require("../controllers/AdsLateral");

const router = express.Router();

// Ruta para subir una imagen de publicidad
router.post("/upload", upload.single("image"), createAd);

// Ruta para obtener todas las imágenes de publicidad
router.get("/", getAds);

// Ruta para eliminar una propaganda
router.delete("/:id", deleteAd);

module.exports = router;
