# Node模块化细节

## 模块的查找

### 绝对路径

```js
require('C:\\Users\\mlbzdx\\index.js')
```

所有其他路径最终都会转化为绝对路径再进行查找

### 相对路径 `./` 或者 `../`

转换为绝对路径后加载模块

### 相对路径

查找顺序

1. 检查是否是内置模块，如：`fs`,`path`等
2. 检查当前目录中的 `node_modules`
3. 检查上级目录中的 `node_modules`
4. 转换为绝对路径
5. 加载模块

### 关于后缀名

如果不提供后缀名，自动补全。补全的优先级 `js json  node  mjs`

### 关于文件名

如果只提供目录，不提供文件名，则自动寻找文件目录下的 `index.js`，转换为绝对路径进行加载。

`package.json`中的 `main` 字段表示包默认的入口。导入包时如果只提供了文件目录，则会使用 `main`后的入口文件补全入口（默认为 `index.js`），转换入口文件的绝对路径并进行加载。

## `module`对象

新建 `index.js`文件输出 `module`对象，导入到 `test.js`文件，在控制台使用node命令执行 `test.js`，返回：

```c++
Module {
  id: 'C:\\Users\\mlbzdx\\OneDrive\\Documents\\前端课程\\frontend-node\\1-3. Node的模块化细节\\test\\index.js',
  path: 'C:\\Users\\mlbzdx\\OneDrive\\Documents\\前端课程\\frontend-node\\1-3. Node的模块化细节\\test',
  exports: {},
  parent: Module {
    id: '.',
    path: 'C:\\Users\\mlbzdx\\OneDrive\\Documents\\前端课程\\frontend-node\\1-3. Node的模块化细节\\test',
    exports: {},
    parent: null,
    filename: 'C:\\Users\\mlbzdx\\OneDrive\\Documents\\前端课程\\frontend-node\\1-3. Node的模块化细节\\test\\test.js',
    loaded: false,
    children: [ [Circular] ],
    paths: [
      'C:\\Users\\mlbzdx\\OneDrive\\Documents\\前端课程\\frontend-node\\1-3. Node的模块化细节\\test\\node_modules',
      'C:\\Users\\mlbzdx\\OneDrive\\Documents\\前端课程\\frontend-node\\1-3. Node的模块化细节\\node_modules',
      'C:\\Users\\mlbzdx\\OneDrive\\Documents\\前端课程\\frontend-node\\node_modules',
      'C:\\Users\\mlbzdx\\OneDrive\\Documents\\前端课程\\node_modules',
      'C:\\Users\\mlbzdx\\OneDrive\\Documents\\node_modules',
      'C:\\Users\\mlbzdx\\OneDrive\\node_modules',
      'C:\\Users\\mlbzdx\\node_modules',
      'C:\\Users\\node_modules',
      'C:\\node_modules'
    ]
  },
  filename: 'C:\\Users\\mlbzdx\\OneDrive\\Documents\\前端课程\\frontend-node\\1-3. Node的模块化细节\\test\\index.js',
  loaded: false,
  children: [],
  paths: [
    'C:\\Users\\mlbzdx\\OneDrive\\Documents\\前端课程\\frontend-node\\1-3. Node的模块化细节\\test\\node_modules',
    'C:\\Users\\mlbzdx\\OneDrive\\Documents\\前端课程\\frontend-node\\1-3. Node的模块化细节\\node_modules',
    'C:\\Users\\mlbzdx\\OneDrive\\Documents\\前端课程\\frontend-node\\node_modules',
    'C:\\Users\\mlbzdx\\OneDrive\\Documents\\前端课程\\node_modules',
    'C:\\Users\\mlbzdx\\OneDrive\\Documents\\node_modules',
    'C:\\Users\\mlbzdx\\OneDrive\\node_modules',
    'C:\\Users\\mlbzdx\\node_modules',
    'C:\\Users\\node_modules',
    'C:\\node_modules'
  ]
}
```

* id,运行模块文件的绝对路径，如果是入口文件导入，那么id为 `.`。
* path,运行模块文件所在的文件目录
* exports，导出的内容
* parent，导入的父模块 `index.js`模块信息。入口模块id设置为 `.`。
* `loaded`,模块是否以及加载完成。
* children，导出的子模块
* paths,逐层查找文件的目录层级数组。

## `require` 函数

新建 `index.js`文件输出 `require函数`，导入到 `test.js`文件，在控制台使用node命令执行 `test.js`，返回：

```c++
[Function: require] {
  resolve: [Function: resolve] { paths: [Function: paths] },
  main: Module {
    id: '.',
    path: 'C:\\Users\\mlbzdx\\OneDrive\\Documents\\前端课程\\frontend-node\\1-3. Node的模块化细节\\test',
    exports: {},
    parent: null,
    filename: 'C:\\Users\\mlbzdx\\OneDrive\\Documents\\前端课程\\frontend-node\\1-3. Node的模块化细节\\test\\test.js',
    loaded: false,
    children: [ [Module] ],
    paths: [
      'C:\\Users\\mlbzdx\\OneDrive\\Documents\\前端课程\\frontend-node\\1-3. Node的模块化细节\\test\\node_modules',
      'C:\\Users\\mlbzdx\\OneDrive\\Documents\\前端课程\\frontend-node\\1-3. Node的模块化细节\\node_modules',
      'C:\\Users\\mlbzdx\\OneDrive\\Documents\\前端课程\\frontend-node\\node_modules',
      'C:\\Users\\mlbzdx\\OneDrive\\Documents\\前端课程\\node_modules',
      'C:\\Users\\mlbzdx\\OneDrive\\Documents\\node_modules',
      'C:\\Users\\mlbzdx\\OneDrive\\node_modules',
      'C:\\Users\\mlbzdx\\node_modules',
      'C:\\Users\\node_modules',
      'C:\\node_modules'
    ]
  },
  extensions: [Object: null prototype] {
    '.js': [Function],
    '.json': [Function],
    '.node': [Function]
  },
  cache: [Object: null prototype] {
    'C:\\Users\\mlbzdx\\OneDrive\\Documents\\前端课程\\frontend-node\\1-3. Node的模块化细节\\test\\test.js': Module {
      id: '.',
      path: 'C:\\Users\\mlbzdx\\OneDrive\\Documents\\前端课程\\frontend-node\\1-3. Node的模块化细节\\test',
      exports: {},
      parent: null,
      filename: 'C:\\Users\\mlbzdx\\OneDrive\\Documents\\前端课程\\frontend-node\\1-3. Node的模块化细节\\test\\test.js',
      loaded: false,
      children: [Array],
      paths: [Array]
    },
    'C:\\Users\\mlbzdx\\OneDrive\\Documents\\前端课程\\frontend-node\\1-3. Node的模块化细节\\test\\index.js': Module {
      id: 'C:\\Users\\mlbzdx\\OneDrive\\Documents\\前端课程\\frontend-node\\1-3. Node的模块化细节\\test\\index.js',
      path: 'C:\\Users\\mlbzdx\\OneDrive\\Documents\\前端课程\\frontend-node\\1-3. Node的模块化细节\\test',
      exports: {},
      parent: [Module],
      filename: 'C:\\Users\\mlbzdx\\OneDrive\\Documents\\前端课程\\frontend-node\\1-3. Node的模块化细节\\test\\index.js',
      loaded: false,
      children: [],
      paths: [Array]
    }
  }
}
```

* resolve函数，只负责将相对路径转换为绝对路径。
* main,后面为入口模块的信息
* extensions,扩展名的处理函数
* cache,目前以及缓存的模块，绝对路径作为每个模块的属性名。

## 模块化实现原理

模拟模块化实现函数(伪)：

```js
function require(modulePath) {
  // 1.将模块路径转换为绝对路径 modulePath =>  moduleAbsolutePath
  const moduleAbsolutePath = resolve(modulePath);
  // 2.判断该模块是否已有缓存
  if (require.cache[moduleAbsolutePath]) {
    return require.cache["moduleAbsolutePath"].result;
  }
  require.cache = {};
  // 3.读取文件内容
  // 4.将文件内容包裹到一个函数中
  function __temp(module, exports, require, __dirname, __filename) {
    console.log("当前运行模块 文件路径", __dirname);
    console.log("当前运行模块 文件目录路径", __filename);
    exports.c = 3;
    module.exports = {
      a: 1,
      b: 2,
    };
    this.m = 5;
  }
  // 6.创建module对象
  module.exports = {};
  const exports = module.exports;
  __temp.call(
    module.exports,
    module,
    exports,
    require,
    module.path,
    __dirname,
    __filename
  );
  return module.exports;
}

```

### `node.js`中this的指向问题

由此可知，在`module.exports`没有被重新赋值时，`this === module.export === exports` 。 而在 重新赋值后，`module.exports` 被赋值了一个新对象,而this和exports仍指向原对象的存储地址, `this === exports` ，这时，通过exports导出的内容会无效，返回`undefinded` 。

