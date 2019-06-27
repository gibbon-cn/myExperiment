import * as assert from "assert";
import {RedisClient} from "../src/checker/redis/client";
describe('RedisClient', function() {
  describe('get', async function() {
    var client: RedisClient;
    before(function(done){
        client = new RedisClient();
        done();
    })
    it('should return value', async function() {
        var val = await client.get("2b1d7869-2724-3406-80e6-e642d2d27c4d");
        assert.equal(val, "1561495430208");
    });
  });
});