const {Interest} = require ('../../models/interest')
const {User} = require('../../models/user')

const users = [
    {
        id: 1,
        email: "john.smith@gmail.com",
        name: "John Smith",
        password: "passw0rd",
        company: "Company XYZ",
        roles: [
            "user"
        ]
    },
    {
        id: 2,
        email: "jane.smith@gmail.com",
        password: "abc123",
        company: "ABC Corp.",
        roles: [
            "user", "manager"
        ]
    }
]

const preferences = [
    {

        id: 1,
        interests: [
            new Interest({"language": "Java", "level": "medium"}),
            new Interest({"language": "Structured Query Language", "level": "advanced"})
        ]
    },
    {
        id: 2,
        interests: []
    }
]

function isValid(name, pass) {
    return users.filter( value =>
        value.email === name && value.password === pass
    ).length > 0
}

function getInterest(userId) {
    let idx = preferences.findIndex(value => value.id === Number(userId))
    if (idx > -1) {
        return preferences[idx].interests
    }
}

function addInterest(userId, interest) {
    let idx = preferences.findIndex(value => value.id === Number(userId))
    if (idx > -1) {
        let interests = preferences[idx].interests
        interests.push(interest)
        return true
    } else {
        return false;
    }
}

function getUserFromEmail(email) {
    let idx = users.findIndex(value => value.email === email)
    if (idx > -1) {
        return new User(users[idx]);
    } else {
        return null;
    }
}

function getUserFromId(id) {
    let idx = users.findIndex(v => v.id === id)
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
    getUserFromEmail,
    getUserFromId
}
