---
sidebar: auto
prev: /redis/01-pub-sub.html
next: false
---
# docker-compose搭建redis集群(一)
本文档主要介绍如何使用`docker-compose`搭建`redis`集群。
`redis`集群的搭建至少需要3个主节点，3个从节点。
## 准备`docker-compose.yml`
```yml
version: '3'

services:
  redis1:
    image: redis:7.0
    container_name: redis1
    command: redis-server /usr/local/etc/redis/redis.conf
    ports:
      - "7001:7001"
    volumes:
      - ./conf/redis1:/usr/local/etc/redis
      - ./data/redis1:/data
    networks:
      - redis-cluster

  redis2:
    image: redis:7.0
    container_name: redis2
    command: redis-server /usr/local/etc/redis/redis.conf
    ports:
      - "7002:7002"
    volumes:
      - ./conf/redis2:/usr/local/etc/redis
      - ./data/redis2:/data
    networks:
      - redis-cluster

  redis3:
    image: redis:7.0
    container_name: redis3
    command: redis-server /usr/local/etc/redis/redis.conf
    ports:
      - "7003:7003"
    volumes:
      - ./conf/redis3:/usr/local/etc/redis
      - ./data/redis3:/data
    networks:
      - redis-cluster

  redis4:
    image: redis:7.0
    container_name: redis4
    command: redis-server /usr/local/etc/redis/redis.conf
    ports:
      - "7004:7004"
    volumes:
      - ./conf/redis4:/usr/local/etc/redis
      - ./data/redis4:/data
    networks:
      - redis-cluster

  redis5:
    image: redis:7.0
    container_name: redis5
    command: redis-server /usr/local/etc/redis/redis.conf
    ports:
      - "7005:7005"
    volumes:
      - ./conf/redis5:/usr/local/etc/redis
      - ./data/redis5:/data
    networks:
      - redis-cluster

  redis6:
    image: redis:7.0
    container_name: redis6
    command: redis-server /usr/local/etc/redis/redis.conf
    ports:
      - "7006:7006"
    volumes:
      - ./conf/redis6:/usr/local/etc/redis
      - ./data/redis6:/data
    networks:
      - redis-cluster

networks:
  redis-cluster:

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
cluster-announce-ip redis1
cluster-announce-port 7001
cluster-announce-bus-port 17001
```
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
root@ee5321d95a46:/data# redis-cli --cluster create redis1:7001 redis2:7002 redis3:7003 redis4:7004 redis5:7005 redis6:7006 --cluster-replicas 1
```
### 结果
```log
>>> Performing hash slots allocation on 6 nodes...
Master[0] -> Slots 0 - 5460
Master[1] -> Slots 5461 - 10922
Master[2] -> Slots 10923 - 16383
Adding replica redis5:7005 to redis1:7001
Adding replica redis6:7006 to redis2:7002
Adding replica redis4:7004 to redis3:7003
M: e56f7dcbd4856660a8aa433aa13c2d14b5d9de20 redis1:7001
   slots:[0-5460] (5461 slots) master
M: e3f6bc48b8d5751fe1ecfb1bf6b33e85f3fb2d43 redis2:7002
   slots:[5461-10922] (5462 slots) master
M: f8190bf2d2f57b87095f6ec988d926891dbd61fc redis3:7003
   slots:[10923-16383] (5461 slots) master
S: 61933b6054f2b563a974ab0e6f9d963e23ba213a redis4:7004
   replicates f8190bf2d2f57b87095f6ec988d926891dbd61fc
S: 293442e4f38d07277f95db9faeb1ecc7c9326ec6 redis5:7005
   replicates e56f7dcbd4856660a8aa433aa13c2d14b5d9de20
S: 4931c25017b12e9ad16b3fc5c3b8f0a55190aae4 redis6:7006
   replicates e3f6bc48b8d5751fe1ecfb1bf6b33e85f3fb2d43
Can I set the above configuration? (type 'yes' to accept): yes
>>> Nodes configuration updated
>>> Assign a different config epoch to each node
>>> Sending CLUSTER MEET messages to join the cluster
Waiting for the cluster to join
.
[OK] All 16384 slots covered.
```
> * 从上可以看到，该集群创建了3个主节点，3个从节点。主节点是redis1,redis2,redis3,从节点是redis4,redis5,redis6。redis4节点是redis3节点的从节点。redis5节点是redis1节点的从节点。redis6节点是redis2节点的从节点。
> * redis的数据槽总共有16384个，从0到10383。根据上面的信息可以看出，主节点redis1分到了[0-5460]共5641个槽，主节点redis2分到了[5641-10922]共5642个槽，主节点redis3分到了[10923-16383]共5641个槽。

## 查看集群详情
### 命令
进入`redis1`的容器环境执行以下命令，其中`7001`是`redis1`的端口号。
```shell
root@ee5321d95a46:/data# redis-cli -p 7001 cluster nodes
```
### 结果
```log
61933b6054f2b563a974ab0e6f9d963e23ba213a redis4:7004@17004 slave f8190bf2d2f57b87095f6ec988d926891dbd61fc 0 1693815449000 3 connected
e3f6bc48b8d5751fe1ecfb1bf6b33e85f3fb2d43 redis2:7002@17002 master - 0 1693815449729 2 connected 5461-10922
e56f7dcbd4856660a8aa433aa13c2d14b5d9de20 redis1:7001@17001 myself,master - 0 1693815448000 1 connected 0-5460
f8190bf2d2f57b87095f6ec988d926891dbd61fc redis3:7003@17003 master - 0 1693815450735 3 connected 10923-16383
4931c25017b12e9ad16b3fc5c3b8f0a55190aae4 redis6:7006@17006 slave e3f6bc48b8d5751fe1ecfb1bf6b33e85f3fb2d43 0 1693815447721 2 connected
293442e4f38d07277f95db9faeb1ecc7c9326ec6 redis5:7005@17005 slave e56f7dcbd4856660a8aa433aa13c2d14b5d9de20 0 1693815448725 1 connected
```
> 其实以上内容可以在`./data/redis1/nodes.conf`文件中看到,其内容是一样的。