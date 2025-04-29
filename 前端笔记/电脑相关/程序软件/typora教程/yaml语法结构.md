作者：程序员小光
链接：https://zhuanlan.zhihu.com/p/502212347
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



本文主要讲解`yaml`语言的基本用法、特性、以及相关语法

### **`yaml`是什么**

`yaml`是专门用来写配置文件的一种非标记语言，其文件通常以`.yml`后缀结尾

### **`yaml`的特性**

- 大小写敏感
- 使用缩进表示层级关系
- 缩进时不允许使用Tab键，只允许使用空格
- 缩进的空格数目不重要，只要相同层级的元素左侧对齐即可

### **如何注释**

开头加`#`，和`python`的单行注释方法一致

### **`yaml`的数据结构**

- 对象（键值对）
- 数组
- 标量

### **`yaml`对象语法**

- 写法一

```yaml
 user: 张三
```

- 写法二（所有键值对写进一个对象）

```yaml
 info: {user: 张三, age: 24}
```

### **`yaml`数组语法**

- 写法一

```text
 - 张三
 - 24
 - 男
```

- 写法二

```yaml
 info: [张三, 24, 男]
```

### **`yaml`标量**

- 整数

```yaml
 number: 23
```

- 浮点数

```text
 float: 23.5
```

- 布尔值

```yaml
 flag: true / false
```

- Null

```yaml
 isRight: `
```

- 时间（`ISO86o1`格式）

```yaml
 time: 2022-12-14t21:59:43.10-05:00
```

- 日期

```yaml
 date: 2022-03-27
```

- 字符串

```yaml
 name: 张三
 # 字符串中有空格或特殊字符，则需要加引号。其中双引号不会转义特殊字符
 motto: '走别人的路， 让别人无路可走'
```

### **`yaml`引用**

锚点`&`用来建立引用，`*`表示引用该锚点，`<<`表示合并到当前数据中

下面两个`demo`参考自 [阮一峰老师的博客](https://link.zhihu.com/?target=https%3A//www.ruanyifeng.com/blog/2016/07/yaml.html)

首先看第一个`demo`，`defaults`是一个包含两个键值对的对象，它的键值对分别为`adapter: postgres`、`host: localhost`。`&defaults`表示建立对象`defaults`的引用，引用名也叫`defaults`。

```yaml
 defaults: &defaults
   adapter:  postgres
   host:     localhost
 
 development:
   database: myapp_development
   <<: *defaults
 
 test:
   database: myapp_test
   <<: *defaults
```

`development`和`test`很明显也是两个对象，在它们第二个键值对的位置分别添加了`<<: *defaults`，这表示将`defaults`引用的对象解构出来，赋值给当前键值对。因此，上述代码块等价于：

```yaml
 defaults:
   adapter:  postgres
   host:     localhost
 
 development:
   database: myapp_development
   adapter:  postgres
   host:     localhost
 
 test:
   database: myapp_test
   adapter:  postgres
   host:     localhost
```

接下来看第二个`demo`，用到了数组以及引用的知识点。从整体来看，是一个数组。在第一个元素`Steve`位置添加了一个引用，引用名叫`showell`。第五个元素位置解构了该引用，因此，`Steve`合并到了第五个元素位置。

```yaml
 - &showell Steve 
 - Clark 
 - Brian 
 - Oren 
 - *showell 
```

故上述代码块也就等价于

```yaml
 [ 'Steve', 'Clark', 'Brian', 'Oren', 'Steve' ]
```