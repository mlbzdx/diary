# 搭建vue工程

搭建vue工程一般需要接着vue-cli脚手架工具，它提供了搭建工程的快捷命令，减少开发时态中遇到的兼容性等难题。

## 1. 安装[Vue CLI](https://cli.vuejs.org/zh/)

> [Vue CLI](https://cli.vuejs.org/zh/)官网：https://cli.vuejs.org/zh/

```
安装：
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```



## 2. 使用Vue CLI搭建vue工程

```powershell
vue create my-project #创建一个vue工程。
# OR
vue ui #会在浏览器中打开一个图形化界面协助创建vue工程
```

### 使用vue create指令搭建工程：

1.首先执行命令：

<img src="https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230731204514613.png" alt="image-20230731204514613"  />

我们正在学习vue 2，但我们并不需要默认的所有配置，因此推荐自己进行配置，顺便认识有哪些配置选项。

上下键进行切换选项，enter键进行确认，选择手动配置选项。

2.进行基本配置，上下键切换选项，空格键进行选择或取消，a键进行全部选择或全部取消，i键对所选选项进行反向选择，enter键确定所选选择，进入下一步。

![image-20230731205709367](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230731205709367.png)

3.选择安装的vue版本

![image-20230731210504867](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230731210504867.png)

这里我们选择学习vue 2，对其进行安装。

4.选择安装的css编译语言，这里选择学过的less

![image-20230731210657321](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230731210657321.png)

5.这里询问是否对工程的配置文件进行单独存放

![image-20230731210857059](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230731210857059.png)

6.是否保持之前的配置操作。

![image-20230731211223598](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230731211223598.png)

### 使用图像化ui界面创建vue项目工程：

![image-20230731212557219](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230731212557219.png)

执行命令后会打开一个本地网页，辅助创建vue工程。

![image-20230731212651867](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230731212651867.png)

根据新建中的引导创建项目即可，创建过程的内容选项与vue create指令的选项几乎完全一致，参考进行选择即可。

## 3.安装好后的文件目录结构

![image-20230731212321369](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230731212321369.png)