// user/login  user/register

const express = require('express');
const userRouter = express.Router();
const path = require('path');

// Register Page
userRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Will send all the user to you!');
    })
    .post((req, res, next) => {
        res.end('Will add the user: with details: ');
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /user');
    })
    .delete((req, res, next) => {
        res.end('Deleting all user');
    });

module.exports = userRouter;
