# screen-show 实验室演示系统

### 开发环境配置
1. 下载代码
2. 安装npm
3. 安装webpack
4. 安装nginx
5. 进入代码根目录执行 `npm install` 安装依赖
6. 请按Nginx配置要求进行配置
7. `sh release.sh` 开发环境编译
8. `sh release-online.sh` 部署环境编译(开发完成后执行此操作)

### nginx 配置
```shell
server {
    listen 80;
    server_name rd.show.yzlab.net;
    root /your_work_path/screen-show/_dev;
    index index.html;
    location / {
         error_log /your_errorlog_path/error.log;
         access_log /your_accesslog_path/access.log;
    }
}
```