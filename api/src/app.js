const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/index');
const path = require("path")
const fs = require('fs')


require('./db');

const server = express();

server.name = 'API';

// Configurar CORS
server.use(cors({
    origin: ['http://localhost:3000', 'https://mix-front.onrender.com'], 
    credentials: true
}));

server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

server.use('/', routes);

//imagenes ads
server.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

// Ruta para servir contenido estático de React
server.use(express.static(path.join(__dirname, 'client', 'build')));  // Asegúrate de servir los archivos estáticos

// Manejo de cualquier otra solicitud (que no sea de API), para servir el index.html de React
server.get('*', (req, res, next) => {
  const reactBuildPath = path.join(__dirname, 'client', 'build', 'index.html');
  console.log('reactBuildPath:', reactBuildPath);  // Verifica la ruta
  
  fs.access(reactBuildPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log('Error accediendo a la ruta del build:', err);  // Verifica el error
      return res.status(404).send("Página no encontrada");
    } else {
      res.sendFile(reactBuildPath);  // Si existe el archivo, lo sirve
    }
  });
});
//console.log(__dirname)
// Error handling
server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});


module.exports = server;


