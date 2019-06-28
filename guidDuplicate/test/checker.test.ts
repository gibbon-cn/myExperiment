import * as assert from "assert";
import {RedisChecker} from "../src/checker/kvclient/redisChecker";
import {Checker} from "../src/checker/checker";
import {createGUID} from "../src/guid/guidLib";

describe('RedisChecker', function() {
    var checker: Checker = new RedisChecker();
    this.beforeEach(function(done){
        if(checker.start) {
            checker.start();
        }
        done();
    })
    it('should checked', async function() {      
        var guid = "d115fb85-ca88-41e4-e4e4-59d9cf84cb14";
        var r = await checker.check(guid);
        assert.equal((r as string).length>0, true);
    });

    it('should not checked at first', async function() {      
        var guid = createGUID();
        var r = await checker.check(guid);
        assert.equal(!r, true);
        r = await checker.check(guid);
        assert.equal((r as string).length>0, true);
    });    
});
