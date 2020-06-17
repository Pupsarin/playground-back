const {ApolloServer} = require('apollo-server');
const typeDefs = require('./schema');
const { db } = require('./jsondb');

const DB = db('./db.json');

const resolvers = {
    Query: {
        users: DB.users,
    },
    //parent, args, context, info
    Mutation: {
        createUser: (_, {user}) => {
            return DB.addUser(user);
        }
    }
}


const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
    console.log(`Server on ${url}`);
})
