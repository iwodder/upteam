const mongo = require('mongodb')
const url = 'mongodb://root:example@mongo:27017'
const client = mongo.MongoClient(url, {
    reconnectTries: 30,
    reconnectInterval: 30_000
})

const state = {
    db: null
}

function storeDb(err, db) {
    if (err) {
        console.log(err)
        // throw err;
    }
    if (db) {
        state.db = db.db('upteam');
    }
}

function getInterests(userId) {
    if (state.db) {
        return state.db.collection('interests')
            .findOne({"id": String(userId)})
    }
}

async function addInterest(userId, interest) {
    let i = await checkIfIdExists(userId, interest);
    while(i != null) {
        i = await checkIfIdExists(userId, interest.generateId());
    }

    return state.db.collection('interests')
        .updateOne({"id": String(userId)}, {$push: {"interests": interest}}, {upsert: true});
}

async function checkIfIdExists(userId, interest) {
    return await state.db.collection('interests')
        .findOne({ $and: [{"id": userId}, {"interests.id": {$eq: interest.id}}]})
}

function editInterest(userId, interest) {

    return state.db.collection('interests')
        .updateOne({$and: [{"id": String(userId)}, {"interests.id": {$eq: Number(interest.id)}}]},
            { $set: {"interest.language": interest.language, "interest.level": interest.level}})
}

async function getUserFromEmail(email) {
    if (!state.db) {
        await client.connect(storeDb);
    }
    return state.db.collection('user')
        .findOne({"email": email});
}

function deleteInterest(userId, interestId) {
    return state.db.collection('interests')
        .update({
            "id": String(userId)
        },
        {
            $pull: {
                'interests': {
                    'id': Number(interestId)
                }
            }
        })
}

function getUsersByInterest(term) {
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
                                    '$$i.language', term
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

    return state.db.collection('interests')
        .aggregate([
            {
                '$project': {
                    'interests': 1
                }
            }, {
                '$unwind': {
                    'path': '$interests'
                }
            }, {
                '$group': {
                    '_id': null,
                    'languages': {
                        '$addToSet': '$interests.language'
                    }
                }
            }
        ]).toArray();
}

module.exports = {
    getInterests,
    addInterest,
    editInterest,
    deleteInterest,
    getUserFromEmail,
    getUsersByInterest,
    getLanguages
}

