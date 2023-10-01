REM 登录到远程linux服务器，找到nginx所在位置`whereis nginx`
REM 删除远程nginx下的tech-website目录及其下面的所有文件：`cd /usr/local/nginx/html`,`rm -rf tech-website`
REM 执行下面的命令将本项目build生成的内容拷贝到远程linux服务器的nginx下的指定位置
scp -r .\tech-website username-in-remote-machine@remote-machine-ip:/usr/local/nginx/html/tech-website