const fs = require('fs');
const path = require('path');

const db = (filePath) => {
    let DB = {};
    const loadJSONData = () => {
        DB = JSON.parse(fs.readFileSync(path.resolve(__dirname, filePath)));
    }

    const saveJSONData = () => {
        fs.writeFileSync(path.resolve(__dirname, filePath), JSON.stringify(DB));
        loadJSONData();
    }


    return Object.freeze({
        users: () => {
            loadJSONData();
            return DB.users;
        },
        addUser: (user) => {
            loadJSONData();
            const userExists = DB.users.some((existingUser) => existingUser.id === user.id && existingUser.email.toLowerCase() === user.email.toLowerCase());
            if (userExists) {
                return;
            }
            DB.users.push(user);
            saveJSONData();
            return DB.users.slice(-1).pop();
        }
    })
}

module.exports = { db };