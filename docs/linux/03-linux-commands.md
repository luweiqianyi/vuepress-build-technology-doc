---
sidebar: auto
prev: /linux/02-wsl.html
next: false
---
# Linux常用命令
## 账号
* root账号
* 用户账号：用户账号执行某些命令时需要在前面加上`sudo`，比如`sudo ufw status`

## 目录
* `~` 符号表示当前用户的 home 目录，也就是当前登录用户的默认起始目录。

## 防火墙
* 查看当前防火墙通过的端口: `sudo ufw status`
* 启动防火墙：`sudo ufw enable`
* 禁用防火墙：`sudo ufw disable`
* 允许某个端口通过防火墙
    * `sudo ufw allow ssh`: 允许通过ssh，默认端口是22
    * `sudo ufw allow 'Nginx Full'`: 允许通过nginx的所有端口
    * `sudo ufw allow 1935`: 允许1935端口
> `ufw`在`linux`系统中可能没有安装，需要执行`sudo apt-get install ufw`来进行安装

## 查找
* `whereis nginx`: 查找包含`nginx`的目录

## 查看开放的端口号
以下命令是`Ubuntu`系统自带的命令，不需要额外安装
```shell
root@your-machine-name:~/code/TinyWebServer# netstat -tuln
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State      
tcp        0      0 127.0.0.53:53           0.0.0.0:*               LISTEN     
tcp        0      0 127.0.0.1:33060         0.0.0.0:*               LISTEN     
tcp        0      0 127.0.0.1:32881         0.0.0.0:*               LISTEN     
tcp        0      0 127.0.0.1:3306          0.0.0.0:*               LISTEN     
udp        0      0 127.0.0.53:53           0.0.0.0:*                          
udp        0      0 127.0.0.1:323           0.0.0.0:*                          
udp6       0      0 ::1:323                 :::*  
```

## 查看网络信息
`ifconfig`命令需要安装`net-tools`，安装命令是:`apt-get install net-tools`
```shell
root@your-machine-name:~# ifconfig
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.17.32.44  netmask 255.255.240.0  broadcast 172.17.47.255
        inet6 fe80::215:5dff:fe67:da3b  prefixlen 64  scopeid 0x20<link>
        ether 00:15:5d:67:da:3b  txqueuelen 1000  (Ethernet)
        RX packets 230818  bytes 345346342 (345.3 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 109302  bytes 8385279 (8.3 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 32884  bytes 55674854 (55.6 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 32884  bytes 55674854 (55.6 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```