# windows安装git

## git下载：

点击跳转下面链接，跳转到git下载安装页面：https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%AE%89%E8%A3%85-Git

该页面提供了linux,macos,windows三种不同操作系统的安装方式。这里我只有windows系统的电脑，linux，macos系统没有学习过,就以windows为例。

windows的安装官方也提供了三种安装途径：

* 来自官方版本，详情网址： https://git-scm.com/download/win（推荐）
* 来自社区的安装包，详情网址：https://community.chocolatey.org/packages/git（没尝试过）
* 来自官方的包括图形化和命令行的应用程序，详情地址：https://desktop.github.com/（可以安装试一试图形化ui，但熟悉git命令行也可不用）

## git安装时默认配置：

git程序安装时的默认配置参考文档：https://zhuanlan.zhihu.com/p/597447255#%E4%B8%8B%E8%BD%BDgit

## 配置windows环境变量（非必需）

这一步不是必须的，你也可以直接使用git安装好后提供的`git bash`命令控制台。

如果在安装时选择安装如下新功能

![image-20230808231800474](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230808231800474.png)

那么在windows的系统环境变量中会自动为你注入以下内容：

![image-20230808232019253](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230808232019253.png)

将电脑重启后即可在cmd和powershell控制台中使用git命令。

如果你的git在安装时一直使用默认的配置，那么在cmd和powershell控制台中输入git指令，会返回

![image-20230808225608359](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230808225608359.png)

那么则需要手动配置git在windows系统中的环境变量，才能在cmd和powershell制台使用。

1. 在windows自带的cortana中输入`环境变量`,点击打开控制台中的环境变量设置。

   ![image-20230808230106348](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230808230106348.png)

2. 点击编辑环境变量

   ![image-20230808230232198](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230808230232198.png)

3. 选择编辑系统环境变量或者用户环境变量

   ![image-20230808232755536](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230808232755536.png)

4. **用户环境变量配置：**

   新建后点击浏览文件，选择git安装目录下的bin文件夹后点击确定。

   ![image-20230808234036438](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230808234036438.png)

   也可直接在路径里输入git安装目录下的bin文件夹所在路径位置，一般为：C:\Program Files\Git\bin

   ![image-20230808234302896](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230808234302896.png)

   点击两次确定，用户的环境变量配置好了，重启电脑后生效，之后就可以在cmd和powershell控制台使用git命令了。

   **系统环境变量配置：**

   如上图，点击新建后，如图输入如下地址后点击确定：

   ![image-20230808234716539](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230808234716539.png)

   然后点击两次确定，重启电脑生效。

5. 生效后输入git指令有大量介绍命令返回即可，如图：

   ![image-20230808234932697](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20230808234932697.png)

# 认识git

## Git是什么？

> Git是目前世界上最先进的分布式版本控制系统。
> 工作原理 / 流程：
>
> ![img](https://pic2.zhimg.com/80/v2-3bc9d5f2c49a713c776e69676d7d56c5_720w.webp)
>
> Workspace：工作区
> Index / Stage：暂存区
> Repository：仓库区（或本地仓库）
> Remote：远程仓库
>
> 以上引用自知乎文章：https://zhuanlan.zhihu.com/p/30044692

## SVN与Git的最主要的区别？

> SVN是集中式版本控制系统，版本库是集中放在中央服务器的，而干活的时候，用的都是自己的电脑，所以首先要从中央服务器哪里得到最新的版本，然后干活，干完后，需要把自己做完的活推送到中央服务器。集中式版本控制系统是必须联网才能工作，如果在局域网还可以，带宽够大，速度够快，如果在互联网下，如果网速慢的话，就纳闷了。
>
> Git是分布式版本控制系统，那么它就没有中央服务器的，每个人的电脑就是一个完整的版本库，这样，工作的时候就不需要联网了，因为版本都是在自己的电脑上。既然每个人的电脑都有一个完整的版本库，那多个人如何协作呢？比如说自己在电脑上改了文件A，其他人也在电脑上改了文件A，这时，你们两之间只需把各自的修改推送给对方，就可以互相看到对方的修改了。
>
> 以上引用自知乎文章：https://zhuanlan.zhihu.com/p/30044692

#  [阮一峰](https://www.ruanyifeng.com/)老师的常用 Git 命令清单文章

## 一、新建代码库

> ```bash
> # 在当前目录新建一个Git代码库
> $ git init
> 
> # 新建一个目录，将其初始化为Git代码库
> $ git init [project-name]
> 
> # 下载一个项目和它的整个代码历史
> $ git clone [url]
> ```

## 二、配置

Git的设置文件为`.gitconfig`，它可以在用户主目录下（全局配置），也可以在项目目录下（项目配置）。

> ```bash
> # 显示当前的Git配置
> $ git config --list
> 
> # 编辑Git配置文件
> $ git config -e [--global]
> 
> # 设置提交代码时的用户信息
> $ git config [--global] user.name "[name]"
> $ git config [--global] user.email "[email address]"
> ```

## 三、增加/删除文件

> ```bash
> # 添加指定文件到暂存区
> $ git add [file1] [file2] ...
> 
> # 添加指定目录到暂存区，包括子目录
> $ git add [dir]
> 
> # 添加当前目录的所有文件到暂存区
> $ git add .
> 
> # 添加每个变化前，都会要求确认
> # 对于同一个文件的多处变化，可以实现分次提交
> $ git add -p
> 
> # 删除工作区文件，并且将这次删除放入暂存区（强制删除）
> $ git rm [file1] [file2] -f...
> 
> # 停止追踪指定文件，但该文件会保留在工作区
> $ git rm --cached [file]
> 
> # 改名文件，并且将这个改名放入暂存区
> $ git mv [file-original] [file-renamed]
> ```

## 四、代码提交

> ```bash
> # 提交暂存区到仓库区
> $ git commit -m [message]
> 
> # 提交暂存区的指定文件到仓库区
> $ git commit [file1] [file2] ... -m [message]
> 
> # 提交工作区自上次commit之后的变化，直接到仓库区
> $ git commit -a -m
> 
> # 提交时显示所有diff信息
> $ git commit -v
> 
> # 使用一次新的commit，替代上一次提交
> # 如果代码没有任何新变化，则用来改写上一次commit的提交信息
> $ git commit --amend -m [message]
> 
> # 重做上一次commit，并包括指定文件的新变化
> $ git commit --amend [file1] [file2] ...
> ```

## 五、分支

> ```bash
> # 列出所有本地分支
> $ git branch
> 
> # 列出所有远程分支
> $ git branch -r
> 
> # 列出所有本地分支和远程分支
> $ git branch -a
> 
> # 新建一个分支，但依然停留在当前分支
> $ git branch [branch-name]
> 
> # 新建一个分支，并切换到该分支
> $ git checkout -b [branch]
> 
> # 新建一个分支，指向指定commit
> $ git branch [branch] [commit]
> 
> # 新建一个分支，与指定的远程分支建立追踪关系
> $ git branch --track [branch] [remote-branch]
> 
> # 切换到指定分支，并更新工作区
> $ git checkout [branch-name]
> 
> # 切换到上一个分支
> $ git checkout -
> 
> # 建立追踪关系，在现有分支与指定的远程分支之间
> $ git branch --set-upstream [branch] [remote-branch]
> 
> # 合并指定分支到当前分支
> $ git merge [branch]
> 
> # 选择一个commit，合并进当前分支
> $ git cherry-pick [commit]
> 
> # 删除分支
> $ git branch -d [branch-name]
> 
> # 删除远程分支
> $ git push origin --delete [branch-name]
> 或
> $ git branch -dr [remote/branch]
> $ git branch push [remote] :[branch-name]
> ```

## 六、标签

> ```bash
> # 列出所有tag
> $ git tag
> 
> # 新建一个tag在当前commit
> $ git tag [tag]
> 
> # 新建一个tag在指定commit
> $ git tag [tag] [commit]
> 
> # 删除本地tag
> $ git tag -d [tag]
> 
> # 删除远程tag
> $ git push origin :refs/tags/[tagName]
> 
> # 查看tag信息
> $ git show [tag]
> 
> # 提交指定tag
> $ git push [remote] [tag]
> 
> # 提交所有tag
> $ git push [remote] --tags
> 
> # 新建一个分支，指向某个tag
> $ git checkout -b [branch] [tag]
> ```

## 七、查看信息

> ```bash
> # 显示有变更的文件
> $ git status
> 
> # 显示当前分支的版本历史
> $ git log
> 
> # 显示commit历史，以及每次commit发生变更的文件
> $ git log --stat
> 
> # 搜索提交历史，根据关键词
> $ git log -S [keyword]
> 
> # 显示某个commit之后的所有变动，每个commit占据一行
> $ git log [tag] HEAD --pretty=format:%s
> 
> # 显示某个commit之后的所有变动，其"提交说明"必须符合搜索条件
> $ git log [tag] HEAD --grep feature
> 
> # 显示某个文件的版本历史，包括文件改名
> $ git log --follow [file]
> $ git whatchanged [file]
> 
> # 显示指定文件相关的每一次diff
> $ git log -p [file]
> 
> # 显示过去5次提交
> $ git log -5 --pretty --oneline
> 
> # 显示所有提交过的用户，按提交次数排序
> $ git shortlog -sn
> 
> # 显示指定文件是什么人在什么时间修改过
> $ git blame [file]
> 
> # 显示暂存区和工作区的差异
> $ git diff
> 
> # 显示暂存区和上一个commit的差异
> $ git diff --cached [file]
> 
> # 显示工作区与当前分支最新commit之间的差异
> $ git diff HEAD
> 
> # 显示两次提交之间的差异
> $ git diff [first-branch]...[second-branch]
> 
> # 显示今天你写了多少行代码
> $ git diff --shortstat "@{0 day ago}"
> 
> # 显示某次提交的元数据和内容变化
> $ git show [commit]
> 
> # 显示某次提交发生变化的文件
> $ git show --name-only [commit]
> 
> # 显示某次提交时，某个文件的内容
> $ git show [commit]:[filename]
> 
> # 显示当前分支的最近几次提交
> $ git reflog
> ```

## 八、远程同步

> ```bash
> # 下载远程仓库的所有变动
> $ git fetch [remote]
> 
> # 显示所有远程仓库
> $ git remote -v
> 
> # 显示某个远程仓库的信息
> $ git remote show [remote]
> 
> # 增加一个新的远程仓库，并命名
> $ git remote add [shortname] [url]
> 
> # 取回远程仓库的变化，并与本地分支合并
> $ git pull [remote] [branch]
> 
> # 上传本地指定分支到远程仓库
> $ git push [remote] [branch]
> 
> # 强行推送当前分支到远程仓库，即使有冲突
> $ git push [remote] --force
> 
> # 推送所有分支到远程仓库
> $ git push [remote] --all
> ```

## 九、撤销

> ```bash
> # 恢复暂存区的指定文件到工作区
> $ git checkout [file]
> 
> # 恢复某个commit的指定文件到暂存区和工作区
> $ git checkout [commit] [file]
> 
> # 恢复暂存区的所有文件到工作区
> $ git checkout .
> 
> # 重置暂存区的指定文件，与上一次commit保持一致，但工作区不变
> $ git reset [file]
> 
> # 重置暂存区与工作区，与上一次commit保持一致
> $ git reset --hard
> 
> # 重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变
> $ git reset [commit]
> 
> # 重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致
> $ git reset --hard [commit]
> 
> # 重置当前HEAD为指定commit，但保持暂存区和工作区不变
> $ git reset --keep [commit]
> 
> # 新建一个commit，用来撤销指定commit
> # 后者的所有变化都将被前者抵消，并且应用到当前分支
> $ git revert [commit]
> 
> # 暂时将未提交的变化移除，稍后再移入
> $ git stash
> $ git stash pop
> ```
