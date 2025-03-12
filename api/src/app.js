const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/index');
const path = require("path")
const fs = require('fs');

require('./db');

const server = express();

server.name = 'API';

const frontUrl = process.env.HOST_FRONT;
// Configurar CORS
server.use(cors({
    origin: [frontUrl, 'http://localhost:3000'], 
    credentials: true
}));

server.use((req, res, next) => {
    res.setHeader("Referrer-Policy", "no-referrer-when-downgrade");
    next();
});

/*server.use(cors({
    origin: '*', // Esto permitirá solicitudes de cualquier origen
    credentials: true
}));*/



server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));


server.use('/', routes);

//imagenes ads

console.log('Archivos en uploads:', fs.readdirSync(path.join(__dirname, '../public/uploads')));

const archivosEnUploads = fs.readdirSync(path.join(__dirname, "../public/uploads"));
console.log("Archivos dentro de uploads:", archivosEnUploads);

server.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));



//console.log(__dirname)
// Error handling
server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});


module.exports = server;


