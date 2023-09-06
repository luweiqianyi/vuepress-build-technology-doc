---
sidebar: auto
prev: /linux/00-linux-directory.html
next: false
---

# 我的nginx
## 启动nginx
我的`nginx`部署在腾讯云服务器上,系统是`ubuntu`。没有安装在默认路径下，我的`nginx`可执行文件在`/usr/local/nginx/sbin/`路径下，且没有加入`path`路径。所以每一次重启云服务示例都需要执行下面的命令以重启`nginx`程序以对外提供服务。
```shell
sudo /usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
```

## 查找nginx在哪个路径
如果忘了nginx在哪个路径下，可以执行以下命令来查找
```shell
your-username@your-machine:~$ whereis nginx
nginx: /usr/local/nginx
```

## nginx.conf文件所在路径
* `/usr/local/nginx/conf/nginx.conf`

## 查看nginx.conf文件内容
```shell
cat /usr/local/nginx/conf/nginx.conf
```