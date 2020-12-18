var express = require('express');
var router = express.Router();
const userdata = require("../services/user/userdata");

router.get('/levels', (req, res) => {
    res.status(200)
    res.send([
        {
            name: "BEGINNER",
            desc: "Beginner (<6mon)"
        },
        {
            name: "INTERMEDIATE",
            desc: "Intermediate (6mon >< 2yrs)"
        },
        {
            name: "ADVANCED",
            desc: "Advanced (2yrs >< 5yrs)"
        },
        {
            name: "EXPERT",
            desc: "Expert (5yrs>)"
        }])
})

router.get('/languages', (req, res) => {
    userdata.getLanguages().then(r => {
        console.log(r);
        res.status(200)
        res.send(r[0].languages)
    }).catch(err => {
        res.status(500)
        res.send("ERROR")
    })
})

module.exports = router;
