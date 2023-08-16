# Alist 美化

## 自定义头部
```html
<!--暗黑模式 未修改背景-->
<script src="https://polyfill.io/v3/polyfill.min.js?features=String.prototype.replaceAll"></script>

<!--引入字体，鸡汤字体-->
<link href="https://fonts.googleapis.com/css?family=Noto+Serif+SC" rel="stylesheet">
<!--<link href="https://cdn.jsdelivr.net/npm/noto-serif-sc@22.0.0/noto_serif_sc_semi_bold/css.min.css" rel="stylesheet">-->
<!--<link href="https://cdn.jsdelivr.net/npm/@fontsource/noto-serif-sc@4.5.12/chinese-simplified-500.min.css" rel="stylesheet">-->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<!--iOS 添加到主屏幕时始终全屏，自备manifest.json文件，如果直接嵌入需要将manifest.json中的内容进行url编码（https://tool.chinaz.com/tools/urlencode.aspx）-->
<link rel="manifest" href="data:application/manifest+json,%7B%22short_name%22%3A%20%22Alist%22%2C%20%22name%22%3A%20%22Alist%22%2C%20%22icons%22%3A%20%5B%7B%22src%22%3A%20%22https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Falist-org%2Flogo%40main%2Flogo.svg%22%2C%20%22sizes%22%3A%20%22any%22%2C%20%22type%22%3A%20%22image%2Fsvg%2Bxml%22%7D%5D%2C%20%22start_url%22%3A%20%22.%22%2C%20%22display%22%3A%20%22fullscreen%22%2C%20%22theme_color%22%3A%20%22%231890ff%22%2C%20%22background_color%22%3A%20%22%23000000%22%7D">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover">
<!-- Font6，自定义底部使用和看板娘使用的图标和字体文件-->
<link type='text/css' rel="stylesheet" href="https://npm.elemecdn.com/font6pro@6.0.1/css/fontawesome.min.css" media='all'>
<link href="https://npm.elemecdn.com/font6pro@6.0.1/css/all.min.css" rel="stylesheet">
<!--配色方案跟随系统 -->
<script>
    function setMode(mode) {
        if (mode === 'light') {
            document.body.classList.remove('hope-ui-dark');
            document.body.classList.add('hope-ui-light');
            localStorage.setItem('colorMode', 'light');
        } else {
            document.body.classList.remove('hope-ui-light');
            document.body.classList.add('hope-ui-dark');
            localStorage.setItem('colorMode', 'dark');
        }
    }

    // Check for system color scheme
    const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedColorMode = localStorage.getItem('colorMode');

    if (savedColorMode) {
        setMode(savedColorMode);
    } else if (colorScheme.matches) {
        setMode('dark');
    } else {
        setMode('light');
    }

    // Watch for system color scheme changes
    colorScheme.addListener((e) => {
        if (savedColorMode) {
            return;
        }
        setMode(e.matches ? 'dark' : 'light');
    });
</script>
<!--配色方案跟随系统 结束 -->
<style>
    iframe {
        border-radius: 10px !important;
    }
    .art-video-player,
    .art-video-player .art-bottom,
    .art-video-player .art-video {
        border-radius: 10px !important;
    }
    /*选中文字*/
    ::selection {
        background: rgba(1,124,252, 0.3) !important;
        color: rgba(255, 255, 255, 1) !important;
    }
    .hope-ui-light ::selection {
        background: rgba(255,0,97, 0.7) !important;
        color: rgba(255, 255, 255, 1) !important;
    }

    /*导航-斜线*/
    .nav-separator.hope-breadcrumb__separator.hope-c-PJLV.hope-c-PJLV-ijhzIfm-css {
        color: rgba(255, 255, 255, 0.45) !important;
    }
    /*导航-上一级路径文字*/
    .hope-c-kyJmIJ-kEuwJU-currentPage-false.hope-c-PJLV.hope-c-PJLV-ibMsOCJ-css {
        color: rgba(255, 255, 255, 0.8) !important;
        font-weight: normal !important;
    }
    .hope-c-kyJmIJ-kEuwJU-currentPage-false.hope-c-PJLV.hope-c-PJLV-ibMsOCJ-css:hover {
        background-color: rgba(255, 255, 255, 0.2) !important;
        font-weight: normal !important;
    }

    /*导航-当前路径文字*/
    .hope-c-kyJmIJ-bQjbGr-currentPage-true.hope-c-PJLV.hope-c-PJLV-ibMsOCJ-css {
        color: rgba(255, 255, 255, 1) !important;
        font-weight: bold !important;
    }
    .hope-c-kyJmIJ-bQjbGr-currentPage-true.hope-c-PJLV.hope-c-PJLV-ibMsOCJ-css:hover {
        background-color: rgba(255, 255, 255, 0.2) !important;
    }
    /*白天背景图*/
    .hope-ui-light{
        background-color: #0C25F3 !important;
        background: linear-gradient(115deg, #030460 0%, #00C508 55%, #030460 100%), linear-gradient(115deg, #0057FF 0%, #020077 100%), conic-gradient(from 110deg at -5% 35%, #030460 0deg, #FAFF00 360deg), conic-gradient(from 220deg at 30% 30%, #FF0000 0deg, #0000FF 220deg, #240060 360deg), conic-gradient(from 235deg at 60% 35%, #0089D7 0deg, #0000FF 180deg, #240060 360deg);
        background-blend-mode: soft-light, soft-light, overlay, screen, normal;
        background-attachment: fixed;
        background-size: cover;
        margin: 0;
    }
    /*白天搜索结果列表选中*/
    .hope-ui-light .hope-stack.hope-c-dhzjXW.hope-c-PJLV.hope-c-PJLV-idcOWKd-css {
        border-color: rgba(255, 255, 255, 0.5) !important;
    }
    /*搜索结果列表选中*/
    .hope-stack.hope-c-dhzjXW.hope-c-PJLV.hope-c-PJLV-idcOWKd-css {
        margin: 2px 0px 0px 0px;
    }
    /*白天宫格选中，列表选中，搜索结果列表选中*/
    .hope-ui-light .grid-item.hope-stack.hope-c-dhzjXW.hope-c-PJLV.hope-c-PJLV-ihHRgxo-css:hover,
    .hope-ui-light .hope-stack.hope-c-dhzjXW.hope-c-PJLV.hope-c-PJLV-idcOWKd-css:hover,
    .hope-ui-light .list-item.hope-stack.hope-c-dhzjXW.hope-c-PJLV.hope-c-PJLV-ikoJJtX-css:hover {
        background-color: rgba(255, 255, 255, 0.9) !important;
    }
    /*白天 列表模式标题*/
    .hope-ui-light .hope-text.hope-c-PJLV.hope-c-PJLV {
        color: rgba(0, 0, 0, 0.7) !important;
    }

    /*白天搜索结果次要文字*/
    .hope-ui-light .hope-text.hope-c-PJLV.hope-c-PJLV-cfxjmx-size-xs.hope-c-PJLV.hope-c-PJLV-ibveQmV-css {
        color: rgba(0, 0, 0, 0.75) !important;
    }
    .hope-stack.hope-c-dhzjXW.hope-c-PJLV.hope-c-PJLV-icYhHkW-css,
    .hope-stack.hope-c-dhzjXW.hope-c-PJLV.hope-c-PJLV-igOZEoG-css {
        margin-bottom: 100px !important;
        /*transform: scale(1.4) !important;*/
        /*border: 1px solid rgba(255, 255, 255, 0.05) !important;*/
        /*box-shadow: 0px 10px 50px 0px rgba(0, 0, 0, 0.4) !important;*/
    }

    /*白天主列表背景*/
    .obj-box.hope-stack.hope-c-dhzjXW.hope-c-PJLV.hope-c-PJLV-igScBhH-css {
        background: rgba(234, 236, 244, 0.9) !important;
        backdrop-filter: blur(30px) saturate(200%) !important;
        -webkit-backdrop-filter: blur(30px) saturate(200%) !important;
        border: 1px solid rgba(255, 255, 255, 0.75) !important;
        box-shadow: 0px 40px 117px 0px rgba(31, 44, 143, 0.4) !important;
    }
    /*多选框*/
    .hope-ui-light .hope-c-mHASU-byiOue-variant-filled{
        border: 1px solid rgba(24,144,255, 1) !important;
        background-color: rgba(24,144,255, 0.08);
    }
    .hope-ui-light .hope-c-mHASU-kFfbLQ-colorScheme-info{
        color: rgba(24,144,255, 1) !important;
    }
    /*白天 右下角...展开背景，右上角搜索背景*/
    .hope-ui-light .hope-menu__content.hope-c-zbPwS.hope-c-PJLV.hope-c-PJLV-iSMXDf-css,
    .hope-ui-light .left-toolbar.hope-stack.hope-c-dhzjXW.hope-c-PJLV.hope-c-PJLV-ijgzmFG-css,
    .hope-ui-light .hope-stack.hope-c-dhzjXW.hope-c-PJLV.hope-c-PJLV-ikEIIxw-css {
        background: rgba(234, 236, 244, 0.9) !important;
        backdrop-filter: blur(30px) saturate(200%) !important;
        -webkit-backdrop-filter: blur(30px) saturate(200%) !important;
        border: 1px solid rgba(255, 255, 255, 0.75) !important;
        box-shadow: 0px 5px 20px 0px rgba(31, 44, 143, 0.3) !important;
    }
    /*夜间主列表背景*/
    .obj-box.hope-stack.hope-c-dhzjXW.hope-c-PJLV.hope-c-PJLV-iigjoxS-css {
        background: rgba(32,36,37, 0.65) !important;
        backdrop-filter: blur(30px) saturate(200%) !important;
        -webkit-backdrop-filter: blur(30px) saturate(200%) !important;
        border: 1px solid rgba(255, 255, 255, 0.02) !important;
    }

    /*白天模式 readme*/
    .hope-c-PJLV.hope-c-PJLV-ikSuVsl-css{
        background: rgba(234, 236, 244, 0.91) !important;
        backdrop-filter: blur(30px) saturate(200%) !important;
        -webkit-backdrop-filter: blur(30px) saturate(200%) !important;
        border: 1px solid rgba(255, 255, 255, 0.75) !important;
        box-shadow: 0px 40px 117px 0px rgba(31, 44, 143, 0.4) !important;
    }

    /*夜间模式 readme*/
    .hope-c-PJLV.hope-c-PJLV-iiuDLME-css{
        background-color: rgba(32,36,37, 0.5) !important;
    }

    /*夜间模式代码块*/
    .hope-ui-dark pre{
        background-color: rgba(0, 0, 0, 0.4) !important;
    }
    pre{
        border-radius: 10px !important;
    }

    /*夜间模式搜索背景 毛玻璃*/
    .hope-ui-dark .hope-c-PJLV-iiBaxsN-css{
        background-color: rgb(21, 23, 24, 0.85) !important;
        border: 1px solid rgba(255, 255, 255, 0.07) !important;
        border-radius: 20px !important;
        backdrop-filter: blur(30px) saturate(200%)  !important;
        -webkit-backdrop-filter: blur(30px) saturate(200%) !important;
        box-shadow: 0px 30px 40px 0px rgba(0, 0, 0, 0.5);
    }
    /*白天模式搜索背景 毛玻璃*/
    .hope-ui-light .hope-c-PJLV-iiBaxsN-css{
        background: rgba(234, 236, 244, 0.85) !important;
        border-radius: 20px !important;
        backdrop-filter: blur(30px) saturate(200%) !important;
        -webkit-backdrop-filter: blur(30px) saturate(200%) !important;
        border: 1px solid rgba(255, 255, 255, 0.75) !important;
        box-shadow: 0px 30px 40px 0px rgba(31, 44, 143, 0.4) !important;
    }

    /*夜间模式搜索栏(输入框，搜索框，选择框） 毛玻璃*/
    .hope-ui-dark .hope-c-kvTTWD-hYRNAb-variant-filled{
        background-color: rgb(0, 0, 0, 0.3) !important;
        backdrop-filter: blur(30px) saturate(200%)  !important;
        -webkit-backdrop-filter: blur(30px) saturate(200%) !important;
        border: 1px solid rgba(24, 144, 255, 0) !important;
    }
    .hope-ui-dark .hope-c-kvTTWD-hYRNAb-variant-filled:focus{
        background-color: rgb(0, 0, 0, 0.3) !important;
        backdrop-filter: blur(16px) saturate(200%) !important;
        -webkit-backdrop-filter: blur(16px) saturate(200%) !important;
        border: 1px solid rgba(24, 144, 255, 0.8) !important;
    }

    /*白天模式搜索栏(输入框，搜索框，选择框） 毛玻璃*/
    .hope-ui-light .hope-c-kvTTWD-hYRNAb-variant-filled{
        background-color: rgb(255, 255, 255, 0.95) !important;
        backdrop-filter: blur(30px) saturate(200%)  !important;
        -webkit-backdrop-filter: blur(30px) saturate(200%) !important;
        border: 1px solid rgba(24, 144, 255, 0) !important;
    }
    .hope-ui-light .hope-c-kvTTWD-hYRNAb-variant-filled:focus{
        background-color: rgb(255, 255, 255, 0.95) !important;
        backdrop-filter: blur(16px) saturate(200%) !important;
        -webkit-backdrop-filter: blur(16px) saturate(200%) !important;
        border: 1px solid rgba(24, 144, 255, 0.8) !important;
    }

    /*夜间模式 搜索按钮+毛玻璃*/
    .hope-ui-dark .hope-c-PJLV-ikEIIxw-css{
        backdrop-filter: blur(16px) saturate(200%)  !important;
    }

    /*光标颜色*/
    input {
        caret-color: #1890ff;
    }

    /*底部CSS，.APP .tanle这三个一起的*/
    dibu {
        border-top: 0px;
        position: absolute;
        bottom: 0;
        width: 100%;
        margin: 0px;
        padding: 0px;
    }
    /*底部入口大div*/
    .hope-ui-dark .nav-items {
        font-size: 16px;
        font-weight: normal;
        color: rgba(255, 255, 255, 0.7);
    }

    /*底部入口大div*/
    .hope-ui-light .nav-items {
        color: rgba(255, 255, 255, 0.7);
    }

    /*底部入口样式-常态*/
    .nav-item {
        opacity: 0.8;
        transition: all 0.22s;
        -webkit-transition: all 0.22s ease;
        -moz-transition: all 0.22s ease;
        -o-transition: all 0.22s ease;
    }
    /*底部入口样式-鼠标悬停*/
    .nav-item:hover{
        font-weight: bold;
        opacity: 1;
        transition: all 0.22s;
        -webkit-transition: all 0.22s ease;
        -moz-transition: all 0.22s ease;
        -o-transition: all 0.22s ease;
    }
    /*鸡汤样式*/
    .hit_text {
        font-family: 'Noto Serif SC';
        font-weight: 900;
        line-height: 1.5;
        margin-bottom: 10px;
        font-size: 20px;
        color: rgba(150, 150, 150, 0.4)
    }
    /*白天鸡汤样式*/
    .hope-ui-light .hit_text {
        color: rgba(255, 255, 255, 0.4)
    }
    /*移动端不显示鸡汤*/
    @media screen and (max-width: 750px) {
        .hit_text {
            display: none;
        }
    }
    .App {
        min-height: 95vh;
    }
    .table {
        margin: auto;
    }
    /*去掉底部*/
    .footer {
        display: none !important;
    }

    /*请我喝咖啡*/
    .nav-coffee:hover {
        position: relative;
    }
    .nav-coffee:hover::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translate(-50%, 0);
        width: 220px;
        height: 222px;
        background-image: url('https://alist.walkcs.com:88/d/Share/coffee.png?sign=teg0WnbMehF3wW78mDodxdthaatplw3yIY2MUA-kPOo=:0');
        background-repeat: no-repeat;
        background-size: contain;
        z-index: 999;
        opacity: 0;
        animation: showImage 0.22s ease-out forwards;
    }
    @keyframes showImage {
        0% {
            opacity: 0;
            top: -200px;
        }
        100% {
            opacity: 1;
            top: -220px;
        }
    }
</style>
```
## 自定义内容
```html
<!--延迟加载-->
<!--如果要写自定义内容建议都加到这个延迟加载的范围内-->
<div id="customize" style="display: none; padding-top: 20px; padding-bottom: 25px; padding-right: 10px;">
    <div>
        <center class="dibu">
            <div class="hit_text">
                <span>“
                    <span  id="hitokoto">
                        <a href="#" id="hitokoto_text">
                        </a>
                    </span>”
                </span>
            </div>
            <div class="nav-items">
                <!--版权，请尊重作者-->
                <span class="nav-item" style="margin-right: 15px">
                    <a class="nav-coffee" href="" target="">
                        <i class="fa-solid fa-coffee" style="color:#409EFF;" aria-hidden="true">
                        </i>
                        请我喝咖啡
                    </a>
                </span>
                <!--后台入口-->
                <span class="nav-item" style="margin-right: 15px">
                    <a class="nav-link" href="/@manage" target="_blank">
                        <i class="fa-solid fa-folder-gear" style="color:#409EFF;" aria-hidden="true">
                        </i>
                        管理
                    </a>
                </span>
            </div>
        </center>
    </div>
    <!--延迟加载范围到这里结束-->
</div>

<!--一言API-->
<script src="https://v1.hitokoto.cn/?encode=js&select=%23hitokoto" defer></script>
<!--禁止缩放-->
<script>
  document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
  });
</script>

<!--延迟加载配套使用JS-->
<script>
    let interval = setInterval(() => {
        if (document.querySelector(".footer")) {
            document.querySelector("#customize").style.display = "";
            clearInterval(interval);
        }
    }, 200);
</script>

```

## 添加到 iOS 桌面
进入下级页面有地址栏和工具栏，需要在头部加入一下代码
```html
<link rel="manifest" href="https://walkcs.com/alist/manifest.json">

manifest.json内容如下：，如果不引用文件需要把下面的内容经过url编码嵌入

{
  "short_name": "Alist",
  "name": "Alist",
  "icons": [
    {
      "src": "https://cdn.jsdelivr.net/gh/alist-org/logo@main/logo.svg",
      "sizes": "any",
      "type": "image/svg+xml"
    }
  ],
  "start_url": ".",
  "display": "fullscreen",
  "theme_color": "#1890ff",
  "background_color": "#000000"
}
```