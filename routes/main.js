/*
Main router file for the URL route [ / ]
    - ALL API requests for the URL of "/" will lead through this router file.
    - This router handles the: login, logout, and sign up routes
*/


// require Express, the Home and auth Controllers
// auth controller from passport.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const homeController = require('../controllers/home');
const { ensureAuth, ensureGuest } = require('../middleware/auth');


// APIs:
router.get('/', homeController.getIndex);

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

router.get('/logout', authController.logout);

router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);


// export module for other files
module.exports = router;
