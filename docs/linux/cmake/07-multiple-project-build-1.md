---
sidebar: auto
prev: /linux/cmake/06-lesson3-compile-part.html
next: /linux/cmake/07-multiple-project-build-2.html
---
# cmake 多项目构建
## 背景介绍
一个解决方案中多个项目。对整个解决方案进行`build`，生成各自的可执行文件或者库。以下我定义了三个项目用来生成可执行文件和库，介绍如下：
* 项目`client`: 用来生成可执行文件`client`
* 项目`server`: 用来生成可执行文件`server`
* 项目`common`: 用来生成静态库`libmath.a`和动态库`liblog.so`

## 详细介绍
### 目录结构
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
```
> `linux`系统下用命令`tree`即可获取目录结构

### 文件具体内容
#### 顶层CMakeLists.txt
```cmake
cmake_minimum_required(VERSION 3.10)
project(lesson4)

# 设置可执行文件的生成目录(这里在顶层CMakeLists.txt中设置，则对整个工程有效，子目录中的CMakeLists.txt可以省略以下两行配置)
set(EXECUTABLE_OUTPUT_PATH ${CMAKE_SOURCE_DIR}/bin)
set(LIBRARY_OUTPUT_PATH ${CMAKE_SOURCE_DIR}/lib)

# 以下三行指定要进行build的目录
add_subdirectory(client client)# 第一个client是目录名, 第二个client是工程名
add_subdirectory(server server)
add_subdirectory(common ${PROJECT_NAME})
```
#### build.sh
```shell
/usr/bin/cmake --no-warn-unused-cli -DCMAKE_BUILD_TYPE:STRING=Debug -DCMAKE_EXPORT_COMPILE_COMMANDS:BOOL=TRUE -DCMAKE_C_COMPILER:FILEPATH=/usr/bin/gcc -DCMAKE_CXX_COMPILER:FILEPATH=/usr/bin/g++ -S/root/code/cmake-tutorial/lesson4 -B/root/code/cmake-tutorial/lesson4/build -G "Unix Makefiles"

/usr/bin/cmake --build /root/code/cmake-tutorial/lesson4/build --config Debug --target all -j 4 --
```
> 项目路径根据自己的路径进行修改即可。

#### client
##### CMakeLists.txt
```shell
project(client)

# set(EXECUTABLE_OUTPUT_PATH ${CMAKE_SOURCE_DIR}/bin)
add_executable(${PROJECT_NAME} main.cpp)
```
> 在顶层`CMakeLists.txt`中设置过`EXECUTABLE_OUTPUT_PATH`,所以这里可以注释掉
##### main.cpp
```cpp
#include<cstdio>

int main()
{
    printf("I am client\n");
    return 0;
}
```
#### server
##### CMakeLists.txt
```cmake
project(server)

# set(EXECUTABLE_OUTPUT_PATH ${CMAKE_SOURCE_DIR}/bin)
add_executable(${PROJECT_NAME} main.cpp)
```
> 在顶层`CMakeLists.txt`中设置过`EXECUTABLE_OUTPUT_PATH`,所以这里可以注释掉
##### main.cpp
```cpp
#include<cstdio>

int main()
{
    printf("I am server\n");
    return 0;
}
```
#### common
##### CMakeLists.txt
```cmake
# 生成静态库(STATIC省略也是生成静态库，生成的文件名为libmath.a)
add_library(math STATIC math.cpp)

# 生成动态库
add_library(log SHARED log.cpp)
```
##### math.h
```cpp
#ifndef _MATH_H_
#define _MATH_H_

class CMath
{
public:
    CMath();
    ~CMath();
};

#endif
```
##### math.cpp
```cpp
#include"math.h"
#include<cstdio>

CMath::CMath()
{
    printf("CMath[%p] created!\n",this);
}

CMath::~CMath()
{
    printf("CMath[%p] destroyed!\n",this);
}
```
##### log.h
```cpp
#ifndef _LOG_H_
#define _LOG_H_

class CLog
{
public:
    CLog();
    ~CLog();
};
#endif
```
##### log.cpp
```cpp
#include"log.h"
#include<cstdio>

CLog::CLog()
{
    printf("CLog[%p] created!\n",this);
}

CLog::~CLog()
{
    printf("CLog[%p] destroyed!\n",this);
}
```

### 构建，生成可执行文件和库文件
#### 构建
执行`build.sh`脚本即可。
```shell
root@riven:~/code/cmake-tutorial/lesson4# su root ./build.sh
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
-- Build files have been written to: /root/code/cmake-tutorial/lesson4/build
[ 12%] Building CXX object client/CMakeFiles/client.dir/main.cpp.o
[ 37%] Building CXX object server/CMakeFiles/server.dir/main.cpp.o
[ 37%] Building CXX object lesson4/CMakeFiles/log.dir/log.cpp.o
[ 50%] Building CXX object lesson4/CMakeFiles/math.dir/math.cpp.o
[ 62%] Linking CXX executable ../../bin/client
[ 75%] Linking CXX executable ../../bin/server
[ 87%] Linking CXX shared library ../../lib/liblog.so
[100%] Linking CXX static library ../../lib/libmath.a
[100%] Built target client
[100%] Built target server
[100%] Built target math
[100%] Built target log
```
#### 构建后的项目目录结构
```shell
.
├── CMakeLists.txt
├── bin
│   ├── client
│   └── server
├── build
│   ├── CMakeCache.txt
│   ├── CMakeFiles
│   │   ├── 3.22.1
│   │   │   ├── CMakeCCompiler.cmake
│   │   │   ├── CMakeCXXCompiler.cmake
│   │   │   ├── CMakeDetermineCompilerABI_C.bin
│   │   │   ├── CMakeDetermineCompilerABI_CXX.bin
│   │   │   ├── CMakeSystem.cmake
│   │   │   ├── CompilerIdC
│   │   │   │   ├── CMakeCCompilerId.c
│   │   │   │   ├── a.out
│   │   │   │   └── tmp
│   │   │   └── CompilerIdCXX
│   │   │       ├── CMakeCXXCompilerId.cpp
│   │   │       ├── a.out
│   │   │       └── tmp
│   │   ├── CMakeDirectoryInformation.cmake
│   │   ├── CMakeOutput.log
│   │   ├── CMakeTmp
│   │   ├── Makefile.cmake
│   │   ├── Makefile2
│   │   ├── TargetDirectories.txt
│   │   ├── cmake.check_cache
│   │   └── progress.marks
│   ├── Makefile
│   ├── client
│   │   ├── CMakeFiles
│   │   │   ├── CMakeDirectoryInformation.cmake
│   │   │   ├── client.dir
│   │   │   │   ├── DependInfo.cmake
│   │   │   │   ├── build.make
│   │   │   │   ├── cmake_clean.cmake
│   │   │   │   ├── compiler_depend.make
│   │   │   │   ├── compiler_depend.ts
│   │   │   │   ├── depend.make
│   │   │   │   ├── flags.make
│   │   │   │   ├── link.txt
│   │   │   │   ├── main.cpp.o
│   │   │   │   ├── main.cpp.o.d
│   │   │   │   └── progress.make
│   │   │   └── progress.marks
│   │   ├── Makefile
│   │   └── cmake_install.cmake
│   ├── cmake_install.cmake
│   ├── compile_commands.json
│   ├── lesson4
│   │   ├── CMakeFiles
│   │   │   ├── CMakeDirectoryInformation.cmake
│   │   │   ├── log.dir
│   │   │   │   ├── DependInfo.cmake
│   │   │   │   ├── build.make
│   │   │   │   ├── cmake_clean.cmake
│   │   │   │   ├── compiler_depend.make
│   │   │   │   ├── compiler_depend.ts
│   │   │   │   ├── depend.make
│   │   │   │   ├── flags.make
│   │   │   │   ├── link.txt
│   │   │   │   ├── log.cpp.o
│   │   │   │   ├── log.cpp.o.d
│   │   │   │   └── progress.make
│   │   │   ├── math.dir
│   │   │   │   ├── DependInfo.cmake
│   │   │   │   ├── build.make
│   │   │   │   ├── cmake_clean.cmake
│   │   │   │   ├── cmake_clean_target.cmake
│   │   │   │   ├── compiler_depend.make
│   │   │   │   ├── compiler_depend.ts
│   │   │   │   ├── depend.make
│   │   │   │   ├── flags.make
│   │   │   │   ├── link.txt
│   │   │   │   ├── math.cpp.o
│   │   │   │   ├── math.cpp.o.d
│   │   │   │   └── progress.make
│   │   │   └── progress.marks
│   │   ├── Makefile
│   │   └── cmake_install.cmake
│   └── server
│       ├── CMakeFiles
│       │   ├── CMakeDirectoryInformation.cmake
│       │   ├── progress.marks
│       │   └── server.dir
│       │       ├── DependInfo.cmake
│       │       ├── build.make
│       │       ├── cmake_clean.cmake
│       │       ├── compiler_depend.make
│       │       ├── compiler_depend.ts
│       │       ├── depend.make
│       │       ├── flags.make
│       │       ├── link.txt
│       │       ├── main.cpp.o
│       │       ├── main.cpp.o.d
│       │       └── progress.make
│       ├── Makefile
│       └── cmake_install.cmake
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
├── lib
│   ├── liblog.so
│   └── libmath.a
└── server
    ├── CMakeLists.txt
    └── main.cpp
```

根据上面的目录结构，可以看出：
* 生成了`build`目录，该目录下放了一些构建过程中生成的中间文件
* 生成了`bin`目录，该目录下放置了生成的可执行文件`client`和`server`
* 生成了`lib`目录，该目录下放置了生成的静态库文件`libmath.a`和动态库文件`liblog.so`

### 运行可执行文件，观察结果
```shell
root@riven:~/code/cmake-tutorial/lesson4# ./bin/client
I am client
root@riven:~/code/cmake-tutorial/lesson4# ./bin/server
I am server
```
> 符合上面两个`main.cpp`的行为输出。