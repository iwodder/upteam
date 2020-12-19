const userdata = require('./user/userdata')

function getLanguages() {
    return userdata.getLanguages()
}

module.exports = {
    getLanguages
}