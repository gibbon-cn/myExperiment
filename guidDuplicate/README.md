# FROM:伪随机重复验证

## 实验背景

[建筑事业部共享中心网报项目发生多次主键重复](http://note.youdao.com/noteshare?id=889bc784cbcc9df33bd4b9d2adfe78bb&sub=663A6A08DE03418DA28CA82D6F75C07B)

## 系统设计

支持三种随机数生成来源

1. 本地生成，使用V8引擎的Math.random；
2. 历史数据，从历史文本数据中导入；
3. 浏览器代理，使用客户端浏览器的Math.random（IE或V8等）生成；

# GUID注册中心：GuidRegistry

## Core服务

    label: 接口识别
    label: 系统用例

### 格式

```ts
Registration {
    guid: String,
    createdTime: number // Timestamp
    registeredTime?: number // Timestamp
}

enum ValidationState {
    New: '新建',
    Retry: '重复注册',
    Duplicate: 'GUID重复'
}

Access {
    guid: String,
    token: number
}

Result<S, D> {
    state: S,
    info: string,
    data: D | null
}
```

### 注册

`register: (info:Registration) => Result<RetrieveState, Access>`

note: 不允许以同一个Guid重复注册

```
case 输入未曾注册过的guid，则注册 <=> RetrieveState.New;
case 输入已注册过的guid，并且注册的信息基本重复（以createdTime判断)，则不注册 <=> RetrieveState.Retry
case 输入已注册过的guid，并且认定为不同时刻生成的guid，则不注册 <=> RetrieveState.Duplicate
    requirement: 系统记录日志
```

日志格式

```
DuplicateLog {
    LogTime: 'yyyy-MM-dd HH:mm:ss',
    Registred: Registration,
    Duplicated: Registration
}
```

### 获取

`retrieve: (guid:String) => Result<Boolean, Registration>`

### 注销

`unregister: (access:Access) => Result<Boolean, Registration>`

### 对外提供RPC接口

作为内部接口，Core(主) - HttpInerface(客)

？不知道怎么定义

## 服务

### REST API

作为系统的标准接口。

`POST /registry`

    register: (info:Registration) => Result<RetrieveState, Access>

`GET /registry?`

    retrieve: (guid:String) => Result<Boolean, Registration>

`DELETE /registry?`

    unregister: (access:Access) => Result<Boolean, Registration>

#### REST API服务界面

`http://$host/$port/agent/rest.html`

### WS服务：批量注册

作为批量注册接口，可以用于验证不同浏览器引擎的GUID算法的重复周期。

`ws://$host/$port/registry`

client -> server: `agent::window.navigator.userAgent`
<!-- client -> server: `generator::$function_definition` -->
client -> server: `registration::JSON.stringify(Registration)`

#### 文件服务：批量注册

作为批量注册接口，可以用于验证不同浏览器引擎的GUID算法的重复周期。

思考：需求规格文档与服务接口、数据格式定义的双向绑定？

需求规格文档 <=> 数据格式类定义，服务定义 => 系统说明文档