# :closed_book: 目录

收集整理的各类文档，教程，说明文档，以及一些日常笔记。
## 分类1
- [页面1](../分类1/页面1/)
- [页面2](../分类1/页面2/)
- [页面3](../分类1/页面3/)


## 分类2
- [页面1](../分类2/页面1/)
- [页面2](../分类2/页面2/)
- [页面3](../分类2/页面3/)

## 分类3
- [页面1](../分类3/页面1/)
- [页面2](../分类3/页面2/)
- [页面3](../分类3/页面3/)
#
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger 危险
This is a dangerous warning.
:::

::: details 本服务更新方法
- 克隆到本地后，本地执行 `yarn add -D vitepress@latest`
- 会自动修改根目录下 `package.json` 文件中的版本号，以及相关依赖，例如：
```json{3}
"devDependencies": {
    "cross-env": "^7.0.3",
    "vitepress": "^1.0.0-rc.15"
}
```
:::
::: details 本地构建与预览
- 本地构建，在项目根目录运行
```bash
yarn docs:build
```
- 本地预览，在项目根目录运行下面代码后，点击自动生成的链接
```bash
yarn docs:dev
```
- 本地调试好之后再推到 GitHub 自动部署到自己的服务器
:::
