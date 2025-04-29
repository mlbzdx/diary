# `mockjs`

[TOC]



> mockjs的官方文档 ： https://github.com/nuysoft/Mock/wiki
>
> 将数字转化为汉字的包：https://www.cnblogs.com/liquanjiang/p/8655075.html

## 安装mockjs

```powershell
npm install mockjs
```

## 导入 mockjs

```js
import Mock from 'mockjs';
```

`mockjs`依赖包的作用包括：

* 拦截Ajaxs请求
* 模拟生成虚拟数据

## mockjs简介

```js
console.log(typeof Mock); //object
```

```js
console.log(Mock);
```

![image-20230511210903535](https://s1.vika.cn/space/2023/05/15/01a7fc2e06cb480b9787d7da522a614d)

导入的Mock从类型上来看是一个对象，里面提供了各种属性和方法，用来拦截请求或者生成各种虚拟数据。

在Mock对象中，最重要的是mock方法，该方法可以传入一个符合语法规范的数据对象，该数据对象经该方法编译后会返回一个的虚假模拟数据。

在`Mock.mock()`方法中传入的数据对象需要符合语法规范，而这里的语法规范分为两种，数据模板规范（DTD）和数据占位符规范（DPD）。

## mock方法

mockjs的拦截请求和编译返回模拟数据主要通过该方法完成。

包括了三个部分参数，请求url地址，请求方法类型，数据模板对象或者返回数据模板对象的函数。

```js
Mock.mock( rurl?, rtype?, template|function( options ) )
//rul 拦截的Ajaxs请求url地址
//rtype 拦截的Ajaxs请求类型
//tempalte 数据模板对象
//function(options) 返回数据模板对象的函数，可以传入参数options
//options 该参数接收了拦截的相关请求信息，封装成了对象，包括了:
//url(请求的url地址)，type(请求方法类型)，body(请求体)三个属性。
```

## 语法规范

### 数据模板规范

#### 模板规范

传入`Mock.mock`方法中的是一个数据模板对象或返回数据模板对象的函数，这里面的数据模板对象要符合数据模板规范。

**数据模板中的每个属性由 3 部分构成：属性名、生成规则、属性值：**

```js
// 属性名   name
// 生成规则 rule
// 属性值   value
'name|rule': value
```

* 属性名与生成规则共同组成对象的属性名，两者之间通过`|`隔开。
* 规则只会在数据模板中存在，经编译后生成的虚假数据中不会显示规则。
* 规则的格式以及规则后的数据类型共同决定了规则的含义。

#### 规则含义

1. ##### 规则`min-max`

* 属性值为字符串时。表示重复字符串随机次数生成一个新字符串，随机次数大于min,小于max。
* 属性值为数字时。表示生成一个大于等于 `min`、小于等于 `max` 的整数。
* 属性值为布尔值时。随机生成一个布尔值，值为 `value` 的概率是 `min / (min + max)`，值为 `!value` 的概率是 `max / (min + max)`。
* 属性值为对象时。从对象的属性值中随机选取 `min` 到 `max` 个属性。
* 属性值为数组时。通过重复数组的属性值生成一个新数组，重复次数大于等于 `min`，小于等于 `max`。

2. ##### 规则`count`

* 属性值为字符串时。表示重复字符串生成固定次数为count次的新字符串。
* 属性值为布尔值且count=1时。随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率同样是 1/2。
* 属性值为对象时。从对象中随机选取 `count` 个属性。
* 属性值为数组
  * 且count = 1时，从数组中随机选取 1 个元素，作为最终值。
  * 其他情况，通过数组属性值生成一个新数组，重复次数为 `count`。

3. ##### 规则`name|min-max.dmin-dmax`

* 属性值一般为数字。表示生成一个整数位数在[min,max]范围内,小数位数在[dmin-dmax]范围内的一个随机浮点数。

4. ##### 规则`name|min-max.dcount`

* 属性值一般为数字。表示生成一个整数位数在[min,max]范围内，小数位数为dcount位的随机浮点数。

5. ##### 规则`name|count.dmin-dmax`

* 属性值一般为数字。表示生成一个整数位数为count位，小数位数在[dmin-dmax]范围内的随机浮点数。

6. ##### 规则`name|count.dcount`

* 属性值一般为数字。表示生成一个整数位为count位，小数位数为dcount位的随机小数。

7. ##### 规则`name|+step`

* 属性值为数字，step = 1 时，通常表示从规则后面的属性值开始自增，每次增加的量为`step`。
* 属性值为数组时，step = 1 时，从数组中顺序选取一个元素，作为最终值。

### 数据占位符规范

*占位符* 只是在属性值字符串中占个位置，并不出现在最终的属性值中。

*占位符* 的格式为：

```js
@占位符
@占位符(参数 [, 参数])
```

## setup方法

目前常用于设置拦截Ajaxs请求后数据的响应时间。

```js
Mock.setup( settings )
// settings 为一个对象，对象中目前常见配置属性为timeout,设置拦截Ajaxs请求后数据的响应时间
```

## Random方法

Mock.Random 是一个工具类，用于生成各种随机数据。

通俗来说Mock.Random是一个对象，提供了能生成各种数据的静态方法。

**Mock.Random 的方法在数据模板中称为『占位符』，书写格式为 `@占位符(参数 [, 参数])` 。**

该方法可以直接作为Mock.Random的静态方法调用，在数据模板中可以简写为`@占位符`的形式调用。

### 调用方法

```javascript
var Random = Mock.Random
Random.email()
// => "n.clark@miller.io"
Mock.mock('@email')
// => "y.lee@lewis.org"
Mock.mock( { email: '@email' } )
// => { email: "v.lewis@hall.gov" }
```



### 占位符分类以及具体方法

Mock.Random 提供的完整方法（占位符）如下：

| Type          | Method                                                       |
| ------------- | ------------------------------------------------------------ |
| Basic         | boolean, natural, integer, float, character, string, range, date, time, datetime, now |
| Image         | image, dataImage                                             |
| Color         | color                                                        |
| Text          | paragraph, sentence, word, title, cparagraph, csentence, cword, ctitle |
| Name          | first, last, name, cfirst, clast, cname                      |
| Web           | url, domain, email, ip, tld                                  |
| Address       | area, region                                                 |
| Helper        | capitalize, upper, lower, pick, shuffle                      |
| Miscellaneous | guid, id                                                     |

## 常用占位符

### 时间

> 相关参数

#### 参数：format

| Format | Description                                              | Example      |
| ------ | -------------------------------------------------------- | ------------ |
| yyyy   | A full numeric representation of a year, 4 digits        | 1999 or 2003 |
| yy     | A two digit representation of a year                     | 99 or 03     |
| y      | A two digit representation of a year                     | 99 or 03     |
| MM     | Numeric representation of a month, with leading zeros    | 01 to 12     |
| M      | Numeric representation of a month, without leading zeros | 1 to 12      |
| dd     | Day of the month, 2 digits with leading zeros            | 01 to 31     |
| d      | Day of the month without leading zeros                   | 1 to 31      |
| HH     | 24-hour format of an hour with leading zeros             | 00 to 23     |
| H      | 24-hour format of an hour without leading zeros          | 0 to 23      |
| hh     | 12-hour format of an hour without leading zeros          | 1 to 12      |
| h      | 12-hour format of an hour with leading zeros             | 01 to 12     |
| mm     | Minutes, with leading zeros                              | 00 to 59     |
| m      | Minutes, without leading zeros                           | 0 to 59      |
| ss     | Seconds, with leading zeros                              | 00 to 59     |
| s      | Seconds, without leading zeros                           | 0 to 59      |
| SS     | Milliseconds, with leading zeros                         | 000 to 999   |
| S      | Milliseconds, without leading zeros                      | 0 to 999     |
| A      | Uppercase Ante meridiem and Post meridiem                | AM or PM     |
| a      | Lowercase Ante meridiem and Post meridiem                | am or pm     |
| T      | Milliseconds, since 1970-1-1 00:00:00 UTC                | 759883437303 |

#### 参数：unit

表示时间单位，用于对当前日期和时间进行格式化。可选值有：`year`、`month`、`week`、`day`、`hour`、`minute`、`second`、`week`，默认不会格式化。

> 方法

#### 1. `Random.date(format？)`

##### 效果：

返回一个随机的日期字符串，默认格式为 `yyyy-MM-dd`。

##### 实例：

```js
console.log(Mock.mock('@date()'));
// 1996-06-25 默认
console.log(Mock.mock('@date(yyyy年MM月dd日)'));
// 2009年09月24
```

#### 2. `Random.time(format？)`

##### 效果：

返回一个随机的时间字符串，默认格式为 `HH:mm:ss`。

##### 实例：

```js
console.log(Mock.mock('@time()'));
// 21:53:10 默认
console.log(Mock.mock('@time(HH时mm分ss秒)'));
// 13时29分35秒     24进制
console.log(Mock.mock('@time(A: hh时mm分ss秒)'));
// AM: 04时49分45秒 12进制
```

#### 3. `Random.datetime(format？)`

##### 效果：

返回一个随机的日期和时间字符串，默认格式为`yyyy-MM-dd HH:mm:ss`。

```js
console.log(Mock.mock('@datetime()'));
// 1996-01-13 19:06:42
console.log(Mock.mock('@datetime(yyyy年MM月dd日 A: hh时mm分ss秒)'));
// 2005年12月22日 PM: 08时36分31秒
```

#### 4. `Random.now(unit?,format？)`

##### 效果：

返回当前的日期和时间字符串，默认格式为 `yyyy-MM-dd HH:mm:ss`。

##### 实例：

```js
Random.now('year')
// => "2014-01-01 00:00:00"
Random.now('month')
// => "2014-04-01 00:00:00"
Random.now('week')
// => "2014-04-27 00:00:00"
Random.now('day')
// => "2014-04-29 00:00:00"
Random.now('hour')
// => "2014-04-29 20:00:00"
Random.now('minute')
// => "2014-04-29 20:08:00"
Random.now('second')
// => "2014-04-29 20:08:38"

console.log(Mock.mock('@now()'));
// 2023-05-13 15:57:34
console.log(Mock.mock('@now(yyyy年MM月dd日 A: hh时mm分ss秒)'));
// 2023年05月13日 PM: 03时58分26秒
```

### 图片

> 参数

#### size

指示图片的宽高，格式为 `'宽x高'`。默认从下面的数组中随机读取一个：

```
[
    '300x250', '250x250', '240x400', '336x280', 
    '180x150', '720x300', '468x60', '234x60', 
    '88x31', '120x90', '120x60', '120x240', 
    '125x125', '728x90', '160x600', '120x600', 
    '300x600'
]
```

#### background

指示图片的背景色。默认值为 `'#000000'`。

#### foreground

指示图片的前景色（文字）。默认值为 `'#FFFFFF'`。

#### format

指示图片的格式。默认值为 `'png'`，可选值包括：`'png'`、`'gif'`、`'jpg'`。

#### text

指示图片上的文字。默认值为参数 size。

```js
Random.image()
// => "http://dummyimage.com/125x125"
Random.image('200x100')
// => "http://dummyimage.com/200x100"
Random.image('200x100', '#fb0a2a')
// => "http://dummyimage.com/200x100/fb0a2a"
Random.image('200x100', '#02adea', 'Hello')
// => "http://dummyimage.com/200x100/02adea&text=Hello"
Random.image('200x100', '#00405d', '#FFF', 'Mock.js')
// => "http://dummyimage.com/200x100/00405d/FFF&text=Mock.js"
Random.image('200x100', '#ffcc33', '#FFF', 'png', '!')
// => "http://dummyimage.com/200x100/ffcc33/FFF.png&text=!"
```

> 方法

#### Random.image( size?, background?, foreground?, format?, text? )

生成一个随机的图片地址。

#### Random.dataImage( size?, text? )

生成一段随机的 Base64 图片编码。
