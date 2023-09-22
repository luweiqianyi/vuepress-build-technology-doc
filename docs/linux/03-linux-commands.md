---
sidebar: auto
prev: /linux/02-wsl.html
next: false
---
# Linux常用命令
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
root@YINC:~# ifconfig
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