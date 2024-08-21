const express = require('express');
const router = express.Router();
const userController = require('../controller/user');

router.get('/', userController.getHome);
router.get('/login', userController.getLogin);
router.get('/signup', userController.getSignup);
router.post('/login', userController.postLogin);
router.post('/signup', userController.postSignup);
router.get('/profile', userController.getProfile);
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;

