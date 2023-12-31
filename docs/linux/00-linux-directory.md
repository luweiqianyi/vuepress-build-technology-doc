---
sidebar: auto
prev: false
next: /linux/01-start-nginx.html
---
# Linux基本目录结构
Linux的根目录为`/`，该目录是整个文件系统的起点。根目录下主要包含以下目录。
* `/bin`：存放系统用户使用的基本命令。
* `/boot`：包含引导启动时所需的文件，例如内核、启动加载配置等。
* `/dev`：用于存放设备文件，包括硬件设备和外部设备。
* `/etc`：存放系统的配置文件，包括网络、用户、服务等的配置文件。
* `/home`：用户的主目录，每个用户都有一个对应的子目录，其中存放该用户的个人文件和设置。
* `/lib`：包含共享库文件，这些文件被二进制可执行文件和其他库所使用。
* `/media`：用于挂载可移动介质的挂载点。
* `/mnt`：临时挂载点，用于挂载其他文件系统。
* `/opt`：用于安装额外的软件包。
* `/proc`：虚拟文件系统，提供有关当前内核和进程的信息。
* `/root`：root 用户的主目录。
* `/run`：存放运行时数据，如系统启动后生成的进程信息、PID 文件等。
* `/sbin`：存放系统管理员（root 用户）使用的系统管理命令。
* `/srv`：存放与特定服务相关的数据。
* `/sys`：虚拟文件系统，提供与内核和硬件设备的交互接口。
* `/tmp`：用于存放临时文件。
* `/usr`：存放大部分系统软件资源。
* `/var`：存放变量数据，包括日志文件、数据库文件、缓存文件等在运行时经常变化的数据。

## 其他
* 那么在Linux中经常见到的`~`是什么?
该目录指的是当前用户所使用的目录，其路径等价于`/home/当前用户/`，具体验证过程如下所示
    ```
    leebai@MachineName:~$ cd /home
    leebai@MachineName:/home$ ls
    leebai
    leebai@MachineName:/home$ cd leebai
    leebai@MachineName:~$
    ```