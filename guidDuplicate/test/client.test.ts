import * as assert from "assert";
import {RedisClient} from "../src/client";
describe('RedisClient', function() {
  describe('get', async function() {
    var client: RedisClient;
    before(function(done){
        client = new RedisClient();
        done();
    })
    it('should return 1561457235478', async function() {
        var val = await client.get("7ee5b563-08c3-f2c3-d6aa-85703ddf0378");
        assert.equal(val, "1561457235478");
    });
  });
});