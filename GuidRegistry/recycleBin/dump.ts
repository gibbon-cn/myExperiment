import {readLine} from "../src/generator/file/file";
import {RedisClient} from "./client";

interface Pair {
    key:string;
    value:string;
}

/**
 * 
 * @param line 
 * @example
 * 'insert into ROBILL0625 (ROBXDJ_NM, ROBXDJ_CJSJ)'
 * "values ('016d6b86-d7f8-ba24-0ee2-64528b54f1b1', to_date('08-08-2018 12:06:52', 'dd-mm-yyyy hh24:mi:ss'));"
 */
export function extract(line: string): Pair|null{    
    var guid = line.match(/\w\w\w\w\w\w\w\w\-\w\w\w\w\-\w\w\w\w\-\w\w\w\w\-\w\w\w\w\w\w\w\w\w\w\w\w/g);

    var date = line.match(/\w\w\-\w\w\-\w\w\w\w \w\w\:\w\w\:\w\w/g);

    if(guid && date) {
        return {
            key: guid[0],
            value: date[0]
        }
    }
    else{
        return null;
    }
}

function main(){
    var client: RedisClient;
    client = new RedisClient();
    var line = 0;
    readLine("E:\\temp\\billID.sql", (chunk) => {
        var p = extract(chunk);
        if(p) {
            client.set(p.key, p.value);
            line ++;
            if(line%1000==0) {
                console.log("handle: " + line);
            }
        }
    }, null, ()=>{
        console.log("finished: " + line);
    })
}

main();