import * as assert from "assert";
import {extractGuid} from "../src/lib/guid";

describe('Dump', function() {
  describe('extract', async function() {
    it('should match', function() {      
        var line = "values ('016d6b86-d7f8-ba24-0ee2-64528b54f1b1', to_date('08-08-2018 12:06:52', 'dd-mm-yyyy hh24:mi:ss'));"
        var r = extractGuid(line);
        assert.equal(r, '016d6b86-d7f8-ba24-0ee2-64528b54f1b1');
      });
      it("should not match", function(){
        var line = "insert into ROBILL0625 (ROBXDJ_NM, ROBXDJ_CJSJ)"
        var r = extractGuid(line);
        assert.equal(r == null, true);
      })
  });
});