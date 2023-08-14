# Hello VitePress

## GitHub Pages

1. 默认情况下，我们假设站点将部署在域的根路径（`/`）。如果您的网站将在子路径上提供服务，例如 `https://mywebsite.com/blog/`，那么您需要在 VitePress 配置中将 [`base`](https://vitepress.dev/reference/site-config#base) 选项设置为 `'/blog/'`。

    **示例:** 如果您部署到 `user.github.io/repo/`，则将您的 `base` 设置为 `/repo/`。

2. 在存储库设置的“Pages”菜单项下，选择“Build and deployment > Source”中的“GitHub Actions”。

3. 将更改推送到 `main` 分支并等待 GitHub Actions 工作流程完成。您应该看到您的站点部署到`https://<username>.github.io/[repository]/`或`https://<custom-domain>/`，具体取决于您的设置。 您的网站将在每次推送到 `main` 分支时自动部署。