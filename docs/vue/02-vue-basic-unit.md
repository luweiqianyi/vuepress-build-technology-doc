---
sidebar: auto
prev: /vue/01-vue-quick-start.html
next: 
---
# Vue基本单元
本篇文章主要介绍`vue`项目中一些基础的组件。一些内容略显粗糙，后续再进行完善。
## .vue
`组件名.vue`文件是以`vue`前端开发框架中的最基本的文件单元。以`.vue`为后缀结尾的文件可以作为一个web前端项目的一个组件，比如说`MyCustomizedButton.vue`,`HelloPage.vue`,前者是开发者自己自定义开发的一个按钮组件，后者是自定义开发的一个欢迎页面等等。

一个`*.vue`文件中主要由以下三个部分组成：
* 脚本：以`<script></script>`标签包裹的整个部分
* 自定义组件：以`<template></template>`标签包裹的整个部分
* 样式：以`<style> </style>`标签包裹的整个部分

以下代码展示了自定义的一个按钮组件,可以将代码保存在`RoundButton160x90.vue`文件中，这样其他模块就可以引用这个自定义的按钮组件。
```html
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style>
button {
  width: 160px;
  height: 90px;
  font-weight:bold;
  border: none;
  border-radius: 20px;
}
</style>
```