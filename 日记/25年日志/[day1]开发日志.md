## 搭建项目，进行配置

新建my-bili-project目录

进入my-bili-project目录

运行命令创建vue3的项目

```bash
npm create vue@3.5.13
```

创建项目为my-bili的前台项目，项目命名为my-bili-forestage

其他的东西不用安装，直接粘贴[package.json](./源代码/package.json.md)文件，运行npm i即可

然后配置main.js

## 完成根组件

蒙版的实现：

蒙版源代码参见：

禁止用户的一些默认行为导致蒙版脱落?

- **`user-select: none;`** CSS 标准属性，禁止用户选中元素内的文本或子元素内容。
- **浏览器私有前缀**（兼容旧版浏览器）：
  - `-webkit-user-select: none;` （Chrome/Safari/Edge）
  - `-moz-user-select: none;` （Firefox）
  - `-ms-user-select: none;` （旧版 Edge/IE）

根组件蒙版的出现和消失涉及到数据的获取，目前是前后端分离开发，所以打算利用第三方库mock.js来模拟数据，使用axios来获取数据并学习相关知识。

安装mysql数据库和可视化工具来查看数据结构以便学习和模拟

参考文章：https://www.cnblogs.com/hurricane404/p/15220431.html

我决定样式和功能先分离，对于涉及到数据获取的功能页面先自己编写数据？但接口不一致啊，不管那么多了。

继续解决蒙版问题
