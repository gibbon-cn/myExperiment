import * as assert from "assert";
import {KVClient, RedisKVClient} from "../src/checker/kvclient/kvClient";
import {createGUID} from "../src/guid/guidLib";

describe('RedisKVClient', function() {
  describe('get', async function() {
    it('localhost: exists -> set -> exists ->get', async function() {
      var client: KVClient;
        client = new RedisKVClient();
        if(client.connect) {
          try{
            await client.connect();
            console.log('connected');
          }catch(e){
            console.log(e);
            process.exit(0);
          }
        }
      console.log('it');
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
    it('remote: exists -> set -> exists ->get', async function() {
      var client: KVClient;
        client = new RedisKVClient("6379", "10.24.19.123");
        if(client.connect) {
          try{
            await client.connect();
            console.log('connected');
          }catch(e){
            console.log(e);
            process.exit(0);
          }
        }
      console.log('it');
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