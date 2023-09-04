---
sidebar: auto
prev: /go-zero/05-goctl-model-usage-3.html
next: /go-zero/06-gateway-config-add-nginx-proxy-supplement.html
---
# account服务镜像构建
将项目中的`account`服务，打包成`Docker`镜像主要经过以下步骤。
1. 编写`Dockerfile`文件,在本项目中被命名为`account.Dockerfile`,具体内容如下
    ```Dockerfile
    FROM golang:1.19.2 AS builder

    MAINTAINER runningriven@gmail.com

    EXPOSE 8081
    WORKDIR /usr/src/go-zero-demo

    COPY . .

    ENV GOPROXY=https://goproxy.cn,direct

    RUN go mod tidy

    RUN CGO_ENABLED=0 GOOS=linux go build -v -o account ./cmd/account \
    && cp account ./cmd/account/account

    FROM ubuntu
    WORKDIR /usr/local/bin/account

    RUN mkdir ./etc

    COPY --from=builder /usr/src/go-zero-demo/cmd/account/account ./account
    COPY --from=builder /usr/src/go-zero-demo/cmd/account/etc/account-api.yaml ./etc/account-api.yaml

    CMD ["./account"]
    ```
2. 构建镜像，这里我的开发平台是`Windows`平台,所以,将构建镜像的命令放在`bat`文件里了，文件名为`build-account.Dockerfile.bat`,文件内容如下
    ```bat
    docker build -f account.Dockerfile -t account:1.0.0 .
    ```
3. 构建成功，可以在`docker-compose.yml`文件中使用该镜像来启动对应的容器

## 参考链接
* 详细代码详见：[luweiqianyi:go-zero-demo](https://github.com/luweiqianyi/go-zero-demo.git)