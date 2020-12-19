class Interest {

    id;
    language;
    level;

    constructor(props) {
        this.language = upperCase(props.language)
        this.level = upperCase(props.level);
        if (props.id) {
            this.id = props.id
        } else {
            this.generateId()
        }
    }

    generateId() {
        this.id = Math.floor((Math.random() * 1_000_000_000) + 1);
    }

    getLevel() {
        return this.level
    }
}

function upperCase(str) {
    return str ? String(str).toUpperCase() : "";
}

module.exports = {
    Interest
}