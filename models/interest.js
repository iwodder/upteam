
class Interest {
    lang;
    level;

    constructor(jsonInt) {
        this.lang = jsonInt.language;
        this.level = jsonInt.level;
    }

    getLanguage() {
        return this.lang;
    }

    getLevel() {
        return this.level
    }

}

module.exports = {
    Interest
}