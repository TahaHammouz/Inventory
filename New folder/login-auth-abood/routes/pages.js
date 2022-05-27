const express = require('express');
const res = require('express/lib/response');
const { get, render } = require('express/lib/response');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/register', (req, res) => {
    res.render('register')
});
router.get('/login', (req, res) => {
    res.render('login')
});

module.exports = router;