import * as child_process  from "child_process";
export function forkFile(file:string, onExit:(code:number, signal:string, child:child_process.ChildProcess)=>void) {
    var child = child_process.fork(file, process.execArgv);
    child.on("close", (code, signal)=>{
        onExit(code, signal, child);
    });
}