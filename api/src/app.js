const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/index');

require('./db');

const server = express();

server.name = 'API';

// Configurar CORS
server.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true
}));

server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

server.use('/', routes);

// Error handling
server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});


module.exports = server;


