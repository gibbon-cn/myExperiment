import * as assert from "assert";
import { HttpWsServer } from "../src/generator/agent/server";

describe('HttpWsServer', function() {    
  describe('accept guid', async function() {
      var server = new HttpWsServer("127.0.0.1", 80); 
      var count = 0
      this.beforeEach((done)=>{
        server.start();
        server.onGuid((guid)=>{
            count ++;
            if(count >= 100) {
              done();
            }
        });
      })
    it('should match 100', function() {      
        assert.equal( count, 100);
      });
  });
});