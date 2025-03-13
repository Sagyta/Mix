const { Adslateral } = require("../db");

// Obtener todas las propagandas
const getAds = async (req, res, next) => {
  try {
    const ads = await Adslateral.findAll();
    res.status(200).json(ads);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las propagandas', error });
  }
};

// Crear una nueva propaganda
const createAd = async (req, res) => {
  try {
    // Verificar que se haya subido una imagen
    if (!req.file) {
      return res.status(400).json({ message: "No se subió ninguna imagen." });
    }

    // Verificar que el nombre haya sido enviado
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "El nombre es requerido." });
    }

    // La URL de la imagen será la ruta completa desde la carpeta 'Ads/lateral/'
    const imageUrl = `Ads/lateral/${req.file.filename}`;

    // Guardar la imagen y el nombre en la base de datos
    const ad = await Adslateral.create({
      name, // Nombre de la propaganda
      image: imageUrl, // Ruta de la imagen
    });

    res.status(201).json({ message: "Imagen subida exitosamente", ad });
  } catch (error) {
    console.error("Error al guardar la propaganda:", error);
    res.status(500).json({ message: "Error al subir la imagen", error: error.message });
  }
};

// Editar una propaganda existente
const updateAd = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const ad = await Adslateral.findByPk(id);
    if (!ad) {
      return res.status(404).json({ message: 'Propaganda no encontrada' });
    }

    if (name) {
      ad.name = name;
    }

    // Si hay un archivo de imagen nuevo, actualizar la imagen
    if (req.file) {
      ad.image = `Ads/lateral/${req.file.filename}`;
    }

    await ad.save();
    res.status(200).json({ message: "Propaganda actualizada exitosamente", ad });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la propaganda', error });
  }
};

// Eliminar una propaganda
const deleteAd = async (req, res) => {
  const { id } = req.params;

  try {
    const ad = await Adslateral.findByPk(id);
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
  getAds,
  createAd,
  updateAd,
  deleteAd,
};
