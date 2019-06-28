import {RedisClient} from "../../checker/kvclient/client";
import {createGUID} from "../../guid/guidLib";
import * as fs from "../file/file";

const dev = process.env.NODE_ENV? true: false;

async function main(turns:number) {
    var client = new RedisClient();
    for(var i=0; i<turns; i++) {
        let key = "";
        if(dev) {
            console.log('dev mode');
            key = "23a0638b-5148-21a1-653a-569c0c9f81da";
        }else{
            key = createGUID();
        }
        var value = Date.now().toString();
        var t = await client.get(key);
        if(t) {
            fs.writeFile("e:\\temp\\" + value + ".txt", Buffer.from("GUID duplicate:\n" 
            + key + ":" + t + "\n"));
        }else{
            await client.set(key, value);
        }
    }
    process.exit(0);
}

main(10000);