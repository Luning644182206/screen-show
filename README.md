# screen-show
## 实验室演示系统

### 开发环境配置
#### 1.下载代码
#### 2.安装npm
#### 3.安装fis3
#### 4.安装nginx
#### 5.进入代码根目录执行 npm install 安装依赖
#### 6.请按Nginx配置要求进行配置
#### 7.更改host文件，将rd.show.yzlab.net域名指向127.0.0.1
#### 8.make dev 开发环境编译
#### 9.make prod 部署环境编译(开发完成后执行此操作)

### nginx 配置
#### server {
####    listen 80;
####    server_name rd.show.yzlab.net;
####    root /Users/luning04/work/screen-show/_dev;
####    index index.html;
####    location / {
####        error_log /Users/luning04/errorlog/error.log;
####        access_log /Users/luning04/errorlog/access.log;
####    }
#### }