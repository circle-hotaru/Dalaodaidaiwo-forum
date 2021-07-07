# Dalaodaidaiwo forum
基于 Vue.js 和 Node.js 的技术社区网站。

![home][home-screenshot]

## ✨特性

- 前后端分离
- 数据可视化
- SEO 优化

## 💾技术栈

- Vue.js
- Nuxt.js
- Tailwind CSS
- Element UI
- ECharts.js
- Node.js
- Koa2
- MongoDB
- Mongoose

## 📦安装

需提前安装好 Node.js 和 MongoDB。

1. 克隆本仓库

   ```bash
   git clone https://github.com/circle-hotaru/Dalaodaidaiwo-forum.git
   ```

2. 进入相应目录，安装依赖，运行程序

   ```
   # 服务端
   cd server
   npm i
   npm run dev
   
   # 前台用户系统
   cd web
   npm i
   npm run dev
   
   # 后台管理系统
   cd admin
   npm i
   npm run serve
   ```

运行程序后通过浏览器访问前台用户系统 http://localhost:3001，后台管理系统 http://localhost:3002。

后台管理员账号：admin 密码：admin123456

## ☑Todo

1. 评论功能
2. 国际化
3. 部署

欢迎提 Issue 和 Pull request。

## 🌌参考

- [DEV Community](https://dev.to/)
- [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)
- [Node.js 从零开发 Web Server 博客项目](https://coding.imooc.com/class/320.html)

## 📜License

基于 [MIT](./LICENSE) 许可进行开源。

## 🖼截图

![admin-dashboard][admin-dashboard-screenshot]

![article-page][article-page-screenshot]

![edit-page][edit-page-screenshot]

![personal-home][personal-home-screenshot]

![personal-setting][personal-settting-screenshot]

![article-list][article-list-screenshot]

![tag-list][tag-list-screenshot]



[home-screenshot]: images/home.png
[admin-dashboard-screenshot]: images/admin-dashboard.png
[article-page-screenshot]: images/article-page.png
[edit-page-screenshot]: images/edit-page.png
[personal-home-screenshot]: images/personal-home.png
[personal-settting-screenshot]: images/personal-setting.png
[article-list-screenshot]: images/article-list.png
[tag-list-screenshot]: images/tag-list.png

