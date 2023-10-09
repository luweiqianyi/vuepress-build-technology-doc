---
sidebar: auto
prev: /linux/05-linux-firewall.html
next: false
---
# 迁移WSL中Ubuntu-22.04分发到其他盘
## 背景介绍
默认情况下，`Ubuntu-22.04`安装在`C`盘，随着使用时间增加，`C`盘关于该分发的存储空间越用越多，所以需要迁移到其他盘。我这里迁移的目的地是`e`盘。
## 具体操作
* 查看当前安装的wsl的状态
```shell
PS C:\WINDOWS\system32> wsl -l -v
  NAME                   STATE           VERSION
* docker-desktop         Stopped         2
  docker-desktop-data    Stopped         2
  Ubuntu-22.04           Running         2
```
* 关闭wsl
```shell
PS C:\WINDOWS\system32> wsl --shutdown
```
* 导出`Ubuntu-22.04`到目的盘
```shell
wsl --export Ubuntu-22.04 e:\wsl-Ubuntu22.04\ubuntu.tar
```
* 注销分发
```shell
wsl --unregister Ubuntu-22.04
```
* 导入分发到目的盘
```shell
wsl --import Ubuntu-22.04 e:\wsl-Ubuntu22.04 e:\wsl-Ubuntu22.04\ubuntu.tar
```
> 至此整个迁移就完成了