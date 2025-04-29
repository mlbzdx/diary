> 1.首先查看全局安装的包

```bash
npm list -g --depth 0
OR
yarn global list --depth=0
```

这个命令可以查看全局安装了那些东西，如果已经按照了vue-cli，那么查看安装的版本是否符合自己的需要。

当然你也可以通过以下指令直接查看自己vue-cli的版本

```
vue -V
OR
vue --version
```



> 2.卸载全局安装的vue-cli

如果不是自己想要的版本，那么需要通过以下命令先进行卸载。

```bash
//vue-cli 2.0 版本
npm uninstall -g vue-cli
//vue-cli 3.0 版本及以上
npm uninstall -g @vue/cli
```

> 3.查看可安装的vue-cli版本

```bash
npm view @vue/cli versions --json
```

注意，最新的vue-cli版本已经达到5.x以上，如果你还需要使用vue serve 指令进行快速原型开发，那么只能安装vue 4.x的版本。

> 4.安装vue-cli以及安装指定vue-cli版本

安装vue-cli（默认会按照最新的稳定版本，需要查看npm官网，在编写这篇文章时为`@vue/cli@5.0.8`）

```bash
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

这里我们需要使用到原型开发，所以安装了4.x的最新版本，即` @vue/cli@4.5.19`

安装具体版本的指令

```bash
npm install -g @vue/cli@版本号
```

> 5.如何使用vue-cli创建项目

请参考搭建工程

> 6.如何使用vue-cli进行快速原型开发，进行单文件组件的测试？



> 为什么一定要按照vue4.x的版本才能使用vue serve指令进行单文件组件的快速原型开发？
>
> 在控制台输入vue来查看serve命令的用法
>
> 可以在vue5.x以上的版本中，serve命令的用法显示只能全局启动项目，不能再指定单文件组件的项目文件
>
> ```
> serve 
> ```
>
> 而在vue4.x的版本中，输入vue，可以看见vue指令的用法：
>
> ```
> serve [options] [entry]                    serve a .js or .vue file in development mode with zero config
> ```



首先额外安装一个全局的扩展：

```bash
npm install -g @vue/cli-service-global
```

最好与你安装的vue-cli版本保持一致，可以通过以下指令查看`@vue/cli-service-global`的可安装版本

```bash
npm view @vue/cli-service-global versions --json
```

**使用vue serve指令直接启动项目工程**：

`vue serve` 使用了和 `vue create` 创建的项目相同的默认设置 `(webpack、Babel、PostCSS 和 ESLint)`。因此，如果你在你项目的根文件中直接执行该命令，它会在当前目录自动推导入口文件——入口可以是 `main.js`、`index.js`、`App.vue` 或 `app.vue` 中的一个。

**使用vue serve指令来测试单文件组件**：

就像上面提到的用法，你可以直接在vue serve 指令后通过指定路径入口的方式对单文件组件进行开发测试。

在开发规范上，你还可以将需要测试的组件名使用大驼峰命令的方式创建文件目录，需要测试的组件命名为`index.vue`,并将其导入应用到到测试组件`test.vue`中，最后，在`package.json`文件里配置运行脚本，方便后面出现其他问题时随时测试该组件。





> 参考文章：
>
> 关于vue-cli版本安装：https://blog.csdn.net/weixin_41387351/article/details/120654805
>
> 关于vue-cli快速原型开发（官方文档）：https://cli.vuejs.org/zh/guide/prototyping.html
>
> 关于vue-cli快速原型开发：https://juejin.cn/post/7135991300918575141