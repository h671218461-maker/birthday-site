# 生日祝福网站

这是一个使用 Vue 3 + Vite 构建的生日祝福网站。

## 项目设置

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 部署到 GitHub Pages

1. 在 GitHub 上创建一个新的仓库

2. 在 `vite.config.js` 中添加以下配置：

```js
export default defineConfig({
  base: "/<仓库名>/", // 替换成你的仓库名
  // ... 其他配置
});
```

3. 构建项目：

```bash
npm run build
```

4. 将 `dist` 文件夹的内容推送到 GitHub 仓库的 `gh-pages` 分支

```bash
git add dist -f
git commit -m "deploy"
git subtree push --prefix dist origin gh-pages
```

网站将在 `https://<用户名>.github.io/<仓库名>/` 上线。
