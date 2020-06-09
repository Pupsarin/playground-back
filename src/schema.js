const {gql} = require('apollo-server');

const typeDefinitions = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    input UserInput {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Query {
        users: [User]
    }

    type Mutation {
        createUser(user: UserInput): User
    }
`;

module.exports = typeDefinitions;