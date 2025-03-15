const { Adslateral } = require("../db");

// Obtener todas las propagandas
const getAds = async (req, res) => {
  try {
    const ads = await Adslateral.findAll();
    // Aseguramos que las imágenes se puedan usar directamente como URLs
    const adsWithImageLinks = ads.map(ad => ({
      ...ad.dataValues,
      image: ad.image // Aquí debe ser el enlace completo que guardaste en la base de datos
    }));
    res.status(200).json(adsWithImageLinks);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las propagandas', error });
  }
};

// Crear una nueva propaganda
const createAd = async (req, res) => {
  try {
    const { image, name } = req.body;  // Cambié imageUrl a image

    if (!image) {  // Verifica si la URL de la imagen es proporcionada
      return res.status(400).json({ message: "La URL de la imagen es requerida." });
    }

    if (!name) {  // Verifica si el nombre es proporcionado
      return res.status(400).json({ message: "El nombre es requerido." });
    }

    // Guardar el nombre y la URL de la imagen en la base de datos
    const ad = await Adslateral.create({
      name,  // Nombre de la propaganda
      image, // URL de la imagen
    });

    res.status(201).json({ message: "Publicidad cargada exitosamente", ad });
  } catch (error) {
    console.error("Error al guardar la propaganda:", error);
    res.status(500).json({ message: "Error al guardar la publicidad", error: error.message });
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
  deleteAd,
};

