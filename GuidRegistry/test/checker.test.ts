import * as assert from "assert";
import {RedisKVClient} from "../src/checker/kvclient/kvClient";
import {Checker, CheckerWitKV} from "../src/checker/checker";
import {createGUID} from "../src/guid/guidLib";
import { GuidInfo } from "../src/guid/guidInfo";

describe('RedisChecker', function() {
    var checker: Checker = new CheckerWitKV(new RedisKVClient());

    it('should not checked at first', async function() {      
        var info:GuidInfo = {
            guid: createGUID(),
            source: "guidDuplicate\\test\\checker.test.ts",
            createdTime: Date.now(),
            generator: "Dummy"
        }
        var r = await checker.checkDuplicate(info);
        assert.equal(r, false);
        info.createdTime = Date.now();
        r = await checker.checkDuplicate(info);
        assert.equal(r, true);
    });  
    
    it('对于不规范的历史数据', async function() {      
        var info:GuidInfo = {
            guid: "d115fb85-ca88-41e4-e4e4-59d9cf84cb14",
            source: "guidDuplicate\\test\\checker.test.ts",
            createdTime: Date.now(),
            generator: "Dummy"
        }
        var r = await checker.checkDuplicate(info);
        assert.equal(r, true);
    });     
});
