## 安装 MongoDB   

CentOS官方已计划停止维护CentOS Linux项目，阿里云上CentOS Linux公共镜像来源于CentOS官方，当CentOS Linux停止维护后，阿里云将会同时停止对该操作系统的支持。

替换操作系统为阿里云研发的 Alibaba Cloud Linux 2.1903 LTS 64，因为做了很多优化，而且全面兼容RHEL/CentOS生态，并且这也是官方所提供的一个替代方案

![image-20220329115351056](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-03-29-035351.png)



修改了操作系统镜像后，安装 Node.js 没有一点问题。

由于我们更换了操作系统，所以安装 `Mongodb` 的方式也和之前有所不同。

首先需要明确的一点：

Alibaba Cloud Linux 2 对应的是 CentOS7

Alibaba Cloud Linux 3 对应的是 CentOS8

#### 添加yum源

我这里使用的是yum命令安装，需要先添加yum源：

```js
vi /etc/yum.repos.d/mongodb-org-5.0.repo
```

然后将如下内容添加进去：

```js
[mongodb-org-5.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/5.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-5.0.asc
```

> 在 vi 中，按键盘的 i 键是插入内容，插入完毕后按 ESC 退出，然后输入 :wq 保存

按照官方文档添加了yum源文件，但是当执行`yum install -y mongodb-org`命令的时候报错了：

```js
Error: Failed to download metadata for repo 'mongodb-org-5.0': Cannot download repomd.xml: Status code: 404 for https://repo.mongodb.org/yum/redhat/3/mongodb-org/5.0/x86_64/repodata/repomd.xml
```

解决办法就是将`$releasever`变量直接修改为Centos的版本 7，如下：

```js
[mongodb-org-5.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/7/mongodb-org/5.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-5.0.asc
```

操作截图如下：

![image-20220329122049124](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-03-29-042049.png)

修改完后再次执行如下命令：

```js
yum install -y mongodb-org
```

MongoDB就能安装成功了。

## `mongodb`的默认配置文件

### 默认文件

在通过上面的方式安装 `mongodb` 后，相关的配置项目会为你默认配置好，下面是一下默认文件的配置路径。

数据存放目录（`dbPath`）： `/var/lib/mongo`

系统日志（`systemLog`）：` /var/log/mongodb/mongod.log`

配置文件(`conf`)：`/etc/mongod.conf`

相关 `exe` 文件所在目录： `/bin`

默认服务地址(net)： 监听端口 (`port`): 27017   绑定的IP地址(`bindIp`) : 127.0.0.1。即指定了 MongoDB 服务器监听在本地计算机的 27017 端口上，只接受来自本地的连接请求。

## 配置文件的配置

> 配置文档（官网中译）：https://mongodb.net.cn/manual/reference/configuration-options/
>
> 配置参考文档：https://www.cnblogs.com/Junpb/p/10844895.html
>
> 注意，配置文件为 `yaml` 格式，因此配置时需要注意相关格式。
>
> 配置`yaml`文件格式：https://ruanyifeng.com/blog/2016/07/yaml.html

## 卸载`mongodb`

在使用中，可能因为某些原因报错，而自己又没有能力去解决问题，这个时候就只能卸载后重新按照了（实在找不出解决办法后的操作，尽量尝试先解决问题吧）。

要完全卸载 `mongodb` ,需要执行以下几步命令：

1. 删除数据库

   ```shell
   sudo rm -rf /var/lib/mongo
   ```

2. 删除配置文件

   ```shell
   sudo rm -rf /var/log/mongodb/mongod.log
   ```

3. 卸载软件

   ```shell
   sudo yum erase $(rpm -qa | grep mongodb-org) 
   ```

   

## `mongodb`常见的一些启动报错：

当遇见错误时，去查看日志文件，一般会反应出什么地方发生报错。

报错示例：

### 错误1

```shell
{"t":{"$date":"2023-12-05T08:41:05.931+08:00"},"s":"E",  "c":"NETWORK",  "id":23024,   "ctx":"initandlisten","msg":"Failed to unlink socket file","attr":{"path":"/tmp/mongodb-27017.sock","error":"Operation not permitted"}}
```

查看报错时直接寻找 `error` 关键词，可以定位到错误所在行。再看所在行的 `msg` 信息，可以看到 `Failed to unlink socket file`, 不能访问该文件，原因是 `Operation not permitted`权限被拒绝，这时可以直接删除该文件，由 `mongodb`来重新创建该文件来解决，该文件路径通过查看 `path`来获得。

> 参考文章：https://blog.csdn.net/doegoo/article/details/51906165

重新启动 `mongodb`即可