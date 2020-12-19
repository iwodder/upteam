var express = require('express');
var router = express.Router();
const userdata = require("../services/user/userdata");
const {Interest} = require("../services/models/interest");
const {
    transformUserInterests,
    processLogin,
    processInterests
} = require('../services/user/userservice');

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

router.get('/:userId/interests', (req, res) => {
    userdata.getInterests(req.params.userId)
        .then(result => {
            res.status(200)
            if (result) {
                res.send(processInterests(result))
            } else {
                res.send([]);
            }
        }).catch(err => {
            res.status(500);
            res.send(errMsg)
        })
})

router.put('/:userId/interests/:interestId', (req, res) => {
    userdata.editInterest(req.params.userId, req.body)
        .then(r => {
            res.status(200);
            res.send("Updated")
        }).catch(err => {
            res.status(500);
            res.send(errMsg)
        });
})

router.post('/:userId/interests', (req, res) => {
    let interest = new Interest(req.body);
    userdata.addInterest(req.params.userId, interest)
        .then(r => {
            if ((r.result.nModified === 1 && r.result.ok === 1) || r.result.upserted) {
                res.status(200);
                res.send(interest);
            } else {
                res.status(404);
                res.send("Not found")
            }
        }).catch(err => {
        res.status(500);
        res.send(errMsg)
    });
})

router.delete('/:userId/interests/:interestId', (req, res) => {
    try {
        userdata.deleteInterest(req.params.userId, req.params.interestId)
            .then(result => {
                if (r.result.nModified === 1 && r.result.ok === 1) {
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
