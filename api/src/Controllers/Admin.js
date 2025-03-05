const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {User} = require('../db');
require("dotenv").config();

const login = async (req, res) => {

    // controllers/authController.js

    const { username, password } = req.body;

    try {
        // Buscar al usuario en la base de datos
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(400).json({ error: "Usuario no encontrado" });
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Contraseña incorrecta" });
        }
        // Verificar si el usuario es administrador
        if (user.isAdmin) {
            return res.json({
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                },
                isAdmin: user.isAdmin  // Aquí incluimos el isAdmin
            });
        } else {
            return res.status(403).json({ error: "No autorizado" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error en el servidor" });
    }
};

  
module.exports = {
    login
};