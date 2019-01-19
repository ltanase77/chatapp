const expect = require("expect");
const {generateMessage, generateLocation} = require("./message");

describe("Testing generateMessage function", function() {
    it("should generate message object", function() {
        const generatedObject = generateMessage("Zeus", "Hi there!");
        expect(generatedObject.from).toBe("Zeus");
        expect(generatedObject.text).toBe("Hi there!");
        expect(typeof generatedObject.createdAt).toBe("number");
    });
});

describe("Generate location message", function() {
    it("should generate correct location object", function() {
        const locationObject = generateLocation("Admin", 5, 10);
        expect(locationObject.from).toBe("Admin");
        expect(locationObject.url).toBe("https://www.google.com/maps?q=5,10");
        expect(typeof locationObject.createdAt).toBe("number");
    });
});
