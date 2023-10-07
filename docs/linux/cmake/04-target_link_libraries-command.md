---
sidebar: auto
prev: /linux/cmake/03-include-directory.html
next: /linux/cmake/05-lesson3-refactor.html
---
# target_link_libraries命令
## 简介
该命令主要用于为一个目标(这个目标可以是可执行文件，也可以是库文件)指定需要链接的库。
## 目标=可执行文件
```cmake
add_executable(myapp main.cpp)
target_link_libraries(myapp pthread)
```
* `add_executable`创建一个可执行文件，其中`myapp`是可执行文件的名称，`main.cpp`是源代码文件路径
* `target_link_libraries`指定在链接时需要链接`pthread`库

## 目标=库文件
```cmake
add_library(foo STATIC foo.cpp)
add_library(bar STATIC bar.cpp)
target_link_libraries(bar foo)
```
* 上面使用`add_library`创建了两个叫做`foo`和`bar`的静态库文件。`STATIC`指定的生成的库的类型是静态库，第三个参数是源码路径。
* `target_link_libraries`指定了`bar`这个库生成时需要链接`foo`这个库。

> 使用`target_link_libraries`时需要保证目标已存在，即第一个参数必须已经定义，在上面的两个案例中就是`myapp`与`bar`的定义语句必须在`target_link_libraries`之前。

## 实战验证
### 创建项目基本文件
* 创建项目: `mkdir lesson3 && cd lesson3`
* 创建根`CMakeLists.txt`(空文件): `touch CMakeLists.txt`
* 创建主程序文件`main.cpp`：`touch main.cpp`
* 创建`foo.h`文件、`foo.cpp`文件、`bar.h`文件、`bar.cpp`文件: `touch foo.h foo.cpp bar.h bar.cpp`
> 以上文件都在同一目录下，即`lesson3`目录下
### 各个文件内容
#### foo.h
```cpp
#ifndef _FOO_H_
#define _FOO_H_

class Foo
{
public:
    Foo();
    ~Foo();
};

#endif
```
#### foo.cpp
```cpp
#include"foo.h"

#include <cstdio>
Foo::Foo()
{
    printf("foo %p created!\n",this);
}

Foo::~Foo()
{
    printf("foo %p destroyed!\n",this);
}
```
#### bar.h
```cpp
#ifndef _BAR_H_
#define _BAR_H_

class Bar
{
public:
    Bar();
    ~Bar();
};
#endif
```
#### bar.cpp
```cpp
#include"bar.h"

#include<cstdio>

Bar::Bar()
{
    printf("bar %p created!\n",this);
}

Bar::~Bar()
{
    printf("bar %p destroyed!\n",this);
}
```
#### main.cpp
```cpp
#include"foo.h"
#include"bar.h"
#include<cstdio>

int main()
{
    Foo f;
    Bar b;
    printf("main end\n");

    return 0;
}
```
#### CMakeLists.txt
```cmake
cmake_minimum_required(VERSION 3.10)
project(lesson3 VERSION 1.0)

add_library(foo STATIC foo.cpp)
add_library(bar STATIC bar.cpp)

add_executable(myapp main.cpp)
target_link_libraries(myapp foo)
target_link_libraries(myapp bar)
```
### 当前项目目录结构
```shell
.
├── CMakeLists.txt
├── bar.cpp
├── bar.h
├── foo.cpp
├── foo.h
└── main.cpp
```
### 编译
* 执行命令`cmake .`编译项目
* 执行后的目录结构
```shell
.
├── CMakeCache.txt
├── CMakeFiles
│   ├── 3.22.1
│   │   ├── CMakeCCompiler.cmake
│   │   ├── CMakeCXXCompiler.cmake
│   │   ├── CMakeDetermineCompilerABI_C.bin
│   │   ├── CMakeDetermineCompilerABI_CXX.bin
│   │   ├── CMakeSystem.cmake
│   │   ├── CompilerIdC
│   │   │   ├── CMakeCCompilerId.c
│   │   │   ├── a.out
│   │   │   └── tmp
│   │   └── CompilerIdCXX
│   │       ├── CMakeCXXCompilerId.cpp
│   │       ├── a.out
│   │       └── tmp
│   ├── CMakeDirectoryInformation.cmake
│   ├── CMakeOutput.log
│   ├── CMakeTmp
│   ├── Makefile.cmake
│   ├── Makefile2
│   ├── TargetDirectories.txt
│   ├── bar.dir
│   │   ├── DependInfo.cmake
│   │   ├── build.make
│   │   ├── cmake_clean.cmake
│   │   ├── cmake_clean_target.cmake
│   │   ├── compiler_depend.make
│   │   ├── compiler_depend.ts
│   │   ├── depend.make
│   │   ├── flags.make
│   │   ├── link.txt
│   │   └── progress.make
│   ├── cmake.check_cache
│   ├── foo.dir
│   │   ├── DependInfo.cmake
│   │   ├── build.make
│   │   ├── cmake_clean.cmake
│   │   ├── cmake_clean_target.cmake
│   │   ├── compiler_depend.make
│   │   ├── compiler_depend.ts
│   │   ├── depend.make
│   │   ├── flags.make
│   │   ├── link.txt
│   │   └── progress.make
│   ├── myapp.dir
│   │   ├── DependInfo.cmake
│   │   ├── build.make
│   │   ├── cmake_clean.cmake
│   │   ├── compiler_depend.make
│   │   ├── compiler_depend.ts
│   │   ├── depend.make
│   │   ├── flags.make
│   │   ├── link.txt
│   │   └── progress.make
│   └── progress.marks
├── CMakeLists.txt
├── Makefile
├── bar.cpp
├── bar.h
├── cmake_install.cmake
├── foo.cpp
├── foo.h
└── main.cpp
```
> 与初始的目录结构相比，多出来的文件都是`cmake .`命令执行后生成的
### 生成可执行文件
* 执行命令`make`
* 与上面的`cmake .`执行后的整个项目结构相比，在项目根目录`lesson3`下多出来三个文件，分别是`libbar.a`,`libfoo.a`,`myapp`，正好对应`CMakeLists.txt`文件中生成静态库和可执行文件的三条指令。最终整个项目结构如下所示：
```shell
.
├── CMakeCache.txt
├── CMakeFiles
│   ├── 3.22.1
│   │   ├── CMakeCCompiler.cmake
│   │   ├── CMakeCXXCompiler.cmake
│   │   ├── CMakeDetermineCompilerABI_C.bin
│   │   ├── CMakeDetermineCompilerABI_CXX.bin
│   │   ├── CMakeSystem.cmake
│   │   ├── CompilerIdC
│   │   │   ├── CMakeCCompilerId.c
│   │   │   ├── a.out
│   │   │   └── tmp
│   │   └── CompilerIdCXX
│   │       ├── CMakeCXXCompilerId.cpp
│   │       ├── a.out
│   │       └── tmp
│   ├── CMakeDirectoryInformation.cmake
│   ├── CMakeOutput.log
│   ├── CMakeTmp
│   ├── Makefile.cmake
│   ├── Makefile2
│   ├── TargetDirectories.txt
│   ├── bar.dir
│   │   ├── DependInfo.cmake
│   │   ├── bar.cpp.o
│   │   ├── bar.cpp.o.d
│   │   ├── build.make
│   │   ├── cmake_clean.cmake
│   │   ├── cmake_clean_target.cmake
│   │   ├── compiler_depend.make
│   │   ├── compiler_depend.ts
│   │   ├── depend.make
│   │   ├── flags.make
│   │   ├── link.txt
│   │   └── progress.make
│   ├── cmake.check_cache
│   ├── foo.dir
│   │   ├── DependInfo.cmake
│   │   ├── build.make
│   │   ├── cmake_clean.cmake
│   │   ├── cmake_clean_target.cmake
│   │   ├── compiler_depend.make
│   │   ├── compiler_depend.ts
│   │   ├── depend.make
│   │   ├── flags.make
│   │   ├── foo.cpp.o
│   │   ├── foo.cpp.o.d
│   │   ├── link.txt
│   │   └── progress.make
│   ├── myapp.dir
│   │   ├── DependInfo.cmake
│   │   ├── build.make
│   │   ├── cmake_clean.cmake
│   │   ├── compiler_depend.make
│   │   ├── compiler_depend.ts
│   │   ├── depend.make
│   │   ├── flags.make
│   │   ├── link.txt
│   │   ├── main.cpp.o
│   │   ├── main.cpp.o.d
│   │   └── progress.make
│   └── progress.marks
├── CMakeLists.txt
├── Makefile
├── bar.cpp
├── bar.h
├── cmake_install.cmake
├── foo.cpp
├── foo.h
├── libbar.a
├── libfoo.a
├── main.cpp
└── myapp
```
* `make`命令的执行日志如下所示：
```shell
[ 16%] Building CXX object CMakeFiles/foo.dir/foo.cpp.o
[ 33%] Linking CXX static library libfoo.a
[ 33%] Built target foo
[ 50%] Building CXX object CMakeFiles/bar.dir/bar.cpp.o
[ 66%] Linking CXX static library libbar.a
[ 66%] Built target bar
[ 83%] Building CXX object CMakeFiles/myapp.dir/main.cpp.o
[100%] Linking CXX executable myapp
[100%] Built target myapp
```

### 运行可执行文件
* 在项目根目录下，执行`./myapp`运行可执行文件
* 输出的结果如下：
```shell
root@riven:~/code/lesson3# ./myapp
foo 0x7ffce862ec66 created!
bar 0x7ffce862ec67 created!
main end
bar 0x7ffce862ec67 destroyed!
foo 0x7ffce862ec66 destroyed!
```