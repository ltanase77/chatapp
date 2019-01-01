const expect = require('expect');
const {generateMessage} = require('./message')

describe('Testing generateMessage function', function() {
    it('should generate message object', function() {
        const generatedObject = generateMessage("Zeus", "Hi there!");
        expect(generatedObject.from).toBe("Zeus");
        expect(generatedObject.text).toBe("Hi there!");
        expect(typeof generatedObject.createdAt).toBe('number');
    });
});
