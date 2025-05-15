const express = require('express');
const router = express.Router();
// const verifyToken = require("../controllers/protectController.js")
const {signup,
    login, 
    logout, 
    updatePassword}  = require('../controllers/UserController.js');

    router.post('/signup', signup);
    router.post('/login', login);
    router.get('/logout', logout);
    router.put('/update/:id',  updatePassword);


module.exports = router;