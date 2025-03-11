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

// Sirviendo archivos estáticos de React en producción
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '../../client/build');
  console.log('Client Build Path:', clientBuildPath);

  server.use(express.static(clientBuildPath));

  server.get('*', (req, res) => {
    const indexHtmlPath = path.join(clientBuildPath, 'index.html');
    console.log('Index HTML Path:', indexHtmlPath);

    fs.access(indexHtmlPath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error('Error accediendo a la ruta del build:', err);
        return res.status(404).send("Página no encontrada");
      } else {
        res.sendFile(indexHtmlPath);
      }
    });
  });
}

// Ruta de la API principal (para pruebas, si es necesario)
server.get('/api/test', (req, res) => {
  res.json({ message: 'API funcionando correctamente' });
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


