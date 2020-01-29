const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require("express-session");
 const apiRouter = require('./api-router.js');
 const authRouter = require('../auth/auth-router');
// const configureMiddleware = require('./configure-middleware.js');


const server = express();

const sessionConfig ={
    name: "CookieMariela",
    secret: process.env.SESSION_SECRET || "safe zone",
    maxAge: 1000 * 50 * 10,
    secure: false,
    httpsOnly: true,
    resave: false,
    saveUninitialized: true
}

// configureMiddleware(server);


server.use(helmet());
server.use(cors());
server.use(session(sessionConfig));
server.use(express.json());

server.use('/api/', apiRouter);
server.use('/api/', authRouter);
module.exports = server;