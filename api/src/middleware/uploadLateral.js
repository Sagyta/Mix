const multer = require("multer");
const path = require("path");

// Configuración para guardar las imágenes laterales
const storageLateral = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Ads/lateral/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Configuración de Multer para imágenes laterales
const uploadLateral = multer({
  storage: storageLateral,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Archivo lateral no permitido"), false);
    }
  },
});

module.exports = uploadLateral;
