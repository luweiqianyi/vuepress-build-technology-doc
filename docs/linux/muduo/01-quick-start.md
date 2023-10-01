---
sidebar: auto
prev: false
next: /linux/muduo/02-muduo-CMakeLists.html
---

# muduo快速开始
## 源码获取
```shell
git clone https://github.com/chenshuo/muduo.git
```
> 如果是网络问题导致克隆不下来，使用 `git clone https://gitclone.com/github.com/chenshuo/muduo.git`即可

## 编译
编译需要的环境有：
* `cmake`
* `boost`

所以需要执行以下命令来完成环境的安装
* `sudo apt-get upgrade`
* `sudo apt-get update`
* `sudo apt-get install cmake`
* `sudo apt install libboost-all-dev`
* `./build.sh`