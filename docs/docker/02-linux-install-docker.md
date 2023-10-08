---
sidebar: auto
prev: /docker/01-docker-inspect.html
next: /docker/03-docker-network.html
---
# Linux系统(Ubuntu)安装docker
## 首先查看自己的Linux版本
### 查看操作系统信息
```shell
username@MachineName:~$ cat /etc/os-release
PRETTY_NAME="Ubuntu 22.04.3 LTS"
NAME="Ubuntu"
VERSION_ID="22.04"
VERSION="22.04.3 LTS (Jammy Jellyfish)"
VERSION_CODENAME=jammy
ID=ubuntu
ID_LIKE=debian
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
```
> 上面可以看出来操作系统的版本是`Ubuntu 22.04.3 LTS (Jammy Jellyfish)`这个版本的
### 查看主机信息
```shell
username@MachineName:~$ hostnamectl
 Static hostname: MachineName
       Icon name: computer-vm
         Chassis: vm
      Machine ID: 你的机器ID
         Boot ID: 你的BootID
  Virtualization: kvm
Operating System: Ubuntu 22.04.3 LTS              
          Kernel: Linux 5.15.0-56-generic
    Architecture: x86-64
 Hardware Vendor: Tencent Cloud
  Hardware Model: CVM
```
> 上面看出来，系统是`x86-64`版本的架构
## Docker安装过程
### 安装方式选择
我的远程`Linux`服务器不是桌面环境，所以这里我不选择安装`Docker-Desktop`。

[官网](https://docs.docker.com/engine/install/ubuntu/)提供了四种安装方式，我这里选择了这种[install-docker-using-the-repository](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository)。

### 安装详细步骤
1. 建立Docker引擎的软件包仓库
```shell
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add the repository to Apt sources:
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$UBUNTU_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```
> 逐行执行上面的命令
2. 安装`docker`
```shell
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```
3. 查看`docker`是否安装成功
```shell
sudo docker version
```
或者
```shell
sudo docker ps
```
结果如下：
```shell
username@MachineName:~/notes$ sudo docker version
Client: Docker Engine - Community
 Version:           24.0.6
 API version:       1.43
 Go version:        go1.20.7
 Git commit:        ed223bc
 Built:             Mon Sep  4 12:31:44 2023
 OS/Arch:           linux/amd64
 Context:           default

Server: Docker Engine - Community
 Engine:
  Version:          24.0.6
  API version:      1.43 (minimum version 1.12)
  Go version:       go1.20.7
  Git commit:       1a79695
  Built:            Mon Sep  4 12:31:44 2023
  OS/Arch:          linux/amd64
  Experimental:     false
 containerd:
  Version:          1.6.24
  GitCommit:        61f9fd88f79f081d64d6fa3bb1a0dc71ec870523
 runc:
  Version:          1.1.9
  GitCommit:        v1.1.9-0-gccaecfc
 docker-init:
  Version:          0.19.0
  GitCommit:        de40ad0
username@MachineName:~/notes$ sudo docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```
> `docker`命令是`docker`的客户端命令，使用该命令与`docker`的后台(即`dockerd`进程)进行进行通信