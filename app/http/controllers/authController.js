const User = require("../../models/user");
const bcrypt = require('bcrypt');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require("passport");

function authController() {
    const _getRedirectUrl = (req) => {
        // ..
        return req.user.role === 'admin' ? '/' : '/'
    }

    return {
        login(req, res) {
            res.render('play')
        },
        postLogin(req, res, next) {
            const { email, password } = req.body;
            //validate request
            if (!email || !password) {
                req.flash('error', '*All fields are required')
                return res.redirect('/login'); // for new request
            }
            passport.authenticate('local', (err, user, info) => {   //same as done in passport.js
                if (err) {
                    req.flash('error', info.message)
                    return next(err);
                }
                if (!user) {
                    req.flash('error', info.message)
                    return res.redirect('/login');
                }
                req.logIn(user, (err) => {
                    if (err) {
                        req.flash('error', info.message)
                        return next(err);
                    }

                    return res.redirect(_getRedirectUrl(req))
                })
            })(req, res, next)
        },
        profile(req, res) {
            return res.render('auth/profile')
        },
        register(req, res) {
            res.render('index')
        },
        async postRegister(req, res) {
            const { name, email, password } = req.body;
            //validate request
            if (!name || !email || !password) {
                req.flash('error', '*All fields are required')
                req.flash('name', name);
                req.flash('email', email);
                return res.redirect('/register'); // for new request
            }

            //check if email exists
            const doesUserExist = await User.exists({ email: email });
            if (doesUserExist) {
                req.flash('error', '*Email already taken');
                req.flash('name', name);
                req.flash('email', email);
                return res.redirect('/register');
            }

            //hash password
            const hashedPassword = await bcrypt.hash(password, 10)

            //create a user
            const user = new User({
                name: name,
                email,
                password: hashedPassword
            })
            await user.save().then((user) => {
                //login
               // res.send("item saved to database");
               return res.redirect('/')
            }).catch(err => {
                req.flash('error', 'Something went wrong')
                return res.redirect('/register');
            })

            // console.log(req.body);
        },
        logout(req, res) {
            req.logout();
            return res.redirect('/login');
        }
    }
}

module.exports = authController