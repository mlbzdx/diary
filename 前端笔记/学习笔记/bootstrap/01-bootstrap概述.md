> bootstrap中文官网：https://www.bootcss.com/

bootstrap当前有多个版本，先介绍以下v3的版本

# 版本介绍

## v3的版本

### bootstrap 编译和压缩之后的版本

编译并压缩后的 CSS、JavaScript 和字体文件。不包含文档和源码文件。

官网记录了下载后压缩包的目录结构，分为css,js,font三个主要的文件目录

```
bootstrap/
├── css/
│   ├── bootstrap.css
│   ├── bootstrap.css.map
│   ├── bootstrap.min.css
│   ├── bootstrap.min.css.map
│   ├── bootstrap-theme.css
│   ├── bootstrap-theme.css.map
│   ├── bootstrap-theme.min.css
│   └── bootstrap-theme.min.css.map
├── js/
│   ├── bootstrap.js
│   └── bootstrap.min.js
└── fonts/
    ├── glyphicons-halflings-regular.eot
    ├── glyphicons-halflings-regular.svg
    ├── glyphicons-halflings-regular.ttf
    ├── glyphicons-halflings-regular.woff
    └── glyphicons-halflings-regular.woff2

```

* `bootstrap.css`，css的源文件
* `bootstrap.css.map`，供浏览器识别的源码地图，浏览器能够通过该文件识别压缩后文件什么地方出了错误，并source调试栏显示给开发者，提示开发者需要在开发中的文件中将错误修改。
* `bootstrap.min.css`，源文件压缩后的css文件，体积更小
* `bootstrap-theme.css`，主题文件，主要影响颜色等样式。
* `bootstrap.js`,js的源文件
* `bootstrap.min.js`，源文件压缩后的js文件。

### source code 源代码

Less、JavaScript 和 字体文件的源码，并且带有文档。**需要 Less 编译器和[一些设置工作](https://v3.bootcss.com/getting-started/#grunt)**。

官网记录了下载后压缩包的目录结构，分为less,js,fonts,dist,docs主要的几个目录（类似于从github下载的源文件类型）

```
bootstrap/
├── less/
├── js/
├── fonts/
├── dist/
│   ├── css/
│   ├── js/
│   └── fonts/
└── docs/
    └── examples/
```

初学者下载第一个版本就可以了

### Sass

[这是 Bootstrap 从 Less 到 Sass 的源码移植项目](https://github.com/twbs/bootstrap-sass)，用于快速地在 Rails、Compass 或 只针对 Sass 的项目中引入。

## v4的版本

### compiled css and js

经过编译的 CSS 和 JS

下载后压缩包的目录结构,主要包括css和js两个文件目录。

```
bootstrap/
├── css/
│   ├── bootstrap-grid.css
│   ├── bootstrap-grid.css.map
│   ├── bootstrap-grid.min.css
│   ├── bootstrap-grid.min.css.map
│   ├── bootstrap-reboot.css
│   ├── bootstrap-reboot.css.map
│   ├── bootstrap-reboot.min.css
│   ├── bootstrap-reboot.min.css.map
│   ├── bootstrap.css
│   ├── bootstrap.css.map
│   ├── bootstrap.min.css
│   └── bootstrap.min.css.map
└── js/
    ├── bootstrap.bundle.js
    ├── bootstrap.bundle.js.map
    ├── bootstrap.bundle.min.js
    ├── bootstrap.bundle.min.js.map
    ├── bootstrap.js
    ├── bootstrap.js.map
    ├── bootstrap.min.js
    └── bootstrap.min.js.map
```

`bootstrap` 为你提供了一些选择，你可以引入部分或全部预编译的 CSS。

| CSS 文件                                         | Layout                                                       | Content                                                    | Components | Utilities                                                    |
| ------------------------------------------------ | ------------------------------------------------------------ | ---------------------------------------------------------- | ---------- | ------------------------------------------------------------ |
| `bootstrap.css``bootstrap.min.css`               | 已包含                                                       | 已包含                                                     | 已包含     | 已包含                                                       |
| `bootstrap-grid.css``bootstrap-grid.min.css`     | [Only grid system](https://v4.bootcss.com/docs/layout/grid/) | 未包含                                                     | 未包含     | [Only flex utilities](https://v4.bootcss.com/docs/utilities/flex/) |
| `bootstrap-reboot.css``bootstrap-reboot.min.css` | 未包含                                                       | [Only Reboot](https://v4.bootcss.com/docs/content/reboot/) | 未包含     | 未包含                                                       |

一般情况下我们使用表格中的源文件和压缩后的文件。

类似的，我们还提供了一些选择，你可以引入部分或全部的预编译 JavaScript。

| JS 文件                                        | Popper（弹窗等内容） | jQuery |
| ---------------------------------------------- | -------------------- | ------ |
| `bootstrap.bundle.js``bootstrap.bundle.min.js` | 已包含               | 未包含 |
| `bootstrap.js``bootstrap.min.js`               | 未包含               | 未包含 |

需要去下载jQuery文件。

### source files

源文件

下载后压缩包的目录结构

```
bootstrap/
├── dist/
│   ├── css/
│   └── js/
├── site/
│   └── content/
|       └── docs/
|           └── 4.6/
|               └── examples/
├── js/
└── scss/
```

# 下载安装

### 直接下载

直接在官网下载压缩包

### npm 

在你的 Node.js 项目中安装 Bootstrap 的 [npm 软件包](https://www.npmjs.com/package/bootstrap)：

```bash
npm install bootstrap
```

`require('bootstrap')` 会将所有 Bootstrap 的 jQuery 插件加载到 jQuery 对象上。`bootstrap` 模块本身不导出（export）任何内容。Bootstrap 的所有 jQuery 插件都放在软件包顶级目录下的 `/js/*.js` 中，每个插件都可以独立加载。

Bootstrap 的 `package.json` 文件中包含以下一些元数据信息：

- `sass` - 指向 Bootstrap 的 [Sass](https://sass-lang.com/) 入口源码文件路径
- `style` - 指向使用默认设置（没有自定义）预编译的 Bootstrap 的非压缩 CSS 文件的路径

**利用 npm 和我们提供的模板项目快速上手 Bootstrap！** 请前往 [twbs/bootstrap-npm-starter](https://github.com/twbs/bootstrap-npm-starter) 模板仓库，了解如何你自己的 npm 项目中构建和定制 Bootstrap。包括 Sass 编译器、Autoprefixer、Stylelint、PurgeCSS 以及 Bootstrap 图标库。

### yarn

在你的 Node.js 项目中安装 Bootstrap 的 [yarn 软件包](https://yarnpkg.com/en/package/bootstrap)：

```bash
yarn add bootstrap
```

# cdn引入

html引入cdn的基本结构

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <!-- 下面的meta是为了移动端的适配而添加的 -->
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- 下面引入的是bootstarp的css文件 -->
    <link
      href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <title>Document</title>
  </head>
  <body>
    html内容区域
    <!-- 下面引入的是bootstrap的js文件，首先必须引入jquery -->
    <script
      src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"
      integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
      crossorigin="anonymous"
    ></script>
    <!-- script文件引入时，需要放在jquery文件后，因为bootstrap的js文件是基于其开发的，因此需要注意引入顺序 -->
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.min.js"
      integrity="sha384-Lge2E2XotzMiwH69/MXB72yLpwyENMiOKX8zS8Qo7LDCvaBIWGL+GlRQEKIpYR04"
      crossorigin="anonymous"
    ></script>
    <!-- 如果引入的是经过编译的文件bootstrap.js或者是bootstrap.min.js，因为其内容不包括proper，所以需要单独再进行引入-->
    <script
      src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
      integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
      crossorigin="anonymous"
    ></script>
  </body>
</html>

```

注意，bootstrap官网引用的cdn属于外网连接，所以不挂梯子的情况下网络请求会报错，可以到国内的例如：[`bootcdn（点击跳转，如果不能访问在页面空白处而不是搜索栏，直接输入thisisunsafe即可正常访问）`](https://www.bootcdn.cn/)cdn资源中去所搜索bootstrap，引入cdn资源。

# bootstrap网站内容

## Layout

布局

## Content

页面内容

## Components

组件

## Utilities

工具类

## Extend

扩展