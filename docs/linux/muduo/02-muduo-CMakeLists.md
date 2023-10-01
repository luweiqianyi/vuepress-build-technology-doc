---
sidebar: auto
prev: /linux/muduo/01-quick-start.html
next: false
---
# muduo CMakeLists.txt
以下文件是整个`muduo`项目的编译配置,具体的指令在配置文件中我已用注释的方式进行详细说明。

```cmake
# 设置cmake的最低版本要求为2.6
cmake_minimum_required(VERSION 2.6)

# 指定项目名称为muduo，并且支持C和C++两种语言
project(muduo C CXX)

# 启用测试功能
enable_testing()

# 将 CMAKE_BUILD_TYPE 设置为 Release（如果未设置）
if(NOT CMAKE_BUILD_TYPE)
  set(CMAKE_BUILD_TYPE "Release")
endif()

# 当CMAKE_PROJECT_NAME的值等于"muduo"时，MUDUO_BUILD_EXAMPLES 选项被设为 ON。
if(CMAKE_PROJECT_NAME STREQUAL "muduo")
  option(MUDUO_BUILD_EXAMPLES "Build Muduo examples" ON)
endif()

# 设置一系列编译选项，包括调试符号、错误检查、编译标准等
set(CXX_FLAGS
 -g # 在孤独部分生成调试信息
 # -DVALGRIND
 -DCHECK_PTHREAD_RETURN_VALUE # 对pthread函数的返回值进行检查，以确保线程创建、加入等操作成功执行
 -D_FILE_OFFSET_BITS=64 # 将文件的偏移量位数设置为64位。以便于能够处理大型文件、处理大存储容量数据、支持处理大内存的系统
 -Wall # GCC编译器的一个编译选项，启用所有警告信息
 -Wextra # GCC编译器的一个编译选项，启用额外的警告信息
 -Werror # GCC编译器的一个编译选项，用于将警告视为错误
 -Wconversion # GCC编译器的一个编译选项，用于启用类型转换警告
 -Wno-unused-parameter # GCC编译器的一个编译选项，用于禁止对未使用的函数参数生成警告信息
 -Wold-style-cast # GCC编译器的一个编译选项，编译器会对使用 "旧风格" 类型转换的情况生成警告信息。这样可以帮助程序员意识到代码中可能存在的潜在问题，促使他们采用更安全和明确的类型转换方式
 -Woverloaded-virtual # GCC 编译器的一个编译选项，用于发出警告信息，提示程序员在使用虚函数重载时可能存在风险
 -Wpointer-arith #  GCC 编译器的一个编译选项，用于发出警告信息，提示程序员在进行指针操作时可能存在风险
 -Wshadow # GCC 编译器的一个编译选项，用于发出警告信息，提示程序员在变量作用域重叠时可能存在潜在问题
 -Wwrite-strings # GCC 编译器的一个编译选项，用于发出警告信息，提示程序员在对字符串字面量进行写操作时可能存在风险
 -march=native # GCC 编译器的一个编译选项，用于让编译器根据当前主机的处理器架构来生成针对该架构优化的机器指令
 # -MMD # GCC 编译器的一个选项，用于生成依赖关系文件
 -std=c++11 # GCC 编译器的一个编译选项，用于指定 C++ 代码的标准版本为 C++11
 -rdynamic # GCC 编译器的一个选项，用于在生成可执行文件时将所有符号（包括函数名和全局变量名）都添加到动态链接符号表中
 )
# 根据不同的编译位数，添加适当的编译选项
if(CMAKE_BUILD_BITS EQUAL 32)
  list(APPEND CXX_FLAGS "-m32")
endif()

# 对于Clang编译器添加一些编译选项，去除"-rdynamic"选项
if(CMAKE_CXX_COMPILER_ID STREQUAL "Clang")
  list(APPEND CXX_FLAGS "-Wno-null-dereference") # 禁止空指针解引用的警告
  list(APPEND CXX_FLAGS "-Wno-sign-conversion")  # 禁止类型转换可能改变符号的警告
  list(APPEND CXX_FLAGS "-Wno-unused-local-typedef") # 禁止未使用的本地typedef警告
  list(APPEND CXX_FLAGS "-Wthread-safety") # 开启线程安全警告
  list(REMOVE_ITEM CXX_FLAGS "-rdynamic") # 该选项用于在编译时指定是否需要支持动态链接库，一般在linux下使用。在Clang编译中使用会导致链接出错，需要在此去除
endif()

# 将 CXX_FLAGS字符串中的分号替换为空格，并将其设置为 CMAKE_CXX_FLAGS
string(REPLACE ";" " " CMAKE_CXX_FLAGS "${CXX_FLAGS}")
# 设置调试模式下的编译选项
set(CMAKE_CXX_FLAGS_DEBUG "-O0")
# 设置发布模式下的编译选项
set(CMAKE_CXX_FLAGS_RELEASE "-O2 -DNDEBUG")
# 设置可执行文件输出路径和库文件输出路径
set(EXECUTABLE_OUTPUT_PATH ${PROJECT_BINARY_DIR}/bin)
set(LIBRARY_OUTPUT_PATH ${PROJECT_BINARY_DIR}/lib)

# 在CMake中使用find_program、find_path和find_library命令时，它们会按照一定的搜索路径来查找可执行文件、头文件和库文件。
# 对于find_program命令，它会在以下搜索路径中查找可执行文件：
#   系统的默认可执行文件搜索路径。
#   CMAKE_PREFIX_PATH变量指定的路径。
#   环境变量PATH指定的路径。

# 对于find_path命令，它会在以下搜索路径中查找头文件：
#   系统的默认头文件搜索路径。
#   CMAKE_PREFIX_PATH变量指定的路径。
#   CMAKE_INCLUDE_PATH变量指定的路径。
#   CMAKE_SYSROOT变量指定的路径。

# 对于find_library命令，它会在以下搜索路径中查找库文件：
#   系统的默认库文件搜索路径。
#   CMAKE_PREFIX_PATH变量指定的路径。
#   CMAKE_LIBRARY_PATH变量指定的路径。
#   CMAKE_FRAMEWORK_PATH变量指定的路径。
#   CMAKE_SYSROOT变量指定的路径。
# 需要注意的是，具体的搜索路径可能会因操作系统、编译器和CMake配置的不同而有所变化。在使用这些find命令时，可以通过设置相关的变量（如CMAKE_PREFIX_PATH、CMAKE_INCLUDE_PATH、CMAKE_LIBRARY_PATH等）来指定额外的搜索路径，以确保能够找到所需的文件。另外，还可以通过设置环境变量来影响搜索路径，例如设置PATH环境变量用于指定可执行文件的搜索路径。

# 通过find_package和find_path找一些依赖项的路径和库文件
# 以下find_xxx命令使用之前，需要确保对应的库及库文件已经正确安装，并且其路径已经正确地添加到系统的库文件搜索路径中。
find_package(Boost REQUIRED) # 查找并加载Boost库的配置信息并检查是否成功
# 该配置文件通常包含以下信息：
#   Protobuf include 目录：Protobuf 的头文件所在路径；
#   Protobuf 库文件目录：Protobuf 的二进制文件所在路径；
#   Protobuf 库名和版本号：用于指定需要链接的 Protobuf 库名称和版本号。
# 如果成功找到 Protobuf 的配置文件，那么通过 find_package(Protobuf) 命令后，可以使用命令 target_link_libraries 将 Protobuf 库链接到目标可执行文件或共享库中，以供程序使用
find_package(Protobuf) # 查找并加载 Protobuf 库的配置信息的命令
find_package(CURL) # 查找并加载CURL库的配置信息的命令
find_package(ZLIB) # CMake 构建系统中用于查找并加载 ZLIB 库的配置信息的命令
find_path(CARES_INCLUDE_DIR ares.h)# CMake构建系统中用于查找CARES库头文件所在路径的命令。CARES（C Ares）是一个开源的异步DNS解析库，可以支持IPv4和IPv6地址解析。
# find_library(CARES_LIBRARY NAMES cares) 命令之前，需要确保 CARES 库已经正确安装，并且相关的开发包（包括头文件和库文件）也已经安装
find_library(CARES_LIBRARY NAMES cares) # 在CMake构建系统中用于查找 CARES 库文件（静态库或动态库）的命令。
find_path(MHD_INCLUDE_DIR microhttpd.h) # 在CMake构建系统中用于查找MHD库头文件所在路径的命令。MHD（MicroHTTPD）是一个开源的小型HTTP服务器库
find_library(MHD_LIBRARY NAMES microhttpd) # 在 CMake 构建系统中用于查找 MHD 库文件（静态库或动态库）的命令。该命令会搜索 microhttpd 库的动态库文件（.so、.dll、.dylib）或静态库文件（.a、.lib）。如果找到了对应的库文件，则将其路径保存在 MHD_LIBRARY 变量中。
find_library(BOOSTTEST_LIBRARY NAMES boost_unit_test_framework)# 在 CMake 构建系统中用于查找 Boost Unit Test Framework 库文件（静态库或动态库）的命令
find_library(BOOSTPO_LIBRARY NAMES boost_program_options)#在 CMake 构建系统中用于查找 Boost Program Options 库文件（静态库或动态库）的命令。
find_library(BOOSTSYSTEM_LIBRARY NAMES boost_system) # 在 CMake 构建系统中用于查找 Boost System 库文件（静态库或动态库）的命令。
find_path(TCMALLOC_INCLUDE_DIR gperftools/heap-profiler.h) # 在 CMake 构建系统中用于查找TCMalloc头文件路径的命令。该命令会搜索头文件 gperftools/heap-profiler.h，并返回该头文件所在的路径，这个路径将保存在TCMALLOC_INCLUDE_DIR变量中。
find_library(TCMALLOC_LIBRARY NAMES tcmalloc_and_profiler) # 在 CMake 构建系统中用于查找 TCMalloc 库文件（静态库或动态库）的命令
find_path(HIREDIS_INCLUDE_DIR hiredis/hiredis.h) # 在 CMake 构建系统中用于查找 hiredis 头文件路径的命令
find_library(HIREDIS_LIBRARY NAMES hiredis)# 在 CMake 构建系统中用于查找 hiredis 库文件（静态库或动态库）的命令
find_path(GD_INCLUDE_DIR gd.h)# 在CMake构建系统中用于查找 GD 图形库的头文件路径的命令
find_library(GD_LIBRARY NAMES gd) # 在CMake构建系统中用于查找 GD 图形库的库文件路径的命令。
find_program(THRIFT_COMPILER thrift)# 在 CMake 构建系统中用于查找 Thrift 编译器的可执行文件路径的命令。该命令会搜索名为 thrift 的可执行文件，并返回该可执行文件的路径，这个路径将保存在 THRIFT_COMPILER 变量中。
find_path(THRIFT_INCLUDE_DIR thrift)# 在 CMake 构建系统中用于查找 Thrift 头文件路径的命令。
find_library(THRIFT_LIBRARY NAMES thrift)# 在 CMake 构建系统中用于查找 Thrift 库文件的命令。

if(CARES_INCLUDE_DIR AND CARES_LIBRARY)
  message(STATUS "found cares")
endif()
if(CURL_FOUND)
  message(STATUS "found curl")
endif()
if(PROTOBUF_FOUND)
  message(STATUS "found protobuf")
endif()
if(TCMALLOC_INCLUDE_DIR AND TCMALLOC_LIBRARY)
  message(STATUS "found tcmalloc")
endif()
if(ZLIB_FOUND)
  message(STATUS "found zlib")
endif()
if(HIREDIS_INCLUDE_DIR AND HIREDIS_LIBRARY)
  message(STATUS "found hiredis")
endif()
if(GD_INCLUDE_DIR AND GD_LIBRARY)
  message(STATUS "found gd")
endif()
if(THRIFT_COMPILER AND THRIFT_INCLUDE_DIR AND THRIFT_LIBRARY)
  message(STATUS "found thrift")
endif()

# 添加Boost_INCLUDE_DIRS目录到包含目录
include_directories(${Boost_INCLUDE_DIRS})
# 添加程序源码目录到包含目录
include_directories(${PROJECT_SOURCE_DIR})

# 将CMAKE_BUILD_TYPE变量的值转成大写，存储在BUILD_TYPE中
string(TOUPPER ${CMAKE_BUILD_TYPE} BUILD_TYPE)
# 输出信息
message(STATUS "CXX_FLAGS = " ${CMAKE_CXX_FLAGS} " " ${CMAKE_CXX_FLAGS_${BUILD_TYPE}})

# 添加muduo/base和muduo/net子目录
add_subdirectory(muduo/base)
add_subdirectory(muduo/net)

# 如果 MUDUO_BUILD_EXAMPLES 为真，则添加contrib和examples子目录
if(MUDUO_BUILD_EXAMPLES)
  add_subdirectory(contrib)
  add_subdirectory(examples)
else()
  # 如果找到了cares依赖项，添加examples/cdns子目录
  if(CARES_INCLUDE_DIR AND CARES_LIBRARY)
    add_subdirectory(examples/cdns)
  endif()
endif()
```