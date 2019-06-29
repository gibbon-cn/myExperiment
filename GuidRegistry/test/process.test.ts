import {forkFile} from "../src/generator/local/process";

var i = 0;
var doFork = () => {
    i = i + 1;
    forkFile("./test/childForTest.ts", (c, s, ch)=>{
        console.log( i + " is leaving: " + ch.pid);
        if(i<10) {
            doFork();
        }
    });
}

describe('process', function() {
    doFork();
});