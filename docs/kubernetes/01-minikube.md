---
sidebar: auto
prev: false
next: /kubernetes/02-pod-1.html
---
# minikube
## 环境要求
* 2 CPUs or more
* 2GB of free memory
* 20GB of free disk space
* Internet connection
* Container or virtual machine manager, such as: Docker, QEMU, Hyperkit, Hyper-V, KVM, Parallels, Podman, VirtualBox, or VMware Fusion/Workstation

## 下载
* 下载地址：[https://github.com/kubernetes/minikube/releases/latest/download/minikube-windows-amd64.exe](https://github.com/kubernetes/minikube/releases/latest/download/minikube-windows-amd64.exe)

从上述地址下载好，然后重命名为`minikube.exe`即可。然后将该可执行文件的路径添加到环境变量`path`下面去。

## minikube命令
```shell
minikube 提供并管理针对开发工作流程优化的本地 Kubernetes 集群。

基本命令：
  start            启动本地 Kubernetes 集群
  status           获取本地 Kubernetes 集群状态
  stop             停止正在运行的本地 Kubernetes 集群
  delete           删除本地的 Kubernetes 集群
  dashboard        访问在 minikube 集群中运行的 kubernetes dashboard
  pause            暂停 Kubernetes
  unpause          恢复 Kubernetes

镜像命令
  docker-env       提供将终端的 docker-cli 指向 minikube 内部 Docker Engine 的说明。（用于直接在
minikube 内构建 docker 镜像）
  podman-env       配置环境以使用 minikube's Podman service
  cache            管理 images 缓存
  image            管理 images

配置和管理命令：
  addons           启用或禁用 minikube 插件
  config           修改持久配置值
  profile          获取或列出当前配置文件（集群）
  update-context   IP或端口更改的情况下更新 kubeconfig 配置文件

网络和连接命令：
  service          返回用于连接到 service 的 URL
  tunnel           连接到 LoadBalancer 服务

高级命令：
  mount            将指定的目录挂载到 minikube
  ssh              登录到 minikube 环境（用于调试）
  kubectl          运行与集群版本匹配的 kubectl 二进制文件
  node             添加，删除或者列出其他的节点
  cp               将指定的文件复制到 minikube

故障排除命令
  ssh-key          检索指定节点的 ssh 密钥路径
  ssh-host         检索指定节点的 ssh 主机密钥
  ip               检索指定节点的IP地址
  logs             返回用于调试本地 Kubernetes 集群的日志
  update-check     打印当前版本和最新版本
  version          打印 minikube 版本
  options          显示全局命令行选项列表 (应用于所有命令)。

Other Commands:
  completion       生成命令补全的 shell 脚本
  license          将依赖项的 licenses 输出到一个目录

Use "minikube <command> --help" for more information about a given command.
```