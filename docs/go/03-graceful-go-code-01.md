---
sidebar: auto
prev: /go/02-go-framework.html
next: /go/04-gin-pprof.html
---
# 优雅的go代码(一）
## 设计原则
### 单一职责原则
一个函数基本上只负责一项职责，函数的功能应当简练。提高功能的内聚性。
### 开闭原则
对扩展开放，对修改关闭。避免牵一发而动全身的尴尬出现，避免bug不断，改一处引起另一处的情况出现。
### 里式替换原则
任何基类/接口可以出现的地方，其子类/接口的实现类一定可以出现。提高系统的耦合性。
### 依赖倒置原则
面向接口/接口类、抽象基类编程，而不是面向具体的类编程。提高系统的耦合性。
### 接口隔离原则
个人感觉其他5个原则做好了，就相当于做好了这个原则。
### 迪米特原则
最小披露原则。在类设计时，只披露必要的信息给外部调用者。以C++的类为例，给外部调用者严格控制public方法，给子类严格控制protected，把控好public、protected、private三个关键字的使用场景，别乱用。以go为例，对结构体类的方法而言，严格控制函数的首字母的大小写，大写表示允许被外部模块调用，小写则不允许。
## 进程的全局配置
* 定义一个全局的配置类，与整个进程有关的配置都与该类进行交互。统一管理配置信息。
> 设计思想各语言通用
* 单例设计：原则上来说，该全局配置类的实例在整个进程中只需要保留一个即可，可以设计为单例模式。以`go`代码举例
```go
var once sync.Once
var gConfig *globalConfig

func GlobalConfig() *globalConfig {
	once.Do(func() {
		gConfig = &globalConfig{}
	})
	return gConfig
}

type globalConfig struct {
	httpCfg *HttpConfig
	tlsCfg  *tls.Config
}

type HttpConfig struct {
	Host string
	Port string
}
```
## 优雅地结束进程
在主进程退出前，调用以下代码。
```go
ch := make(chan os.Signal, 1)
signal.Notify(ch, os.Interrupt, syscall.SIGTERM)

exitCode := <-ch
```
## 模块化
* 将整个业务分化成几个模块，每个模块只负责提供本模块的基本功能，不涉及其他模块的业务过程。该过程主要降低耦合性。
* 业务过程若发生两个模块相互调用，引入第三方模块，分别调用两个模块来完成业务过程。
* 模块本身提供统一对外读写接口，这样方便在出口和入口处进行统一处理。比如专门处理网络请求的模块，所有的请求的发送通过统一出口进行发送，所有请求的接收通过统一入口进行接收，这样后续就很容易在统一出口和统一进口处进行统计、埋点、日志分析等行为，而不需要在整个代码的其他位置去定位接收和发送问题。
* 常见的模块比如
    * log
    * metrics
        * prometheus
    * store
        * sql
        * redis
        * other-module-api-access-layer
    * http
        * api
    * rpc
        * pb
    * common
    * util
    * constants
    > 可以根据具体的业务，择需选择。也可以根据具体的业务来分模块。对于所有业务都公用的模块，比如`log`、`metrics`、`store`等模块，可以提取到`pkg`包里面。
## 协程安全
`go`协程意外终止会发生`panic`,最终会导致整个进程发生`panic`引发进程终止，这不是我们所愿意看到的，所以，一般的做法是加上`recover`来进行保护
```go
go func() {
    defer func() {
        if p := recover(); p != nil {
            log.Panicf("%v", p)
        }
    }()
}()
```
但是，这样设计也有问题，这样整个程序中每一个涉及协程的地方都需要包裹上上面一段，这严重增加了重复代码。所以一种改善的设计如下所示：
```go
package rescue
func Recover(cleanups ...func()) {
	for _, cleanup := range cleanups {
		cleanup()
	}

	if p := recover(); p != nil {
		logx.ErrorStack(p)
	}
}

func RecoverCtx(ctx context.Context, cleanups ...func()) {
	for _, cleanup := range cleanups {
		cleanup()
	}

	if p := recover(); p != nil {
		logx.WithContext(ctx).Errorf("%+v\n%s", p, debug.Stack())
	}
}

package threading

func RunSafe(fn func()) {
	defer rescue.Recover()

	fn()
}

// RunSafeCtx runs the given fn, recovers if fn panics with ctx.
func RunSafeCtx(ctx context.Context, fn func()) {
	defer rescue.RecoverCtx(ctx)

	fn()
}
```
这样设计，调用的时候，只需要`go RunSafe(...)`或者`go RunSafeCtx(...)`就行了，减少了重复代码，同时也方便在上面四个函数中进行统一埋点，具体根据业务特性来定。