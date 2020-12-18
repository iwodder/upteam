var express = require('express');
var router = express.Router();
const userdata = require("../services/user/userdata");
const {Interest} = require("../services/models/interest");
const {User} = require("../services/models/user");

const {login, updateInterest, userDetailsById, transformUserInterests} = require('../services/user/userservice');

const errMsg = "Error processing request, try again later.";

router.post('/login', (req, res) => {
    try {
        userdata.getUserFromEmail(req.body.username)
            .then(result => processLogin(req, res, result))
    } catch (e) {
        res.status(500);
        res.send(errMsg)
    }
})

function processLogin(req, res, data) {
    let token = login(req.body, data);
    if (token) {
        res.header('Authorization', token)
        let result = new User(data);
        userdata.getInterests(result.id)
            .then(r => {
                result.addInterests(processInterests(r));
                res.status(200)
                res.send(result);
            })
    } else {
        res.status(401)
        res.send("Unauthorized")
    }
}

router.get('/:userId/interests', (req, res) => {
    userdata.getInterests(req.params.userId)
        .then(result => {
            console.log(result)
            res.status(200)
            res.send(processInterests(result))
        })
})

function processInterests(i) {
    let results = [];
    i.interests.forEach(v => results.push(new Interest(v)))
    return results;
}

//TODO: Update this route to use interest id for updates
router.put('/:userId/interests', (req, res) => {
    if (updateInterest(req.params.userId, req.body)) {
        res.send(userDetailsById(req.params.userId))
    } else {
        res.send("Please try again")
    }
})

router.post('/:userId/interests', (req, res) => {
    try {
        let interest = new Interest(req.body);
        userdata.addInterest(req.params.userId, interest)
            .then(r => {
                console.log(r)
                if (r.result.nModified === 1 && r.result.ok === 1) {
                    res.status(200);
                    res.send(interest);
                } else {
                    res.status(404);
                    res.send("Not found")
                }
            })
    } catch (Error) {
        res.status(500);
        res.send(errMsg)
    }
})

router.delete('/:userId/interests/:interestId', (req, res) => {
    try {
        userdata.deleteInterest(req.params.userId, req.params.interestId)
            .then(result => {
                console.log(result);
                if (result.deletedCount === 1) {
                    res.status(200);
                    res.send("Success");
                } else {
                    res.status(404);
                    res.send("Not found")
                }
            })
    } catch (Error) {
        res.status(500);
        res.send(errMsg)
    }
})

router.get('/interests', (req, res) => {
    try {
        userdata.getUsersByInterest(req.query.language)
            .then(r => {
                return transformUserInterests(r);
            }).then(result => {
                res.status(200);
                res.send(result)
            })
    } catch (Error) {
        res.status(500);
        res.send(errMsg)
    }
})

module.exports = router;
