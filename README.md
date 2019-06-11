# screen-show 实验室演示系统

### 开发环境配置
1.下载代码
2.安装npm
3.安装webpack
4.安装nginx
5.进入代码根目录执行 `npm install` 安装依赖
6.请按Nginx配置要求进行配置
7.`sh release.sh` 开发环境编译
8.`sh release-online.sh` 部署环境编译(开发完成后执行此操作)

### nginx 配置
server {
&#160; listen 80;
&#160; server_name rd.show.yzlab.net;
&#160; root /your_work_path/screen-show/_dev;
&#160; index index.html;
&#160; location / {
&#160; &#160;     error_log /your_errorlog_path/error.log;
&#160; &#160;     access_log //your_accesslog_path/access.log;
&#160; }
}