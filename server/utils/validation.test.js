const expect = require("expect");
const {isRealString} = require("./validation");

describe("is real string", function() {
    it("should reject non-string values", function() {
        expect(isRealString(4)).toBeFalsy();
    });

    it("should reject string only with spaces", function() {
        expect(isRealString("   ")).toBeFalsy();
    });

    it("should allow string with non-space characters", function() {
        expect(isRealString(" React Course ")).toBeTruthy();
    });
});
