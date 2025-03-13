const { Adsbanner } = require("../db");

// Obtener todas las propagandas del banner
const getAdsBanner = async (req, res, next) => {
  try {
    const ads = await Adsbanner.findAll();
    res.status(200).json(ads);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las propagandas del banner', error });
  }
};

// Crear una nueva propaganda para el banner
const createAdBanner = async (req, res) => {
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

    // La URL de la imagen será la ruta completa desde la carpeta 'Ads/banner/'
    const imageUrl = `Ads/banner/${req.file.filename}`;

    // Guardar la imagen y el nombre en la base de datos
    const ad = await Adsbanner.create({
      name, // Nombre de la propaganda
      image: imageUrl, // Ruta de la imagen
    });

    res.status(201).json({ message: "Imagen subida exitosamente al banner", ad });
  } catch (error) {
    console.error("Error al guardar la propaganda del banner:", error);
    res.status(500).json({ message: "Error al subir la imagen del banner", error: error.message });
  }
};

// Editar una propaganda del banner existente
const updateAdBanner = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const ad = await Adsbanner.findByPk(id);
    if (!ad) {
      return res.status(404).json({ message: 'Propaganda del banner no encontrada' });
    }

    if (name) {
      ad.name = name;
    }

    // Si hay un archivo de imagen nuevo, actualizar la imagen
    if (req.file) {
      ad.image = `Ads/banner/${req.file.filename}`;
    }

    await ad.save();
    res.status(200).json({ message: "Propaganda del banner actualizada exitosamente", ad });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la propaganda del banner', error });
  }
};

// Eliminar una propaganda del banner
const deleteAdBanner = async (req, res) => {
  const { id } = req.params;

  try {
    const ad = await Adsbanner.findByPk(id);
    if (!ad) {
      return res.status(404).json({ message: 'Propaganda del banner no encontrada' });
    }
    await ad.destroy();
    res.status(200).json({ message: 'Propaganda del banner eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la propaganda del banner', error });
  }
};

module.exports = {
  getAdsBanner,
  createAdBanner,
  updateAdBanner,
  deleteAdBanner,
};
