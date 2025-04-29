## 问题背景

vue应用的开发，可以使用`vue-cli`创建项目，在项目中使用组件进行开发。但开发后为了减少打包体积提高项目在生成环境运行效率，这时通常需要引用vue的cdn服务；同时，也可以通过引用cdn，在html中进行开发。

这篇文章将简介如何引用cdn进行开发。

## vue的cdn服务资源

vue的cdn服务资源可以多个网站查看，在vue中文官网的介绍中，就提供了多个平台： [`unpkg`](https://unpkg.com/)， [`jsdelivr`](https://www.jsdelivr.com) ， [`cdnjs`](https://cdnjs.com)。而在国内推荐使用[`BootCDN`](https://www.bootcdn.cn/)（该网站在访问时可能会显示不安全，点击页面空白处，输入`thisisunsafe`后回车，即可正常跳转到网站首页）。

## 选择合适的cdn服务资源

在不同的cdn服务提供的网站中搜索vue，可以看见不同版本的vue服务。

如果即将上线在开发环境运行，请选择符合你开发环境的vue版本。

除了选择合适的vue版本，还需要选择合适的类型。

在搜索到的vue资源中可以看见，有许多以不同后缀结尾的vue资源文件，适用与不同的开发情景。

> ```
> // 服务端渲染。 通过 `require()` 在 Node.js 服务器端渲染使用。
> vue.cjs.js
> vue.cjs.prod.js
> 
> // 使用构建工具，如 `webpack`，`rollup` 和 `parcel` 等打包出来的工程项目
> vue.esm-bundler.js
> vue.runtime.esm-bundler.js
> 
> // 通过浏览器中的 `<script src="...">` 直接使用，暴露全局Vue
> vue.global.js
> vue.global.prod.js
> vue.runtime.global.js
> vue.runtime.global.prod.js
> 
> // 在浏览器中通过 `<script type="module">` 来使用（浏览器原生 ES 模块导入使用）
> vue.esm-browser.js
> vue.esm-browser.prod.js
> vue.runtime.esm-browser.js
> vue.runtime.esm-browser.prod.js
> ```
>
> 引用于：https://juejin.cn/post/7043991342166310942

> 补充：
>
> # 不同构建版本
>
> | UMD                           | CommonJS           | ES Module (基于构建工具使用) | ES Module (直接用于浏览器) |                        |
> | ----------------------------- | ------------------ | ---------------------------- | -------------------------- | ---------------------- |
> | **完整版**                    | vue.js             | vue.common.js                | vue.esm.js                 | vue.esm.browser.js     |
> | **只包含运行时版**            | vue.runtime.js     | vue.runtime.common.js        | vue.runtime.esm.js         | -                      |
> | **完整版 (生产环境)**         | vue.min.js         | -                            | -                          | vue.esm.browser.min.js |
> | **只包含运行时版 (生产环境)** | vue.runtime.min.js | -                            | -                          | -                      |
>
> 注：
>
> - **完整版**：同时包含编译器和运行时的版本。
> - **编译器**：用来将模板字符串编译成为 JavaScript 渲染函数的代码。
> - **运行时**：用来创建 Vue 实例、渲染并处理虚拟 DOM 等的代码。基本上就是除去编译器的其它一切。
>
> 引用于：https://juejin.cn/post/6970997826457174052

1. 通过浏览器中的 `<script src="...">` 直接使用，暴露全局Vue

- 使用带`global`关键字的 `**.global.**.js`
- 提示：全局打包不是 [UMD](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fumdjs%2Fumd) 构建的，它们被打包成 [IIFEs](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FGlossary%2FIIFE)，并且仅用于通过 `<script src="...">` 直接使用。

2. 在浏览器中通过 `<script type="module">` 来使用（浏览器原生 ES 模块导入使用）

- 使用带`esm-browser`关键字的 `**.esm-browser.**.js`

3. 使用构建工具，如 `webpack`，`rollup` 和 `parcel` 等打包出来的工程项目

- 使用带`esm-bundler`关键字的 `**.esm-bundler.**.js`

4. 服务端渲染。 通过 `require()` 在 Node.js 服务器端渲染使用。

- 使用带`cjs`关键字的 `**.cjs.**.js`

## html开发中引用vue

通过CDN使用Vue时，不涉及“构建步骤”。这使得设置更加简单，并且可以用于增强静态的HTML或与[后端框架](https://so.csdn.net/so/search?q=后端框架&spm=1001.2101.3001.7020)集成。但是，你将无法使用单文件组件(SFC)语法。

### 1 使用全局构建版本

上面的例子使用了*全局构建版本*的 Vue，该版本的所有顶层 API 都以属性的形式暴露在了全局的 Vue 对象上。

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
 
<div id="app">{{ message }}</div>
 
<script>
  const { createApp } = Vue
  
  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
```

### 2 使用ES构建模块

在本文档的其余部分我们使用的主要是 Es模块语法。现代浏览器大多都已原生支持 ES 模块。因此我们可以像这样通过 CDN 以及原生 ES 模块使用 Vue：

```html
<div id="app">{{ message }}</div>
 
<script type="module">
  import { createApp } from 'https://cdn.bootcdn.net/ajax/libs/vue/3.3.4/vue.esm-browser.js'
  
  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
```

> 引用于：https://developer.aliyun.com/article/1287565