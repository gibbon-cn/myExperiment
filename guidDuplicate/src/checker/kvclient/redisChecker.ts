import {RedisClient} from "./client";
import {Checker} from "../checker";
import * as fs from "../../generator/file/file";

export class RedisChecker implements Checker {
    client: RedisClient;
    constructor(){
        this.client = new RedisClient();
    }
    /**
     * 检验guid是否存在
     * @param guid 
     * @param mem 是否存储被检验值
     */
    async check(guid: string, mem: boolean = true):Promise<void|string>{
        var t = await this.client.get(guid);
        if(t) {
            this.report(guid);
            return t;
        }else{
            if(mem) await this.client.set(guid, Date.now().toString());
        }
    }

    report(guid:string):void{        
        fs.writeFile("e:\\temp\\" + Date.now() + ".txt", Buffer.from("GUID duplicate:" + guid + "\n"));
    }
}