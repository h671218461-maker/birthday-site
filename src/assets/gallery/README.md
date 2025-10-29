将你要展示的图片放到本文件夹中，并按下面命名：

- photo1.jpg （第一张图片）
- photo2.jpg （第二张图片）
- photo3.jpg （第三张图片，新增）

注意：

- 推荐使用 JPG 或 PNG 格式。
- 本项目的 `GalleryPage.vue` 使用 Vite 的 `new URL('../assets/gallery/photo1.jpg', import.meta.url).href` 引入静态资源，开发服务器启动后会正确加载这些图片。

示例：在浏览器控制台中可以通过 `window.location` 查看加载的资源链接是否正确。
