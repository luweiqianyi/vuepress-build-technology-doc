---
sidebar: auto
prev: /redis/02-redis-cluster-01.html
next: /redis/03-redis-issues.html
---
# 搭建redis集群(二)：docker命令
平台：`Windows`,依次执行下面脚本即可。部署的时候选择的网络模式是`host`，让容器和主机共享网络栈。
## 00-create-folder.bat
```shell
mkdir node-7001\data node-7002\data node-7003\data node-7004\data node-7005\data node-7006\data
del /q node-7001\data node-7002\data node-7003\data node-7004\data node-7005\data node-7006\data
REM /q: 执行del命令时不需要用户手动确认
REM 之前已经搭建过了，重新搭建时需要执行del命令来删除之前的数据文件。否则不需要执行del。
REM REM是bat脚本的注释标志
```
## 01-node-7001.bat
```shell
docker create --name redis-7001 --restart=always --net host ^
-v .\node-7001\data:/data redis:6.0 ^
--port 7001 ^
--appendonly yes ^
--cluster-enabled yes ^
--cluster-announce-ip 127.0.0.1 ^
--repl-diskless-load on-empty-db
```
> `^`是`bat`中的换行
## 02-node-7002.bat
```shell
docker create --name redis-7002 --restart=always --net host ^
-v .\node-7002\data:/data redis:6.0 ^
--port 7002 ^
--appendonly yes ^
--cluster-enabled yes ^
--cluster-announce-ip 127.0.0.1 ^
--repl-diskless-load on-empty-db
```
## 03-node-7003.bat
```shell
docker create --name redis-7003 --restart=always --net host ^
-v .\node-7003\data:/data redis:6.0 ^
--port 7003 ^
--appendonly yes ^
--cluster-enabled yes ^
--cluster-announce-ip 127.0.0.1 ^
--repl-diskless-load on-empty-db
```
## 04-node-7004.bat
```shell
docker create --name redis-7004 --restart=always --net host ^
-v .\node-7004\data:/data redis:6.0 ^
--port 7004 ^
--appendonly yes ^
--cluster-enabled yes ^
--cluster-announce-ip 127.0.0.1 ^
--repl-diskless-load on-empty-db
```
## 05-node-7005.bat
```shell
docker create --name redis-7005 --restart=always --net host ^
-v .\node-7005\data:/data redis:6.0 ^
--port 7005 ^
--appendonly yes ^
--cluster-enabled yes ^
--cluster-announce-ip 127.0.0.1 ^
--repl-diskless-load on-empty-db
```
## 06-node-7006.bat
```shell
docker create --name redis-7006 --restart=always --net host ^
-v .\node-7006\data:/data redis:6.0 ^
--port 7006 ^
--appendonly yes ^
--cluster-enabled yes ^
--cluster-announce-ip 127.0.0.1 ^
--repl-diskless-load on-empty-db
```
## 07-start-containers.bat
```shell
docker start redis-7001 redis-7002 redis-7003 redis-7004 redis-7005 redis-7006
```
## 08-create-cluster.bat
```shell
docker exec -it redis-7001 redis-cli --cluster create 127.0.0.1:7001 127.0.0.1:7002 127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005 127.0.0.1:7006 --cluster-replicas 1
```
> 以上脚本创建一个3主3从的redis集群，`--cluster-replicas 1`表示从节点的数量为1。
## 09-cluster-test.bat
### 进入容器环境，执行测试命令
```shell
docker exec -it redis-7001 redis-cli -h 127.0.0.1 -p 7001 -c
```
连接成功，输入`cluster nodes`,`cluster info`,`set key value`,`get key`都能进行集群测试。
### 测试结果
```shell
F:\rediscluster>docker exec -it redis-7001 redis-cli -h 127.0.0.1 -p 7001 -c
127.0.0.1:7001> cluster nodes
43c7c7040f426e45f7bb0d80c09c1e04cfec82c7 127.0.0.1:7003@17003 master - 0 1694588911033 3 connected 10923-16383
99b2d3c5a6998667ad75defc106b07dfe7d3b251 127.0.0.1:7006@17006 slave c5919fa1d08f2985d1b257fb7db46d800ed83b2b 0 1694588910028 1 connected
c5919fa1d08f2985d1b257fb7db46d800ed83b2b 127.0.0.1:7001@17001 myself,master - 0 1694588909000 1 connected 0-5460
eb59a2531fb91d69f429b1852e5744729da86ee8 127.0.0.1:7002@17002 master - 0 1694588911000 2 connected 5461-10922
132ef9ed92ae55cdb28aa36636c3b7db6e517639 127.0.0.1:7005@17005 slave 43c7c7040f426e45f7bb0d80c09c1e04cfec82c7 0 1694588912036 3 connected
b7500e7cd14db11e0a12f8713c4d2321e19f8c49 127.0.0.1:7004@17004 slave eb59a2531fb91d69f429b1852e5744729da86ee8 0 1694588909025 2 connected
127.0.0.1:7001> cluster nodes
43c7c7040f426e45f7bb0d80c09c1e04cfec82c7 127.0.0.1:7003@17003 master - 0 1694591147255 3 connected 10923-16383
99b2d3c5a6998667ad75defc106b07dfe7d3b251 127.0.0.1:7006@17006 slave c5919fa1d08f2985d1b257fb7db46d800ed83b2b 0 1694591146253 1 connected
c5919fa1d08f2985d1b257fb7db46d800ed83b2b 127.0.0.1:7001@17001 myself,master - 0 1694591144000 1 connected 0-5460
eb59a2531fb91d69f429b1852e5744729da86ee8 127.0.0.1:7002@17002 master - 0 1694591146000 2 connected 5461-10922
132ef9ed92ae55cdb28aa36636c3b7db6e517639 127.0.0.1:7005@17005 slave 43c7c7040f426e45f7bb0d80c09c1e04cfec82c7 0 1694591145000 3 connected
b7500e7cd14db11e0a12f8713c4d2321e19f8c49 127.0.0.1:7004@17004 slave eb59a2531fb91d69f429b1852e5744729da86ee8 0 1694591145251 2 connected
127.0.0.1:7001> set name leebai
-> Redirected to slot [5798] located at 127.0.0.1:7002
OK
127.0.0.1:7002> get name
"leebai"
```
## 存在的问题
<font color=#37a462 size=6>代码连接时无法连接到集群内的节点。暂时不知道原因。</font>
> 命令行执行命令`telnet 127.0.0.1 7001`测试时发现端口也不通。
### 代码
```go
package test

import (
	"context"
	"fmt"
	"github.com/go-redis/redis/v8"
	"testing"
)

const (
	node1 = "127.0.0.1"
	node2 = "127.0.0.1"
	node3 = "127.0.0.1"
	node4 = "127.0.0.1"
	node5 = "127.0.0.1"
	node6 = "127.0.0.1"
)

func TestRedisOneNode(t *testing.T) {
	cli := redis.NewClient(&redis.Options{
		Addr:     "127.0.0.1:7002",
		Password: "", // no password set
		DB:       0,  // use default DB
	})

	pong := cli.Ping(context.Background())
	fmt.Printf("pong: %v\n", pong)

	get := cli.Get(context.Background(), "name")
	fmt.Printf("get: %v\n", get)
}

func TestRedisCluster(t *testing.T) {
	client := redis.NewClusterClient(&redis.ClusterOptions{
		Addrs: []string{
			fmt.Sprintf("%v:7001", node1),
			fmt.Sprintf("%v:7002", node2),
			fmt.Sprintf("%v:7003", node3),
			fmt.Sprintf("%v:7004", node4),
			fmt.Sprintf("%v:7005", node5),
			fmt.Sprintf("%v:7006", node6),
		},
	})
	ctx := context.Background()

	pingResp := client.Ping(ctx)
	fmt.Printf("pingResp: %v\n", pingResp)
	// 关闭客户端连接
	err := client.Close()
	if err != nil {
		panic(err)
	}
}

```
### 测试结果
#### 连接单个节点
```log
=== RUN   TestRedisOneNode
pong: ping: dial tcp 127.0.0.1:7002: connectex: No connection could be made because the target machine actively refused it.
get: get name: dial tcp 127.0.0.1:7002: connectex: No connection could be made because the target machine actively refused it.
--- PASS: TestRedisOneNode (16.44s)
PASS
```
#### 连接整个集群
```log
=== RUN   TestRedisCluster
pingResp: ping: dial tcp 127.0.0.1:7005: connectex: No connection could be made because the target machine actively refused it.
--- PASS: TestRedisCluster (24.28s)
PASS
```
