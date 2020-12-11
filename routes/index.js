var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/levels', (req, res) => {
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
module.exports = router;
