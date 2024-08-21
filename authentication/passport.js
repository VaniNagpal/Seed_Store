const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, done) {
        try {
            const user = await User.findOne({ googleId: profile.id });
            if (user) {
                return done(null, user);
            }
            const newUser = await User.create({
                googleId: profile.id,
                username: profile.displayName,
                googleAccessToken: accessToken,
                googleImg: profile.picture
            });
            return done(null, newUser);
        } catch (err) {
            done(err);
        }
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return cb(err, user);
        // });
    }
));

passport.use(new LocalStrategy(
    async function(username, password, done) {
        try {
            console.log(`Authenticating user: ${username}`);
            const user = await User.findOne({ username: username });
            if (!user) {
                console.log('User not found');
                return done(null, false, { message: 'Incorrect username.' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                console.log('Incorrect password');
                return done(null, false, { message: 'Incorrect password.' });
            }

            console.log('User authenticated');
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;
