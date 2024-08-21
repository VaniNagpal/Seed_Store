const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('../authentication/passport');
const saltRounds = 10;

module.exports.getLogin = (req, res, next) => {
    if(req.isAuthenticated())return res.redirect('/shop/products');
    res.render('login');
};

module.exports.getSignup = (req, res, next) => {
    if(req.isAuthenticated())return res.redirect('/shop/products');
    res.render('signup')
};

module.exports.getHome = (req, res, next) => {
    res.render('index');
};


module.exports.postSignup = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        if (user) {
            res.render('signup', {
                msg: "This username already exists. Please choose another one."
            });
        } else {
            const hash = await bcrypt.hash(password, saltRounds);
            await User.create({ username, password: hash });
            res.redirect('/login');
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};

module.exports.postLogin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log('Authentication error:', err);
            return next(err);
        }
        if (!user) {
            console.log('Authentication failed:', info.message);
            return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            if (err) {
                console.log('Login error:', err);
                return next(err);
            }
            console.log('User logged in:', user.username);
            return res.redirect('/shop/products');
        });
    })(req, res, next);
};

module.exports.getProfile = (req, res, next) => {
    console.log('Is Authenticated:', req.isAuthenticated());
    console.log('User:', req.user);
    if (req.isAuthenticated()) {
        res.render('profile', { user: req.user });
    } else {
        res.redirect('/login');
    }
};
