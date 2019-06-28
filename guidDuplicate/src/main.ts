// import { repeatGuid } from "./local/master";
// repeatGuid(2000000);
import {Generator} from "./generator/generator";
import {FileGenerator} from "./generator/file/fileGenerator";
import {Checker} from "./checker/checker";
import {RedisChecker} from "../recycleBin/redisChecker";

async function main() {
    var checker:Checker = new RedisChecker();

    if(checker.start) {
        checker.start();
    }
    
    var generator:Generator = new FileGenerator("e://temp//ROBILLID.sql");
    
    generator.onGuid((guid) => {
        checker.check(guid);
    })
    
    if(generator.start){
        await generator.start(10);
    }
}

main();