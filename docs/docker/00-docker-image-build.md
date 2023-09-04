---
sidebar: auto
prev: false
next: /docker/01-docker-inspect.html
---
# Docker构建镜像
## 基本步骤
Docker构建镜像主要包括以下几个步骤
* 编写源码
* 编写`Dockerfile`文件
* 使用`docker build`命令构建镜像，即执行`docker build -t 镜像名称:镜像版本/标签 .`
* 清除镜像构建过程中因失败生成的none镜像，即执行`docker image prune -f`

## Dockerfile
项目目录如下所示
```
chat
├── cmd
│   ├── account
│   │   ├── main.go
│   │   ├── accountCfg.yaml
│   └── └── other folders or code files
│    
├── go.mod
├── go.sum 
├── Dockerfile
└── .dockerignore
```

对应的`Dockerfile`文件如下所示
```dockerfile
# 一阶段构建
FROM golang:1.19.2 as builder
MAINTAINER youremail@gmail.com

# 设置工作目录(docker中的目录)
WORKDIR /usr/src/chat/
# COPY src dst: 拷贝当前目录所有文件到WORKDIR
COPY . .
ENV GOPROXY=https://goproxy.cn,direct

# 自动下载依赖包
RUN go mod tidy

RUN mkdir -p /usr/local/bin/chat/account/ \
    && CGO_ENABLED=0 GOOS=linux go build -v -o account ./cmd/account \
    && ls -l \
    && cp account ./cmd/account/account

# 二阶段构建(必须要基础镜像，FROM scratch：构建一个完全空白的容器镜像，这意味着该镜像没有任何基础操作系统或文件系统。)
FROM scratch
WORKDIR /usr/local/bin/chat
# 以下只拷贝必要的文件到目的路径下
COPY --from=builder /usr/src/chat/cmd/account/account ./account/account
COPY --from=builder /usr/src/chat/cmd/account/accountCfg.yaml ./account/accountCfg.yaml
CMD ["./account/account"]
```
以上`Dockerfile`详解，该`Dockerfile`将构建阶段分成两个阶段，一阶段将源码编译生成可执行脚本，二阶段才是真正提取镜像文件的步骤
* 一阶段
    * 首先设置目的平台的工作目录为`/usr/src/chat/`
    * 其次执行`COPY . .`，该命令会将当前目录下的所有文件拷贝到目的平台的工作目录下，同时拷贝的内容受限于`.dockerfile`中定义的范围
    * 接下来，为了提高网络访问速度与稳定，设置`go`代理为国内源
    * 接下来，在目的平台目的路径创建文件目录
    * 经过上面的拷贝命令，程序源码已经拷贝到目的平台，此时使用`go build`在目的平台编译源码，生成可执行文件`account`，`-v`表示显示详细的构建日志，`./cmd/account`表示源码在目的平台所在目录
    * `ls -ls`列出当前目录下的文件和目录，看看上面的构建过程是否成功
    * 最后将可执行文件`account`拷贝到目的平台的目的地址，其完整路径为`/usr/src/chat/cmd/account/account`
* 二阶段
    * 选择基础镜像为`scratch`
    * 设置目的平台的目的目录
    * 拷贝一阶段的可执行文件到二阶段的目的路径，其完整路径为`/usr/local/bin/chat/account/account`
    * 拷贝一阶段可执行文件的配置文件到目的路径，其完整路径为`/usr/local/bin/chat/account/accountCfg.yaml`
    * `CMD`指定容器启动时要执行的默认命令

## .dockerignore
```dockerignore
*
!cmd/
!pkg/
```
* `*`：忽略所有文件
* `!cmd/`：排除`cmd`目录，即不忽略`cmd`目录下的文件
* `!pkg/`：排除`pkg`目录
> `dockerfile`中执行`COPY`命令时会忽略`dockerignore`中指定的目录及文件