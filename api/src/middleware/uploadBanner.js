const multer = require("multer");
const path = require("path");

// Configuración para guardar las imágenes de banners
const storageBanner = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Ads/banner/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Configuración de Multer para imágenes de banners
const uploadBanner = multer({
  storage: storageBanner,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Archivo de banner no permitido"), false);
    }
  },
});

module.exports = uploadBanner;
