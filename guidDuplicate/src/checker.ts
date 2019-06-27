/**
 * 检验GUID是否重复
 */
export interface Checker {
    start?: ()=>Promise<void>|null;
    /**
     * 
     */
    check: (guid:string, mem?:boolean) => Promise<void|string>;
}