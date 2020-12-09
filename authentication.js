const jwt = require('jsonwebtoken');
const fs = require("fs");

const secret = fs.readFileSync("./secretkey", encoding="utf8")

const authentication = function (req, res, next) {
    let auth = req.header("authorization");
    let token = auth.split(" ")[1];
    if (token) {
        let payload = jwt.verify(token, secret);
        if (payload) {
            next();
        }
    } else {
        res.status(401)
        res.send("Unable to authenticate")
    }
}

module.exports = {
    authentication
}