---
sidebar: auto
prev: /linux/cmake/05-lesson3-refactor.html
next: false
---
# lesson3部分编译
## 背景
对于项目[cmake-tutorial: lesson3](https://github.com/luweiqianyi/cmake-tutorial/tree/af5b668324787a5ddfcf52bc4477d7be7c702690/lesson3)，如果说我只想编译使用`bar`这个目录，不想编译`foo`，那么如何对项目进行更改呢。
## 具体步骤
* 首先项目结构不需要更改
* 只需要修改以下几个文件即可，该项目的其他文件不需要修改
    * 根目录下的`CMakeLists.txt`，修改后的内容如下：
    ```shell
    cmake_minimum_required(VERSION 3.10)
    project(lesson3 VERSION 1.0)

    # 设置子目录，便于根目录下的CMakeLists.txt进行构建时能够找到子目录下的CMakeLists.txt
    # add_subdirectory(foo)
    add_subdirectory(bar)

    # 设置包含目录，这样在`main.cpp`中就可以直接使用#include"foo.h"来包含对应文件，而不需要指定文件所在相对路径(相当于visual studio 2022下的包含目录)
    # target_include_directories(foo PUBLIC foo)
    target_include_directories(bar PUBLIC bar)

    add_executable(myapp main.cpp)
    # target_link_libraries(myapp foo)
    target_link_libraries(myapp bar)
    ```
    * `main.cpp`,修改后的内容如下:
    ```cpp
    // #include"foo.h"
    #include"bar.h"
    #include<cstdio>

    int main()
    {
        // Foo f;
        Bar b;
        printf("main end\n");

        return 0;
    }
    ```
    * 其余文件都不需要修改
* 然后按照正常流程编译，构建，运行即可
    * 编译：`cmake .`
    * 构建：`make` 
    * 运行：`./myapp`
* 整个过程执行过程如下所示：
    ```shell
    root@riven:~/code/lesson3# cmake .
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
    -- Build files have been written to: /root/code/lesson3
    root@riven:~/code/lesson3# make
    [ 25%] Building CXX object bar/CMakeFiles/bar.dir/bar.cpp.o
    [ 50%] Linking CXX static library libbar.a
    [ 50%] Built target bar
    [ 75%] Building CXX object CMakeFiles/myapp.dir/main.cpp.o
    [100%] Linking CXX executable myapp
    [100%] Built target myapp
    root@riven:~/code/lesson3# ./myapp 
    bar 0x7ffceba42607 created!
    main end
    bar 0x7ffceba42607 destroyed!
    ```
## 说明
* 将`add_subdirectory(foo)`注释掉在编译时使用根目录下的`CMakeLists.txt`时会忽略`foo`目录下的`CMakeLists.txt`
* 同时需要将项目中使用到`foo`的地方全部加以注释，本项目主要表现在根目录的`CMakeLists.txt`文件和`main.cpp`文件，具体修改看上面的介绍