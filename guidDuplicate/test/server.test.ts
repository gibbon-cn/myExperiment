import * as assert from "assert";
import { HttpWsServer } from "../src/agent/server";
import {extractGuid} from "../src/lib/guid";

describe('DedupServer', function() {    
  describe('accept guid', async function() {
      var server = new HttpWsServer("127.0.0.1", 8848); 
      var aGuid = "";
      this.beforeEach((done)=>{
        server.start();
        server.onGuid((guid)=>{
            aGuid = guid;
            done();
        });
      })
    it('should match', function() {      
        console.log(aGuid);
        assert.equal( extractGuid(aGuid) != null, true);
      });
  });
});