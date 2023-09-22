# WSL
## 版本选择
WSL1与WSL2版本区别：[https://learn.microsoft.com/zh-cn/windows/wsl/compare-versions](https://learn.microsoft.com/zh-cn/windows/wsl/compare-versions)

## 常用命令

### 查看WSL版本：`wsl --list --verbose`
```shell
PS C:\WINDOWS\system32> wsl --list --verbose
  NAME                   STATE           VERSION
* docker-desktop         Stopped         2
  docker-desktop-data    Stopped         2
```

### 查看可以安装的分发
* `wsl --list --online`
结果如下：
```shell
PS C:\WINDOWS\system32> wsl --list --online
以下是可安装的有效分发的列表。
使用 'wsl.exe --install <Distro>' 安装。

NAME                                   FRIENDLY NAME
Ubuntu                                 Ubuntu
Debian                                 Debian GNU/Linux
kali-linux                             Kali Linux Rolling
Ubuntu-18.04                           Ubuntu 18.04 LTS
Ubuntu-20.04                           Ubuntu 20.04 LTS
Ubuntu-22.04                           Ubuntu 22.04 LTS
OracleLinux_7_9                        Oracle Linux 7.9
OracleLinux_8_7                        Oracle Linux 8.7
OracleLinux_9_1                        Oracle Linux 9.1
openSUSE-Leap-15.5                     openSUSE Leap 15.5
SUSE-Linux-Enterprise-Server-15-SP4    SUSE Linux Enterprise Server 15 SP4
SUSE-Linux-Enterprise-15-SP5           SUSE Linux Enterprise 15 SP5
openSUSE-Tumbleweed                    openSUSE Tumbleweed
```

### 安装某个分发
* 先切换到WSL2：`wsl --set-default-version 2`
* 再安装对应版本的分发：`wsl --install Ubuntu-22.04`
* 安装完成后检查
```shell
PS C:\WINDOWS\system32> wsl --list --verbose
  NAME                   STATE           VERSION
* docker-desktop         Stopped         2
  Ubuntu-22.04           Running         2
  docker-desktop-data    Stopped         2
```

### 卸载某个分发
```shell
wsl --unregister Ubuntu-22.04
```

### 关闭某个分发
以Ubuntu-22.04为例
```shell
wsl --terminate Ubuntu-22.04
```

### 设置WSL版本
* 管理员打开powershell或者cmd
* `wsl --set-default-version 2`

### 重启wsl
* `wsl --shutdown`
* 管理员身份重新打开`powershell`或者`cmd`
* 启动: `wsl`