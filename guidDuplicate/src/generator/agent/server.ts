import * as http from "http";
import * as express from "express";
import * as httpolyglot from "httpolyglot";
import * as expressStaticGzip from "express-static-gzip";
import * as path from "path";
import {Server as WsServer} from "ws";
import {EventEmitter} from "events";
import {extractGuid} from "../../guid/guidLib";
/**
 * GUID生成器
 */
export interface DedupServer{
    start?: ()=>void;
    stop?: ()=>void;
    /**
     * 注册guid句柄
     */
    onGuid: (handler:(guid:string) => void) => void;
}

export class HttpWsServer implements DedupServer{
    private events: EventEmitter

    /**
     * 
     * @param host 监听主机
     * @param port 监听端口
     * @param staticPath 静态路径
     */
    constructor(private host:string, private port:number, private staticPath?:string) {
        this.events = new EventEmitter();
    }

    start():void {
        const app = express();
        const server = httpolyglot.createServer({}, app) as unknown as http.Server;

        server.on("listening", ()=>{
            console.log("listening");
        })

        var staticPath = path.join(__dirname, "./web");
        console.log("Static Path: " + staticPath);
        const staticGzip = expressStaticGzip(staticPath);
        app.use(staticGzip);

        const wss = new WsServer({server});

        wss.on('connection', ws => {
            console.log("connected");

            ws.on('message', (message) => {
                console.log('received: %s', message);
                var extracted = extractGuid(message as string);
                if(extracted) {
                    this.events.emit("guid", extracted);
                }
                ws.send("you send a guid!");
            });
    
            ws.send('Welcome to guid dedup server!');
        });   
        server.listen(this.port, this.host);  
        
        this.events.on("close", ()=>{
            server.close();
        })
    };   

    stop():void{
        this.events.emit("close");
    };

    onGuid(handler: (guid: string) => void):void {
        this.events.on("guid", (guid:string)=>{
            handler(guid);
        })
    };    
}