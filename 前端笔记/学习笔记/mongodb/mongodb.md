## `linux`卸载`mongodb`

要从系统中完全删除MongoDB，你必须删除MongoDB应用程序本身，配置文件以及包含数据和日志的任何目录。
1.停止MongoDB

```bash
sudo service mongod stop
or
systemctl stop mongod
```

2.移除之前安装的软件包

```bash
sudo yum erase $(rpm -qa | grep mongodb-org)
```

3.删除MongoDB数据库和日志文件

```bash
sudo rm -r /var/log/mongodb
sudo rm -r /var/lib/mongo
```

## 安装 `Mongodb`

由于我们更换了操作系统，所以安装 Mongodb 的方式也和之前有所不同。

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

> 在 vi 中，按键盘的 i 键是插入内容，插入完毕后按 ESC 退出，然后输入 `:wq` 保存

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

参考官方文档（中文）：https://mongodb.net.cn/manual/reference/configuration-options/

参考文档：https://www.cnblogs.com/Junpb/p/10844895.html

配置`yaml`文件格式：https://ruanyifeng.com/blog/2016/07/yaml.html

### 默认文件

配置文件：`/etc/mongod.conf`

日志文件：`/var/log/mongodb/mongod.log`

数据文件：`/var/lib/mongo`

### 文件内容：

源文件内容：

```
# mongod.conf

# for documentation of all options, see:
#   http://docs.mongodb.org/manual/reference/configuration-options/

# where to write logging data.
systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

# Where and how to store data.
storage:
  dbPath: /var/lib/mongo
  journal:
    enabled: true
#  engine:
#  wiredTiger:

# how the process runs
processManagement:
  timeZoneInfo: /usr/share/zoneinfo

# network interfaces
net:
  port: 27017
  bindIp: 127.0.0.1  # Enter 0.0.0.0,:: to bind to all IPv4 and IPv6 addresses or, alternatively, use the net.bindIpAll setting.


#security:

#operationProfiling:

#replication:

#sharding:

## Enterprise-Only Options

#auditLog:

#snmp:

```

修改后的配置

```bash


# mongod.conf

# for documentation of all options, see:
# http://docs.mongodb.org/manual/reference/configuration-options/

# where to write logging data.
systemLog:
  destination: file #日志输出方式。file/syslog,如果是file，需指定path，默认是输出到标准输出流中
  logAppend: true #启动时，日志追加在已有日志文件内还是备份旧日志后，创建新文件记录日志, 默认false
  path: /var/log/mongodb/mongod.log #日志路径,mongodb启动记录以及详细错误都会保存在该文件中

# Where and how to store data.
storage:
  dbPath: /var/lib/mongo # 数据库地址，这里是mongodb启动，导入和导出的数据存放处。
  journal:
    enabled: true #启动journal,64位系统默认开启，32位默认关闭

# how the process runs
processManagement:
  timeZoneInfo: /usr/share/zoneinfo
  fork: true  # 后台运行

# network interfaces
net:
  port: 27017 #监听端口，默认27017
  bindIp: 0.0.0.0 #绑定监听的ip，设置为127.0.0.1时，只会监听本机
  maxIncomingConnections: 65536 #最大连接数，可接受的连接数还受限于操作系统配置的最大连接数
  wireObjectCheck: true #校验客户端的请求，防止错误的或无效BSON插入,多层文档嵌套的对象会有轻微性能影响,默认true

#security:
  # authorization: enabled  # enabled/disabled #开启客户端认证

```





## 启动 `Mongodb`

第一次启动数据库报错参考文档:https://blog.csdn.net/cuicui_ruirui/article/details/105945399

安装完成后，使用`systemctl`命令启动MongoDB服务：

```js
systemctl start mongod  #启动
systemctl status mongod #查看状态
systemctl restart mongod #重新启动
```

具体操作如下图：

![image-20220329122256430](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-03-29-042256.png)

通过查看状态命令，很多信息都能看到。

查看数据库启动状态：

```bash
sudo service mongod status
```



#### `mongodb`启动问题汇总：

问题1：（该问题关系到 `mongodb.conf`中配置的 `fork`能否生效，使 `mongodb`顺利在后台运行）

```basic
Environment variable MONGODB_CONFIG_OVERRIDE_NOFORK == 1, overriding \"processManagement.fork\" to false
```

出现这个问题的原因是 `mongodb` 安装的版本较低，此时在`systemd`中配置的环境变量会与 `mongodb`的配置文件 `mongod.conf`发生冲突，并覆盖默认配置的文件的`MONGODB_CONFIG_OVERRIDE_NOFORK == 1`。

查看`systemd`中配置的环境变量

```
Description=MongoDB Database Server
Documentation=https://docs.mongodb.org/manual
After=network-online.target
Wants=network-online.target

[Service]
User=mongod  #User：指定运行服务的用户
Group=mongod #Group：指定运行服务的用户组
Environment="OPTIONS=-f /etc/mongod.conf" 
Environment="MONGODB_CONFIG_OVERRIDE_NOFORK=1"
EnvironmentFile=-/etc/sysconfig/mongod   #EnvironmentFile：指定当前服务的环境参数文件。该文件内部的key=value键值对，可以用$key的形式，在当前配置文件中获取 启动sshd，执行的命令是/usr/sbin/sshd -D $OPTIONS，其中的变量$OPTIONS就来自EnvironmentFile字段指定的环境参数文件。
ExecStart=/usr/bin/mongod $OPTIONS #ExecStart：启动当前服务的命令
RuntimeDirectory=mongodb
# file size
LimitFSIZE=infinity
```

可以查看到 `MONGODB_CONFIG_OVERRIDE_NOFORK == 1`，编辑 `/usr/lib/systemd/system/mongod.service` 将其删除即可。

由于 编辑了service文件，因此需要运行 `systemctl daemon-reload`重启一下`systemd`更新配置。

注意，通常您不会直接编辑服务文件`/usr/lib/systemd/system/mongod.service`。当您运行MongoDB的任何更新时，它可能会恢复。相反，创建一个`/etc/systemd/system/mongod.service`的副本，并将您的自定义设置放在那里。

> 参考文档：https://www.saoniuhuo.com/question/detail-2696446.html
>
> 参考查看[问题回复](https://stackoverflow.com/questions/76293776/environment-variable-mongodb-config-override-nofork-1-overriding-processma)

问题2

```
Failed to unlink socket file /tmp/mongodb-27017.sock Operation not permitted
```

解决参考文档：https://cloud.tencent.com/developer/article/1499909

如何结束 `mongodb`[参考](https://www.cnblogs.com/huangkenicole/p/15395221.html#:~:text=%EF%BC%88%E5%9B%9E%E8%BD%A6%E5%90%8E%EF%BC%8C%E5%87%BA%E6%9D%A5%E7%9A%84%E6%95%B0%E5%AD%97%E5%B0%B1%E6%98%AF%E8%BF%9B%E7%A8%8B%E5%8F%B7%EF%BC%89%201%20%E6%96%B9%E6%B3%95%E4%B8%80%EF%BC%9A%E6%89%A7%E8%A1%8C%20ps%20aux%7Cgrep%20mongo%20%E3%80%82%20%EF%BC%88%E4%B8%8B%E9%9D%A2%E5%87%BA%E6%9D%A5%E7%9A%84,%E5%B0%B1%E6%98%AF%E8%BF%9B%E7%A8%8B%E5%8F%B7%E5%95%A6%EF%BC%89%20undefined%202%20%E6%96%B9%E6%B3%95%E4%BA%8C%EF%BC%9A%E6%89%A7%E8%A1%8C%20pgrep%20%22mongod%22%20%E3%80%82%20%EF%BC%88%E5%9B%9E%E8%BD%A6%E5%90%8E%EF%BC%8C%E5%87%BA%E6%9D%A5%E7%9A%84%E6%95%B0%E5%AD%97%E5%B0%B1%E6%98%AF%E8%BF%9B%E7%A8%8B%E5%8F%B7%EF%BC%89)

参考kill命令：https://www.cnblogs.com/etwits/p/11378947.html

## 数据库

### 创建数据库

如何创建数据库？

在 MongoDB 中，数据库是在需要的时候自动创建的。当你插入第一条数据时，MongoDB 将自动创建数据库，如果该数据库不存在的话。因此，你无需显式地创建数据库，只需开始插入数据即可。

如果你需要切换到特定的数据库或确保数据库存在，你可以在 MongoDB 客户端中使用以下命令：

1. 打开 MongoDB 客户端：在终端中，使用 `mongo` 命令启动 MongoDB 客户端。

2. 切换到指定的数据库：使用 `use` 命令切换到要使用或创建的数据库。例如，要切换到名为 "`mydatabase`" 的数据库，可以运行：

   ```bash
   use mydatabase
   ```

如果 "`mydatabase`" 存在，你将切换到它。如果它不存在，MongoDB 将在你插入第一条数据时创建它。

1. 插入数据：开始向当前数据库插入数据。当你插入数据时，MongoDB 会自动创建数据库，如果它尚不存在。

请注意，MongoDB数据库名称是区分大小写的，因此请确保在使用数据库名称时保持大小写一致。如果你需要管理数据库用户、角色、索引等，你可以在相应的数据库中执行操作。

### 显示数据库

```bash
show dbs
```

### 删除数据库

首先切换到你要删除的数据库：

```bash
use yourdatabase
```

执行下面的命令：

```bash
db.dropDatabase()
```

## 数据库用户

参考这篇文章：https://www.cnblogs.com/zkatr/p/15587425.html

### 创建数据库用户

以创建管理员用户为例：

```bash
use admin
db.createUser({user:"root",pwd:"123456",roles:[{role:"userAdminAnyDatabase",db: "admin"}]})
```

创建普通用户

```bash
use 数据库名
db.createUser({user:"用户名",pwd:"密码",roles:[{role:"read",db: "数据库名"},{role:"readWrite",db:"数据库名"}]})
```



### 查看所有数据库用户：

首先切换到admin数据库

```bash
use admin
```

再执行下面的命令

```bash
db.system.users.find()
```

### 查看当前数据库用户

首先切换到你要查询的数据库用户

```bash
use yourdatabase
```

再执行下面的命令

```bash
db.getUsers()
```

### 删除数据库用户

要删除 MongoDB 中的用户，你可以使用以下步骤：

1. 打开 MongoDB 客户端：在终端中，使用 `mongo` 命令启动 MongoDB 客户端。

2. 切换到 `admin` 数据库：用户信息通常存储在 `admin` 数据库中。使用 `use admin` 命令切换到 `admin` 数据库：

   ```bash
   use admin
   ```

3. 删除用户：使用 `db.dropUser(username)` 命令来删除特定用户，其中 `username` 是要删除的用户名。例如，要删除名为 "myuser" 的用户，可以运行：

   ```bash
   db.dropUser("myuser")
   ```

请注意，删除用户是一个敏感操作，需要相应的权限。确保你已经在 MongoDB 客户端中以具有适当权限的身份登录，以执行此操作。

如果你需要删除数据库中的所有用户，可以使用 `db.system.users.remove({})` 命令来删除所有用户，但这同样需要足够的权限。谨慎操作以避免数据丢失。

### 修改用户密码

要修改 MongoDB 用户的密码，你可以使用以下步骤：

1. **连接到 MongoDB 服务器**：首先，使用 MongoDB 客户端（如 `mongo` shell）连接到 MongoDB 服务器，确保你具有足够的权限来修改用户密码。

   ```
   mongo
   ```

2. **切换到 admin 数据库**：在 `mongo` shell 中，首先切换到 `admin` 数据库，因为用户管理通常在这个数据库中进行。

   ```
   use admin
   ```

3. **通过 `db.updateUser()` 修改用户密码**：使用 `db.updateUser()` 命令来修改用户密码。以下是修改密码的示例：

   ```
   db.updateUser(
     "username",
     {
       pwd: "new_password",
     }
   )
   ```

   - `username` 是要修改密码的用户的用户名。
   - `new_password` 是你想要设置的新密码。

   请注意，上述命令会覆盖现有密码，所以请谨慎操作。

4. **退出 `mongo` shell**：完成密码修改后，退出 `mongo` shell。

   ```
   quit()
   ```

现在，你已经成功修改了 MongoDB 用户的密码。确保使用新密码来登录到 MongoDB，以确保更改生效。如果你在修改密码时遇到任何问题，请确保你有足够的权限来进行此操作，并检查密码是否正确设置。

## 数据库集合

### 创建数据库集合

### 查看数据库集合

### 删除数据库集合

### 查看集合内容

