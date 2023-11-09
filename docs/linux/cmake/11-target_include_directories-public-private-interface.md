---
sidebar: auto
prev: /linux/cmake/10-include_directories-target_include_directories.html
next: false
---
# target_include_directories 修饰符介绍
在使用`target_include_directories()`命令时，可以使用不同的修饰符来指定头文件搜索路径的可见性和使用范围。除了`PUBLIC`修饰符外，还有`PRIVATE`和`INTERFACE`修饰符。

1. `PUBLIC`修饰符：
使用`PUBLIC`修饰符将头文件搜索路径设置为公开（`public`）。
公开的头文件搜索路径会应用于当前目标以及依赖于该目标的其他目标。
其他目标可以通过链接到当前目标来访问公开的头文件搜索路径。

    示例：
    ```shell
    target_include_directories(target_name PUBLIC /path/to/include)
    ```
2. `PRIVATE`修饰符：
使用PRIVATE修饰符将头文件搜索路径设置为私有（`private`）。
私有的头文件搜索路径仅适用于当前目标，不会传递给依赖项。
其他目标无法通过链接到当前目标来访问私有的头文件搜索路径。

    示例：

    ```shell
    target_include_directories(target_name PRIVATE /path/to/include)
    ```
3. `INTERFACE`修饰符：
使用`INTERFACE`修饰符将头文件搜索路径设置为接口（`interface`）。
接口的头文件搜索路径仅适用于依赖于当前目标的其他目标，而不适用于当前目标本身。
当前目标不会继承接口的头文件搜索路径。
    示例：
    ```shell
    target_include_directories(target_name INTERFACE /path/to/include)
    ```

4. 需要注意的是，修饰符可以同时使用，以指定不同的可见性和使用范围。例如，可以使用`PUBLIC`和`PRIVATE`修饰符来指定不同的头文件搜索路径。
    ```shell
    target_include_directories(target_name PUBLIC /public/include)
    target_include_directories(target_name PRIVATE /private/include)
    ```
    在上述示例中，`/public/include`路径将被设置为公开的头文件搜索路径，而`/private/include`路径则被设置为私有的头文件搜索路径。

5. 总结：

* `PUBLIC`修饰符将头文件搜索路径设置为公开，适用于当前目标及其依赖项。
* `PRIVATE`修饰符将头文件搜索路径设置为私有，仅适用于当前目标。
* `INTERFACE`修饰符将头文件搜索路径设置为接口，仅适用于依赖于当前目标的其他目标。
* 可以同时使用多个修饰符来指定不同的可见性和使用范围。