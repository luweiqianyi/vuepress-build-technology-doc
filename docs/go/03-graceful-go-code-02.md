---
sidebar: auto
prev: /go/03-graceful-go-code-01.html
next: /go/04-gin-pprof.html
---
# 优雅的go代码(二）
1. 定期检查缓存是否过期，删除过期缓存
    ```go 
    func (c *BaseTableMetaCache) scanExpire(ctx context.Context) {
        ticker := time.NewTicker(c.expireDuration)
        defer ticker.Stop()
        for range ticker.C {

            f := func() {
                c.lock.Lock()
                defer c.lock.Unlock()

                cur := time.Now()
                for k := range c.cache {
                    entry := c.cache[k]

                    if cur.Sub(entry.lastAccess) > c.expireDuration {
                        delete(c.cache, k)
                    }
                }
            }

            f()
        }
    }
    ```
2. 常量参数，使用type自定义自己的类型，然后使用该类型
    ```go
    type (
        BranchType   int8
    )

    const (
        BranchTypeUnknow BranchType = -1
        BranchTypeAT     BranchType = 0
        BranchTypeTCC    BranchType = 1
        BranchTypeSAGA   BranchType = 2
        BranchTypeXA     BranchType = 3
    )
    ```
3. 定时器的另外一种实现方式
    ```go
    import (gxtime "github.com/dubbogo/gost/time")
    func TestTimeAfter(t *testing.T) {
        gxtime.InitDefaultTimerWheel()
        for {
            <-gxtime.After(time.Second)
            fmt.Printf("%#v\n", time.Now().Format(time.RFC3339))
        }
    }
    ```
4. 判断是否关闭
    以下提供一种通过channel来判断是否关闭，而不是bool值来判断关闭的方式
    bool的判断需要保证是原子的
    ```go
    done:=make(chan struct{})

    // 关闭
    func Close(done chan struct{}){
        done <- struct{}
    }

    // 检测是否关闭
    func IsMyClosed(done chan struct{}) bool {
        select {
        case <-done:
            return true
        default:
            return false
        }
    } 
    ```