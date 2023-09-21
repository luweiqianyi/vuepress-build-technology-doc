---
sidebar: auto
prev: /kubernetes/03-deployments.html
next: /kubernetes/05-job.html
---
# `Pod`与`Deployment`的区别
在`Kubernetes`中，`Pod`和`Deployment`是两个不同的资源对象，用于管理容器化应用的部署。它们有以下区别：
`Pod`：
* `Pod`是`Kubernetes`中最小的调度和部署单位，可以包含一个或多个容器。
* `Pod`直接运行应用程序的容器，通常一个`Pod`对应一个应用实例。
* `Pod`是临时性的，如果`Pod`发生故障或被删除，`Kubernetes`将会重新创建一个新的`Pod`来替代它。
* `Pod`没有自我修复能力，无法进行简单的水平扩展或滚动升级。

`Deployment`：
* `Deployment`是一个高级资源对象，用于定义和管理`Pod`的副本集。
* `Deployment`通过控制副本集(`replica set`)来确保指定数量的`Pod`副本正在运行。
* `Deployment`具备自我修复能力，可以监测和管理`Pod`的状态，提供故障恢复和滚动升级等功能。
* `Deployment`支持水平扩展，可以根据负载情况自动调整`Pod`的副本数量。
* `Deployment`还支持滚动更新，可以在不中断服务的情况下逐步更新应用程序。

因此，`Pod`更关注单个应用实例的运行，而`Deployment`则更侧重于管理和维护多个`Pod`副本，并提供一些高级功能，如自我修复、水平扩展和滚动升级。在实际使用中，通常会使用`Deployment`来管理`Pod`的部署，而直接操作`Pod`的情况相对较少。