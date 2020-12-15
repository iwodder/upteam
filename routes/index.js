var express = require('express');
var router = express.Router();
const {getLanguages} = require('../services/indexservice')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

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
    try {
        res.status(200)
        res.send(getLanguages())
    } catch (Error) {
        res.status(500)
        res.send("Error getting languages")
    }
})

module.exports = router;
