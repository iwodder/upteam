const {Interest} = require ('../models/interest')
const {User} = require('../models/user')

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
            new Interest({"language": "Java", "level": "INTERMEDIATE"}),
            new Interest({"language": "Structured Query Language", "level": "ADVANCED"})
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
        return interest;
    } else {
        return undefined;
    }
}

function editInterest(userId, interest) {
    let idx = preferences.findIndex(value => value.id === Number(userId))
    if (idx > -1) {
        let i = preferences[idx].interests.findIndex(i =>
            i.language.toLocaleLowerCase() === interest.language.toLocaleLowerCase())
        preferences[idx].interests[i] = interest;
        return true;
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
    let idx = users.findIndex(v => v.id === Number(id))
    if (idx > -1) {
        return new User(users[idx])
    } else {
        return null;
    }
}

function deleteInterest(userId, interestId) {
    let userInterestIdx = preferences.findIndex(v => v.id === Number(userId));
    if (userInterestIdx > -1) {
        let userInterests = preferences[userInterestIdx].interests;
        let interestIdx = userInterests.findIndex(v => v.id === Number(interestId))
        if (interestIdx > -1) {
            userInterests.splice(interestIdx, 1)
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function getUsersByInterest(term) {
    let interest = String(term).toLowerCase();
    let results = [];

    users.forEach(user => {
        let prefIdx = preferences.findIndex(v => v.id === user.id);
        preferences[prefIdx].interests.forEach(pref => {
            if (pref.language.toLowerCase() === interest) {
                let u = new User(user);
                u.addInterest(pref);
                results.push(u)
            }
        })
    })
    return results;
}

function getLanguages() {
    let results = [];

    preferences.forEach(v => {
        v.interests.forEach(i => {
            let lang = i.language;
            if (results.indexOf(lang) === -1) {
                results.push(lang)
            }
        })
    });
    return results;
}

module.exports = {
    isValid,
    getInterest,
    addInterest,
    editInterest,
    deleteInterest,
    getUserFromEmail,
    getUserFromId,
    getUsersByInterest,
    getLanguages
}
