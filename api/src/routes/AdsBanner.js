const express = require("express");
const upload = require("../middleware/upload");
const { getAdsBanner, createAdBanner,  deleteAdBanner} = require("../Controllers/AdsBanner");

const router = express.Router();

// Ruta para subir una imagen de publicidad
router.post("/upload", upload.single("image"), createAdBanner);

// Ruta para obtener todas las imágenes de publicidad
router.get("/", getAdsBanner);

//router.put("/:id", updateAd);

router.delete("/:id", deleteAdBanner);

module.exports = router;