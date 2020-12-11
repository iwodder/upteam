var userdata = require('./userdata')
var jwt = require('jsonwebtoken')

const {Interest} = require("../../models/interest");

const secretVal = 'somesupersecret' //Not secure

function login(requestBody) {
    let username = requestBody.username;
    let password = requestBody.password;

    if (username && password) {
        if (userdata.isValid(username, password)) {
            let u = userdata.getUserFromEmail(username)
            return createJwt(u);
        } else {
            return false
        }
    } else {
        throw new Error("Malformed request");
    }
}

function createJwt(user) {
    return jwt.sign({
        userId: user.id,
        email: user.email,
        role: user.roles,
        name: user.name
    }, secretVal)
}

function interests(id) {
    try {
        return userdata.getInterest(id)
    } catch (Error) {
        //Implement error handling
    }
}

function createInterest(userId, interest) {
   return userdata.addInterest(userId, new Interest(interest))
}

function updateInterest(userId, interests) {
    let interest = new Interest(interests);
    return userdata.editInterest(userId, interest)
}

function userDetailsByUsername(email) {
    if (email) {
        let user = userdata.getUserFromEmail(email);
        user.addInterests(userdata.getInterest(user.id))
        return user;
    } else {
        return null;
    }
}

function userDetailsById(id) {
    if (id) {
        let user = userdata.getUserFromId(id)
        user.addInterests(userdata.getInterest(id))
        return user
    } else {
        return null;
    }
}

function deleteInterest(userId, interestId) {
    if (userId && interestId) {
        return userdata.deleteInterest(userId, interestId)
    } else {
        throw new Error("Invalid input")
    }
}

function validateToken(token, userId) {
    if (token) {
        let payload =  jwt.verify(token, secretVal)
        return Number(userId) === payload.userId
    }
}

module.exports = {
    secretVal,
    login,
    interests,
    updateInterest,
    createInterest,
    deleteInterest,
    userDetailsByUsername,
    validateToken,
    userDetailsById
}


