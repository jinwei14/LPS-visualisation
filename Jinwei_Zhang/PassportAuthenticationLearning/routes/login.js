// user/login  user/register

const express = require('express');
const loginRouter = express.Router();
const path = require('path');

// // // Login Page
// router.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public', 'login.html')));
//
// // Register Page
// router.get('/login', (req, res) => res.sendFile(path.join(__dirname, '../public', 'login.html')));
//
// Register Page
loginRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Will send all the dishes to you!');
    })
    .post((req, res, next) => {
        res.end('Will add the dish: with details: ');
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /dishes');
    })
    .delete((req, res, next) => {
        res.end('Deleting all dishes');
    });


module.exports = loginRouter;
