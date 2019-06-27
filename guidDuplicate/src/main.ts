// import { repeatGuid } from "./local/master";
// repeatGuid(2000000);
import {Generator} from "./generator/generator";
import {FileGenerator} from "./generator/file/fileGenerator";
import {Checker} from "./checker/checker";
import {RedisChecker} from "./checker/redis/redisChecker";

var checker:Checker = new RedisChecker();

if(checker.start) {
    checker.start();
}

var generator:Generator = new FileGenerator("")
