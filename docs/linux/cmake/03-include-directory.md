---
sidebar: auto
prev: /linux/cmake/02-add-library.html
next: false
---
# 包含目录
## 背景介绍
在“增加库目录”这篇文章的`main.cpp`中，对于`config.h`文件的包含指定了具体的文件位置，这样在一个大型程序中，如果因为因为某次重构更改了一些源文件的位置，那么引用这些源文件的地方就需要对头文件包含进行相应的更改。想像一下一个巨大型项目，且头文件包含极其复杂，此时一点点改动就会让开发头疼欲裂。所以可以通过引入`x`来解开这种头文件包含，只需要修改对应的`CMakeLists.txt`即可，而不需要对源码本身进行修改。以下贴出修改前的`main.cpp`和对应的`CMakeLists.txt`。
* `main.cpp`
```cpp
#include <cstdio>
#include "./config/config.h"

int main()
{
    Config c;
    printf("%s\n", "Hello world!");
        return 0;
}
```
> `main.cpp`包含`config.h`时需要知道自己所在目录和`config.h`所在目录的相对关系，这样在编译链接时才能找到。
* `CMakeLists.txt`
```cmake
cmake_minimum_required(VERSION 3.10)
project(lesson2 VERSION 1.0)

add_subdirectory(config)

add_executable(lesson2 main.cpp)
target_link_libraries(lesson2 PUBLIC LibConfig)
```
## 引入target_include_directories修改后的代码结构
<font color=#ff0000>引入这个的目的就是打破在源代码层面文件的相互包含的关系。</font>修改如下所示。
* `main.cpp`
```cpp
#include <cstdio>
#include "config.h"

int main()
{
    Config c;
    printf("%s\n", "Hello world!");
    return 0;
}
```

* `CMakeLists.txt`
```cmake
cmake_minimum_required(VERSION 3.10)
project(lesson2 VERSION 1.0)

add_subdirectory(config)
# 下面这行就是新加的一行，把config目录包含进来
target_include_directories(LibConfig PUBLIC config)

add_executable(lesson2 main.cpp)
target_link_libraries(lesson2 PUBLIC LibConfig)
```
* 经过这样配置重新`cmake .`和`make`就可以正常生成可执行文件，执行`./lesson2`来运行即可得到正确结果。
* <font color=#3da742>本文中的配置皆在文章“增加库依赖”的基础上进行调整。</font>