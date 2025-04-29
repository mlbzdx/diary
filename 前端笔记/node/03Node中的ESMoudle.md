目前,Node 中的ES 模块化仍然处于测试阶段

模块要么是 `commonjs`,要么是 `ES`,默认情况下是 `commonjs` 。

如何建立`ES`模块？

* `ES`模块，文件后缀名设置为 `.mjs`。
* 在 `package.json` 文件中，将 `type` 值设置为 `module `。整个工程文件都将转换为 `ESmodule`。

**重要**

在node 中 `ES` 和 `commonjs` 暂时不支持混用。