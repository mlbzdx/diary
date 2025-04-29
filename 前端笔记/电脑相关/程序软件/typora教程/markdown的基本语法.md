---
title: Hello World
date: 2013/7/13 20:46:25
---

Front-matter 是文件最上方以 `---` 分隔的区域，用于指定个别文件的变量，举例来说：

```yaml
---
title: Hello World
date: 2013/7/13 20:46:25
---
```



> 中文的官方教程可以参考这个网址：https://typorachina.com 



# 标题

## 各级标题

**效果演示：** （ `typora` 文档中一共有6种标题）

> # 一级标题
>
> ## 二级标题
>
> ### 三级标题
>
> #### 四级标题
>
> ##### 五级标题
>
> ###### 六级标题

**markdown语法：**

`# + 空格 + 一级标题` 

`# + 空格 + 二级标题` 

`# + 空格 + 三级级标题` 

`# + 空格 + 四级标题` 

`# + 空格 + 五级标题` 

`# + 空格 + 六级标题` 

**默认快捷键：**

`ctrl + 1` 一级标题

`ctrl + 2` 二级标题

`ctrl + 3` 三级标题

`ctrl + 4` 四级标题

`ctrl + 5` 五级标题

`ctrl + 6` 六级标题

## 标题的自动编号

这种方法会自动为你文章中的所有标题添加编号，像这样： ![img](https://imagedelivery.net/8B08sdLvw783CQcaKhUoYw/f63c94aa-3139-4f10-b171-12d6c7a51200/public)

为了实现这一点，在你的主题文件夹中的 base.user.css 或 [theme].user.css 中添加以下内容。

```css
/** initialize css counter */
#write {
    counter-reset: h1
}

h1 {
    counter-reset: h2
}

h2 {
    counter-reset: h3
}

h3 {
    counter-reset: h4
}

h4 {
    counter-reset: h5
}

h5 {
    counter-reset: h6
}

/** put counter result into headings */
#write h1:before {
    counter-increment: h1;
    content: counter(h1) ". "
}

#write h2:before {
    counter-increment: h2;
    content: counter(h1) "." counter(h2) ". "
}

#write h3:before,
h3.md-focus.md-heading:before /** override the default style for focused headings */ {
    counter-increment: h3;
    content: counter(h1) "." counter(h2) "." counter(h3) ". "
}

#write h4:before,
h4.md-focus.md-heading:before {
    counter-increment: h4;
    content: counter(h1) "." counter(h2) "." counter(h3) "." counter(h4) ". "
}

#write h5:before,
h5.md-focus.md-heading:before {
    counter-increment: h5;
    content: counter(h1) "." counter(h2) "." counter(h3) "." counter(h4) "." counter(h5) ". "
}

#write h6:before,
h6.md-focus.md-heading:before {
    counter-increment: h6;
    content: counter(h1) "." counter(h2) "." counter(h3) "." counter(h4) "." counter(h5) "." counter(h6) ". "
}

/** override the default style for focused headings */
#write>h3.md-focus:before,
#write>h4.md-focus:before,
#write>h5.md-focus:before,
#write>h6.md-focus:before,
h3.md-focus:before,
h4.md-focus:before,
h5.md-focus:before,
h6.md-focus:before {
    color: inherit;
    border: inherit;
    border-radius: inherit;
    position: inherit;
    left:initial;
    float: none;
    top:initial;
    font-size: inherit;
    padding-left: inherit;
    padding-right: inherit;
    vertical-align: inherit;
    font-weight: inherit;
    line-height: inherit;
}
```

# 引用

**效果演示：**

>引用
>
>> 嵌套引用
>>
>> > 嵌套引用

**markdown语法：**

`> + 空格键`

**默认快捷键：**

`ctrl + shift + Q`

注意快捷键只能进行一层引用，不能够进行嵌套引用。

# 列表

## 无序列表

**效果演示：**

* 清单1
* 清单2
* 清单3

**markdown语法：**

`* + 空格键`，其中的`*`这个符号也可以有`+`或`-`替换，效果一样。

**默认快捷键：**

`ctrl + shift + ]`

## 有序列表

**效果演示：**

1. 清单1
2. 清单2
3. 清单3

**markdown语法：**

`1 + 空格键`，生成有序列表1

`2 + 空格键`，生成有序列表2

…

**默认快捷键：**

`ctrl + shift + [`

## 任务列表

**效果演示：**

- [x] 任务1
- [ ] 任务2

**markdown语法：**

`- + 空格键 + [x]`，生成已完成的任务

`- + 空格键 + [ + 空格键 + ]`，生成未完成的任务

**默认快捷键：**

`ctrl + shift + x`

# 代码块

**效果演示：**

```h
这里面书写代码
```

**markdown语法：**

```` + 回车键（enter） `

**默认快捷键：**

`ctrl + shifr + K`

# 表格

**效果演示：**

|      |      |      |
| ---- | ---- | ---- |
|      |      |      |
|      |      |      |
|      |      |      |

**markdown语法：**

Typora 通过一个图形界面来支持，或者直接写源代码。

输入 `| First Header | Second Header |` 并按 `return` 键。这将创建一个有两列的表格。

在创建了一个表格后，将焦点放在该表格上，将打开该表格的工具栏，你可以调整大小、对齐或删除该表格。你还可以使用上下文菜单来复制和添加/删除个别列/行。

下面介绍了表格的完整语法，但没有必要详细了解完整的语法，因为表格的 markdown 源代码是由 Typora 自动生成的。

在 markdown 源代码中，它们看起来像。

```text
| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |
```

你也可以在表格中包括内联的 Markdown，如链接、粗体、斜体或删除线。

通过在标题行内包含冒号 ( `:`)，你可以将该列中的文本设置为左对齐、右对齐或居中对齐。

```text
| Left-Aligned  | Center Aligned  | Right Aligned |
| :------------ |:---------------:| -----:|
| col 3 is      | some wordy text | $1600 |
| col 2 is      | centered        |   $12 |
| zebra stripes | are neat        |    $1 |
```

最左边的冒号表示左对齐的列；最右边的冒号表示右对齐的列；两边的冒号表示中间对齐的列。

**默认快捷键：**

`ctrl + T` : 插入表格

`ctrl + 回车键(enter)`:在下方插入行 ：

`alt + 上下左右随机一个箭头`：调整行或列的位置

# 脚注

**效果演示;**

这里有一个脚注[^脚注1]。

[^脚注1]:脚注1提示内容。

**markdown语法：**

`[^脚注名]` 添加脚注

`[^脚注名]:脚注内容 `

# 分割线

**效果演示：**

***

**markdown语法：**

`*** + 空格键` 或`–- + 空格键`

# 目录

**效果演示：**

[toc]

**markdown语法：**

`[toc] + 回车键（enter）`

# 链接

## 通用链接格式

**效果演示：**

[百度](https://www.baidu.com)

**markdown语法：**

`[你想添加链接的文本](链接)`

**默认快捷键：**

`剪切板链接 + ctrl + k`

## 跳转到文档内部大纲目录任意标题处

**效果演示：**

[点击此处跳转到目录](#目录)

**markdown语法：**

``[你想添加链接的文本](#你想链接的大纲标题)``

# 图片

**效果演示：**

![图片](https://imagedelivery.net/8B08sdLvw783CQcaKhUoYw/96ee0f83-9524-4280-f149-b911f7ca9d00/public)

**markdown语法：**

`![图片介绍，可以省略不写](图片网页链接或者本地图片地址路径)`

**默认快捷键：**

`剪切板图片链接 + ctrl + shift + i`

或者直接鼠标拖入。

# 文字加粗/斜体/高亮/删除线/内嵌代码

## 文字加粗

**效果演示：**

**加粗**

**markdown语法:**

`** 加粗文字 **`

**默认快捷键：**

`选中加粗文字+ ctrl + B`

## 斜体

**效果演示：**

*斜体*

**markdown语法:**

`* 斜体文字 *`

**默认快捷键：**

`选中斜体文字+ ctrl + I`

## 高亮

**效果演示：**

==高亮==

**markdown语法:**

要使用这个功能，请先在偏好设置的 `Markdown` 标签中启用它

`==高亮文字==`

## 删除线

**效果演示：**

~~删除线~~

**markdown语法:**

`~~删除线贯穿文字 ~~`

**默认快捷键：**

`选中删除线贯穿文字 + alt + shift + 5`

## 内嵌代码

**效果演示：**

`console.log(1)`

**markdown语法:**

\` + 内嵌代码 + \`

**默认快捷键：**

ctrl + shift + \`

# 上标和下标

## 下标 

**效果演示：**

CO~2~

**markdown语法：**

要使用这个功能，请先在偏好设置的 `Markdown` 标签中启用它。然后，使用 `~` 来包装下标内容。例如。`H~2~O`, `X~long\ text~`/

## 上标

**效果演示：**

2^2^=4

**markdown语法：**

要使用这个功能，请先在偏好设置的 `Markdown` 标签中启用它。然后，使用 `^` 来包装上标内容。例如：`X^2^`。

# 嵌入视频、音频和网络内容

## 视频

你可以像这样嵌入一个视频。一般嵌入本地视频，因此只能在本机打开。将视频存储到阿里云或者腾讯云后，可以引入存放后的链接地址，这样就可以在其他平台打开了。或者上传到b站等平台，利用下面的iframe嵌入网络内容进行播放。

```markdown
<video src="xxx.mp4" />
```

或者将视频文件拖放到 Typora 中，Typora 会自动插入视频。

`Video` 的路径遵循图像的相同规则。因此，选项 "尽可能使用相对路径"，以及 "图像根路径 "也适用于 `<video>` 内容。

## 音频 

与 `<video>` 相同，你可以使用 `<audio>` 标签来嵌入一个音频。

```text
<audio src="xxx.mp3" />
```

## 嵌入网络内容

有些网站允许你把他们的内容嵌入到其他网页中，其中大部分网站支持 `<iframe>`，Typora 也支持。你是否可以按照他们的 "分享 "页面/对话框，将他们的代码粘贴到 Typora 中，例如b站网页点击分享按钮会有嵌入代码的选项，点击复制即可，如下图所示。

```html
<iframe src="//player.bilibili.com/player.html?aid=648248838&bvid=BV1Pe4y137Ri&cid=907260665&page=1&autopaly=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="width:100%;height:60vh;"> </iframe>
```



<iframe src="//player.bilibili.com/player.html?aid=648248838&bvid=BV1Pe4y137Ri&cid=907260665&page=1&autoplay=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="width:100%;height:60vh;"> </iframe>

