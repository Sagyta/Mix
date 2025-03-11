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

// Serve the static files from React
server.use(express.static(path.join(__dirname, 'build')));

// All other requests should return the React app
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
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


