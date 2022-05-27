const express = require('express');
const res = require('express/lib/response');
const { get, render } = require('express/lib/response');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/register', authController.register) 

router.post('/login', authController.login) 

module.exports = router;