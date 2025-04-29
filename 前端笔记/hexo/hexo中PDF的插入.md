---
title: hexo中PDF的插入
tags:
  - hexo博客
categories:
  - hexo博客
  - hexo博客功能拓展
abbrlink: 30612
data: 2024-09-13 21:00:00
updated: 2024-09-13 21:00:00
---
## 方法一 本地文件插入：

1. 安装第三方库：

   ```bash
   npm install --save hexo-pdf
   ```

2. 将PDF文件放入到 `source`目录下，后面填写路径时会以该目录为根目录设置相对路径

3. 在你的`hexo`中运行命令新建文章，并在文章里以如下格式插入PDF

   ```markdown
   {% pdf /你自己刚刚放的pdf文档的名称.pdf %}
   ```

   pdf存放目录及hexo文章插入图片展示：

   ![image-20240913120052262](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/img/image-20240913120052262.png)

4. 重新生成静态页面，将pdf等添加到静态资源中去，然后再本地运行查看效果，无误后可以部署到 `github`仓库

   重新生成并再本地运行：

   ```bash
   hexo g;hexo s
   ```

   部署到`github`仓库

   ```bash
   hexo d
   ```

首先会占用静态资源，占用大，如果你没有使用服务器而使用的是`github`仓库的静态页面，因为静态页面的仓库空间有限，不推荐使用。其次加载卡顿，体验效果不好。

## 方法二 云端文件插入：

1. 再本地和`github`都新建了一个PDF的仓库，并将其相关联

2. 将pdf文件保存再仓库并上传

3. 使用`jsDelivr`的`cdn`服务实现国内的加速访问，访问方法如下：
   在文档中加入pdf嵌入语句

   ```markdown
   {% pdf https://cdn.jsdelivr.net/gh/你的GitHub账户名/你的新建的仓库名/你的文件路径/你的pdf文件.pdf %}
   ```



> 参考文章：https://icimence.github.io/2020/04/14/%E5%A6%82%E4%BD%95%E5%9C%A8Hexo%E9%9D%99%E6%80%81%E5%8D%9A%E5%AE%A2%E4%B8%AD%E4%BD%BF%E7%94%A8pdf%E6%96%87%E7%AB%A0/#%E5%AE%89%E8%A3%85PDF%E6%8F%92%E4%BB%B6
>
> pdf的合并拆分:
>
> 可以使用在线网站：https://www.ilovepdf.com/zh-cn/split_pdf
>
> 更推荐软件 `pdfgear`，下载地址：https://www.pdfgear.com/zh/
>
> pdf的书签的手动添加:
>
> 推荐使用软件 `FreePic2Pdf`
>
> 软件下载：https://www.123pan.com/s/V4VyVv-h3NHv
>
> 软件教程：https://blog.csdn.net/qq_20597149/article/details/103518748