---
sidebar: auto
prev: /electron/01-init.html
next: false
---
# Electron简介
## 基本结构
项目的基本结构主要是以下几个部分：
* `index.html`
* `main.js`
* `preload.js`
* `renderer.js`
* `style.css`
* `package.json`与`package-lock.json`
## index.html
### 简介
项目的首页地址。
### 初始案例
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'">
    <link href="./styles.css" rel="stylesheet">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using Node.js <span id="node-version"></span>,
    Chromium <span id="chrome-version"></span>,
    and Electron <span id="electron-version"></span>.

    <!-- You can also require other files to run in this process -->
    <script src="./renderer.js"></script>
  </body>
</html>
```

## main.js
### 简介
该脚本是`Electron`中的主进程脚本，它是整个应用程序的入口文件，负责启动应用程序、创建窗口并管理应用程序的生命周期等。

详细作用包括：
* 创建应用程序和窗口：在`main.js`中可以使用`app`和`BrowserWindow`对象来创建应用程序和窗口，设置窗口属性和事件监听器等。
* 管理应用程序的生命周期：通过监听`app`对象的生命周期事件，例如`ready`、`window-all-closed`、`activate`等，可以管理应用程序的生命周期，实现应用程序的启动、运行、关闭等操作。
* 处理系统级事件：在`main.js`中可以监听全局的系统事件，例如菜单栏、`Dock`栏和任务栏等，以便实现一些特定的功能，例如自定义菜单栏、响应系统通知等。
* 与渲染进程通信：通过`ipcMain`和`ipcRenderer`模块，可以在主进程和渲染进程之间进行通信，实现进程间的数据传递和交互。
* 管理应用程序的配置和运行环境：在`main.js`中可以读取和操作应用程序的配置文件，例如`package.json`、`electron-builder.yaml`等，以及操作应用程序的运行环境，例如命令行参数、环境变量等。
### 初始案例
```js
// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
```

## preload.js
### 简介
其作用是在渲染进程中预先加载并注入一些自定义的代码和功能。该脚本在渲染进程中执行。

详细作用包括：
* 提供与主进程的通信接口：通过在`preload.js`中使用`contextBridge API`，可以在渲染进程中安全地暴露一些与主进程通信的`API`，以便在渲染进程中直接调用这些`API`，实现进程间的通信。
* 注入自定义函数和变量到渲染进程的全局作用域：通过将自定义的函数和变量添加到`window`对象中，可以在渲染进程的页面中直接访问和使用这些函数和变量。
* 限制渲染进程的权限：通过在`preload.js`中设置沙盒环境和限制访问的范围，可以帮助提高渲染进程的安全性，防止恶意代码访问敏感操作和资源。
* 加载第三方库和工具：在`preload.js`中可以加载其他的`JavaScript`库或工具，以扩展渲染进程的功能，例如在渲染进程中使用`jQuery`或其他自定义的库。
### 初始案例
```js
/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
```
解析如下：
* 这段代码是使用`Electron`的`process`对象来获取`Chrome`、`Node.js`和`Electron`的版本信息，并将其显示在网页中的对应元素上。
* 在`Electron`的渲染进程中，可以通过`process.versions`对象来获取运行时环境的版本信息。然后通过`getElementById`方法找到对应的元素，将版本信息设置为该元素的文本内容。
* 这段代码中使用了`DOMContentLoaded`事件监听器，确保在文档加载完成后执行代码。当文档的`DOM`内容加载完毕时，会触发该事件。然后循环遍历 ['chrome', 'node', 'electron'] 数组，分别获取对应的版本信息并显示在网页中。
* 这段代码需要在 Electron 的渲染进程中执行，通常是在页面的主`JavaScript`文件中。如果你希望将这段代码运行在 `Electron`的渲染进程中，请确保已正确引入相关的`JavaScript`文件，并且在页面加载完毕后执行该代码。
* 另外，需要确保在网页中存在具有相应`id`的元素，例如`chrome-version`、`node-version`和`electron-version`，用于显示各个版本信息。
## renderer.js
### 简介
该脚本是`Electron`中的渲染进程脚本，它在渲染进程中执行，用于处理具体的页面逻辑和用户交互。

详细作用包括：
* 创建网页内容：在`renderer.js`中可以操作`DOM`，创建网页内容，包括添加元素、修改样式、绑定事件等。它负责构建页面的结构和呈现页面的内容。
* 响应用户交互：通过在`renderer.js`中监听`DOM`事件，例如点击、鼠标移动等，可以实现用户与页面的交互。可以根据用户的操作响应事件，并执行相应的操作或逻辑。
* 与主进程通信：通过`ipcRenderer`模块，可以在渲染进程和主进程之间进行通信。在`renderer.js`中可以发送消息给主进程，请求数据或执行一些特定的任务，也可以接收主进程发送的消息，获取数据或执行相应的操作。
* 加载并控制第三方库和框架：在`renderer.js`中可以引入和使用各种`JavaScript`库和框架，例如`jQuery`、`React`、`Vue.js`等，用于扩展页面的功能和实现复杂的交互效果。
### 初始案例
一份内容为空的脚本文件。

## style.css
### 简介
样式文件。
### 初始案例
一份内容为空的样式文件

## package.json与package-lock.json
整个项目的包管理相关的文件。
