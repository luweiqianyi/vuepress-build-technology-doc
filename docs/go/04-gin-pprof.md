---
sidebar: auto
prev: /go/03-graceful-go-code-01.html
next: /go/05-golang-commands.html
---

# gin配置pprof
## 源码
```go
package main

import (
	"github.com/gin-contrib/pprof"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	pprof.Register(r)

	r.Run(":8003")
}
```
## 结果
```log
[GIN-debug] [WARNING] Creating an Engine instance with the Logger and Recovery middleware already attached.

[GIN-debug] [WARNING] Running in "debug" mode. Switch to "release" mode in production.
 - using env:	export GIN_MODE=release
 - using code:	gin.SetMode(gin.ReleaseMode)

[GIN-debug] GET    /debug/pprof/             --> github.com/gin-gonic/gin.WrapF.func1 (3 handlers)
[GIN-debug] GET    /debug/pprof/cmdline      --> github.com/gin-gonic/gin.WrapF.func1 (3 handlers)
[GIN-debug] GET    /debug/pprof/profile      --> github.com/gin-gonic/gin.WrapF.func1 (3 handlers)
[GIN-debug] POST   /debug/pprof/symbol       --> github.com/gin-gonic/gin.WrapF.func1 (3 handlers)
[GIN-debug] GET    /debug/pprof/symbol       --> github.com/gin-gonic/gin.WrapF.func1 (3 handlers)
[GIN-debug] GET    /debug/pprof/trace        --> github.com/gin-gonic/gin.WrapF.func1 (3 handlers)
[GIN-debug] GET    /debug/pprof/allocs       --> github.com/gin-gonic/gin.WrapH.func1 (3 handlers)
[GIN-debug] GET    /debug/pprof/block        --> github.com/gin-gonic/gin.WrapH.func1 (3 handlers)
[GIN-debug] GET    /debug/pprof/goroutine    --> github.com/gin-gonic/gin.WrapH.func1 (3 handlers)
[GIN-debug] GET    /debug/pprof/heap         --> github.com/gin-gonic/gin.WrapH.func1 (3 handlers)
[GIN-debug] GET    /debug/pprof/mutex        --> github.com/gin-gonic/gin.WrapH.func1 (3 handlers)
[GIN-debug] GET    /debug/pprof/threadcreate --> github.com/gin-gonic/gin.WrapH.func1 (3 handlers)
[GIN-debug] [WARNING] You trusted all proxies, this is NOT safe. We recommend you to set a value.
Please check https://pkg.go.dev/github.com/gin-gonic/gin#readme-don-t-trust-all-proxies for details.
[GIN-debug] Listening and serving HTTP on :8003
```

> 通过访问上述地址即可访问相关信息。