import {forkFile} from "./process";
function fix2number(n) {
    return [0,n].join('').slice(-2);
}
function getTime(format) {
    var curDate = new Date();
    if (format == undefined) return curDate;
    format = format.replace(/Y/i, curDate.getFullYear());
    format = format.replace(/m/i, fix2number(curDate.getMonth() + 1));
    format = format.replace(/d/i, fix2number(curDate.getDate()));
    format = format.replace(/H/i, fix2number(curDate.getHours()));
    format = format.replace(/i/i, fix2number(curDate.getMinutes()));
    format = format.replace(/s/i, fix2number(curDate.getSeconds()));
    format = format.replace(/ms/i, curDate.getMilliseconds());
    return format;
}

var count = {
    "a":0,
    "b":0
}

var doGuid = (label:string, max:number) => {
    count[label] = count[label] + 1;
    forkFile("./src/worker.ts", (c, s, ch)=>{
        if(count[label]%100==0) {
            console.log( getTime('H:i:s') + ": " + label + ":" + count[label] + " is started: " + ch.pid);
        }
        if(count[label]<max) {
            doGuid(label, max);
        }
    });
}

export function repeatGuid(max:number) {
    doGuid("a", max);
    doGuid("b", max);
}