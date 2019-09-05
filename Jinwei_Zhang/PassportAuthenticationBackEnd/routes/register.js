// user/login  user/register

const express = require('express');
const userRouter = express.Router();
const path = require('path');
const bcrypt = require('bcryptjs'); // I dong want to use it anymore.

const User = require('../models/user');
// Register Page
userRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })

    // get the message (conflict with the express.static)
    .get((req, res, next) => {
        res.end('Will send all the user to you!');
    })

    // This adding (posting to the database)
    .post((req, res, next) => {
        console.time('Register request API Time');
        // This require the html tag to be name =="??"
        const { name, email, phone, job, password, confirm_password } = req.body;
        User.findOne({email:email})
            .then(user => {
                if (user){
                    console.log('user already exist!!!!!!!!!!!!!');
                    res.send(500,'user already exist');
                }else{
                    const newUser = new User({
                        name:name,
                        email:email,
                        phone: phone,
                        job: job,
                        password:password
                    });
                    //save the data into database
                    newUser
                        .save()
                        .then(user => {
                            res.redirect('/');
                        })
                        .catch(err => console.log(err));

                    console.log('The new user is added',newUser);
                }
            });
        console.log('The input is: ', req.body);
        console.timeEnd('Register request API Time');
    })

    //modifing the data (not suportted)
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /user');
    })

    //delete data in the data base.
    .delete((req, res, next) => {
        res.end('Deleting all user');
    });

module.exports = userRouter;
