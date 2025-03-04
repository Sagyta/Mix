const { Adsbanner } = require("../db");

// Obtener todas las propagandas
const  getAdsBanner = async (req, res, next) => {
  try {
    const ads = await Adsbanner.findAll();
    res.status(200).json(ads);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las propagandas', error });
  }
};

// Crear una nueva propaganda
const createAdBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No se subió ninguna imagen." });
    }

    // La URL de la imagen será la ruta completa desde la carpeta 'public/uploads/'
    const imageUrl = `uploads/${req.file.filename}`;

    // Guardamos la URL de la imagen en la base de datos
    const ads = await Adsbanner.create({ image: imageUrl });

    // Respondemos con éxito
    res.status(201).json({ message: "Imagen subida exitosamente", ads });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al subir la imagen", error: error.message });
  }
  
};


// Eliminar una propaganda
const deleteAdBanner = async (req, res) => {
  const { id } = req.params;

  try {
    const ad = await Adsbanner.findByPk(id);
    if (!ad) {
      return res.status(404).json({ message: 'Propaganda no encontrada' });
    }
    await ad.destroy();
    res.status(200).json({ message: 'Propaganda eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la propaganda', error });
  }
};

module.exports = {
  getAdsBanner,
  createAdBanner,
  deleteAdBanner
}