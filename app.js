const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('./authentication/passport');
const hbs = require('hbs');

require('dotenv').config();

const app = express();
const PORT = 4000;

// Middleware

app.use(session({
    secret: "asdfghjkjkl",
    resave: false,
    saveUninitialized: true,
    store:MongoStore.create({ mongoUrl: process.env.MONGO_URL })
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const adminrouter = require('./routes/admin');
const shoprouter = require('./routes/shop');
const userRoutes = require('./routes/user');
const { isAdmin } = require('./middleware/isAdmin');
const { isLoggedin } = require('./middleware/isLoggedin');

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('eq', (arg1, arg2, options) => (arg1 == arg2 ? options.fn(this) : options.inverse(this)));

// Google OAuth Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'],prompt: 'select_account' }));
app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => res.redirect('/shop/products')
);

// Protected Routes
app.use('/admin', isAdmin, adminrouter);
app.use('/shop', isLoggedin, shoprouter);
app.use('/', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
