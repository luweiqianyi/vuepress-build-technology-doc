---
sidebar: auto
prev: /docker/00-docker-image-build.html
next: /docker/02-linux-install-docker.html
---
# docker inspect命令
以下`docker inspect`命令的使用皆基于本文中提供的`docker-compose.yml`所构建的容器。
## docker-compose文件
```yml
version: '3.7'
services:
  mysql:
    image: "mysql:8.0"
    container_name: "mysql"
    volumes:
      - ./conf/mysql/my.cnf:/etc/my.cnf:rw # 挂载本地文件到docker容器,同时修改权限为rw
    environment:
      MYSQL_ROOT_PASSWORD: "123456"
      MYSQL_DATABASE: "chat"
      TZ: "Asia/Shanghai"
    ports:
      - "3306:3306"

  adminer:
    image: adminer
    container_name: "adminer"
    ports:
      - "8080:8080"

  redis:
    image: "redis:7.0"
    container_name: "redis"
    ports:
      - "6379:6379"
    volumes:
      - ./data/redis/redis.conf:/etc/redis.conf:ro
      - ./data/redis:/data/:rw
    entrypoint: [ "redis-server", "/etc/redis.conf" ]
    environment:
      TZ: "Asia/Shanghai"
```

构建命令: `docker-compose -p chat-services up -d`

## 查看容器的所有信息
`docker inspect 容器名`,比如：`docker inspect mysql`
返回结果如下所示
    
```json
    [
        {
            "Id": "643b36495c6c785fb990440896fb2c31c41f73179eaf14ead4c3bce124eea355",
            "Created": "2023-08-14T08:51:50.759816Z",
            "Path": "docker-entrypoint.sh",
            "Args": [
                "mysqld"
            ],
            "State": {
                "Status": "running",
                "Running": true,
                "Paused": false,
                "Restarting": false,
                "OOMKilled": false,
                "Dead": false,
                "Pid": 10661,
                "ExitCode": 0,
                "Error": "",
                "StartedAt": "2023-08-15T03:18:39.2897955Z",
                "FinishedAt": "2023-08-14T09:03:27.5191715Z"
            },
            "Image": "sha256:7c5ae0d3388cc6f2c72e73c8b1b9a7ba29347d9d7117d426b5cd83c3b71fe2b9",
            "ResolvConfPath": "/var/lib/docker/containers/643b36495c6c785fb990440896fb2c31c41f73179eaf14ead4c3bce124eea355/resolv.conf",
            "HostnamePath": "/var/lib/docker/containers/643b36495c6c785fb990440896fb2c31c41f73179eaf14ead4c3bce124eea355/hostname",
            "HostsPath": "/var/lib/docker/containers/643b36495c6c785fb990440896fb2c31c41f73179eaf14ead4c3bce124eea355/hosts",
            "LogPath": "/var/lib/docker/containers/643b36495c6c785fb990440896fb2c31c41f73179eaf14ead4c3bce124eea355/643b36495c6c785fb990440896fb2c31c41f73179eaf14ead4c3bce124eea355-json.log",
            "Name": "/mysql",
            "RestartCount": 0,
            "Driver": "overlay2",
            "Platform": "linux",
            "MountLabel": "",
            "ProcessLabel": "",
            "AppArmorProfile": "",
            "ExecIDs": null,
            "HostConfig": {
                "Binds": [
                    "F:\\HappyCoding\\goprograms\\chat\\docker\\conf\\mysql\\my.cnf:/etc/my.cnf:rw"
                ],
                "ContainerIDFile": "",
                "LogConfig": {
                    "Type": "json-file",
                    "Config": {}
                },
                "NetworkMode": "chat-services_default",
                "PortBindings": {
                    "3306/tcp": [
                        {
                            "HostIp": "",
                            "HostPort": "3306"
                        }
                    ]
                },
                "RestartPolicy": {
                    "Name": "",
                    "MaximumRetryCount": 0
                },
                "AutoRemove": false,
                "VolumeDriver": "",
                "VolumesFrom": null,
                "ConsoleSize": [
                    0,
                    0
                ],
                "CapAdd": null,
                "CapDrop": null,
                "CgroupnsMode": "host",
                "Dns": [],
                "DnsOptions": [],
                "DnsSearch": [],
                "ExtraHosts": [],
                "GroupAdd": null,
                "IpcMode": "private",
                "Cgroup": "",
                "Links": null,
                "OomScoreAdj": 0,
                "PidMode": "",
                "Privileged": false,
                "PublishAllPorts": false,
                "ReadonlyRootfs": false,
                "SecurityOpt": null,
                "UTSMode": "",
                "UsernsMode": "",
                "ShmSize": 67108864,
                "Runtime": "runc",
                "Isolation": "",
                "CpuShares": 0,
                "Memory": 0,
                "NanoCpus": 0,
                "CgroupParent": "",
                "BlkioWeight": 0,
                "BlkioWeightDevice": null,
                "BlkioDeviceReadBps": null,
                "BlkioDeviceWriteBps": null,
                "BlkioDeviceReadIOps": null,
                "BlkioDeviceWriteIOps": null,
                "CpuPeriod": 0,
                "CpuQuota": 0,
                "CpuRealtimePeriod": 0,
                "CpuRealtimeRuntime": 0,
                "CpusetCpus": "",
                "CpusetMems": "",
                "Devices": null,
                "DeviceCgroupRules": null,
                "DeviceRequests": null,
                "MemoryReservation": 0,
                "MemorySwap": 0,
                "MemorySwappiness": null,
                "OomKillDisable": false,
                "PidsLimit": null,
                "Ulimits": null,
                "CpuCount": 0,
                "CpuPercent": 0,
                "IOMaximumIOps": 0,
                "IOMaximumBandwidth": 0,
                "MaskedPaths": [
                    "/proc/asound",
                    "/proc/acpi",
                    "/proc/kcore",
                    "/proc/keys",
                    "/proc/latency_stats",
                    "/proc/timer_list",
                    "/proc/timer_stats",
                    "/proc/sched_debug",
                    "/proc/scsi",
                    "/sys/firmware"
                ],
                "ReadonlyPaths": [
                    "/proc/bus",
                    "/proc/fs",
                    "/proc/irq",
                    "/proc/sys",
                    "/proc/sysrq-trigger"
                ]
            },
            "GraphDriver": {
                "Data": {
                    "LowerDir": "/var/lib/docker/overlay2/0166c2b6c4a9c6c29de8dea2617280e18829848c0a60df7494b54b07066fcf3a-init/diff:/var/lib/docker/overlay2/c6b1eb3cc753d0b058ecc6dc44a15e0352345e93786ad7ae8d2846253d70706c/diff:/var/lib/docker/overlay2/b83195b62b1dbe8460f0ed64917f241c48a64547cf142f1e60a31222ce5c9e22/diff:/var/lib/docker/overlay2/cd794c42b21bcdd15412aa535ebac97679d1afd28ab627a707a92f6d749d3c14/diff:/var/lib/docker/overlay2/2c2bbdeb226865466a79a87ed9ec052c10cf6cac170e311ef5fb94ed286ac11d/diff:/var/lib/docker/overlay2/99a663b0de070966e583b72fdf937bfc1af3d3f168b13a8b02149e6d95e9788e/diff:/var/lib/docker/overlay2/d6cbb8a490296e8f31eedb286f5915f9a05e48ca664f18f30ccf7f6230a9cc78/diff:/var/lib/docker/overlay2/a18ead424c22ad45d55e5182407d97722e214ba6b44702931c30527c8d602dfb/diff:/var/lib/docker/overlay2/1d13410a126dd2fff82bc42805e6eff366a95233f5e7af610236ad52ae6428bb/diff:/var/lib/docker/overlay2/2cadf9deff0f8af3cd7d85a09df20964cc5cdc6d0e7fd8181e0beabefc3b8c70/diff:/var/lib/docker/overlay2/456bf3e9d48f0a341ee960ac59ea469dc8376295602062d2f030dc6235c44d17/diff:/var/lib/docker/overlay2/336a183f6653e53201e37ebdba9773285a99ecb88a537267106d8916ccba1208/diff",
                    "MergedDir": "/var/lib/docker/overlay2/0166c2b6c4a9c6c29de8dea2617280e18829848c0a60df7494b54b07066fcf3a/merged",
                    "UpperDir": "/var/lib/docker/overlay2/0166c2b6c4a9c6c29de8dea2617280e18829848c0a60df7494b54b07066fcf3a/diff",
                    "WorkDir": "/var/lib/docker/overlay2/0166c2b6c4a9c6c29de8dea2617280e18829848c0a60df7494b54b07066fcf3a/work"
                },
                "Name": "overlay2"
            },
            "Mounts": [
                {
                    "Type": "volume",
                    "Name": "b8c151821036245d80018b88151673a53892d3f9a27f076923b80a49dc86ccaa",
                    "Source": "/var/lib/docker/volumes/b8c151821036245d80018b88151673a53892d3f9a27f076923b80a49dc86ccaa/_data",
                    "Destination": "/var/lib/mysql",
                    "Driver": "local",
                    "Mode": "",
                    "RW": true,
                    "Propagation": ""
                },
                {
                    "Type": "bind",
                    "Source": "F:\\HappyCoding\\goprograms\\chat\\docker\\conf\\mysql\\my.cnf",
                    "Destination": "/etc/my.cnf",
                    "Mode": "rw",
                    "RW": true,
                    "Propagation": "rprivate"
                }
            ],
            "Config": {
                "Hostname": "643b36495c6c",
                "Domainname": "",
                "User": "",
                "AttachStdin": false,
                "AttachStdout": true,
                "AttachStderr": true,
                "ExposedPorts": {
                    "3306/tcp": {},
                    "33060/tcp": {}
                },
                "Tty": false,
                "OpenStdin": false,
                "StdinOnce": false,
                "Env": [
                    "MYSQL_ROOT_PASSWORD=123456",
                    "MYSQL_DATABASE=chat",
                    "TZ=Asia/Shanghai",
                    "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                    "GOSU_VERSION=1.16",
                    "MYSQL_MAJOR=8.0",
                    "MYSQL_VERSION=8.0.34-1.el8",
                    "MYSQL_SHELL_VERSION=8.0.34-1.el8"
                ],
                "Cmd": [
                    "mysqld"
                ],
                "Image": "mysql:8.0",
                "Volumes": {
                    "/var/lib/mysql": {}
                },
                "WorkingDir": "",
                "Entrypoint": [
                    "docker-entrypoint.sh"
                ],
                "OnBuild": null,
                "Labels": {
                    "com.docker.compose.config-hash": "76db22c66e278bb61fa418fcf835cf1aa1905019f9958b504cf6d4e75dcef81e",
                    "com.docker.compose.container-number": "1",
                    "com.docker.compose.depends_on": "",
                    "com.docker.compose.image": "sha256:7c5ae0d3388cc6f2c72e73c8b1b9a7ba29347d9d7117d426b5cd83c3b71fe2b9",
                    "com.docker.compose.oneoff": "False",
                    "com.docker.compose.project": "chat-services",
                    "com.docker.compose.project.config_files": "F:\\HappyCoding\\goprograms\\chat\\docker\\docker-compose.yml",
                    "com.docker.compose.project.working_dir": "F:\\HappyCoding\\goprograms\\chat\\docker",
                    "com.docker.compose.service": "mysql",
                    "com.docker.compose.version": "2.20.2"
                }
            },
            "NetworkSettings": {
                "Bridge": "",
                "SandboxID": "eddf66894fa7515dc26a2b8aea7e3932100bef6769d1bd139fcc8669a0276e4d",
                "HairpinMode": false,
                "LinkLocalIPv6Address": "",
                "LinkLocalIPv6PrefixLen": 0,
                "Ports": {
                    "3306/tcp": [
                        {
                            "HostIp": "0.0.0.0",
                            "HostPort": "3306"
                        }
                    ],
                    "33060/tcp": null
                },
                "SandboxKey": "/var/run/docker/netns/eddf66894fa7",
                "SecondaryIPAddresses": null,
                "SecondaryIPv6Addresses": null,
                "EndpointID": "",
                "Gateway": "",
                "GlobalIPv6Address": "",
                "GlobalIPv6PrefixLen": 0,
                "IPAddress": "",
                "IPPrefixLen": 0,
                "IPv6Gateway": "",
                "MacAddress": "",
                "Networks": {
                    "chat-services_default": {
                        "IPAMConfig": null,
                        "Links": null,
                        "Aliases": [
                            "mysql",
                            "mysql",
                            "643b36495c6c"
                        ],
                        "NetworkID": "28cf7f361bc82b020c89362c41109a899369edaa8bce1a828d8936f42cd7e8d8",
                        "EndpointID": "4d679872904495a03e1448ed3debb42c4aa7fea98a2fab9003a5d4bde0d408de",
                        "Gateway": "172.18.0.1",
                        "IPAddress": "172.18.0.5",
                        "IPPrefixLen": 16,
                        "IPv6Gateway": "",
                        "GlobalIPv6Address": "",
                        "GlobalIPv6PrefixLen": 0,
                        "MacAddress": "02:42:ac:12:00:05",
                        "DriverOpts": null
                    }
                }
            }
        }
    ]
```

## 查看容器某个特定属性
比如查看以下特定属性
* `State`中的`Status`属性
    ```
    docker inspect --format='{{.State.Status}}' mysql
    ```
* `NetworkSettings`中的`Ports`属性
    ```
    docker inspect --format='{{.NetworkSettings.Ports}}' mysql
    ```
* 获取容器`IP`地址
    ```
    docker inspect -f "{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}" mysql
    ```
    最终显示结果为：
    ```
    172.18.0.5
    ```
    > Windows平台下使用`-f`来指定模板字符串，并用双引号将模板字符串括起来。
* 获取容器`MAC`地址 
    ```
    docker inspect -f "{{range .NetworkSettings.Networks}}{{.MacAddress}}{{end}}" mysql
    ```
    最终显示结果为：
    ```
    02:42:ac:12:00:05
    ```
* 获取容器日志文件路径
    ```
    docker inspect --format='{{.LogPath}}' mysql
    ```
    最终显示结果为：
    ```
    '/var/lib/docker/containers/643b36495c6c785fb990440896fb2c31c41f73179eaf14ead4c3bce124eea355/643b36495c6c785fb990440896fb2c31c41f73179eaf14ead4c3bce124eea355-json.log'
    ```
* 获取容器对应的镜像
    ```
    docker inspect --format='{{.Config.Image}}' mysql
    ```
    最终显示结果为：
    ```
    'mysql:8.0'
    ```
    > 可以看出，和我们docker-compose.yml中的镜像一模一样
* 获取容器整个json数据中的某一个小节
    ```
    docker inspect -f "{{json .Config}}" mysql
    ```
    最终显示结果为：
    ```json
    {
        "Hostname": "643b36495c6c",
        "Domainname": "",
        "User": "",
        "AttachStdin": false,
        "AttachStdout": true,
        "AttachStderr": true,
        "ExposedPorts": {
            "3306/tcp": {},
            "33060/tcp": {}
        },
        "Tty": false,
        "OpenStdin": false,
        "StdinOnce": false,
        "Env": [
            "MYSQL_ROOT_PASSWORD=123456",
            "MYSQL_DATABASE=chat",
            "TZ=Asia/Shanghai",
            "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
            "GOSU_VERSION=1.16",
            "MYSQL_MAJOR=8.0",
            "MYSQL_VERSION=8.0.34-1.el8",
            "MYSQL_SHELL_VERSION=8.0.34-1.el8"
        ],
        "Cmd": [
            "mysqld"
        ],
        "Image": "mysql:8.0",
        "Volumes": {
            "/var/lib/mysql": {}
        },
        "WorkingDir": "",
        "Entrypoint": [
            "docker-entrypoint.sh"
        ],
        "OnBuild": null,
        "Labels": {
            "com.docker.compose.config-hash": "76db22c66e278bb61fa418fcf835cf1aa1905019f9958b504cf6d4e75dcef81e",
            "com.docker.compose.container-number": "1",
            "com.docker.compose.depends_on": "",
            "com.docker.compose.image": "sha256:7c5ae0d3388cc6f2c72e73c8b1b9a7ba29347d9d7117d426b5cd83c3b71fe2b9",
            "com.docker.compose.oneoff": "False",
            "com.docker.compose.project": "chat-services",
            "com.docker.compose.project.config_files": "F:\\HappyCoding\\goprograms\\chat\\docker\\docker-compose.yml",
            "com.docker.compose.project.working_dir": "F:\\HappyCoding\\goprograms\\chat\\docker",
            "com.docker.compose.service": "mysql",
            "com.docker.compose.version": "2.20.2"
        }
    }
    ```