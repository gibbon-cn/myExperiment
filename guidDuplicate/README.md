# 伪随机重复验证

## 实验背景

[建筑事业部共享中心网报项目发生多次主键重复](http://note.youdao.com/noteshare?id=889bc784cbcc9df33bd4b9d2adfe78bb&sub=663A6A08DE03418DA28CA82D6F75C07B)

## 系统设计

支持三种随机数生成来源

1. 本地生成，使用V8引擎的Math.random；
2. 历史数据，从历史文本数据中导入；
3. 浏览器代理，使用客户端浏览器的Math.random（IE或V8等）生成；
