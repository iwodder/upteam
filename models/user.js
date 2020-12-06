class User {
    id;
    name;
    email;
    roles;

    constructor(props) {
        this.id = props.id;
        this.email = props.email;
        this.name = props.name;
        this.roles = props.roles
    }

}

module.exports = {
    User
}