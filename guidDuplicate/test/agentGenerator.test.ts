import * as assert from "assert";
import { AgentGenerator } from "../src/generator/agent/agentGenerator";

describe('AgentGenerator', function() {    
  describe('accept guid', async function() {
      var server = new AgentGenerator("127.0.0.1", 80); 
      var count = 0
      this.beforeEach((done)=>{
        server.start();
        server.onGuid((info)=>{
            console.log(JSON.stringify(info));
            count ++;
            if(count >= 1000) {
              done();
            }
        });
      })
    it('should match 100', function() {      
        assert.equal( count, 100);
      });
  });
});