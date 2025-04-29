# typora常用快捷键

## 常用快捷键

### 文件

> 新建 Ctrl+N
> 新建窗口 Ctrl+Shift+N
> 打开 Ctrl+O
> 快速打开 Ctrl+P
> 重新打开关闭的文件 Ctrl+Shift+T
> 保存 Ctrl+S
> 另存为/复制 Ctrl+Shift+S
> 关闭 Ctrl+W

### 编辑

> **==新段落输入输入==**
> 换行Shift+Enter
> 剪切Ctrl+X
> 复制Ctrl+C
> 粘贴Ctrl+V
> 复制为标记Ctrl+Shift+C
> 粘贴为纯文本Ctrl+Shift+V
> 全选Ctrl+A
> **==选择行/句子==**
> 选择行（在表中）Ctrl+L
> 删除行（表中）Ctrl+Shift+Backspace
> ==**选择样式范围**==
> 选择单元格（在表中）Ctrl+E
> 选择单词 Ctrl+D
> 删除单词 Ctrl+Shift+D
> 跳转到顶部 Ctrl+Home
> 跳转到所选内容 Ctrl+J
> 跳到按钮 Ctrl+End
> 查找 Ctrl+F
> 查找下一个 F3/输入
> 查找上一个 Shift+F3/Shift+Enter
> 替换 Ctrl+H

### 功能

> 标题1到6 Ctrl+1/2/3/4/5/6
> 段落 Ctrl+0
> 增加标题级别 Ctrl+=
> 降低标题级别 Ctrl+-
> 表格 Ctrl+T
> 代码块 Ctrl+Shift+K
> 数学块 Ctrl+Shift+M
> 引用 Ctrl+Shift+Q 【可自定义样式】
> 有序列表 Ctrl+Shift+[
> 无序列表 Ctrl+Shift+]
> 缩进 Ctrl+[/Tab
> 升级 Ctrl+]/Shift+Tab
> 加粗 Ctrl+B
> 斜体 Ctrl+I
> 下划线 Ctrl+U
> 代码 Ctrl+Shift+`
> 删除线 Alt+Shift+5
> 超链接 Ctrl+K
> 图像 Ctrl+Shift+I
> 清除格式 Ctrl+\

### 视图

> 切换侧栏 Ctrl+Shift+L
> 大纲 Ctrl+Shift+1
> 文章 Ctrl+Shift+2
> 文件树 Ctrl+Shift+3
> 源代码模式 Ctrl+/
> 对焦模式 F8
> 打字机模式 F9
> 切换器全屏 F11
> 实际大小 Ctrl+Shift+0
> 放大 Ctrl+Shift+=
> 缩小 Ctrl+Shift+-
> 在打开的文档之间切换 Ctrl+Tab
> 切换开发工具 Ctrl+Shift+I

## Typora快键键修改

### 修改过程

在Typora菜单栏中，通过

1. 文件–>偏好设置–>打开高级设置

2. 在打开的文件夹中找到conf.user.json文件

3. 在该文件中，通过增加或者修改KeyBeing中的键值对，重新设置快捷键

4. 例如：

   ```json
    "keyBinding": {
       // for example: 
       // "Always on Top": "Ctrl+Shift+P"
       "Always on Top": "Ctrl+Shift+P",  
       "Code Fences": "Ctrl+Shift+F",  
       "Ordered List":"Ctrl+Alt+o",  
       "Unordered List": "Ctrl+Alt+u"  
     },
   //关于快捷键对应的英文名词可以将typora系统语言改为英文后，再在相应的菜单栏查看即可。
   ```

重启Typora软件即可生效

------------------------------------------------
![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL1l1a2lMeC9NeVBpY3R1cmVCZWQvbWFzdGVyL2ltZy9UeXBvcmElRTUlQkYlQUIlRTklOTQlQUUlRTklOTQlQUUxLmJtcA?x-oss-process=image/format,png)

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL1l1a2lMeC9NeVBpY3R1cmVCZWQvbWFzdGVyL2ltZy9UeXBvcmElRTUlQkYlQUIlRTklOTQlQUUlRTklOTQlQUUyLmJtcA?x-oss-process=image/format,png)

### 自定义快捷键

| 打开侧边栏 | `Ctrl + L`     |
| ---------- | -------------- |
| 代码块     | `Ctrl+Shfit+.` |

