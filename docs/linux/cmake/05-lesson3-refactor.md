---
sidebar: auto
prev: /linux/cmake/04-target_link_libraries-command.html
next: /linux/cmake/06-lesson3-compile-part.html
---
# lesson3改造
## 简介
本文基于文章[target_link_libraries命令](/linux/cmake/04-target_link_libraries-command.html)中的项目`lesson3`进行改造。主要目的是：
* 将`foo.h`,`foo.cpp`置于`foo`目录下
* 将`bar.h`,`bar.cpp`置于`bar`目录下
主要是模拟一个大型`C++`项目进行功能分类，然后构建项目并生成整个项目可执行文件的过程。
## 初始项目结构
### 项目结构
```shell
.
├── CMakeLists.txt
├── bar.cpp
├── bar.h
├── foo.cpp
├── foo.h
└── main.cpp
```
### 文件内容
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
## 改造后项目结构
### 项目结构
```shell
.
├── CMakeLists.txt
├── bar
│   ├── CMakeLists.txt
│   ├── bar.cpp
│   └── bar.h
├── foo
│   ├── CMakeLists.txt
│   ├── foo.cpp
│   └── foo.h
└── main.cpp
```
### 修改的文件内容
<font color=#ff0000>除了以下需要修改的部分，上面的源代码文件的内容不用修改。</font>
#### foo目录新增CMakeLists.txt
内容如下：
```cmake
add_library(foo STATIC foo.cpp)
```
#### bar目录新增CMakeLists.txt
内容如下：
```cmake
add_library(bar STATIC bar.cpp)
```
#### 修改项目根目录CMakeLists.txt
修改后内容如下：
```cmake
cmake_minimum_required(VERSION 3.10)
project(lesson3 VERSION 1.0)

# 设置子目录，便于根目录下的CMakeLists.txt进行构建时能够找到子目录下的CMakeLists.txt
add_subdirectory(foo)
add_subdirectory(bar)

# 设置包含目录，这样在`main.cpp`中就可以直接使用#include"foo.h"来包含对应文件，而不需要指定文件所在相对路径(相当于visual studio 2022下的包含目录)
target_include_directories(foo PUBLIC foo)
target_include_directories(bar PUBLIC bar)

add_executable(myapp main.cpp)
target_link_libraries(myapp foo)
target_link_libraries(myapp bar)
```
### 项目构建
运行以下命令来构建
* 编译：`cmake .`
* 生成可执行文件与库文件: `make`
* 运行: `./myapp`
### 构建后的项目结构
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
│   ├── cmake.check_cache
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
├── bar
│   ├── CMakeFiles
│   │   ├── CMakeDirectoryInformation.cmake
│   │   ├── bar.dir
│   │   │   ├── DependInfo.cmake
│   │   │   ├── bar.cpp.o
│   │   │   ├── bar.cpp.o.d
│   │   │   ├── build.make
│   │   │   ├── cmake_clean.cmake
│   │   │   ├── cmake_clean_target.cmake
│   │   │   ├── compiler_depend.make
│   │   │   ├── compiler_depend.ts
│   │   │   ├── depend.make
│   │   │   ├── flags.make
│   │   │   ├── link.txt
│   │   │   └── progress.make
│   │   └── progress.marks
│   ├── CMakeLists.txt
│   ├── Makefile
│   ├── bar.cpp
│   ├── bar.h
│   ├── cmake_install.cmake
│   └── libbar.a
├── cmake_install.cmake
├── foo
│   ├── CMakeFiles
│   │   ├── CMakeDirectoryInformation.cmake
│   │   ├── foo.dir
│   │   │   ├── DependInfo.cmake
│   │   │   ├── build.make
│   │   │   ├── cmake_clean.cmake
│   │   │   ├── cmake_clean_target.cmake
│   │   │   ├── compiler_depend.make
│   │   │   ├── compiler_depend.ts
│   │   │   ├── depend.make
│   │   │   ├── flags.make
│   │   │   ├── foo.cpp.o
│   │   │   ├── foo.cpp.o.d
│   │   │   ├── link.txt
│   │   │   └── progress.make
│   │   └── progress.marks
│   ├── CMakeLists.txt
│   ├── Makefile
│   ├── cmake_install.cmake
│   ├── foo.cpp
│   ├── foo.h
│   └── libfoo.a
├── main.cpp
└── myapp
```
> `make`生成的静态库文件`libbar.a`与`libfoo.a`在其各自的目录`bar`与`foo`下。


<font color=#3da742>至此就完成了整个项目的模块划分，并通过相应的`CMakeLists.txt`来完成整个项目的构建。</font>

项目`github`地址：[cmake-tutorial: lesson3](https://github.com/luweiqianyi/cmake-tutorial/tree/af5b668324787a5ddfcf52bc4477d7be7c702690/lesson3)