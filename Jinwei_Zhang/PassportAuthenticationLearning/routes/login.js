// user/login  user/register

const express = require('express');
const loginRouter = express.Router();
const path = require('path');
const passport = require('passport');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
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
        passport.authenticate('local', {
            successRedirect: '/main',
            failureRedirect: '/',
        })(req, res, next);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /');
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.end('Deleting operation not supported on /');
    });


loginRouter.route('/main')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get(ensureAuthenticated,(req, res, next) => {
        res.redirect('/main.html');
    });


module.exports = loginRouter;
