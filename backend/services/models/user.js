class User {
    id;
    name;
    email;
    roles;
    company;
    interests;

    constructor(props) {
        this.id = props.id;
        this.email = props.email;
        this.name = props.name;
        this.roles = props.roles;
        this.company = props.company;
        this.interests = [];
    }

    addInterests(interests) {
        interests.forEach(i => this.interests.push(i));
    }

    addInterest(interest) {
        this.interests.push(interest);
    }
}

module.exports = {
    User
}