export declare class RedisClient {
    private client;
    constructor();
    private _getAsync;
    private _setAsync;
    private readonly getAsync;
    private readonly setAsync;
    get(key: string): Promise<string>;
    set(key: string, value: string): Promise<void>;
}
