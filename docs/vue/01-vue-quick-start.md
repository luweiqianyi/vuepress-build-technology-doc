---
sidebar: auto
prev: /vue/00-npm-commands.html
next: /vue/02-vue-basic-unit.html
---
# vue quick start
## 环境准备
* 下载[nodejs](https://nodejs.org/en/download/) `windows`版本的安装即可

## vue项目创建
### 官方demo
* 创建项目：`demo`
    ```shell
    Microsoft Windows [版本 10.0.22621.1265]
    (c) Microsoft Corporation。保留所有权利。

    D:\>cd D:\Developer\vueprograms

    D:\Developer\vueprograms>npm init vue@latest

    Vue.js - The Progressive JavaScript Framework

    √ Project name: ... demo
    √ Add TypeScript? ... No / Yes
    √ Add JSX Support? ... No / Yes
    √ Add Vue Router for Single Page Application development? ... No / Yes
    √ Add Pinia for state management? ... No / Yes
    √ Add Vitest for Unit Testing? ... No / Yes
    √ Add an End-to-End Testing Solution? » No
    √ Add ESLint for code quality? ... No / Yes

    Scaffolding project in D:\Developer\vueprograms\demo...

    Done. Now run:

    cd demo
    npm install
    npm run dev


    D:\Developer\vueprograms>cd demo

    D:\Developer\vueprograms\demo>npm install
    npm WARN deprecated sourcemap-codec@1.4.8: Please use @jridgewell/sourcemap-codec instead

    added 32 packages, and audited 33 packages in 15s

    4 packages are looking for funding
    run `npm fund` for details

    found 0 vulnerabilities

    D:\Developer\vueprograms\demo>npm run dev

    > demo@0.0.0 dev
    > vite


    VITE v4.1.4  ready in 1084 ms

    ➜  Local:   http://localhost:5173/
    ➜  Network: use --host to expose
    ➜  press h to show help
    ```
* 浏览器访问：`http://localhost:5173/`即可访问
#### 指令说明
* `npm init vue@latest`的执行结果创建如下目录和文件
    ```shell
    D:\Developer\vueprograms\mall>tree/F
    卷 Data 的文件夹 PATH 列表
    卷序列号为 2480-8D3D
    D:.
    │  .gitignore
    │  index.html
    │  package.json
    │  README.md
    │  vite.config.js
    │
    ├─.vscode
    │      extensions.json
    │
    ├─public
    │      favicon.ico
    │
    └─src
        │  App.vue
        │  main.js
        │
        ├─assets
        │      base.css
        │      logo.svg
        │      main.css
        │
        └─components
            │  HelloWorld.vue
            │  TheWelcome.vue
            │  WelcomeItem.vue
            │
            └─icons
                    IconCommunity.vue
                    IconDocumentation.vue
                    IconEcosystem.vue
                    IconSupport.vue
                    IconTooling.vue
    ```
    > `windows`平台下`cmd`输出目录树指令：`tree/F`
* `npm install`的执行结果是会生成`node_modules`目录，该目录下有程序所运用到的相关模块
* `npm run dev`: 就是以开发模式运行
### 构建项目并打包到nginx服务器
* 运行`npm run build`构建项目，会生成`dist`目录，项目文件在`dist`目录下
* 将整个`dist`目录放在`nginx.exe`文件所在目录的`html`目录下,将`dist`更名为`demo`
* 在`nginx.exe`文件所在目录的`conf`目录下找到`nginx.conf`文件，增加服务配置如下:
    ```conf
    server {
        listen       8090; # 配置访问端口为8090
        server_name  localhost; # 配置服务名称为localhost

        location /demo { # 配置访问路径为demo
            root   html; # 配置根路径为html,html是nginx.exe文件所在目录的html目录
            index  index.html; # 设置demo目录下的页面文件为主界面
        }
    }
    ```
* 启动或者重启`nginx.exe`

> `nginx`的下载地址： [https://nginx.org/en/download.html](https://nginx.org/en/download.html)，下载`windows`版本安装即可
