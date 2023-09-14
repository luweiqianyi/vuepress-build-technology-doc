---
sidebar: auto
prev: /distribute/redis/01-pub-sub.html
next: /distribute/redis/02-redis-cluster-02.html
---
# 搭建redis集群(一)：docker-compose
平台：`Windows`,`Docker`网络模式使用`bridge`。
## 准备`docker-compose.yml`
定义6个redis服务。
```yml
version: '3'

networks:
  cluster-network:
    ipam:
      driver: default
      config:
        - subnet: 172.16.10.0/24
          gateway: 172.16.10.254
          
services:
  redis1:
    image: redis:6.2
    container_name: redis1
    command: redis-server /usr/local/etc/redis/redis.conf
    ports:
      - "7001:7001"
    volumes:
      - ./conf/redis1:/usr/local/etc/redis
      - ./data/redis1:/data
    networks:
      cluster-network:
        ipv4_address: 172.16.10.1

  redis2:
    image: redis:6.2
    container_name: redis2
    command: redis-server /usr/local/etc/redis/redis.conf
    ports:
      - "7002:7002"
    volumes:
      - ./conf/redis2:/usr/local/etc/redis
      - ./data/redis2:/data
    networks:
      cluster-network:
        ipv4_address: 172.16.10.2

  redis3:
    image: redis:6.2
    container_name: redis3
    command: redis-server /usr/local/etc/redis/redis.conf
    ports:
      - "7003:7003"
    volumes:
      - ./conf/redis3:/usr/local/etc/redis
      - ./data/redis3:/data
    networks:
      cluster-network:
        ipv4_address: 172.16.10.3

  redis4:
    image: redis:6.2
    container_name: redis4
    command: redis-server /usr/local/etc/redis/redis.conf
    ports:
      - "7004:7004"
    volumes:
      - ./conf/redis4:/usr/local/etc/redis
      - ./data/redis4:/data
    networks:
      cluster-network:
        ipv4_address: 172.16.10.4

  redis5:
    image: redis:6.2
    container_name: redis5
    command: redis-server /usr/local/etc/redis/redis.conf
    ports:
      - "7005:7005"
    volumes:
      - ./conf/redis5:/usr/local/etc/redis
      - ./data/redis5:/data
    networks:
      cluster-network:
        ipv4_address: 172.16.10.5

  redis6:
    image: redis:6.2
    container_name: redis6
    command: redis-server /usr/local/etc/redis/redis.conf
    ports:
      - "7006:7006"
    volumes:
      - ./conf/redis6:/usr/local/etc/redis
      - ./data/redis6:/data
    networks:
      cluster-network:
        ipv4_address: 172.16.10.6
```
> * 将本地`./conf/redis6`路径挂载到容器环境的`/usr/local/etc/redis`
> * 将本地`./data/redis6`路径挂载到容器环境的`/data`
## 准备各redis节点的配置文件
以`redis1`为例,`redis.conf`内容如下，`redis.conf`文件在本地路径`./conf/redis1/`下面。
```conf
port 7001
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 5000
appendonly yes
cluster-node-timeout 15000
cluster-announce-ip 172.16.10.1
cluster-announce-port 7001
cluster-announce-bus-port 17001
```
> 注意：`cluster-announce-ip`用`IP`地址，不要用容器名
## 部署容器
```shell
docker-compose up -d
```
## 进入某个节点的容器环境
部署完成后，这里以容器`redis1`为例，执行如下命令进入容器`redis1`。
```shell
docker exec -it redis1 bash
```
## 创建集群
### 命令
```shell
root@d3701d01f8cc:/data# redis-cli --cluster create 172.16.10.1:7001 172.16.10.2:7002 172.16.10.3:7003 172.16.10.4:7004 172.16.10.5:7005 172.16.10.6:7006 --cluster-replicas 1
```
> 注意：以上需要用IP地址，不要用容器名
> `--cluster-replicas`：指定每个主节点的从节点数量
### 结果
```log
F:\docker-env\redis-cluster>docker exec -it redis1 bash
root@d3701d01f8cc:/data# redis-cli --cluster create 172.16.10.1:7001 172.16.10.2:7002 172.16.10.3:7003 172.16.10.4:7004 172.16.10.5:7005 172.16.10.6:7006 --cluster-replicas 1
>>> Performing hash slots allocation on 6 nodes...
Master[0] -> Slots 0 - 5460
Master[1] -> Slots 5461 - 10922
Master[2] -> Slots 10923 - 16383
Adding replica 172.16.10.5:7005 to 172.16.10.1:7001
Adding replica 172.16.10.6:7006 to 172.16.10.2:7002
Adding replica 172.16.10.4:7004 to 172.16.10.3:7003
M: 1f58014bd17ce1d574be4fa60fc7b058e602375a 172.16.10.1:7001
   slots:[0-5460] (5461 slots) master
M: f65f4e1d7114841c4566538a99b35d961f1b5382 172.16.10.2:7002
   slots:[5461-10922] (5462 slots) master
M: ea5f09a55925a8b1e7525b97becf45266195cb00 172.16.10.3:7003
   slots:[10923-16383] (5461 slots) master
S: 5bbd467dbac36111cd0958aafbb434e8114c4aa7 172.16.10.4:7004
   replicates ea5f09a55925a8b1e7525b97becf45266195cb00
S: deda95cd2ce497aade351f4dbbb35402b5737234 172.16.10.5:7005
   replicates 1f58014bd17ce1d574be4fa60fc7b058e602375a
S: a006097d329bf5cfc1a08cdd164021bf8ff3935a 172.16.10.6:7006
   replicates f65f4e1d7114841c4566538a99b35d961f1b5382
Can I set the above configuration? (type 'yes' to accept): yes
>>> Nodes configuration updated
>>> Assign a different config epoch to each node
>>> Sending CLUSTER MEET messages to join the cluster
   1 additional replica(s)
S: 5bbd467dbac36111cd0958aafbb434e8114c4aa7 172.16.10.4:7004
   slots: (0 slots) slave
   replicates ea5f09a55925a8b1e7525b97becf45266195cb00
S: a006097d329bf5cfc1a08cdd164021bf8ff3935a 172.16.10.6:7006
   slots: (0 slots) slave
   replicates f65f4e1d7114841c4566538a99b35d961f1b5382
S: deda95cd2ce497aade351f4dbbb35402b5737234 172.16.10.5:7005
   slots: (0 slots) slave
   replicates 1f58014bd17ce1d574be4fa60fc7b058e602375a
M: ea5f09a55925a8b1e7525b97becf45266195cb00 172.16.10.3:7003
   slots:[10923-16383] (5461 slots) master
   1 additional replica(s)
M: f65f4e1d7114841c4566538a99b35d961f1b5382 172.16.10.2:7002
   slots:[5461-10922] (5462 slots) master
   1 additional replica(s)
[OK] All nodes agree about slots configuration.
>>> Check for open slots...
>>> Check slots coverage...
[OK] All 16384 slots covered.
```
> * 从上可以看到，该集群创建了3个主节点，3个从节点。
> * 主节点是`172.16.10.1:7001`,`172.16.10.2:7002`,`172.16.10.3:7003`,从节点是`172.16.10.4:7004`,`172.16.10.5:7005`,`172.16.10.6:7006`。
> * `172.16.10.1:7001`的从节点是`172.16.10.5:7005`。
> * `172.16.10.2:7002`的从节点是`172.16.10.6:7006`。
> * `172.16.10.3:7003`的从节点是`172.16.10.4:7004`。
> * redis的数据槽总共有16384个，从0到10383。根据上面的信息可以看出，主节点`172.16.10.1:7001`分到了[0-5460]共5641个槽，主节点`172.16.10.2:7002`分到了[5641-10922]共5642个槽，主节点`172.16.10.3:7003`分到了[10923-16383]共5641个槽。

## 查看集群详情
### 查看节点信息
1. 确保已经切换到容器环境：`docker exec -it redis1 bash`
2. 命令：`redis-cli -p 7001 cluster nodes`
3. 结果
  ```log
  root@ee5321d95a46:/data# redis-cli -p 7001 cluster nodes
  5bbd467dbac36111cd0958aafbb434e8114c4aa7 172.16.10.4:7004@17004 slave ea5f09a55925a8b1e7525b97becf45266195cb00 0 1693987549906 3 connected
  1f58014bd17ce1d574be4fa60fc7b058e602375a 172.16.10.1:7001@17001 myself,master - 0 1693987549000 1 connected 0-5460
  a006097d329bf5cfc1a08cdd164021bf8ff3935a 172.16.10.6:7006@17006 slave f65f4e1d7114841c4566538a99b35d961f1b5382 0 1693987551946 2 connected
  deda95cd2ce497aade351f4dbbb35402b5737234 172.16.10.5:7005@17005 slave 1f58014bd17ce1d574be4fa60fc7b058e602375a 0 1693987550000 1 connected
  ea5f09a55925a8b1e7525b97becf45266195cb00 172.16.10.3:7003@17003 master - 0 1693987550922 3 connected 10923-16383
  f65f4e1d7114841c4566538a99b35d961f1b5382 172.16.10.2:7002@17002 master - 0 1693987551000 2 connected 5461-10922
  ```
  > 其实以上内容可以在`./data/redis1/nodes.conf`文件中看到,其内容是一样的。
### 查看集群信息
1. 确保已经切换到容器环境
2. 命令：`redis-cli -p 7001 cluster info`
3. 结果
  ```log
  root@d3701d01f8cc:/data# redis-cli -p 7001 cluster info
  cluster_state:ok
  cluster_slots_assigned:16384
  cluster_slots_ok:16384
  cluster_slots_pfail:0
  cluster_slots_fail:0
  cluster_known_nodes:6
  cluster_size:3
  cluster_current_epoch:6
  cluster_my_epoch:1
  cluster_stats_messages_ping_sent:47
  cluster_stats_messages_pong_sent:53
  cluster_stats_messages_sent:100
  cluster_stats_messages_ping_received:48
  cluster_stats_messages_pong_received:47
  cluster_stats_messages_meet_received:5
  cluster_stats_messages_received:100
  ```

## 读写数据
读写前确保在容器环境下。
### 写入
```shell
root@d3701d01f8cc:/data# redis-cli -c -p 7001 set name leebai
OK
```
### 读取
```shell
root@d3701d01f8cc:/data# redis-cli -c -p 7001 get name
"leebai"
```

## 存在的问题
<font color=#37a462 size=6>单节点方式访问数据可以访问，集群方式访问数据无法访问。暂时不知道原因。</font>
> 命令行执行命令`telnet 127.0.0.1 7001`测试时发现端口是通的。
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
pong: ping: PONG
get: get name: leebai
--- PASS: TestRedisOneNode (0.00s)
PASS
```
#### 连接整个集群
```log
=== RUN   TestRedisCluster
pingResp: ping: dial tcp 172.16.10.1:7001: i/o timeout
--- PASS: TestRedisCluster (20.15s)
PASS
```
