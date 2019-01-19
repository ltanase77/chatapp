const expect = require("expect");
const {Users} = require("./users.js");

describe("User class", function() {
    let users;

    beforeEach(function() {
        users = new Users();
        users.users = [
            {
                id: 1,
                name: "Mike",
                room: "NodeJs",
            },
            {
                id: 2,
                name: "Judy",
                room: "ReactJs",
            },
            {
                id: 2,
                name: "Julie",
                room: "NodeJs",
            },
        ];
    });

    it("should add new user", function() {
        const users = new Users();
        const user = {
            id: "123",
            name: "Lucian",
            room: "ReactJs",
        };
        const resUsers = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it("should remove a user", function() {
        const userId = 1;
        const user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it("should not remove a user", function() {
        const userId = 11;
        const user = users.removeUser(userId);
        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it("should find a user", function() {
        const userId = 2;
        const user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });

    it("should not find a user", function() {
        const userId = 10;
        const user = users.getUser(userId);
        expect(user).toBeFalsy();
    });

    it("should retain users names for Node course", function() {
        const usersList = users.getUserList("NodeJs");
        expect(usersList).toEqual(["Mike", "Julie"]);
    });

    it("should retain users names for React course", function() {
        const usersList = users.getUserList("ReactJs");
        expect(usersList).toEqual(["Judy"]);
    });
});
