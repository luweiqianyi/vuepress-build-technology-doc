---
sidebar: auto
prev: /linux/03-linux-commands.html
next: false
---
# Linux libraries
`build-essential`,`libpcre3`,`libpcre3-dev`和`libssl-dev`都是在`Linux`系统中用于编译和安装软件包时所需的依赖项。这些依赖项通常是在编译安装`Nginx`时所需的，它们提供了许多常见库的包，使得用户无需自己手动安装和解决依赖关系。因此，在安装`Nginx`之前，建议先安装这些软件包以避免出现错误或缺少依赖项的情况。

* `build-essential`包含了编译软件所需的基本工具，例如`C/C++`编译器`（gcc/g++）`、`make`工具、`libc`库及其头文件等。
* `libpcre3` 是`Perl`兼容的正则表达式库，提供支持`Nginx HTTP`服务器使用正则表达式进行`URL`路径的匹配。
* `libpcre3-dev` 则是针对开发者的`libpcre3`库的头文件和开发文档，在编译需要使用到`libpcre3`库的软件时需要安装此依赖项。
* `libssl-dev`则是`OpenSSL`架构的库和开发文档，是编译需要使用到`OpenSSL`的软件时必需的依赖项之一。`Nginx`使用`OpenSSL`提供`HTTPS/TLS`加密通信功能，因此它需要依赖于此库。
* `unzip`: 用于解压的库

安装命令：`sudo apt install build-essential libpcre3 libpcre3-dev libssl-dev unzip`
> 非管理员身份需要用`sudo`来提升以下命令执行的等级

命令未找到，则需要安装对应的库，比如说`sudo: weget: command not found`,则需要运行`sudo apt install weget`