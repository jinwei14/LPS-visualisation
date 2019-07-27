// user/login  user/ register

const express = require('express');
const router = express.Router();


// Login Page
router.get('/login', (req, res) => res.send('login'));

// Register Page
router.get('/register', (req, res) => res.send('register'));


module.exports = router;
