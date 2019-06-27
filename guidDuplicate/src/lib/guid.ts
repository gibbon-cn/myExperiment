//创建唯一标识符（guid）
export function createGUID(){
    var S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

/**
 * 
 * @param prefix 从文本中提取guid
 */
export function extractGuid(text:string):string|null {
    var rex = /\w\w\w\w\w\w\w\w\-\w\w\w\w\-\w\w\w\w\-\w\w\w\w\-\w\w\w\w\w\w\w\w\w\w\w\w/g
    var guid = text.match(rex);
    if(guid && guid.length){
        return guid[0];
    }else {
        return null;
    }
}