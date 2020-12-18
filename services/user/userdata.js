const {Interest} = require('../models/interest')
const {User} = require('../models/user')
const mongo = require('mongodb')
const url = 'mongodb://191.168.0.25:27017/upteam'
mongo.MongoClient.connect(url, storeDb)

const state = {
    db: null
}

function storeDb(err, db) {
    if (err) throw err;
    state.db = db.db();
}

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

function getInterests(userId) {
    if (state.db) {
        return state.db.collection('interests')
            .findOne({"id": String(userId)})
    }
}

async function addInterest(userId, interest) {
    let i = await checKIfIdExists(userId, interest);
    while(i != null) {
        i = await checKIfIdExists(userId, interest.generateId());
    }

    return state.db.collection('interests')
        .updateOne({"id": String(userId)}, {$push: {"interests": interest}});
}

async function checKIfIdExists(userId, interest) {
    return await state.db.collection('interests')
        .findOne({ $and: [{"id": userId}, {"interests.id": {$eq: interest.id}}]})
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
    if (state.db) {
        return state.db.collection('user')
            .findOne({"email": email});
    } else {
        throw new Error("Unable to initialize MongoDB connection")
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
    return state.db.collection('interests')
        .deleteOne({$and: [{"id": String(userId)}, {"interests.id": {$eq: Number(interestId)}}]})
}

function getUsersByInterest(term) {
    // return state.db.collection('interests')
    //     .find({"interests.language": {$eq: term}}).toArray()

    return state.db.collection('interests')
        .aggregate([
            {
                '$lookup': {
                    'from': 'user',
                    'localField': 'id',
                    'foreignField': 'id',
                    'as': 'user'
                }
            }, {
                '$project': {
                    'id': 1,
                    'user': 2,
                    'interests': {
                        '$filter': {
                            'input': '$interests',
                            'as': 'i',
                            'cond': {
                                '$eq': [
                                    '$$i.language', 'Java'
                                ]
                            }
                        }
                    }
                }
            }, {
                '$unwind': {
                    'path': '$user',
                    'preserveNullAndEmptyArrays': false
                }
            }, {
                '$project': {
                    'id': 1,
                    'user.name': 1,
                    'interests': 1
                }
            }
        ]).toArray();
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
    getInterests,
    addInterest,
    editInterest,
    deleteInterest,
    getUserFromEmail,
    getUserFromId,
    getUsersByInterest,
    getLanguages
}
