---
sidebar: auto
prev: /linux/cmake/08-vscode-gdb-debug.html
next: /linux/cmake/10-include_directories-target_include_directories.html
---
# cmake自动生成变量
当在`CMakeLists.txt`文件中使用`project`命令声明项目时，除了生成`<project_name>_SOURCE_DIR`变量之外，还会自动生成一些其他的变量，如下所示：
* `<project_name>_BINARY_DIR`：表示项目二进制文件所在的目录路径。
* `<project_name>_INCLUDE_DIRS`：表示项目头文件搜索路径列表，包括项目源代码目录和编译输出目录。
* `<project_name>_LIBRARY_DIRS`：表示项目库文件搜索路径列表，包括编译输出目录。
* `<project_name>_LIBRARIES`：表示项目链接的库文件列表。

在你的例子中，`project(CURL C)`将生成以下变量：
* `CURL_SOURCE_DIR`：表示`CURL`项目的源代码目录路径。
* `CURL_BINARY_DIR`：表示`CURL`项目的二进制文件所在的目录路径。
* `CURL_INCLUDE_DIRS`：表示`CURL`项目的头文件搜索路径列表，包括`CURL`源代码目录和编译输出目录。
* `CURL_LIBRARY_DIRS`：表示`CURL`项目的库文件搜索路径列表，包括编译输出目录。
* `CURL_LIBRARIES`：表示`CURL`项目链接的库文件列表。
你可以在`CMakeLists.txt`文件中使用这些变量来引用项目的源代码、头文件、库文件等路径和名称。需要注意的是，变量名是大小写敏感的，因此你需要确保在使用这些变量时使用正确的大小写。

总之，当在`CMakeLists.txt`文件中使用`project`命令声明项目时，会自动生成一些其他的变量，包括二进制文件目录、头文件搜索路径、库文件搜索路径和链接的库文件列表等。这些变量可以在`CMakeLists.txt`文件中使用，以方便地引用项目的各种资源。





