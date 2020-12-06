const {Interest} = require ('../../models/interest')
const {User} = require('../../models/user')

const users = [
    {
        id: 1,
        email: "john.smith@gmail.com",
        name: "John Smith",
        password: "passw0rd",
        roles: [
            "user"
        ]
    },
    {
        id: 2,
        email: "jane.smith@gmail.com",
        password: "abc123",
        roles: [
            "user", "manager"
        ]
    }
]

const preferences = [
    {
        email: "john.smith@gmail.com",
        interests: [
            new Interest({"language": "Java", "level": "medium"}),
            new Interest({"language": "Structured Query Language", "level": "advanced"})
        ]
    },
    {
        email: "jane.smith@gmail.com",
        interests: []
    }
]

function isValid(name, pass) {
    return users.filter( value =>
        value.email === name && value.password === pass
    ).length > 0
}

function getInterest(userId) {
    let idx = preferences.findIndex(value => value.email === userId)
    if (idx > -1) {
        return preferences[idx].interests
    }
}

function addInterest(userId, interest) {
    let idx = preferences.findIndex(value => value.email === userId)
    if (idx > -1) {
        let interests = preferences[idx].interests
        interests.push(interest)
        return true
    } else {
        return false;
    }
}

function getUser(email) {
    let idx = users.findIndex(value => value.email === email)
    if (idx > -1) {
        return new User(users[idx])
    } else {
        return null;
    }
}

module.exports = {
    isValid,
    getInterest,
    addInterest,
    getUser
}
