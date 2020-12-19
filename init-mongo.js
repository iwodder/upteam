db.user.insertMany([
    {
        "id": "1",
        "email": "john.smith@gmail.com",
        "name": "John Smith",
        "password": "passw0rd",
        "company": "Company XYZ",
        "roles": [
            "user"
        ]
    },
    {
        "id": "2",
        "email": "jane.smith@gmail.com",
        "name": "Jane Smith",
        "password": "abc123",
        "company": "Company XYZ",
        "roles": [
            "user", "manager"
        ]
    }
])

db.interests.insertMany([
    {
        "id": "1",
        "interests": [
            {
                "id": 905144167,
                "language": "JAVA",
                "level": "EXPERT"
            }
        ]
    },
    {
        "id": "2",
        "interests": [
            {
                "id": 1,
                "language": "JAVA",
                "level": "BEGINNER"
            },
            {
                "id": 2,
                "language": "RUST",
                "level": "BEGINNER"
            }]
    }

])