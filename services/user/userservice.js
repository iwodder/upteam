var userdata = require('./userdata')
var jwt = require('jsonwebtoken')

const {Interest} = require("../../models/interest");

const secretVal = 'somesupersecret' //Not secure

function echo(string) {
    return `Hello, ${string}`
}

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

function addInterest(interest) {
    userdata.addInterest()
}

function createInterest(userId, interests) {
    let interest = new Interest(interests);
    return userdata.addInterest(userId, interest)
}

function userDetails(email, id) {
    if (email) {
        let user = userdata.getUserFromEmail(email);
        user.addInterests(userdata.getInterest(user.id))
        return user;
    } else if (id && !email) {
        let user = userdata.getUserFromId(id)
        user.addInterests(userdata.getInterest(id))
        return user
    } else {
        return null;
    }
}

function userDetailsJson(email, id) {
    if (email) {
        return userdata.getUserFromEmail(email);
    } else if (id && !email) {
        return userdata.getUserFromId(id)
    } else {
        return null;
    }
}

function validateToken(token, userId) {
    if (token) {
        let payload =  jwt.verify(token, secretVal)
        return Number(userId) === payload.userId
    }
}

module.exports = {
    echo,
    secretVal,
    login,
    interests,
    createInterest,
    userDetails,
    validateToken,
    userDetailsJson
}


