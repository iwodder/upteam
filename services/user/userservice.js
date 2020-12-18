var userdata = require('./userdata')
var jwt = require('jsonwebtoken')
const {User} = require("../models/user");

const {Interest} = require("../models/interest");

const secretVal = 'somesupersecret' //Not secure

function login(requestBody, user) {
    let username = requestBody.username;
    let password = requestBody.password;

    if (username && password) {
        if (username === user.email && password === user.password) {
            return createJwt(user);
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
        return userdata.getInterests(id)
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
        user.addInterests(userdata.getInterests(user.id))
        return user;
    } else {
        return null;
    }
}

function userDetailsById(id) {
    if (id) {
        let user = userdata.getUserFromId(id)
        user.addInterests(userdata.getInterests(id))
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

function findUsersByLanguage(queryParams) {
    if (queryParams.language) {
        return userdata.getUsersByInterest(queryParams.language)
    }
}

function validateToken(token, userId) {
    if (token) {
        let payload =  jwt.verify(token, secretVal)
        return Number(userId) === payload.userId
    }
}

function transformUserInterests(data) {
    let results = [];
    data.forEach(item => {
        if (item.user) {
            let user = new User(item.user);
            if (item.interests[0]) {
                let interest = new Interest(item.interests[0]);
                user.addInterest(interest)
            }
            results.push(user)
        }
    })
    return results;
}

module.exports = {
    secretVal,
    login,
    interests,
    updateInterest,
    transformUserInterests,
    deleteInterest,
    userDetailsByUsername,
    validateToken,
    userDetailsById,
    findUsersByLanguage
}


