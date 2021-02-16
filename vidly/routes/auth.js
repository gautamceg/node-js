// Imports
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
// routes
router.post('/', async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let token = jwt.sign({sub: email}, config.get('jwtPrivateKey'));
    res.send(token).status(200);
});

module.exports = router;