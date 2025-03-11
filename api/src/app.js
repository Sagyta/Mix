const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/index');
const path = require("path")

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

// En producción, sirve los archivos de React
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  
  server.use(express.static(path.join(__dirname, '../../client/build')));

  // Cualquier ruta que no sea una API, redirige al index.html del frontend
  server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
  });
}

//console.log(__dirname)
// Error handling
server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});


module.exports = server;


