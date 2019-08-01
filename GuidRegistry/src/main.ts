// import { repeatGuid } from "./local/master";
// repeatGuid(2000000);
import {Generator} from "./generator/generator";
import {FileGenerator} from "./generator/file/fileGenerator";
import {Checker, CheckerWitKV} from "./checker/checker";
import { RedisKVClient, KVClient } from "./checker/kvclient/kvClient";
import { AgentGenerator } from "./generator/agent/agentGenerator";

async function main() {
    var kvClient: KVClient = new RedisKVClient("6379", "127.0.0.1");
    await kvClient.connect();
    var checker: Checker = new CheckerWitKV(kvClient);
 
    var generator:Generator = new AgentGenerator("10.72.73.165", 80);
    
    generator.start();
    generator.onGuid((info)=>{
        checker.checkDuplicate(info);
    });
}

main();