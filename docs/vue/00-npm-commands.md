---
sidebar: auto
prev: false
next: /vue/01-vue-quick-start.html
---
# npm命令
* 安装包
    ```shell
    npm install @vuepress-plume/vuepress-plugin-blog-data
    ```
    > 以包`@vuepress-plume/vuepress-plugin-blog-data`为例
* 卸载包
    ```shell
    npm uninstall @vuepress-plume/vuepress-plugin-blog-data
    ```
* 检查模块是否安装
    ```shell
    PS D:\Code\github.com\vuepress-build-technology-doc> npm ls vuepress
    technology-doc-leebai@1.0.0 D:\Code\github.com\vuepress-build-technology-doc
    └── vuepress@1.9.10

    PS D:\Code\github.com\vuepress-build-technology-doc> npm ls vuepress-shared
    technology-doc-leebai@1.0.0 D:\Code\github.com\vuepress-build-technology-doc
    └── (empty)

    PS D:\Code\github.com\vuepress-build-technology-doc> npm ls vuepress-theme-hope
    technology-doc-leebai@1.0.0 D:\Code\github.com\vuepress-build-technology-doc
    └── (empty)
    ```
* 包的全局安装
    ```shell
    npm install revili@next -g
    ```
    > 执行安装命令时指定参数`-g`
* 查看包全局安装的路径
    ```shell
    C:\Users\runni>npm root -g
    C:\Users\runni\AppData\Roaming\npm\node_modules
    ```