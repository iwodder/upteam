var express = require('express');
var router = express.Router();
const jwt = require('../authentication')

var {login, createInterest, interests, userDetails, validateToken, userDetailsJson} = require('../services/user/userservice')

router.get('/login', (req, res) => {
  res.render('userviews/login.pug')
})

router.post ('/login', (req, res) => {
  try {
    let token = login(req.body);
    if (token) {
      res.cookie("authtoken", token, {
        expires: new Date(Date.now()+90000)
      })
      res.send(userDetailsJson(req.body.username))
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
    res.render('userviews/userdetails.pug', userDetails(req.params.userId))
  } else {
    res.send("Please try again")
  }
})

module.exports = router;
