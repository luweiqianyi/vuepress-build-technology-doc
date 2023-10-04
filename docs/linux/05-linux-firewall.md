---
sidebar: auto
prev: /linux/04-linux-libraries.html
next: false
---
# Linux防火墙
## ufw
全称`uncomplicated firewall`。通常用在`Debian`发行版系统中，如`Ubuntu`。
### 常见命令
* 查看防火墙状态和规则
```shell
sudo ufw status
```
* 开启防火墙
```shell
sudo ufw enable
```
* 关闭防火墙
```shell
sudo ufw disable
```
* 开放端口
```shell
sudo ufw allow 80/tcp
```
* 关闭端口
```shell
sudo ufw delete allow 80/tcp
```
* 允许特定服务
```shell
sudo ufw allow ssh
```
* 删除特定服务
```shell
sudo ufw delete allow ssh
```
* 拒绝特定服务
```shell
sudo ufw deny ssh
```
> 如果在执行允许特定服务的命令之后，直接执行了拒绝特定服务的命令，则删除该路由规则的命令则需要变为: `sudo ufw delete deny ssh`
* 添加源IP地址的访问限制
```shell
sudo ufw allow from 192.168.0.100
```
* 解除特定源IP地址的访问限制
```shell
sudo ufw delete allow from 192.168.0.100
```

## firewalld
### 安装
若`linux`服务器上一开始安装并启用了`ufw`,但是没有安装`firewalld`的情况下，此时执行`sudo apt install firewalld`,会将`ufw`关闭掉；而`firewalld`自己会启动起来，需要执行以下两条命令将其关闭。
```shell
sudo systemctl stop firewalld
sudo systemctl disable firewalld
```
> 第一条命令将停止运行 Firewalld 服务，第二条命令将禁用 Firewalld 防火墙使其不会在系统启动时自动加载。停止之后如果想要用`ufw`防火墙再用相关的命令启动即可，见`ufw`章节即可

### firewalld相关命令
* 查看防火墙状态和活动的区域
```shell
firewall-cmd --state
firewall-cmd --get-active-zones
```
* 查看特定区域中的规则
```shell
firewall-cmd --zone=public --list-all
```
* 开放端口
```shell
firewall-cmd --zone=public --add-port=80/tcp --permanent
firewall-cmd --reload
```
* 关闭端口
```shell
sudo firewall-cmd --zone=public --remove-port=80/tcp --permanent
firewall-cmd --reload
```
* 允许特定服务
```shell
firewall-cmd --zone=public --add-service=http --permanent
firewall-cmd --reload
```
* 删除特定服务
```shell
sudo firewall-cmd --zone=public --remove-service=http --permanent
firewall-cmd --reload
```
* 添加源IP地址的限制访问
```shell
firewall-cmd --zone=public --add-source=192.168.0.100 --permanent
firewall-cmd --reload
```
* 删除源IP地址的限制访问
```shell
sudo firewall-cmd --zone=public --remove-source=192.168.0.100 --permanent
firewall-cmd --reload
```

### firewalld中的zone的相关取法
* `public`: 默认的区域，适用于公共网络环境。它具有较为严格的规则，通常用于保护系统免受未知网络中的攻击。
* `internal`: 适用于内部网络环境，比如办公室或家庭网络。这个区域比较宽松，允许更多的网络连接。
* `external`: 适用于连接到外部网络的接口，如互联网提供商的连接。该区域具有较高的安全级别，并且仅允许受信任的服务通过。
* `dmz`: 用于配置防火墙和分离内部网络与半信任区域（通常称为DMZ）之间的通信。DMZ是一个放置公共服务器（如Web服务器、邮件服务器等）的区域，它处于内部网络和外部网络之间。
* `work`: 适用于工作环境，其中设备可能需要与其他受信任的同事或设备进行通信。它比较宽松，允许一些更常见的服务通过。
* `home`: 适用于家庭网络环境，具有较为宽松的规则，允许一些常见的服务通过。