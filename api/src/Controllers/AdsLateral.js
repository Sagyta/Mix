const { Adslateral } = require("../db");

// Obtener todas las propagandas
const  getAds = async (req, res, next) => {
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
    if (!req.file) {
      return res.status(400).json({ message: "No se subió ninguna imagen." });
    }

    // La URL de la imagen será la ruta completa desde la carpeta 'public/uploads/'
    const imageUrl = `uploads/${req.file.filename}`;

    // Guardamos la URL de la imagen en la base de datos
    const ads = await Adslateral.create({ image: imageUrl });

    // Respondemos con éxito
    res.status(201).json({ message: "Imagen subida exitosamente", ads });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al subir la imagen", error: error.message });
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
  deleteAd
}
/*const uploadAdvertImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No se subió ninguna imagen." });
    }

    // La URL de la imagen será la ruta completa desde la carpeta 'public/uploads/'
    const imageUrl = `uploads/${req.file.filename}`;

    // Guardamos la URL de la imagen en la base de datos
    const ads = await AdsLateral.create({ image: imageUrl });

    // Respondemos con éxito
    res.status(201).json({ message: "Imagen subida exitosamente", ads });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al subir la imagen", error: error.message });
  }
};

const getAllAdverts = async (req, res) => {
  try {
    const ads = await AdsLateral.findAll();
    res.json(adverts);  // Devuelve todas las imágenes guardadas
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las imágenes", error: error.message });
  }
};


module.exports = {
  uploadAdvertImage,
  getAllAdverts
}*/
