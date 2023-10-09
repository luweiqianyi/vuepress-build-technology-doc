---
sidebar: auto
prev: /linux/cmake/07-multiple-project-build-1.html
next: /linux/cmake/08-vscode-gdb-debug.html
---
# cmake 多项目构建(使用库)
## 背景介绍
在前面的文章`cmake 多项目构建`中已经介绍了如何一起构建可执行项目和库文件，本文则基于该项目，在该项目下新建子项目来使用生成的库文件。
这里以未构建的`lesson4`中的所有文件进行一个整体的拷贝，拷贝到`lesson5`的目录中。

## 具体步骤
### 前期准备
1. 拷贝前`lesson4`目录结构
```shell
.
├── CMakeLists.txt
├── build.sh
├── client
│   ├── CMakeLists.txt
│   └── main.cpp
├── common
│   ├── CMakeLists.txt
│   ├── log.cpp
│   ├── log.h
│   ├── math.cpp
│   └── math.h
└── server
    ├── CMakeLists.txt
    └── main.cpp

3 directories, 11 files
```
2. 在`cmake-tutorial`目录下执行拷贝命令：`cp -r lesson4 lesson5`，拷贝完成后`lesson5`中的所有文件和`lesson4`目录中的完全一致
3. 将目录`lesson5`下文件中所有用到字符串`lesson4`的都替换成`lesson5`
4. 构建项目，生成的目录结构应该和文章`cmake 多项目构建`中一模一样
    * 执行脚本`su root ./build.sh`来构建
5. <font color=#3da742>接下来进入正题: 新建一个测试项目`test`来使用上面构建生成的库文件,见下一章节</font>

### 测试项目`test`
### 新建`CMakeLists.txt`
该文件在目录`test`下,具体内容如下:
```cmake
project(test)

# 设置头文件的包含路径(不然下面add_executable(test main.cpp)中main.cpp中会找不到相应的头文件)
include_directories(${CMAKE_SOURCE_DIR}/common)

# 设置库文件的路径
set(LIB_DIR ${CMAKE_SOURCE_DIR}/lib)

# 生成可执行文件test
add_executable(test main.cpp)

# 设置test需要链接的库,不设置找不到定义
target_link_libraries(test PUBLIC 
    ${LIB_DIR}/libmath.a
    ${LIB_DIR}/liblog.so
)
```
> 以上生成`test`可执行文件时，设置需要链接静态库`libmath.a`和动态库`liblog.so`
#### 新建`main.cpp`
```cpp
#include"math.h"
#include"log.h"

int main()
{
    CMath a;
    CLog b;
    return 0;
}
```
> 使用`math`和`log`两个功能
### 修改根目录的`CMakeLists.txt`
修改后的文件内容如下
```cmake
cmake_minimum_required(VERSION 3.10)
project(lesson5)

# 设置可执行文件的生成目录(这里在顶层CMakeLists.txt中设置，则对整个工程有效，子目录中的CMakeLists.txt可以省略以下两行配置)
set(EXECUTABLE_OUTPUT_PATH ${CMAKE_SOURCE_DIR}/bin)
set(LIBRARY_OUTPUT_PATH ${CMAKE_SOURCE_DIR}/lib)

# 以下三行指定要进行build的目录
add_subdirectory(client client)# 第一个client是目录名, 第二个client是工程名
add_subdirectory(server server)
add_subdirectory(common ${PROJECT_NAME})
add_subdirectory(test test)
```
> 主要是在原来的基础上加上`add_subdirectory(test test)`，这样能让整个项目编译时也能够编译`test`目录下的工程。

### 运行脚本构建项目
* 脚本
```shell
su root ./build.sh
```
* 构建结果
```shell
root@riven:~/code/cmake-tutorial/lesson5# su root ./build.sh
Not searching for unused variables given on the command line.
-- The C compiler identification is GNU 11.4.0
-- The CXX compiler identification is GNU 11.4.0
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Check for working C compiler: /usr/bin/gcc - skipped
-- Detecting C compile features
-- Detecting C compile features - done
-- Detecting CXX compiler ABI info
-- Detecting CXX compiler ABI info - done
-- Check for working CXX compiler: /usr/bin/g++ - skipped
-- Detecting CXX compile features
-- Detecting CXX compile features - done
-- Configuring done
-- Generating done
-- Build files have been written to: /root/code/cmake-tutorial/lesson5/build
[ 10%] Building CXX object client/CMakeFiles/client.dir/main.cpp.o
[ 20%] Building CXX object server/CMakeFiles/server.dir/main.cpp.o
[ 30%] Building CXX object lesson5/CMakeFiles/log.dir/log.cpp.o
[ 40%] Building CXX object lesson5/CMakeFiles/math.dir/math.cpp.o
[ 50%] Linking CXX executable ../../bin/client
[ 60%] Linking CXX executable ../../bin/server
[ 70%] Linking CXX shared library ../../lib/liblog.so
[ 80%] Linking CXX static library ../../lib/libmath.a
[ 80%] Built target math
[ 80%] Built target client
[ 90%] Building CXX object test/CMakeFiles/test.dir/main.cpp.o
[ 90%] Built target log
[ 90%] Built target server
[100%] Linking CXX executable ../../bin/test
[100%] Built target test
```
### 测试
测试结果如下所示:
```shell
root@riven:~/code/cmake-tutorial/lesson5# ./bin/test
CMath[0x7ffcd75bd3a6] created!
CLog[0x7ffcd75bd3a7] created!
CLog[0x7ffcd75bd3a7] destroyed!
CMath[0x7ffcd75bd3a6] destroyed!
```
> 如上所示：`test`正常执行，且得到了预期的输出结果。

<font color=#3da742>至此就完成了`test`项目引用其他库文件的测试过程。</font>


源码地址参见[cmake 多项目构建(使用库)](https://github.com/luweiqianyi/cmake-tutorial/tree/5ac0fc158b5eeb8a5acb9e09626a45b32be04db0/lesson5)