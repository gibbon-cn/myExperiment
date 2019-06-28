import {KVClient} from "./kvclient/kvClient";
import {GuidInfo} from "../guid/guidInfo";
import * as fs from "../generator/file/file";

/**
 * 检验GUID是否重复
 */
export interface Checker {
    /**
     * 检测到重复，返回true
     */
    checkDuplicate: (guid:GuidInfo, mem?:boolean) => Promise<boolean>;
}

/**
 * 使用KV内存进行检测
 */
export class CheckerWitKV implements Checker{

    constructor(private client: KVClient){
        
    }
    /**
     * 检验guid是否存在
     * @param info 
     * @param mem 是否存储被检验值
     */
    async checkDuplicate(info: GuidInfo, mem: boolean = true):Promise<boolean>{
        var preMem = await this.client.get(info.guid);
        if(preMem) {
            this.report(JSON.parse(preMem), info);
            return true;
        }else{
            if(mem){
                await this.client.set(info.guid, JSON.stringify(info));
            }     
            return false;           
        }
    }

    /**
     * 报告问题
     * @param guid 
     * @param preInfo 
     * @param curinfo 
     */
    async report(preInfo:GuidInfo|null, curinfo:GuidInfo): Promise<void>{
        debugger
        var logFileName = "e:\\temp\\" + Date.now() + ".txt";
        var logInfo = "DBSize: " + await this.client.count() + "\n"
            + (preInfo?JSON.stringify(preInfo):"") + "\n"
            + JSON.stringify(curinfo);
        fs.writeFile(logFileName, Buffer.from(logInfo));
    }
}