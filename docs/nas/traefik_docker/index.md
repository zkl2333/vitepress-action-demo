# Traefik 部署
## 前言

反向代理局域网内各项服务，访问http可自动跳转https。

Traefik部署完成后读取静态配置文件 `traefik.yml` 中的各项配置，并申请泛域名证书（此证书会自动续期）存储在 `acme.json` （文件路径 `/appdata/traefik/acme.json` ），部署完成后读取 `dynamic_conf.yml` 中的配置进行反向代理。

需要反代什么服务，直接修改 `dynamic_conf.yml`  即可（添加域名和内网IP即可）

## 准备工作



在路径 `/appdata/traefik/`下新建三个文件

```bash
touch /appdata/traefik/acme.json
touch /appdata/traefik/traefik.yml
touch /appdata/traefik/dynamic_conf.yml
```

修改 `acme.json` 权限为 600（这步必须做,不然申请证书会报错）

```bash
chmod 600 /appdata/traefik/acme.json
```

本文以 CF 解析为例，准备好  cloudflare  的 `email` 和 `global_key` 以及 你的域名，本文部署阶段需要改动的就这3个变量。

## 静态配置文件traefik.yml



此文件路径 `/appdata/traefik/traefik.yml`

需要修改：`cloudflare_email` 参数和 `xxxx 域名`

```yaml
api:
  dashboard: true
  insecure: true
  debug: true

entryPoints:
  web:
    address: ":87"                      #http端口没什么用随便填
    http:
        redirections:
            entryPoint:
                to: websecure
                scheme: https
                permanent: true
  websecure:
    address: ":8877"                    # https端口，外网访问端口
    http:
        redirections:
            entryPoint:
                to: websecure
                scheme: https
                permanent: true
#自动申请泛域名证书
certificatesresolvers:
  le:
    acme:
        email: cf的邮箱                  # 修改邮箱
        storage: /etc/traefik/acme.json
        dnschallenge:
            provider: cloudflare
#允许代理https
serversTransport:
  insecureSkipVerify: true
#动态配置文件路径指定
providers:
  docker:
    defaultRule: Host(`{{normalize .Name }}.xxxx.com`)   # 修改xxxxx.com 其他不改
  file:
    filename: /etc/traefik/dynamic_conf.yml
    watch: true
```

## 动态配置文件 dynamic_conf.yml



此文件路径 `/appdata/traefik/dynamic_conf.yml`

```yaml
http:
  routers:
    openwrt:
      entryPoints:
      - websecure
      tls:
        certResolver: le
        domains:
          - main: "xxxx.com"               #修改域名
            sans:
              - "*.xxxx.com"               #修改域名
      service: openwrt
      rule: "Host(`openwrt.xxxx.com`)"     #修改域名，只需要在第一个路由处加申请证书，其他的服务照着下面的 openwrt 即可
    qbit:
      entryPoints:
      - websecure
      tls: true
      service: qbit
      middlewares:                        #用户验证 auth 账户秘密为下方中间件定义，不需要密码删除 - auth 即可，密码生成：https://tool.oschina.net/htpasswd
        - auth
      rule: "Host(`qbit.xxxx.com`)"       #修改域名

################## gorgeous dividing line ##################

  services:
    qbit:
      loadBalancer:
        servers:
        - url: "http://10.0.0.88:9091"   #对应上面的路由写服务，外网访问  openwrt.xxxxxx.com:8787 即可访问openwrt web后台
    openwrt:
      loadBalancer:
        servers:
        - url: "http://10.0.0.88:80"
  middlewares:
    auth:                                 #用户验证
      basicAuth:
        users:
          - "admin:$apr1$4OQnKyRa$QXYlX5B/RWxUDig4M13KE1"
          #用户名：admin 密码：123456
```

这里加了个中间件（`middlewares`）用于用户认证，若某个服务没有自己的登录验证，为了安全可以加个前置的用户认证，密码生成随便找个 [htpasswd生成器](https://tool.oschina.net/htpasswd) 生成就行。

![1](/nas/traefik_docker/1.png)

## 安装部署

前面的工作做完后就可以部署了

采用 host 网络模式

需要修改 `CF_API_EMAIL` 和 `CF_API_KEY` 参数

```bash
docker run -d \
	--name='traefik' \
	--net='host' \
  --restart always \
	-e TZ="Asia/Shanghai" \
	-e 'CF_API_EMAIL'='email' \
	-e 'CF_API_KEY'='global_key' \
	-v '/appdata/traefik':'/etc/traefik':'rw' \
	-v '/var/run/docker.sock':'/var/run/docker.sock':'rw' 'traefik:latest'
```

部署完后，若没有报错，可通过 `qbit.xxxx.com:8877` `openwrt.xxxx.com:8877` 访问反代的服务（输入网址时，不用特意加 http 或 https，都会自动访问https）。ssl 证书为泛域名证书，3个月有效，到期前自动续期。

## 参考截图
![2](/nas/traefik_docker/2.png)
![3](/nas/traefik_docker/3.png)

## 如果觉得好用的话可以请我喝杯咖啡
<div align=left><img src="/coffee.png" width="150" /></div>