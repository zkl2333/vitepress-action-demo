# Docker常用项目部署

## 安装Docker
```bash
bash <(curl -sSL https://cdn.jsdelivr.net/gh/SuperManito/LinuxMirrors@main/DockerInstallation.sh)
```

## Portainer 企业版
```bash
docker run -d -p 9000:9000 -e TZ:Asia/Shanghai -v /var/run/docker.sock:/var/run/docker.sock -v /root/appdata/portainer:/data --restart always --name portainer portainer/portainer-ee:latest
```

## Tautulli
```bash
docker run -d \
  --name=tautulli \
  --network=bridge \
  --restart=unless-stopped
  -v /root/appdata/tautulli:/config \
  -e PUID=0 \
  -e PGID=0 \
  -e TZ="Asia/Shanghai" \
  -p 8181:8181 \
  tautulli/tautulli
```

## PLEX
```bash
docker run \
  -d \
  --name plex \
  --network=bridge \ 
  --restart=always \
  -p 32400:32400 \
  -e TZ="Asia/Shanghai" \ 
  -e PLEX_CLAIM="claim-WJHW3s3rkTnsC92uYHsb" \
  -e PUID=0 \
  -e PGID=0 \
  -v /root/appdata/plex/config:/config \
  -v /root/appdata/plex/transcode:/transcode \
  -v /root/appdata/plex/data:/data \
  -v /root/GDrive:/video \
  lscr.io/linuxserver/plex:latest \
```

## RustDesk远程桌面

```yaml
version: '3'
services:
  hbbs:
    container_name: rustdesk-hbbs
    ports:
      - 21115:21115
      - 21116:21116
      - 21116:21116/udp
      - 21118:21118
    image: rustdesk/rustdesk-server
    command: hbbs
    volumes:
      - '/home/zsg/docker/rustdesk/hbbs:/root'
    restart: always

  hbbr:
    container_name: rustdesk-hbbr
    ports:
      - 21117:21117
      - 21119:21119
    image: rustdesk/rustdesk-server
    command: hbbr
    volumes:
      - '/home/zsg/docker/rustdesk/hbbr:/root'
    restart: always
```

## Stirling PDF工具箱

```yaml
version: '3.3'
services:
  stirling-pdf:
    container_name: PDF
    image: frooodle/s-pdf:latest
    restart: always
    ports:
      - '6180:8080'
    volumes:
      - /home/zsg/docker/PDF/trainingData:/usr/share/tesseract-ocr/4.00/tessdata
    environment:
      TZ: Asia/Shanghai
      APP_LOCALE: zh_CN
      APP_HOME_NAME: PDF
      APP_HOME_DESCRIPTION: "PDF百宝箱"
      APP_NAVBAR_NAME: PDF
      APP_ROOT_PATH: /

教程来源于https://post.smzdm.com/p/a5o68zdl/
OCR附件如下，放到trainingData内
```

[chi_sim.traineddata](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/838ce7b6-6670-4561-ac8c-1a38671fec43/chi_sim.traineddata)

[chi_sim_fast.traineddata](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d98e2338-1c69-4219-8ac1-9af4f322eafc/chi_sim_fast.traineddata)

## Alist

```yaml
version: '3.3'
services:
    alist:
        restart: always
        volumes:
            - '/home/zsg/docker/alist:/opt/alist/data'
            - '/home:/home/alist'
        ports:
            - '5244:5244'
        environment:
            - TZ=Asia/Shanghai
        container_name: alist
        image: 'xhofe/alist:latest'

#公开分享（无密码、无需登录访问）= 用户/guest的基本路径，
## 把【无需密码访问】取消勾选才可以对它的下级路径加密
#用密码的分享记得勾选【应用到子文件夹】
```

## 思维导图wiseapp

```yaml
mkdir /home/zsg/docker/wiseapp
docker run --name wiseapp -d --mount type=bind,source=/home/zsg/docker/wiseapp,target=/var/lib/wise-db wisemapping/wisemapping:latest
docker run --name wiseapp -d -v /home/zsg/docker/wiseapp:/var/lib/wise-db wisemapping/wisemapping:latest
docker cp wiseapp:/var/lib/wisemapping/db /home/zsg/docker/wiseapp
docker stop wiseapp;docker rm wiseapp
docker run --mount type=bind,source=/home/zsg/docker/wiseapp/db,target=/var/lib/wisemapping/db -it --rm -p 6080:8080 wisemapping/wisemapping:latest
docker run --name wiseapp -v /home/zsg/docker/wiseapp/db:/var/lib/wisemapping/db -d -p 6080:8080 wisemapping/wisemapping:latest

默认账号：test@wisemapping.org密码test
默认账号：admin@wisemapping.org密码test

version: '3.3'
services:
    wisemapping:
        container_name: wiseapp
        restart: always
        environment:
            - TZ=Asia/Shanghai
        volumes:
            - '/home/zsg/docker/wiseapp/db:/var/lib/wisemapping/db'
        ports:
            - '6080:8080'
        image: 'wisemapping/wisemapping:latest'
```

## 静态站点nginx-php

```yaml
version: '3.3'
services:
    nginx: 
        container_name: nginx
        ports:
            - '3387:80'
        environment:
            - TZ=Asia/Shanghai
        restart: always
        volumes:
           - '/home/zsg/docker/zdj:/usr/share/nginx/html'
        image: gindex/nginx-php
```

## 网站访问统计Umami

```yaml
version: '3'
services:
  umami:
    container_name: umami
    image: ghcr.io/umami-software/umami:postgresql-latest
    ports:
      - "3208:3000"
    environment:
      DATABASE_URL: postgresql://umami:12345678@db:5432/umami
      DATABASE_TYPE: postgresql
      APP_SECRET: a7ija2B7XHkd
    depends_on:
      - db
    restart: always
  db:
    container_name: umami-db
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: umami
      POSTGRES_USER: umami
      POSTGRES_PASSWORD: 12345678
    volumes:
      - /home/zsg/docker/umami/sql/schema.postgresql.sql:/docker-entrypoint-initdb.d/schema.postgresql.sql:ro
      - /home/zsg/docker/umami/data:/var/lib/postgresql/data
    restart: always
    
    ## 默认用户名admin和密码umami
    ## https://github.com/umami-software/umami
```

## WebSSH

```jsx
version: '3.3'
services:
    webssh:
        container_name: webssh
        restart: no
        ports:
            - '5032:5032'
        environment:
            - PUID=0   
            - PGID=0  
            - TZ=Asia/Shanghai 
        image: jrohy/webssh
```

## 备忘录memos

```jsx
version: '3.3'
services:
    memos:
        container_name: memos
        restart: always
        environment:  
            - TZ=Asia/Shangha        
        ports:
            - '5230:5230'
        volumes:
            - '/home/zsg/docker/memos/:/var/opt/memos'
        image: 'neosmemo/memos:latest'
```

## Chatgpt-web

```yaml
version: '3.3'

services:
    chatgpt-web:
        container_name: chatgpt
        restart: always
        image: yidadaa/chatgpt-next-web
        ports:
            - '3355:3000'
        environment:  
            - TZ=Asia/Shangha
            - OPENAI_API_KEY=123456
            - CODE=8888888
            - BASE_URL=https://api.ai000.io
```

## Traccar位置追踪

```yaml
导出traccar.xml默认文件
docker run \
--rm \
--entrypoint cat \
traccar/traccar:latest \
/opt/traccar/conf/traccar.xml > /home/zsg/docker/traccar/traccar.xml

version: '3.3'
services:
    traccar:
        container_name: traccar
        restart: always
        environment:
            - TZ=Asia/Shanghai
        ports:
            - '3697:8082'
            - '5000-5150:5000-5150'
            - '5000-5150:5000-5150/udp'
        volumes:
            - '/home/zsg/docker/traccar/data:/opt/traccar/data:rw'
            - '/home/zsg/docker/traccar/logs:/opt/traccar/logs:rw'
            - '/home/zsg/docker/traccar/traccar.xml:/opt/traccar/conf/traccar.xml:ro'
        image: 'traccar/traccar:latest'
```

## 反代服务器Traefik

```yaml
version: '3.3'
services:
    traefik:
        container_name: traefik
        network_mode: host
        restart: always
        environment:
            - TZ=Asia/Shanghai
            - 'DNSPOD_API_KEY=123,66666
            - DNSPOD_HTTP_TIMEOUT=30
        volumes:
            - '/home/zsg/docker/traefik:/etc/traefik:rw'
            - '/var/run/docker.sock:/var/run/docker.sock:rw'
        image: 'traefik:latest'
```

## Reader阅读

```yaml
version: '3.3'
services:
    reader:
        restart: always
        container_name: reader
        environment:
            - SPRING_PROFILES_ACTIVE=prod
            - READER_APP_SECURE=true
            - READER_APP_SECUREKEY=282828   #管理密码
            - READER_APP_INVITECODE=33655 #邀请码
            - TZ=Asia/Shanghai
        volumes:
            - '/home/zsg/docker/reader/log:/log'
            - '/home/zsg/docker/reader/storage:/storage'
        ports:
            - '8769:8080'
        image: hectorqin/reader
```

## 绘图Draw

```jsx
version: '3.3'
services:
    drawio:
        container_name: draw
        ports:
            - '8322:8080'
        environment:
            - TZ=Asia/Shanghai
        restart: always
        image: jgraph/drawio
```

## RSS订阅FreshRSS

```jsx
version: '3.3'
services:
    freshrss:
        container_name: freshrss
        environment:
            - CRON_MIN: '*/45'
            - TZ=Asia/Shanghai
        ports:
            - '5655:80'
        volumes:
            - '/home/zsg/docker/freshrss:/var/www/html/data'
        image: freshrss/freshrss
```

## ESP32HOME

```yaml
version: '3.3'
services:
    esphome:
        container_name: esphome
        ports:
            - '6052:6052'
        environment:
            - 'http_proxy=http://10.0.0.5:7890'
            - 'https_proxy=http://10.0.0.5:7890'
            - 'no_proxy=localhost,10.0.0.5,10.0.0.1,192.168.1.1,127.0.0.1,.local,localhost'
        image: esphome/esphome
```

## 手绘白板

```yaml
version: '3.3'
services:
    excalidraw:
        container_name: excalidraw
        ports:
            - '8099:80' 
        environment:
            - TZ=Asia/Shanghai
        volumes:
            - '/home/zsg/docker/excalidraw:/app/web'
        restart: always
        image: 'excalidraw/excalidraw'
```

## Nginx+PHP

```yaml
docker run -d --name nginx -p 6161:80 -v /home/zsg/docker/nginx:/usr/share/nginx/html:ro nginx

version: '3.3'
services:
    php80:
        container_name: php8.0
        restart: always
        image: php:8.0-fpm
        volumes:
            - /home/zsg/docker/nginx/site:/var/www/html
        ports:
            - "19080:9000"
        environment:
            - PHP_IDE_CONFIG=serverName=php
        networks:
            - web
    php73:
        container_name: php7.3
        restart: always
        image: php:7.3-fpm
        volumes:
            - /home/zsg/docker/nginx/site:/var/www/html
        ports:
            - "19073:9000"
        environment:
            - PHP_IDE_CONFIG=serverName=php
        networks:
            - web       
    php56:
        container_name: php5.6
        restart: always
        image: php:5.6-fpm
        volumes:
            - /home/zsg/docker/nginx/site:/var/www/html
        ports:
            - "19056:9000"
        environment:
            - PHP_IDE_CONFIG=serverName=php
        networks:
            - web               
    nginx:
        container_name: nginx
        restart: always
        environment:
            - TZ="Asia/Shanghai"
        ports:
            - '6161-6169:6161-6169'
        volumes:
            - '/home/zsg/docker/nginx/site:/usr/share/nginx/html:ro'
            - '/home/zsg/docker/nginx/conf.d:/etc/nginx/conf.d:ro'
            - '/home/zsg/docker/nginx/nginx.conf:/etc/nginx/nginx.conf:ro'
        image: nginx
        depends_on:
            - php80
            - php73
            - php56
        networks:
            - web
networks:
     web:
```

## phpmyadmin

```html
任意服务器
docker run --name phpmyadmin -d -e PMA_ARBITRARY=1 -p 18080:80 phpmyadmin
指定服务器及端口
docker run --name phpmyadmin -d -e PMA_HOST=127.0.0.1 -e PMA_PORT=3306 -p 18080:80 phpmyadmin
```

## MySQL

```yaml
version: '3.3'
services:
    mysql:
        container_name: mysql
        restart: always
        ports:
            - '3306:3306'
        volumes:
            - '/home/zsg/docker/mysql/data:/var/lib/mysql'
        environment:
            - MYSQL_ROOT_PASSWORD=AxUr6aTg8u5pv8
            - TZ=Asia/Shanghai
        image: mysql
```

## Linux命令查询

```yaml
version: "3.3"
services: 
  web:
    image: stilleshan/linux-command
    container_name: linux-command
    ports:
      - 7326:80
    restart: always
```

## docker-proxy

```yaml
version: '3.3'
services:
  dockerproxy:
    image: tecnativa/docker-socket-proxy
    container_name: dockerproxy
    privileged: true
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    ports:
      - 2375:2375
    environment:
      - BUILD=1
      - COMMIT=1
      - CONFIGS=1
      - CONTAINERS=1
      - DISTRIBUTION=1
      - EXEC=1
      - IMAGES=1
      - INFO=1
      - NETWORKS=1
      - NODES=1
      - PLUGINS=1
      - SERVICES=1
      - SESSSION=1
      - SWARM=1
      - POST=1

测试连通命令 docker -H tcp://10.0.0.9:2375 ps
```

## 文件快递柜

```yaml
version: '3.3'
services:
    filecodebox:
        container_name: filecodebox
        restart: always
        ports:
            - '12345:12345'
        volumes:
            - '/home/zsg/docker/FileCodeBox/:/app/data'
        image: 'lanol/filecodebox:latest'
```

## MQTT

```yaml
version: '3.3'
services:
    eclipse-mosquitto:
        container_name: MQTT
        restart: always
        ports:
            - '1883:1883'
            - '9001:9001'
        volumes:
            - '/home/zsg/docker/mqtt/conf:/mosquitto/config'
            - '/home/zsg/docker/mqtt/data:/mosquitto/data'
            - '/home/zsg/docker/mqtt/log:/mosquitto/log'
        image: eclipse-mosquitto
```

## 测速speedtest

```yaml
version: '3.3'
services:
    speedtest:
        container_name: speedtest
        restart: always
        ports:
            - '12345:80'
        image: adolfintel/speedtest
```

## 订阅转换

```yaml
version: '3.3'
services:
    subweb: #前端
        container_name: subweb
        restart: always
        ports:
            - '58080:80'
        image: 'careywong/subweb:latest'
    subconverter: #后端
        container_name: sub
        restart: always
        ports:
            - '25500:25500'
        image: 'tindy2013/subconverter:latest'
```

## Docker命令转堆栈

```yaml
version: "3.9"
services:
  composerize:
    image: alcapone1933/composerize
    container_name: composerize
    restart: always
    ports:
      - 9080:80
    environment:
      - TZ="Asia/Shanghai"
    volumes:
      - '/home/zsg/docker/composerize:/var/www/
```

## Docker更新通知

```yaml
version: '3.3'
services:
    diun:
        container_name: diun
        restart: always
        environment:
            - TZ=Asia/Shanghai
            - LOG_LEVEL=info
            - LOG_JSON=false
            - DIUN_PROVIDERS_DOCKER=true
            - DIUN_PROVIDERS_FILE_FILENAME=/custom-images.yml
        volumes:
            - '/home/zsg/docker/diun:/data'
            - '/home/zsg/docker/diun/custom-images.yml:/custom-images.yml:ro'
            - '/home/zsg/docker/diun/diun.yml:/diun.yml:ro'
            - '/var/run/docker.sock:/var/run/docker.sock'
        image: 'crazymax/diun:latest'
```

‍

## 看板homepage

```yaml
version: '3.3'
services:
    diun:
        container_name: diun
        restart: always
        environment:
            - TZ=Asia/Shanghai
            - LOG_LEVEL=info
            - LOG_JSON=false
            - DIUN_PROVIDERS_DOCKER=true
            - DIUN_PROVIDERS_FILE_FILENAME=/custom-images.yml
        volumes:
            - '/home/zsg/docker/diun:/data'
            - '/home/zsg/docker/diun/custom-images.yml:/custom-images.yml:ro'
            - '/home/zsg/docker/diun/diun.yml:/diun.yml:ro'
            - '/var/run/docker.sock:/var/run/docker.sock'
        image: 'crazymax/diun:latest'
```

## trilium笔记

```yaml
version: '3.3'
services:
    trilium-cn:
        container_name: trilium
        ports:
            - '2992:8080'
        environment:
            - TZ=Asia/Shanghai
        volumes:
            - '/home/zsg/docker/trilium:/home/node/trilium-data'
        image: nriver/trilium-cn
```

## FileBrowser文件管理

```yaml
version: '3.3'
services:
    filebrowser:
        container_name: filebrowser
        ports:
            - '9696:80'
        environment:
            - TZ=Asia/Shanghai
            - PUID=0
            - PGID=0
        volumes:
            - '/home/zsg/docker:/Disk'
            - '/home/zsg/docker/filebrowser/database.db:/database.db'
            - '/home/zsg/docker/filebrowser/filebrowser.json:/.filebrowser.json'
            - '/home/zsg/docker/filebrowser/cache:/cache'
        image: filebrowser/filebrowser
```

[filebrowser.json](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/981388df-f134-489a-83aa-cdd59aa80ab2/filebrowser.json)

## VSCode

```yaml
version: '3.3'
services:
    code-server:
        container_name: vscode
        environment:
            - TZ=Asia/Shanghai
            - PUID=0
            - PGID=0
            - PASSWORD=KcsAPNb2F4rY
            - DEFAULT_WORKSPACE=/000
        ports:
            - '5797:8443'
        volumes:
            - '/home/zsg/docker/vscode:/config'
            - '/home/zsg/docker:/000'
        restart: always
        image: linuxserver/code-server
```

## 百度脑图

```yaml
version: '3.3'
services:
    kityminder:
        container_name: mind
        restart: always
        ports:
            - '2333:80'
        environment:
            - TZ=Asia/Shanghai
        volumes:
            - '/home/zsg/docker/mind:/data'
        image: xinyewdz/kityminder
```

## RSSPush

```yaml
version: '3.3'
services:
    rsspush:
        container_name: rsspush
        ports:
            - '6863:8000'
        volumes:
            - '/home/zsg/docker/rsspush:/rsspush/api/data'
        environment:
            - TZ=Asia/Shangha
            - 'RSS_BASE=http://10.0.0.9:8556'
            - ADMIN_KEY=123456
        image: easychen/rsspush
```

‍

## OCR文字识别

```yaml
version: '3.3'
services:
    trwebocr:
        ports:
            - '18089:8089'
        restart: always
        container_name: trwebocr
        image: mmmz/trwebocr
```

## 相册（MT Photo）

```yaml
version: '3.3'
services:
    mt-photos:
        container_name: mt-photos
        volumes:
            - '/home/zsg/docker/mt_photos/config:/config'
            - '/home/zsg/docker/mt_photos/upload:/upload'
            - photo:/photosync
        ports:
            - '8063:8063'
        environment:
            - TZ=Asia/Shanghai
        restart: unless-stopped
        image: mtphotos/mt-photos/photosync
volumes:
  photo:
    name: photo
    driver: local
    driver_opts:
      type: 'cifs'
      device: '//10.0.0.5/photosync'
      o: 'addr=10.0.0.5,username=000,password=000000000,vers=3.0'
```

## ADGuard Home

```yaml
version: '3.3'
services:
    run:
        container_name: adguard
        hostname: adguard
        restart: always
        environment:
            - TZ=Asia/Shanghai
            - PGID=0
            - PUID=0
        volumes:
            - '/home/zsg/docker/adguard/workdir:/opt/adguardhome/work'
            - '/home/zsg/docker/adguard/confdir:/opt/adguardhome/conf'
        ports:
            - '53:53/tcp'
            - '53:53/udp'
            - '3000:3000/tcp'
        image: run
```

## SmartDNS

```yaml
version: '3.3'
services:
    smartdns:
        network_mode: host
        hostname: smartdns
        container_name: smartdns
        restart: always
        environment:
            - TZ=Asia/Shanghai
        ports:
            - '53:53/udp'
            - '53:53/tcp'
        volumes:
            - '/home/zsg/docker/smartdns:/smartdns
        image: ghostry/smartdns
```

## xTeVe

```yaml
version: '3.3'
services:
    xteve:
        container_name: xteve
        restart: always
        hostname: xteve
        ports:
            - '34400:34400'
        logging:
            options: 'max-size=10m,max-file=3'
        environment:
            - TZ=Asia/Shanghai
        volumes:
            - '/home/zsg/docker/xteve/xteve:/root/.xteve:rw'
            - '/home/zsg/docker/xteve/config:/config:rw'
            - '/home/zsg/docker/xteve/tmp:/tmp/xteve:rw'
            - '/home/zsg/docker/xteve/tvheadend/data:/TVH'
        image: alturismo/xteve
```

## 思源笔记（siyuan）

```yaml
version: '3.3'
services:
    siyuan:
        container_name: siyuan
        restart: always
        volumes:
            - '/home/zsg/docker/siyuan:/siyuan'
        ports:
            - '6806:6806'
        image: b3log/siyuan
```

## 网页监控（uptime-kuma）

```yaml
version: '3.3'
services:
    uptime-kuma:
        restart: always
        environment:
            - TZ=Asia/Shanghai
        ports:
            - '3001:3001'
        volumes:
            - '/home/zsg/docker/uptime-kuma/data:/app/data'
        container_name: uptime-kuma
        image: 'louislam/uptime-kuma:latest'

```

## 影音机器人（movierobot）

```yaml
version: '3.3'
services:
    movie-robot:
        restart: always
        container_name: MovRobot
        ports:
            - '1329:1329'
        volumes:
            - '/home/zsg/docker/movie-robot:/data'
        environment:
            - LICENSE_KEY=333333333333333333333
        image: 'yipengfei/movie-robot'

```

## overseerr

```yaml
version: '3.3'
services:
    overseerr:
        restart: always
        container_name: overseerr
        environment:
            - LOG_LEVEL=debug
            - TZ=Asia/Shanghai
        ports:
            - '5055:5055'
        volumes:
            - '/home/zsg/docker/overseerr/config:/config'
        image: miniers/overseerr
```

## docker可视化管理（portainer）

```yaml
version: '3.3'
services:
    portainer-ee:
        restart: always
        container_name: portainer
        ports:
            - '9002:9000'
        volumes:
            - '/var/run/docker.sock:/var/run/docker.sock'
            - '/home/zsg/docker/portainer/data:/data'
        image: portainer/portainer-ce
```

## RSS生成（rsshub）

```yaml
version: '3.3'
services:
    rsshub:
        restart: always
        container_name: rsshub
        ports:
            - '8556:1200'
        image: diygod/rsshub
```

## flexget

```yaml
version: '3.7'
services:
  flexget:
    image: madwind/flexget
    container_name: flexget
    environment:
      #密码需保证复杂度
      FG_WEBUI_PASSWD: 65956232
      #日志级别
      FG_LOG_LEVEL: INFO
      TZ: Asia/Shanghai
      PUID: 1000
      PGID: 1000
    volumes:
      - /home/zsg/docker/flexget/config:/config
      - /home/zsg/docker/flexget/downloads:/downloads
    ports:
      - "8385:3539"
    restart: always
```

## bark

```yaml
version: '3.3'
services:
    bark-server:
        restart: always
        environment:
            - TZ=Asia/Shanghai
        container_name: bark
        ports:
            - '8383:8080'
        volumes:
            - '/home/zsg/docker/bark/data:/data'
        image: finab/bark-server
```

## 密码管理（vaultwarden/Bitwarden）

```yaml
version: '3.3'
services:
    server:
        restart: always
        container_name: vaultwarden
        environment:
            - TZ=Asia/Shanghai
        volumes:
            - '/home/zsg/docker/Bitwarden/data/:/data/'
        ports:
            - '12256:80'
        image: vaultwarden/server
```

## docker容器自动更新（watchtower）

```yaml
Bark通知部署（一定要https）

version: '3.3'
services:
    watchtower:
        container_name: watchtower
        restart: always
        environment:
            - TZ=Asia/Shanghai
            - WATCHTOWER_NOTIFICATION_URL=bark://:8888888@push.abc.com:8080/
        volumes:
            - /var/run/docker.sock:/var/run/docker.sock

        image: containrrr/watchtower
        command: --cleanup --interval 1200
```

## 网址收藏夹（shaarli）

```yaml
version: '3.3'
services:
    shaarli:
        container_name: Shaarli
        restart: always
        ports:
            - '8561:80'
        volumes:
            - '/home/zsg/docker/shaarli:/var/www/shaarli/data'
        image: shaarli/shaarli
```

## 智能家居（HASS）

```yaml
version: '3.3'
services:
    home-assistant:
        restart: always
        container_name: hass
        privileged: true
        network_mode: host
        environment:
            - TZ=Asia/Shanghai
        volumes:
            - '/home/zsg/docker/hass:/config'
            - '/run/dbus:/run/dbus'
            - '/var/run/dbus:/var/run/dbus'
            - '/dev:/dev'
            - '/var/run/docker.sock:/var/run/docker.sock'
            - '/dev/bus/usb:/dev/bus/usb'
        image: 'homeassistant/home-assistant:latest'
```

## 为知笔记（wiz）

```yaml
version: '3.3'
services:
    wizserver:
        container_name: wiz
        volumes:
            - '/home/zsg/docker/wiz/data:/wiz/storage'
            - '/etc/localtime:/etc/localtime'
        ports:
            - '8357:80'
            - '9269:9269/udp'
        image: wiznote/wizserver

默认管理员账号：admin@wiz.cn，密码：123456
```

## 堡垒机（next-terminal）

```yaml
version: '3.3'
services:
  guacd:
    container_name: guacd
    image: dushixiang/guacd:latest
    volumes:
      - /home/zsg/docker/next-terminal/data:/usr/local/next-terminal/data
    restart:
          always
  next-terminal:
    container_name:  next-terminal  
    image: dushixiang/next-terminal:latest
    environment:
      DB: sqlite
      GUACD_HOSTNAME: guacd
      GUACD_PORT: 4822
    ports:
      - "8068:8088"
    volumes:
      - /etc/localtime:/etc/localtime
      - /home/zsg/docker/next-terminal/data:/usr/local/next-terminal/data
    restart:
      always
```

## 相册（photoprism）

```yaml
version: '3.3'
services:
    photoprism:
        container_name: photoprism
        ports:
            - '8568:2342'
        environment:
            - PHOTOPRISM_UPLOAD_NSFW=false
            - PHOTOPRISM_ADMIN_PASSWORD=6666666
        volumes:
            - '/home/zsg/docker/photoprism:/photoprism/storage'
            - '/home/zsg/docker/Pictures/Pictures:/photoprism/originals'
            - '/home/zsg/docker/Pictures/Example:/photoprism/originals/Example'
        image: photoprism/photoprism
```

## node-red

```yaml
version: '3.3'
services:
    node-red:
        container_name: nodered
        restart: always
        ports:
            - '1880:1880'
        environment:
            - TZ=Asia/Shanghai
        volumes:
            - '/home/zsg/docker/nodered/data:/data'
        image: nodered/node-red
```

## PLEX监视器（Tautulli）

```yaml
version: '3.3'
services:
    argparse:
        container_name: tautulli
        restart: always
        volumes:
            - '/home/zsg/docker/tautulli:/config'
            - '/home/zsg/docker/tautulli/data:/data'
        environment:
            - TZ=Asia/Shanghai
        ports:
            - '28181:8181'
        image: argparse
```

## 个人导航（onenav）

```yaml
version: '3.3'
services:
    onenav:
        container_name: onenav
        ports:
            - '8252:80'
        environment:
            - USER=zsg
            - PASSWORD=6666666
        volumes:
            - '/home/zsg/docker/onenav:/data/wwwroot/default/data'
        image: helloz/onenav
```

## 网页剪切（wallabag）

```yaml
version: '3.3'
services:
    wallabag:
        container_name: wallabag
        restart: always
        volumes:
            - '/home/zsg/docker/wallabag/data:/var/www/wallabag/data'
            - '/home/zsg/docker/wallabag/images:/var/www/wallabag/web/assets/images'
        ports:
            - '5631:80'
        environment:
            - 'SYMFONY__ENV__DOMAIN_NAME=https://wb.abc.com:8080'
        image: wallabag/wallabag
```
## TTRSS
```yaml
version: "3"
services:
  service.rss:
    image: wangqiru/ttrss:latest
    container_name: ttrss
    ports:
      - 18181:80
    environment:
      - SELF_URL_PATH=https://rss.abc.com:8080 
      - DB_PASS=hr5y15gqeX
      - ALLOW_PORTS=8080,8556
      - ENABLE_PLUGINS=auth_internal,fever,remove_iframe_sandbox
      - PUID=1000
      - PGID=1000
    volumes:
      - /home/zsg/docker/ttrss/feed-icons/:/var/www/feed-icons/
    networks:
      - public_access
      - service_only
      - database_only
    stdin_open: true
    tty: true
    restart: always

  service.mercury: 
    image: wangqiru/mercury-parser-api:latest
    container_name: mercury
    networks:
      - public_access
      - service_only
    restart: always

  service.opencc:
    image: wangqiru/opencc-api-server:latest
    container_name: opencc
    environment:
      - NODE_ENV=production
    networks:
      - service_only
    restart: always

  database.postgres:
    image: postgres:13-alpine
    container_name: postgres
    environment:
      - POSTGRES_PASSWORD=hr5y15gqeX
    volumes:
      - /home/zsg/docker/ttrss/data/:/var/lib/postgresql/data
    networks:
      - database_only
    restart: always

networks:
  public_access: 
  service_only: 
    internal: true
  database_only:
    internal: true
```

