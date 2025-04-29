# git指令使用记录

## 1.新建仓库

![image-20230810181012961](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230810181012961.png)

初始化仓库成功后，test文件目录中会多出`.git`文件

![image-20230810181331386](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230810181331386.png)

![image-20230810181359408](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230810181359408.png)

## 2.配置仓库

![image-20230810181540010](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230810181540010.png)

## 3.增加删除文件

工作区新增了一个test.txt文件，当前文件未添加到暂存区，没有被跟踪。

![image-20230810181855975](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230810181855975.png)

使用`git add 文件` 命令进行跟踪并添加到暂存区后

![image-20230810182159400](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230810182159400.png)

使用`git rm --cached 文件`命令停止追踪指定文件，但该文件会保留在工作区

![image-20230810182749295](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230810182749295.png)

使用`git rm -f文件`命令删除工作区文件，并且将这次删除放入暂存区

![image-20230810184400771](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230810184400771.png)

直接删除后，将删除的变化提交到暂存区

![image-20230810184731962](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230810184731962.png)

## 4.代码提交

使用`git commit -m 提交信息`提交暂存区到工作区

![image-20230810185140424](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230810185140424.png)

使用`git commit 文件 -m 提交信息`，提交暂存区的指定文件到仓库区

![image-20230810185543770](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230810185543770.png)

使用`git commit -a -m 提交信息` 提交工作区自上次commit之后的变化，直接到仓库区

![image-20230810191016532](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230810191016532.png)

使用一次新的commit，替代上一次提交

使用`git commit --amend -m 提交信息`，如果代码没有任何新变化，则用来改写上一次commit的提交信息

![image-20230810191729628](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230810191729628.png)

使用`git commit --amend -m 文件` ，重做上一次commit，并包括指定文件的新变化

![image-20230810192300942](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230810192300942.png)

## 5.分支

#### 列出所有本地分支

![image-20230810192520423](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230810192520423.png)

目前只有默认的master分支

列出所有远程分支

#### 列出所有远程分支



列出所有本地分支和远程分支

$ git branch -a

#### 新建一个分支，但依然停留在当前分支

![image-20230810193348655](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230810193348655.png)

#### 新建一个分支，并切换到该分支

![image-20230810193551636](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230810193551636.png)

#### 新建一个分支，指向指定commit

![image-20230810194824610](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230810194824610.png)

#### 删除分支

![image-20230810195507814](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230810195507814.png)

## 8.远程仓库与远程同步

### 创建远程仓库

在了解之前，先注册github账号，由于你的本地Git仓库和github仓库之间的传输是通过SSH加密的，所以需要一点设置：
第一步：创建SSH Key。在用户主目录下，看看有没有.ssh目录，如果有，再看看这个目录下有没有id_rsa和id_rsa.pub这两个文件，如果有的话，直接跳过此如下命令，如果没有的话，打开命令行，输入如下命令：

```shell
ssh-keygen -t rsa –C “youremail@example.com”
```



 由于我本地此前运行过一次，所以本地有，如下所示：

![img](https://pic3.zhimg.com/80/v2-20d104a189e0c4c920498d62469c1552_720w.webp)



id_rsa是私钥，不能泄露出去，id_rsa.pub是公钥，可以放心地告诉任何人。

第二步：登录github,打开” settings”中的SSH Keys页面，然后点击“Add SSH Key”,填上任意title，在Key文本框里黏贴id_rsa.pub文件的内容。

![img](https://pic2.zhimg.com/80/v2-c7546a7705a83f46bd82c7b44ac38f55_720w.webp)



点击 Add Key，你就应该可以看到已经添加的key。

![img](https://pic2.zhimg.com/80/v2-eb37c4f1f9bff11c9306386018e89465_720w.webp)



如何添加远程库？
现在的情景是：我们已经在本地创建了一个Git仓库后，又想在github创建一个Git仓库，并且希望这两个仓库进行远程同步，这样github的仓库可以作为备份，又可以其他人通过该仓库来协作。

首先，登录github上，然后在右上角找到“create a new repo”创建一个新的仓库。如下：

![img](https://pic3.zhimg.com/80/v2-044b0f2143423da8ead81e8cdd93cf92_720w.webp)



在Repository name填入testgit，其他保持默认设置，点击“Create repository”按钮，就成功地创建了一个新的Git仓库：

![img](https://pic4.zhimg.com/80/v2-b5ea16049c9c69ff9fce3ed841605407_720w.webp)



目前，在GitHub上的这个testgit仓库还是空的，GitHub告诉我们，可以从这个仓库克隆出新的仓库，也可以把一个已有的本地仓库与之关联，然后，把本地仓库的内容推送到GitHub仓库。

```text
现在，我们根据GitHub的提示，在本地的testgit仓库下运行命令：
```

git remote add origin [https://github.com/tugenhua0707/testgit.git](https://link.zhihu.com/?target=https%3A//github.com/tugenhua0707/testgit.git)

所有的如下：

![img](https://pic3.zhimg.com/80/v2-c862a425b87eee36326e49e67397d292_720w.webp)



把本地库的内容推送到远程，使用 git push命令，实际上是把当前分支master推送到远程。

由于远程库是空的，我们第一次推送master分支时，加上了 –u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。推送成功后，可以立刻在github页面中看到远程库的内容已经和本地一模一样了，上面的要输入github的用户名和密码如下所示：

![](https://pic1.zhimg.com/v2-9ff3182d6256c26f94dff72e3d06ebbc_r.jpg)



从现在起，只要本地作了提交，就可以通过如下命令：

git push origin master

把本地master分支的最新修改推送到github上了，现在你就拥有了真正的分布式版本库了。
