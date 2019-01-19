class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        const user = {
            id: id,
            name: name,
            room: room,
        };
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        const user = this.getUser(id);
        if (user) {
            this.users = this.users.filter(function(user) {
                return user.id !== id;
            });
        }
        return user;
    }

    getUser(id) {
        return this.users.filter(function(user) {
            return user.id === id;
        })[0];
    }

    getUserList(room) {
        const users = this.users.filter(function(user) {
            return user.room === room;
        });
        const namesArray = users.map(function(user) {
            return user.name;
        });
        return namesArray;
    }
}

module.exports = {Users};

// add user
// remove user

// fetch user
// get users list

/* class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getUserDescription() {
        return `${this.name} is ${this.age} years old!`;
    }
}

const me = new Person("Lucian", 42);
const description = me.getUserDescription();
console.log(description);
 */
