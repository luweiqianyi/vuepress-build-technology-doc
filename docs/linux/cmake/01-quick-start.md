---
sidebar: auto
prev: false
next: /linux/cmake/02-add-library.html
---
# CMake构建项目
本教程用来构建一个简单的`CMake`项目。
## 基本构建过程
1. 创建项目,`mkdir lesson1`
2. 进入项目路径,`cd lesson1`
3. 创建`CMakeLists.txt`: `touch CMakeLists.txt`
4. 创建`main.cpp`(`touch main.cpp`)，并加入相应代码
```cpp
#include<cstdio>

int main()
{
    printf("%s\n","Hello world!");
    return 0;
}
```
5. 修改`CMakeLists.txt`的内容,如下所示:
```txt
cmake_minimum_required(VERSION 3.10)
project(lesson1)

add_executable(lesson1 main.cpp)
```
6. 编译：`cmake .`，编译过程会在当前目录下自动生成以下文件和目录：
    * 目录`CMakeFiles`,里面包含默认生成的文件
    * 文件`cmake_install.cmake`
    * 文件`CMakeCache.txt`
    * 文件`Makefile`
7. 生成可执行文件：`make`,在当前目录执行该命令，会在当前路径下生成名为`lesson1`的可执行文件

第6步编译过程：
```shell
root@YINC:~/code/cmake/lesson1# cmake .
-- The C compiler identification is GNU 11.4.0
-- The CXX compiler identification is GNU 11.4.0
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Check for working C compiler: /usr/bin/cc - skipped
-- Detecting C compile features
-- Detecting C compile features - done
-- Detecting CXX compiler ABI info
-- Detecting CXX compiler ABI info - done
-- Check for working CXX compiler: /usr/bin/c++ - skipped
-- Detecting CXX compile features
-- Detecting CXX compile features - done
-- Configuring done
-- Generating done
-- Build files have been written to: /root/code/cmake/lesson1
```

第7步生成可执行文件过程
```shell
root@YINC:~/code/cmake/lesson1# make
[ 50%] Building CXX object CMakeFiles/lesson1.dir/main.cpp.o
[100%] Linking CXX executable lesson1
[100%] Built target lesson1
```
## 其他附加操作
### 使用某个C++标准进行编译，比如C++11
修改`CMakeLists.txt`,完整内容如下：
```txt
cmake_minimum_required(VERSION 3.10)
project(lesson1)

# Specifying the C++ Standard
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED True)

add_executable(lesson1 main.cpp)
```
> * `set(CMAKE_CXX_STANDARD 11)`指定要使用的`C++`标准是`C++11`
> * `set(CMAKE_CXX_STANDARD_REQUIRED True)`指示`CMake`必须使用所指定的`C++`标准进行编译。如果系统不支持所指定的标准，`CMake`将会产生一个错误。

编译过程如下：
```shell
root@YINC:~/code/cmake/lesson1# cmake .
-- The C compiler identification is GNU 11.4.0
-- The CXX compiler identification is GNU 11.4.0
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Check for working C compiler: /usr/bin/cc - skipped
-- Detecting C compile features
-- Detecting C compile features - done
-- Detecting CXX compiler ABI info
-- Detecting CXX compiler ABI info - done
-- Check for working CXX compiler: /usr/bin/c++ - skipped
-- Detecting CXX compile features
-- Detecting CXX compile features - done
-- Configuring done
-- Generating done
-- Build files have been written to: /root/code/cmake/lesson1
```

编译完成运行命令`make`生成二进制可执行文件即可。
### 为项目增加版本号
将`CMakeLists.txt`中的`project(lesson1)`改成`project(lesson1 VERSION 1.0)`

### 为项目增加编译配置文件
1. 新建配置文件`Config.h.in`文件：`touch Config.h.in`
2. 在`Config.h.in`文件中新增内容
```cpp
#define VERSION_MAJOR @VERSION_MAJOR@
#define VERSION_MINOR @VERSION_MINOR@
#define BUILD_DATE "@BUILD_DATE@"
```
> 看下面生成的`Config.h`中的内容可以知道，上面带""的会生成字符串，不带""的生成的是数字。
3. 修改`CMakeLists.txt`文件，内容如下:
```cmake
cmake_minimum_required(VERSION 3.10)
project(lesson1 VERSION 1.0)

# Specifying the C++ Standard
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# 以下三行是我们新加的内容，在运行"cmake ."会自动生成"Config.h"文件
set(VERSION_MAJOR "1.0")
set(VERSION_MINOR "1")
set(BUILD_DATE "2023-09-27")
configure_file(Config.h.in Config.h)

add_executable(lesson1 main.cpp)
```
当前目录执行命令`cmake .`构建项目，生成的`Config.h`文件的内容如下：
```cpp
#define VERSION_MAJOR 1.0
#define VERSION_MINOR 1
#define BUILD_DATE "2023-09-27"
```
4. `main`打印输出生成的文件`Config.h`中内容
```cpp
#include<cstdio>
#include"Config.h"

int main()
{
    printf("%s\n","Hello world!");
    printf("major version: %f, minor version: %d, build date: %s\n",VERSION_MAJOR,VERSION_MINOR,BUILD_DATE);
    return 0;
}
```
当前目录运行命令`make`生成可执行文件`lesson1`,在当前目录执行`./lesson1`运行，输出内容如下:
```shell
root@YINC:~/code/cmake/lesson1# ./lesson1
Hello world!
major version: 1.000000, minor version: 1, build date: 2023-09-27
```