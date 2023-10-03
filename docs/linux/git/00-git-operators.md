---
sidebar: auto
prev: false
next: false
---
# git基本操作
* 查看分支-仅本地分支: `git branch`
* 查看分支-包括本地和远程： `git branch -a`
* 切换分支：`git checkout branch_name`
    > 分支存在则正常切换，分支不存在则报错
* 切换分支，分则不存在则创建，分支存在则报错: `git checkout -b new_branch_name`
* 删除本地分支: `git branch -d new_branch_name`
    > 删除前需要切换到其他分支才能删除成功
* 将新建的本地分支推送到远程服务器: `git push origin new_branch_name:new_branch_name`
    > 这里指定远程分支和本地分支同名
* 删除远程分支
    * `git push origin :new_branch_name`,推送一个空分支以达到删除的目的
    * `git push origin --delete new_branch_name`
* `git stash`: 缓存本地当前的修改。会在直接使用命令`git pull origin master`拉取远程文件到本地时发生错误时使用，错误提示为："error: Your local changes to the following files would be overwritten by merge:"。正确使用案例为：
    ```shell
    git stash
    git pull origin master
    git stash pop
    ```