const express = require("express");
const upload = require("../middleware/upload");
const { getAds, createAd,  deleteAd} = require("../Controllers/AdsLateral");

const router = express.Router();

// Ruta para subir una imagen de publicidad
router.post("/upload", upload.single("image"), createAd);

// Ruta para obtener todas las imágenes de publicidad
router.get("/", getAds);

//router.put("/:id", updateAd);

router.delete("/:id", deleteAd);

module.exports = router;
