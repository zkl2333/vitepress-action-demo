# Transmission 制作种子
本文包括制作种子文件，发布到 PT 站点，开始做种三个内容。

## 第一步

使用 `find` 命令找到环境内的 transmission 安装位置。（必须是 root，不是的话先执行 `sudo -i` 获取 root 权限！）

```bash
find / -name transmission-create
```

## 第二步

使用cd命令进入 transmission 的 bin 目录，一般就把上面返回的地址后面的 transmission-create 删掉就是了。里面有个文件 `transmission-create`

## 第三步

使用 `transmission-create` 命令行制作你的种子命令：

```bash
./transmission-create -p -o /输出的种子存放文件位置/输出的种子名称.torrent -t Tracker服务器的URL -s 2048 /需要做种的源文件或者目录 &

./transmission-create -p -o /Media/种子/海贼王1-1028.torrent -t https://a.com -s 4096 /Media/动漫/海贼王\ \(1999\)/ &

/usr/bin/transmission-create -p -o /Media/种子/乱世佳人.1080p.原盘remux.8国配.央视重混.特效字幕.torrent -t https://cnlang.org/pt/announce.php -s 4096 /Media/电影/乱世佳人\ \(1939\)/ &

```

![图片](/nas/Transmission制作种子/1.png)

参数说明

```bash
-p 表示这是私用的种子，这个必须要加上
-o 生成的种子输出位置，不要忘记把名字打上 .torrent 后缀结尾
-t tracker 的地址，请自行修改
-s 每个文件块的大小，单位是KB，我设置的是2M，也就是2048KB
最后空一格写源文件的位置，也就是文件的存放位置，可以是一个文件或者一整个目录可以空一格加一个 &，这样即使关掉窗口也可以在后台运行
```

填完，回车，种子就在制作了。种子制作完成后，会显示一个

```bash
done！
```

PS：做种需要很久的时间，时间和你的种子大小成正比，你可以找一个几GB的文件测试完成后，再做那种几百GB或者上TB的种子，估计一个1T的种子，做完需要好几个小时，取决于机器性能。

关于后台运行可以加个空格然后 &，不过我更推荐使用 `screen -S pt` 开辟一个窗口，这样即使断了，重新登陆shell，然后 `screen -r pt` 还可以回到窗口。
