var userdata = require('./userdata')
var jwt = require('jsonwebtoken')

const {Interest} = require("../../models/interest");

const secretVal = 'somesupersecret' //Not secure

function echo(string) {
    return `Hello, ${string}`
}

function login(requestBody) {
    if (requestBody.email && requestBody.password) {
        if (userdata.isValid(requestBody.email, requestBody.password)) {
            let u = userdata.getUser(requestBody.email)
            return createJwt(u);
        } else {
            return "Invalid request data"
        }
    } else {
        throw new Error("Malformed request");
    }
}

function createJwt(user) {
    return jwt.sign({
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

function userDetails(email) {
    return userdata.getUser(email);
}

function validateToken(token) {
    if (token) {
        let payload =  jwt.verify(token, secretVal)
        return true;
    }
}

module.exports = {
    echo,
    secretVal,
    login,
    interests,
    createInterest,
    userDetails,
    validateToken
}


