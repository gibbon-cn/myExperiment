/**
 * GUID生成器
 */
export interface Generator{
    /**
     * @param max:最大生成数
     */
    start?: (max?:number)=> Promise<number|void> | void;
    stop?: ()=>void;
    /**
     * 注册guid句柄
     */
    onGuid: (handler:(guid:string) => void) => void;
}