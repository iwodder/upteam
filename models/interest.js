class Interest {

    static id = 0;
    id;
    language;
    level;

    constructor(props) {
        this.language = props.language;
        this.level = props.level;
        this.id = (Interest.id += 1);
    }

    getLanguage() {
        return this.language;
    }

    getLevel() {
        return this.level
    }
}

module.exports = {
    Interest
}