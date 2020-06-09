const fs = require('fs');
const path = require('path');
const {ApolloServer} = require('apollo-server');
const typeDefs = require('./schema');

const users = [
    {id: 1, name: "John Doe", email: "john@gmail.com", age: 22},
    {id: 2, name: "Jane Doe", email: "jane@gmail.com", age: 23},
    {id: 3, name: "NOT Doe", email: "NOT@gmail.com", age: 40}
];

class DB {
    #filePath;
    #db;

    constructor(filePath) {
        this.#filePath = filePath;
    }

    #loadJSONData = () => {
        this.#db = JSON.parse(fs.readFileSync(path.resolve(__dirname, this.#filePath)));
    }

    #saveJSONData = () => {
        fs.writeFileSync(path.resolve(__dirname, this.#filePath), JSON.stringify(this.#db));
        this.#loadJSONData();
    }

    get users() {
        this.#loadJSONData();
        return this.#db.users;
    }

    addUser(user) {
        this.#loadJSONData();
        const userExists = this.#db.users.some((existingUser) => existingUser.id === user.id && existingUser.email.toLowerCase() === user.email.toLowerCase());
        if (userExists) {
            return;
        }
        this.#db.users.push(user);
        this.#saveJSONData();
        return this.users.slice(-1).pop();
    }

}

const db = new DB('./db.json');


const resolvers = {
    Query: {
        users: () => db.users,
    },
    //parent, args, context, info
    Mutation: {
        createUser: (_, {user}) => {
            return db.addUser(user);
        }
    }
}


const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
    console.log(`Server on ${url}`);
})

