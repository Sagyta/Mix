const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require('../db');
require("dotenv").config();

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Verificar si ya está autenticado
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            try {
                jwt.verify(token, process.env.JWT_SECRET);
                return res.json({ message: "Usuario ya está logueado" });
            } catch (err) {
                console.log("Token inválido o expirado:", err.message);
            }
        }

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
            // Generar el token JWT
            const token = jwt.sign(
                { id: user.id, username: user.username, isAdmin: user.isAdmin },
                process.env.JWT_SECRET,
                { expiresIn: '1h' } // El token expira en 1 hora
            );

            return res.json({
                message: "Login exitoso",
                token
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
