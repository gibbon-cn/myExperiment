import * as assert from "assert";
import {Generator} from "../src/generator/generator";
import {FileGenerator} from "../src/generator/file/fileGenerator";

describe('Generator', function() {
    describe("FileGenerator", function(){
        var generator:Generator = new FileGenerator("E:\\temp\\billID.sql");
        generator.onGuid((guid)=>{
            console.log(guid);
            assert.equal(guid.length > 0, true);
        });
        if(generator.start) {
            generator.start(2);
        }
    })    
});
