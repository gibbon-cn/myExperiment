import {KVClient} from "./kvClient";
import * as redis from "redis";
import {promisify} from "util";

/**
 * k-v内存客户端
 */
export interface KVClient {
    exists: (key:string) => Promise<boolean>;
    set: (key:string, value:string) => Promise<void>;
    get: (key:string) => Promise<string>;
}

export class RedisKVClient implements KVClient{ 
    private client;

    constructor() {
        this.client = redis.createClient();
        this.client.on("error", function (err) {
            console.log("Error " + err);
        });
    }
    public async exists(key: string): Promise<boolean>{
        var r = await promisify(this.client.exists).bind(this.client)(key);
        if(r == "1") {
            return true;
        }else{
            return false;
        }
    }

    public async get(key:string): Promise<string> {
        return await promisify(this.client.get).bind(this.client)(key);
    }

    public async set(key:string, value: string): Promise<void> {
        return await promisify(this.client.set).bind(this.client)(key, value);
    }
}
