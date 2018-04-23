# screen-show
## 实验室演示系统
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
####}