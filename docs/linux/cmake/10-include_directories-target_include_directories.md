---
sidebar: auto
prev: /linux/cmake/09-cmake-default-variable.html
next: /linux/cmake/11-target_include_directories-public-private-interface.html
---
# include_directories与target_include_directories的区别
`include_directories()`和`target_include_directories()`都是用于指定头文件搜索路径的`CMake`命令，但它们之间有一些区别。

## include_directories()
* `include_directories()`是一个全局命令，可以在CMakeLists.txt的任何位置调用。
* `include_directories()`会将指定的目录添加到整个项目的编译过程中，包括所有的目标（target）。
* 使用`include_directories()`添加的头文件搜索路径对整个项目都有效，无需针对特定的目标进行设置。
* 示例使用`include_directories()`的方式：
    ```shell
    include_directories(/path/to/include)
    ```
## target_include_directories()
* `target_include_directories()`是一个目标级别的命令，需要指定目标名称。
* `target_include_directories()`只会将指定的目录添加到特定目标（`target`）的编译过程中。
* 使用`target_include_directories()`添加的头文件搜索路径仅对特定目标有效，不会影响其他目标。
* 示例使用`target_include_directories()`的方式：
    ```shell
    target_include_directories(target_name PUBLIC /path/to/include)
    ```
    > 在上述示例中，`target_name`是你定义的目标名称，`PUBLIC`表示将该头文件搜索路径设置为公开（`public`），使得该目标及其依赖项都能访问该路径。

## 总结
* `include_directories()`是全局命令，适用于整个项目，而`target_include_directories()`是目标级别的命令，适用于特定目标。
* `include_directories()`添加的头文件搜索路径对整个项目有效，而`target_include_directories()`添加的头文件搜索路径仅对特定目标有效。
* 如果只需要设置全局的头文件搜索路径，可以使用`include_directories()`；如果需要针对特定目标设置头文件搜索路径，应使用`target_include_directories()`。
* 需要注意的是，`CMake 3.0`及更高版本推荐使用`target_include_directories()`来指定目标的头文件搜索路径，而不是直接使用`include_directories()`。这样可以更好地管理和控制目标之间的依赖关系，并提供更清晰的构建配置。