var express = require('express');
var router = express.Router();

var {login, createInterest, interests, userDetails, validateToken} = require('../services/user/userservice')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post ('/login', (req, res) => {
  try {
    let jwt = login(req.body);
    res.cookie("authtoken", jwt)
    if (jwt) {
      res.send(userDetails(req.body.email))
    }
  } catch (Error) {
    res.status(400);
    res.send("Unable to login in");
  }
})

router.get('/:userId/interests', (req, res) => {
  let token = req.header("authorization").split(' ')[1];
  if (token) {
    if (validateToken(token, req.params.userId)) {
      let result = interests(req.params.userId)
      res.send(result)
    }
  }
  res.status(401)
  res.send("Unauthorized")
})

router.put('/:userId/interest', (req, res) => {
  if (createInterest(req.params.userId, req.body)) {
    res.send("Success")
  } else {
    res.send("Please try again")
  }
})

module.exports = router;
