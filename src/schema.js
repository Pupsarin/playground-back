const {gql} = require('apollo-server');

const typeDefinitions = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        pass: String!
    }

    input UserInput {
        id: ID!
        name: String!
        email: String!
        pass: String!
    }

    type Query {
        users: [User]
    }

    type Mutation {
        createUser(user: UserInput): User
    }
`;

module.exports = typeDefinitions;