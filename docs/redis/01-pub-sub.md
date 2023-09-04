---
sidebar: auto
---
# redis发布订阅模式
Redis 提供发布订阅（Pub/Sub）模式，它是一种消息传递模型，允许多个客户端通过订阅频道来接收消息并进行发布。发布者（Publisher）向指定的频道发送消息，而订阅者（Subscriber）则从频道订阅并接收这些消息。

## 实际场景应用
1. 聊天应用：可以使用 Redis 的发布订阅模式来实现实时聊天功能。每个用户都可以订阅一个或多个聊天频道，当有新的消息发布到频道时，订阅者能够即时接收到消息并进行展示。

2. 实时数据更新：在需要实时更新数据的应用中，可以使用发布订阅模式来实现数据更新的实时推送。例如，在在线多人游戏中，玩家的动作和状态改变可以通过 Redis 的发布订阅来广播给其他玩家。

3. 日志处理：在一些分布式系统或微服务架构中，可以使用 Redis 的发布订阅模式来实现日志消息的集中处理。各个节点将日志信息发布到指定的频道，由中心节点进行订阅并进行日志聚合、存储或进一步处理。

4. 事件通知：发布订阅模式还可以用于向系统中的不同部件发送事件通知。例如，当某个条件满足时，将相关事件发布到 Redis 的频道，订阅者可以根据事件进行相应的处理和操作。

5. 实时统计和监控：可以使用发布订阅模式来实时获取业务数据并进行统计和监控。例如，在电商应用中，可以订阅订单创建或支付成功的频道，即时获取订单相关数据并进行实时统计。

> 请注意，Redis 的发布订阅模式适合于一对多的消息发布和接收场景，并不适合有持久化需求、消息传递顺序敏感或需要高可靠性的场景。如果在业务中有这些需求，可以考虑使用其他消息队列系统，如 RabbitMQ 或 Apache Kafka。

## go探索redis的发布订阅模式
### 发布者
```go
package test

import (
	"context"
	"fmt"
	"github.com/go-redis/redis/v8"
	"testing"
)

func TestPublisher(t *testing.T) {
	client := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379", // Redis 服务器地址和端口
		Password: "",               // Redis 服务器密码，如果没有设置可以为空
		DB:       0,                // Redis 数据库索引，默认为 0
	})

	for i := 0; i < 10; i++ {
		msg := fmt.Sprintf("%v: Hello, World!", i)
		if i == 9 {
			msg = "EXIT"
		}
		err := client.Publish(context.Background(), "channel1", msg).Err()
		if err != nil {
			fmt.Println("Failed to publish message:", err)
		} else {
			fmt.Printf("Message{%v} published to channel1\n", msg)
		}
	}

}
```
> 以上代码往通道`channel1`发了10条消息。
### 订阅者
```go
package test

import (
	"context"
	"fmt"
	"github.com/go-redis/redis/v8"
	"testing"
)

func TestSubscriber(t *testing.T) {
	client := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379", // Redis 服务器地址和端口
		Password: "",               // Redis 服务器密码，如果没有设置可以为空
		DB:       0,                // Redis 数据库索引，默认为 0
	})

	// 订阅频道
	sub := client.Subscribe(context.Background(), "channel1")
	defer sub.Close()

	for {
		ch := sub.Channel()
		for msg := range ch {
			fmt.Println("Received message from channel1:", msg.Payload)
			if msg.Payload == "EXIT" {
				return
			}
		}
	}

}
```
> 以上代码从通道`channel1`中接收消息，如果收到的消息是`EXIT`，就结束订阅者线程。

### 测试结果
#### 发布者
```log
=== RUN   TestPublisher
Message{0: Hello, World!} published to channel1
Message{1: Hello, World!} published to channel1
Message{2: Hello, World!} published to channel1
Message{3: Hello, World!} published to channel1
Message{4: Hello, World!} published to channel1
Message{5: Hello, World!} published to channel1
Message{6: Hello, World!} published to channel1
Message{7: Hello, World!} published to channel1
Message{8: Hello, World!} published to channel1
Message{EXIT} published to channel1
--- PASS: TestPublisher (0.02s)
PASS
```
#### 订阅者
```log
=== RUN   TestSubscriber
Received message from channel1: 0: Hello, World!
Received message from channel1: 1: Hello, World!
Received message from channel1: 2: Hello, World!
Received message from channel1: 3: Hello, World!
Received message from channel1: 4: Hello, World!
Received message from channel1: 5: Hello, World!
Received message from channel1: 6: Hello, World!
Received message from channel1: 7: Hello, World!
Received message from channel1: 8: Hello, World!
Received message from channel1: EXIT
--- PASS: TestSubscriber (7.23s)
PASS
```
### 基准测试
#### 测试代码
以下代码对发布者进行基准测试
```go
func BenchmarkPublisher(b *testing.B) {
	client := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379", // Redis 服务器地址和端口
		Password: "",               // Redis 服务器密码，如果没有设置可以为空
		DB:       0,                // Redis 数据库索引，默认为 0
	})

	for i := 0; i < b.N; i++ {
		msg := fmt.Sprintf("%v: Hello, World!", i)
		if i == b.N-1 {
			msg = "EXIT"
		}
		client.Publish(context.Background(), "channel1", msg)
	}
}
```
#### 测试结果
```log
goos: windows
goarch: amd64
pkg: e-shop/pkg/redis/pub-sub
cpu: Intel(R) Core(TM) i5-6500 CPU @ 3.20GHz
BenchmarkPublisher
BenchmarkPublisher-4   	    2162	    528492 ns/op
PASS
```
#### 测试说明
根据您提供的信息和输出结果，可以得到以下结论：
* 操作系统（OS）：Windows
* 架构（Architecture）：amd64
* 包路径（Package Path）：app/pkg/redis/pub-sub
* CPU：Intel(R) Core(TM) i5-6500 CPU @ 3.20GHz

针对 BenchmarkPublisher 进行的基准测试输出结果为：
* 平均每次操作时间（Average Time per Operation）：526,704 纳秒（ns）
* 每秒操作数（Operations per Second）：约 1,987 次操作/秒

这表示在相同的测试环境下，BenchmarkPublisher 的平均每次操作时间为 526,704 纳秒，每秒能够执行约 1,987 次操作。

请注意，这些结果是基于特定的测试环境和配置得出的。实际应用中的性能可能与此略有不同，并受到多种因素的影响，如硬件、软件、并发情况等。