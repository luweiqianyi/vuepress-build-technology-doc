---
sidebar: auto
prev: /redis/02-redis-cluster-01.html
next: false
---
# redis遇到的问题及解决办法
## 单机
敬请期待。
## 集群
1. 主节点有数据从节点没有数据，从节点的日志显示：`Failed trying to load the MASTER synchronization DB from disk`。
修改配置文件`redis.conf`,增加如下配置。
    ```yml
    repl-diskless-load on-empty-db
    ```
