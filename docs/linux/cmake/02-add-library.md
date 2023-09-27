---
sidebar: auto
prev: /linux/cmake/01-quick-start.html
next: false
---
# 增加库依赖
## 基础版本
### 新建项目 lesson2
### 新建编译配置文件 CMakeLists.txt
* 新建文件：`touch CMakeLists.txt`
* 新增内容如下
    ```cmake
    cmake_minimum_required(VERSION 3.10)
    project(lesson1 VERSION 1.0)

    add_executable(lesson2 main.cpp)
    ```
### 新建主程序文件 main.cpp
* 新建文件: `touch main.cpp`
* 新增内容如下
    ```cpp
    #include<cstdio>

    int main()
    {
        printf("%s\n","Hello world!");
        return 0;
    }
    ```
### 构建-运行
* 构建项目： `cmake .`
* 生成可执行文件: `make`
* 运行可执行文件: `./lesson2`
## 改造
<font color=#3da742>本项目主要基于上面的基础版本进行项目的扩充改造。</font>
### 增加库
1. 在当前路径下，新建一个目录，作为额外的库目录，比如`config`，同时在该目录下新增`config.h`、`config.cpp`文件，项目结构如下
    ```shell
    root@your-machine-name:~/code/cmake/lesson2# tree
    .
    ├── CMakeLists.txt
    ├── config
    │   ├── config.cpp
    │   └── config.h
    └── main.cpp
    ```
    > `tree`需要执行命令`apt-get install tree`安装。
2. 编写相应代码
* config.h
    ```cpp
    #ifndef _CONFIG_H_
    #define _CONFIG_H_

    #include <string>

    class Config
    {
    public:
        Config();
        ~Config();
    };

    #endif
    ```
* config.cpp
```cpp
#include"config.h"
#include<cstdio>

Config::Config()
{
    printf("Config %p created!\n",this);
}

Config::~Config()
{
    printf("Config %p destroy!\n",this);
}
```
* main.cpp
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
3. 构建
运行命令`cmake .`,结果如下:
    ```shell
    root@your-machine-name:~/code/cmake/lesson2# cmake .
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
    -- Build files have been written to: /root/code/cmake/lesson2
    ```
4. 生成可执行文件
运行命令`make`,结果如下：
    ```shell
    root@your-machine-name:~/code/cmake/lesson2# make
    [ 50%] Building CXX object CMakeFiles/lesson2.dir/main.cpp.o
    [100%] Linking CXX executable lesson2
    /usr/bin/ld: CMakeFiles/lesson2.dir/main.cpp.o: in function `main':
    main.cpp:(.text+0x24): undefined reference to `Config::Config()'
    /usr/bin/ld: main.cpp:(.text+0x44): undefined reference to `Config::~Config()'
    /usr/bin/ld: main.cpp:(.text+0x6a): undefined reference to `Config::~Config()'
    collect2: error: ld returned 1 exit status
    make[2]: *** [CMakeFiles/lesson2.dir/build.make:97: lesson2] Error 1
    make[1]: *** [CMakeFiles/Makefile2:83: CMakeFiles/lesson2.dir/all] Error 2
    make: *** [Makefile:91: all] Error 2
    ```
    > `!!!`提示`main.cpp`找不到`Config::~Config()`,虽然我们已经在`main.cpp`中将头文件已经包含进来了。

5. <font color=#ff0000>如何解决?</font>
    * 在`config`目录下新建`CMakeLists.txt`空白文件，在文件中加入内容`add_library(LibConfig config.cpp)`
        > LibConfig是自己指定的创建的库的名称，后面会用到
    * 在项目根目录的`CMakeLists.txt`文件中新增一行：`add_subdirectory(config)`, 这样就能找到`config`目录下的`CMakeLists.txt`文件，进而对该目录进行构建。项目根目录下完整的`CMakeLists.txt`内容如下:
        ```cmake
        cmake_minimum_required(VERSION 3.10)
        project(lesson1 VERSION 1.0)

        # 增加子目录`config`,以便于构建该目录
        add_subdirectory(config)

        add_executable(lesson2 main.cpp)

        # 将主程序lesson2链接到库LibConfig,LibConfig是config目录中的CMakeLists.txt中指定的
        target_link_libraries(lesson2 PUBLIC LibConfig)
        ```
6. 此时的项目结构
    ```shell
    root@your-machine-name:~/code/cmake/lesson2# tree
    .
    ├── CMakeLists.txt
    ├── config
    │   ├── CMakeLists.txt
    │   ├── config.cpp
    │   └── config.h
    └── main.cpp
    ```
7. 项目根目录运行`cmake .`构建项目，构建完成运行`make`生成可执行文件，生成成功运行`./lesson2`运行查看结果，最终效果如下：
    ```shell
    root@your-machine-name:~/code/cmake/lesson2# cmake .
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
    -- Build files have been written to: /root/code/cmake/lesson2
    root@your-machine-name:~/code/cmake/lesson2# make
    [ 25%] Building CXX object config/CMakeFiles/LibConfig.dir/config.cpp.o
    [ 50%] Linking CXX static library libLibConfig.a
    [ 50%] Built target LibConfig
    [ 75%] Building CXX object CMakeFiles/lesson2.dir/main.cpp.o
    [100%] Linking CXX executable lesson2
    [100%] Built target lesson2
    root@your-machine-name:~/code/cmake/lesson2# ./lesson2
    Config 0x7ffd671f9cb7 created!
    Hello world!
    Config 0x7ffd671f9cb7 destroy!
    ```
    > 如上所示：成功构建。