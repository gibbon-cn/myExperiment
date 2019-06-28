
import * as redis from "redis";
import {promisify, deprecate} from "util";

/**
 * 作废 by RedisKVClient
 */
export class RedisClient {

    private client;

    constructor() {
        this.client = redis.createClient();
        this.client.on("error", function (err) {
            console.log("Error " + err);
        });
    }
    async connect() {

    }

    private _getAsync: (string) => Promise<string>;
    private _setAsync: (k:string, v:string) => Promise<void>;

    private get getAsync(): (string) => Promise<string> {
        if(this._getAsync) return this._getAsync;
        this._getAsync = promisify(this.client.get).bind(this.client);
        return this._getAsync;
    }

    private get setAsync(): (k:string, v:string) => Promise<void> {
        if(this._setAsync) return this._setAsync;
        this._setAsync = promisify(this.client.set).bind(this.client);
        return this._setAsync;
    }    

    public async get(key:string): Promise<string> {
        return await this.getAsync(key);
    }

    public async set(key:string, value: string): Promise<void> {
        return await this.setAsync(key, value);
    }
}
