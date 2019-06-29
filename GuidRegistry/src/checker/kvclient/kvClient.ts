import {KVClient} from "./kvClient";
import * as redis from "redis";
import {promisify} from "util";

/**
 * k-v内存客户端
 */
export interface KVClient {
    connect?: () => Promise<void>;
    exists: (key:string) => Promise<boolean>;
    set: (key:string, value:string) => Promise<void>;
    get: (key:string) => Promise<string>;
    count: ()=> Promise<number>;
}

export class RedisKVClient implements KVClient{ 
    private client;

    constructor(private port:string="6379", private host:string="127.0.0.1") {

    }

    public connect(): Promise<void> {
        this.client = redis.createClient(this.port, this.host);
        return new Promise((c,r)=>{
            this.client.on("error", (err) => {
                r(err);
            });
            this.client.on("connect", ()=>{
                console.log("connected");
                c();
            });
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

    public async count(): Promise<number> {
        // 并不是精确所需要的数码
        return await promisify(this.client.dbsize).bind(this.client)();
    }
}
