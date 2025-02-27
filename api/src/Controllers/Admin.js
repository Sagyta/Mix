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

        console.log('Respuesta del backend (user y isAdmin):', {
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            isAdmin: user.isAdmin  // Verifica que isAdmin esté aquí
        });
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

   /* const { username, password } = req.body;

    console.log("Datos recibidos:", req.body);

    try {
        // Busca el usuario por username
        const user = await User.findOne({ where: { username } });
       // console.log("Usuario encontrado:", user);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Verifica que la contraseña coincida
        const validPassword = await bcrypt.compare(password, user.password);

       // console.log("comparacion contraseña", validPassword)
        if (!validPassword) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        // Crea el JWT
        const token = jwt.sign(
            { userId: user.id,
            isAdmin: user.isAdmin }, 
            process.env.JWT_SECRET, 
            { expiresIn: '3h' });
console.log(token)
        // Retorna el token y el usuario
        return res.status(200).json({ 
            message: "Inicio de sesión exitoso", 
            token,
            isAdmin: user.isAdmin 
        });
    } catch (error) {
        console.error("Error en el servidor:", error);
        return res.status(500).json({ message: "Error en el servidor", error });
    }*/


module.exports = {
    login
};