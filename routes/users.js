var express = require('express');
var router = express.Router();
const jwt = require('../authentication')

const {
  login, createInterest, updateInterest, interests, userDetailsByUsername, deleteInterest,
  validateToken, userDetailsById, findUsersByLanguage
} = require('../services/user/userservice');

const errMsg = "Error processing request, try again later.";

router.get('/login', (req, res) => {
  res.render('userviews/login.pug')
})

router.post ('/login', (req, res) => {
  try {
    let token = login(req.body);
    if (token) {
      res.cookie("authtoken", token, {
        expires: new Date(Date.now()+900000)
      })
      res.send(userDetailsByUsername(req.body.username))
    } else {
      res.status(401)
      res.send("Unauthorized")
    }
  } catch (e) {
    res.status(500);
    res.send("Unable to login");
  }
})

router.get('/:userId/interests', jwt.authentication, (req, res) => {
  let token = req.header("Authorization").split(' ')[1];
  if (token) {
    if (validateToken(token, req.params.userId)) {
      let result = interests(req.params.userId)
      res.send(result)
    }
  }
})

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
    let result = createInterest(req.params.userId, req.body);
    if (result) {
      res.status(200);
      res.send(result)
    } else {
      res.status(404);
      res.send("Not found")
    }
  } catch (Error) {
    res.status(500);
    res.send(errMsg)
  }
})
router.delete('/:userId/interests/:interestId', (req, res) => {
  try {
    if (deleteInterest(req.params.userId, req.params.interestId)) {
      res.status(200);
      res.send("Success")
    } else {
      res.status(404);
      res.send("Not found")
    }
  } catch (Error) {
    res.status(500);
    res.send(errMsg)
  }
})

router.get('/interests', (req, res) => {
  try {
    res.status(200);
    res.send(findUsersByLanguage(req.query))
  } catch (Error) {
    res.status(500);
    res.send(errMsg)
  }
})

module.exports = router;
