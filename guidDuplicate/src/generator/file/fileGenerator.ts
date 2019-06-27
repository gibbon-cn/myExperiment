import * as fs from "fs";
import * as readline from "readline";
import {Generator} from "../generator";
import {EventEmitter} from "events";
import {extractGuid} from "../../lib/guid";

/**
 * 从文本数据读取历史数据，提取GUID
 */
export class FileGenerator implements Generator{
    /**
     * 从文本数据读取历史数据，提取GUID
     * @param path 输入文本的路径
     */
    constructor(private path:string) {
        this.events = new EventEmitter();
    }
    private events: EventEmitter;
    private count: number;
    start(max?: number):Promise<number> {
        this.count = 0;
        const fileStream = fs.createReadStream(this.path);
    
        const rl = readline.createInterface({
          input: fileStream,
          crlfDelay: Infinity
        });
      
        rl.on('line', (chunk:string)=>{
            var extracted = extractGuid(chunk);
            if(extracted) {
                this.events.emit("guid", extracted);
                this.count ++;
                if(max && this.count >= max) {
                    rl.close();
                    fileStream.close();
                }
            }            
        });
    
        return new Promise<number>((c, r) => {
            rl.on('close', ()=>{
                console.log("FileGenerator Closed: " + this.count);
                c(this.count);
            });
        });               
    };    

    stop?: () => void;
    /**
     * 应当先于Start执行
     */
    onGuid(handler: (guid: string) => void):void {
        this.events.on("guid", (guid:string)=>{
            handler(guid);
        })
    };
}