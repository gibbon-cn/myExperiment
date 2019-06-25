"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const client_1 = require("../src/client");
describe('RedisClient', function () {
    var client = new client_1.RedisClient();
    describe('get', async function () {
        var v = await client.get("abc");
        it('should return 123', function () {
            assert.equal(v, "123");
        });
    });
});
//# sourceMappingURL=test.js.map