"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis = require("redis");
const util_1 = require("util");
class RedisClient {
    constructor() {
        this.client = redis.createClient();
        this.client.on("error", function (err) {
            console.log("Error " + err);
        });
        this.client.get("abc", redis.print);
    }
    get getAsync() {
        if (this._getAsync)
            return this._getAsync;
        this._getAsync = util_1.promisify(this.client.get).bind(this.client);
        return this._getAsync;
    }
    get setAsync() {
        if (this._setAsync)
            return this._setAsync;
        this._setAsync = util_1.promisify(this.client.set).bind(this.client);
        return this._setAsync;
    }
    async get(key) {
        return await this.getAsync(key);
    }
    async set(key, value) {
        return await this.setAsync(key, value);
    }
}
exports.RedisClient = RedisClient;
//# sourceMappingURL=client.js.map