# 🌎 每天60秒读懂世界 - 微信推送
MR插件，定时获取每日新闻和天气并微信通知
- 【每日新闻】`每天 8:00` 推送新闻和天气,如果8点新闻源还未更新，则1小时后再次获取 获取到并推送后当天不再获取。
- 【影视资讯】`每天 8:00` 获取到并推送后当天不再获取。
- 推送通知时调用调用当天天气，背景根据天气变化
- 点击消息封面可进入详情页，查看完整新闻列表内容
- 点击阅读原文跳转到源出处

本人能力有限，各位可帮助一起完善提PR即可！

## 效果预览
![git](https://user-images.githubusercontent.com/68833595/216874085-3f036cb1-861b-4153-a890-8c723fae478b.png)

## 使用说明
- 将 `daily_news` 文件夹放到 `Plugins` 文件夹或直接在 MR 插件市场下载自动安装，`设置好推送人保存后一定要重启MR`，配置才会生效。
- 本插件选用微信通道推送消息效果最佳，若没获取到相关参数，将采用 MR 主干默认消息通道推送。
- 如采用默认消息通道推送。
- 重启后如果日志报错：依赖库 `zhdate` 安装失败而导致插件载入失败，请手动进入 MR 命令行安装，安装命令：`pip install zhdate`
- 如果选择微信通道必须是`老应用`或`自建代理并添加可信IP`。
- 选择独立的微信通道时需先在设置中添加额外的微信通道（见下方设置独立微信应用通知）。

## 关于如何设置独立微信应用通知（和 MR 通知分开）
- 设置好额外的微信应用参数，接收人到插件设置页选择。
- 插件设置页选择新添加的额外微信应用通道

![image](https://user-images.githubusercontent.com/68833595/218243351-50e2a395-fde0-4910-b42f-bea311c4fb28.png)



## 为获得更好的效果体验，推送通道选择企业微信最好，配在 MR 系统中
- 配置路径：`应用设置` - `推送通道` 
- 在用户管理页为接收用户绑定 `微信账号`
- 如果这些参数你不知道怎么获取，可参见 [企业微信参数获取方法](https://alanoo.notion.site/thumb_media_id-64f170f7dcd14202ac5abd6d0e5031fb)

## 如果觉得好用的话可以请我喝杯咖啡
<div align=left><img src="/coffee.png" width="150" /></div>


