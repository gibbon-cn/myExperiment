import * as assert from "assert";
import {KVClient, RedisKVClient} from "../src/checker/kvclient/kvClient";
import {createGUID} from "../src/guid/guidLib";

describe('RedisKVClient', function() {
  describe('get', async function() {
    var client: KVClient;
    before(function(done){
        client = new RedisKVClient();
        done();
    });
    it('exists -> set -> exists ->get', async function() {
      var key = createGUID();
      var val = await client.exists(key);
      assert.equal(val, false);
      await client.set(key, "any thing");
      val = await client.exists(key);
      assert.equal(val, true);
      if(val) {
        var val2 = await client.get(key);
        assert.equal(val2, "any thing");
      }
    });
  });
});