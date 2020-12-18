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

function updateInterest(userId, interests) {
    let interest = new Interest(interests);
    return userdata.editInterest(userId, interest)
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

function processLogin(req, res, data) {
    let token = login(req.body, data);
    if (token) {
        res.header('Authorization', token)
        let result = new User(data);
        userdata.getInterests(result.id)
            .then(r => {
                result.addInterests(processInterests(r));
                res.status(200)
                res.send(result);
            })
    } else {
        res.status(401)
        res.send("Unauthorized")
    }
}

function processInterests(i) {
    let results = [];
    i.interests.forEach(v => results.push(new Interest(v)))
    return results;
}

module.exports = {
    secretVal,
    processLogin,
    processInterests,
    login,
    interests,
    updateInterest,
    transformUserInterests,
    deleteInterest,
    findUsersByLanguage
}


