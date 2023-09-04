---
sidebar: auto
prev: /go-zero/01-quick-start.html
next: /go-zero/03-goctl-model-usage.html
---
# 新增一个api接口
步骤如下：
1. 修改`account.api`，新增请求定义、响应定义、`handler`定义
2. `cmd`进入`account`目录，执行命令`goctl api go -api account.api -dir . -style gozero`,该命令会自动生成对应go代码

account.api定义注册请求、响应、请求方式(get/post)、`handler`如下
```go
type (
    RegisterReq {
        AccountName string `form:"accountName"`
        Password    string `form:"password"`
    }

    RegisterResp {
        CommonResp
    }
)


@handler RegisterHandler
post /register(RegisterReq) returns (RegisterResp)
```

## 参考链接
* 详细代码详见：[luweiqianyi:go-zero-demo](https://github.com/luweiqianyi/go-zero-demo.git)