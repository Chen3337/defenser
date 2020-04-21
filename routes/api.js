const express = require('express');
const router = express.Router();
const User = require('../models/passport/user');
const passport = require('../models/passport/passportuser');
const Gamestatus = require('../models/gamestatus');

router.get('/gamestatus', (req, res) => {
    if (req.user) {
        Gamestatus.findOne({ user: req.user.username }, (err, results) => {
            res.json(results);
        })
    }
    else {
        res.json('no user');
    }
});














// add a new user route
router.post('/', (req, res) => {
    const { username, password } = req.body
    // ADD VALIDATION
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the username: ${username}`
            })
        }
        else {
            const newUser = new User({
                username: username,
                password: password
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                var newPlayer = {
                    user: username,
                    vocab: []
                }
                Gamestatus.create(newPlayer)
                    .then(() => res.json(savedUser))
                    .catch(console.log("Error !!!!"));
            })
        }
    })
})

router.post(
    '/login',
    function (req, res, next) {
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body)
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.user);
        var userInfo = {
            username: req.user.username
        };
        res.send(userInfo);
    }
)

router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user.username })
    } else {
        res.json({ user: null })
    }
})

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

module.exports = router