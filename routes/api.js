const express = require('express');
const router = express.Router();
const User = require('../models/passport/user');
const passport = require('../models/passport/passportuser');
const Gamestatus = require('../models/gamestatus');

var characteroneMoney = [20, 40, 80, 160];
var charactertwoMoney = [30, 60, 120, 240];
var characterthreeMoney = [40, 80, 160, 320];
var characterfourMoney = [50, 100, 200, 400];
var castleMoney = [100, 200, 300, 500];

router.get('/gamestatus', (req, res) => {
    if (req.user) {
        Gamestatus.findOne({ user: req.user.username }, (err, results) => {
            res.json(results);
        })
    }
    else {
        res.json('no user');
    }
})
router.put('/upgrade/:character', (req, res) => {
    Gamestatus.findOne({ user: req.user.username }, (err, results) => {
        var updatedInfo = results;
        var level; var moneyneed;
        if (req.params.character === 'characterone') {
            level = results.characterone;
            moneyneed = characteroneMoney[(level - 1)];
            updatedInfo.characterone += 1;
        }
        else if (req.params.character === 'charactertwo') {
            level = results.charactertwo;
            moneyneed = charactertwoMoney[(level - 1)];
            updatedInfo.charactertwo += 1;
        }
        else if (req.params.character === 'characterthree') {
            level = results.characterthree;
            moneyneed = characterthreeMoney[(level - 1)];
            updatedInfo.characterthree += 1;
        }
        else if (req.params.character === 'characterfour') {
            level = results.characterfour;
            moneyneed = characterfourMoney[(level - 1)];
            updatedInfo.characterfour += 1;
        }
        else if (req.params.character === 'castle') {
            level = results.castle;
            moneyneed = castleMoney[(level - 1)];
            updatedInfo.castle += 1;
        }
        updatedInfo.money -= moneyneed;

        if (updatedInfo.money < 0) {
            res.json('not enough money');
        }
        else if (level > 4) {
            res.json('max level');
        }
        else {
            Gamestatus.updateOne({ user: req.user.username }, updatedInfo, (err, endResults) => {
                res.json(endResults);
            })
        }
    })
})
router.put('/upgrade/lose/:level', (req, res) => {
    Gamestatus.findOne({ user: req.user.username }, (err, results) => {
        var updatedInfo = results;
        updatedInfo.money += 1;
        Gamestatus.updateOne({ user: req.user.username }, updatedInfo, (err, endResults) => {
            res.json(endResults);
        })
    })
})
router.put('/upgrade/win/:level', (req, res) => {
    console.log('========================='+ ' ' + req.params.level);
    Gamestatus.findOne({ user: req.user.username }, (err, results) => {
        var updatedInfo = results;
        var level = parseInt(req.params.level);
        if(updatedInfo.level === level){
            updatedInfo.money += 10;
            updatedInfo.level += 1;
        }
        else if((updatedInfo.level - 1) === level){
            updatedInfo.money += 5;
        }
        Gamestatus.updateOne({ user: req.user.username }, updatedInfo, (err, endResults) => {
            res.json(endResults);
        })
    })
})












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