## `mongodb`的相关配置文件

在 `windows`中，相关的配置文件默认会为你配置好，所以这里只是简单介绍一下相关文件默认存放的位置。

数据存放目录（`dbPath`）： `C:\Program Files\MongoDB\Server\7.0\data`

系统日志（`systemLog`）：` C:\Program Files\MongoDB\Server\7.0\log\mongod.log`

默认服务地址(net)： 监听端口 (`port`): 27017   绑定的IP地址(`bindIp`) : 127.0.0.1。即指定了 MongoDB 服务器监听在本地计算机的 27017 端口上，只接受来自本地的连接请求。

配置文件(`conf`)：`C:\Program Files\MongoDB\Server\7.0\bin\mongod.cfg`

## 数据库服务的启动

启动数据库：

在连接本地服务器之前，先确定计算机已经启动了 `mongodb` 服务。

> 没有启动会包如下错误：
>
> ```c++
> Current Mongosh Log ID: 656478b17abf3d76ef9956f1
> Connecting to:          mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.5
> MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27017
> ```

通过下面的命令启动 `mongodb` 服务

```
net start mongodb
```

> 也可以 `win + r` 输入 `services.msc` 打开服务（本地），通过 `ctrl + f`查找 `MongoDB Sever(MongoDB)`,右键将其服务启动。

通过 `mongosh`命令连接数据库

```bash
mongosh
```

> MongoDB 6.0 以后做出了重大改变，MongoDB 已经不再默认为你安装shell 工具，因此需要安装一个额外的shell,这个工具被称为 `mongosh`。
>
> > 下载地址：https://www.mongodb.com/try/download/shell。
>
> 前往 `mongoshell` 页面下载 [`mongoshell`](https://www.mongodb.com/try/download/shell)，解压放一个目录就行，把 `mongosh` 的解压目录也添加到环境变量，以后就可以用 `mongosh` 连接 MongoDB 了。
>
> 将`mongodb`安装目录下的 `bin`文件路径配置到环境变量中，就可以在全局环境用终端使用`mongosh`以及其他`mongodb`的相关命令了。

退出连接:

```bash
exit
```

关闭 `mongodb`服务

```bash
test> use admin
switched to db admin
admin> db.shutdownServer()
```

## 数据库相关操作

### **查看数据库**：

```bash
> show dbs
admin 0.000GB
config 0.000GB
local 0.000GB
```

### **创建数据库**：

切换数据库+插入内容

```bash
> use stuInfo;
switched to db stuInfo
> show dbs;
admin 0.000GB
config 0.000GB
local 0.000GB
```

现在是看不到新建的数据库 `stuInfo`，还必须往`stuInfo`中插入内容才可以查看到书库：

```bash
> db.class1.insertOne({"name":"xiejie"})
WriteResult({ "nInserted" : 1 })
> show dbs
admin 0.000GB
config 0.000GB
local 0.000GB
stuInfo 0.000GB
```

### **删除数据库**：

```bash
> db.dropDatabase()
{ "dropped" : "stuInfo", "ok" : 1 }
> show dbs;
admin 0.000GB
config 0.000GB
local 0.000GB
```

## 集合相关操作：

### **创建集合**：

**命令手动创建**：

```bash
db.createCollection(name,options)
```

name:要创建的集合名称。
options：可选参数，指定有关内存大小以及索引的选项。其中options可以是如下的参数

![image-20231127152331273](https://mlbzdx.oss-cn-chengdu.aliyuncs.com/image-20231127152331273.png)

示例：

```bash
> use test
switched to db test
> db.createCollection("mycol", { capped : true, autoIndexId : true, size : 6142800, max : 
10000 } )
{
 "note" : "the autoIndexId option is deprecated and will be removed in a future release",
 "ok" : 1
```

这里，我们就创建了固定集合`mycol`,整个集合空间大小6142800KB,文档最大个数为10000个。

**插入自动创建**：

```bash
> show collections
class1
col
mycol
> db.mycol2.insert({"name":"xiejie"})
WriteResult({ "nInserted" : 1 })
> show collections
class1
col
mycol
mycol2
```

### **查看集合**：

```bash
> show collections
class1
col
mycol
mycol2
```

注意！该命令别名为 `show tables`

### **删除集合**：

```bash
> db.mycol.drop()
true
> db.mycol.drop()
true
```

## 文档操作相关：

### **插入文档**：

向MongoDB中插入的文档数据结构和JSON基本一样。所有存储在集合中的数据都是BSON格式。
注：BSON是一种类似于JSON的二进制存储格式，全称为Binary JSON。
在MongoDB中，使用`insertOne`, `insertMany`, 或者 `bulkWrite`

### **插入一条文档**：

```bash
test> db.collection1.insertOne({name:"mlbzdx"});
{
  acknowledged: true,
  insertedId: ObjectId("65644960c2ec614c804d76af")
}
```

注意！`DeprecationWarning: Collection.insert() is deprecated. Use insertOne, insertMany, or bulkWrite.`。以前的 `insert`已经弃用，现在使用`insertOne`, `insertMany`, or或者`bulkWrite`来替换它。

### **插入多条文档**：

```bash
test> db.family.insertMany([{"name":"佐佐木希","age":30,"gender":"female"},{"name":"孙悟空","age":500,"gender":"male"}])
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId("65644b3dc2ec614c804d76b0"),
    '1': ObjectId("65644b3dc2ec614c804d76b1")
  }
}
```

### **更新文档**：

注意！` Collection.update() is deprecated. Use updateOne, updateMany, or bulkWrite.`

`update()` 方法已经弃用,现在使用方法 `updateOne`,`updateMany`,`bulkWrite`。



`updateOne()` 是 MongoDB 提供的用于更新单个文档的方法。它允许你指定一个查询条件来匹配要更新的文档，并提供要进行更新的字段和值。

下面是 `updateOne()` 方法的基本语法：

```javascript
db.collection.updateOne(filter, update, options)
```

参数说明：

- `filter`：一个对象，用于指定查询条件，匹配满足条件的文档将被更新。
- `update`：一个对象，用于指定要进行更新的字段和值。
- `options`（可选）：一个对象，用于指定额外的选项，如排序、限制等。

`updateOne()` 方法返回一个包含更新操作结果的对象，其中包括以下字段：

- `acknowledged`：一个布尔值，表示更新操作是否被确认。
- `matchedCount`：一个整数，表示匹配到的文档数量。
- `modifiedCount`：一个整数，表示实际被修改的文档数量。

示例：

查看集合原数据：

```bash
test> db.family.find()
[
  {
    _id: ObjectId("65644b3dc2ec614c804d76b0"),
    name: '佐佐木希',
    age: 30,
    gender: 'female'
  },
  {
    _id: ObjectId("65644b3dc2ec614c804d76b1"),
    name: '孙悟空',
    age: 500,
    gender: 'male'
  }
]
```

修改后数据：

```bash
test> db.family.updateOne({"name":"孙悟空"},{$set:{"age":1000}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 0,
  upsertedCount: 0
}
test> db.family.find()
[
  {
    _id: ObjectId("65644b3dc2ec614c804d76b0"),
    name: '佐佐木希',
    age: 30,
    gender: 'female'
  },
  {
    _id: ObjectId("65644b3dc2ec614c804d76b1"),
    name: '孙悟空',
    age: 1000,
    gender: 'male'
  }
]
```

### **删除文档**：

推荐使用`deleteOne()`和`deleteMany()`方法。
删除集合下全部文档：

```bash
db.集合名.deleteMany（）
```

删除status等于A的全部文档：
```bash
db.集合名.deleteMany(status:"A"})
```

示例：

```bash
test> db.family.deleteOne({"name":"孙悟空"})
{ acknowledged: true, deletedCount: 1 }
test> db.family.find()
[
  {
    _id: ObjectId("65644b3dc2ec614c804d76b0"),
    name: '佐佐木希',
    age: 30,
    gender: 'female'
  }
]
```

## 文档查询:

### 基本查询：

`find()` 是 MongoDB 提供的用于查询文档的方法之一。它允许你指定一个查询条件来匹配要检索的文档，并返回满足条件的文档结果。此外，`findOne()`只返回一个文档。

下面是 `find()` 方法的基本语法：

```bash
db.collection.find(filter, projection)
```

参数说明：

- `filter`（可选）：一个对象，用于指定查询条件，只有满足条件的文档才会被返回。如果未提供该参数，则返回集合中的所有文档。
- `projection`（可选）：一个对象，用于指定要返回的字段。默认情况下，返回所有字段。可以使用投影操作符来指定返回的字段。

### 条件查询：

**AND**

MongoDB的find()方法可以传入多个键(key),每个键(key)以逗号隔开，即常规SQL的AND条
件。语法格式如下：

```bash
db.集合名.find(fkey1:value1,key2:value2})
```

**OR**

MongoDB中的OR条件语句使用了关键字$or,语法格式如下：

```bash
db.collection.find({$or: [{key1: value1}, {key2:value2}]})
```

### **查询结果排序**

```bash
db.collection.find().sort({KEY:1})
```

### **查询结果限制**

```
db.collection.find().limit(条数)
```

### **跳过查询**

```bash
db.collection.find().limit(条数).skip(条数)
```

### **模糊查询**

MongoDB中同样还支持模糊查询。例如：查询name字段以"佐"开头的文档，只需要传入一个正则表达式即可。

## 数据的备份与恢复

### 数据的导出

MongoDB中的mongoexport工具可以把一个collection导出成JSON格式或CSV格式的文件。可以通过参数指定导出的数据项，也可以根据指定的条件导出数据。
具体的语法如下：

```bash
mongoexport -d dbname -c collectionname -o file --type json/csv-f field
```

参数说明如下：

* -d ：数据库名
* -c : 集合名
* -o : 输出的文件名
* -type：输出的格式，默认为`json`
* -f:输出的字段

### 数据的导入

数据导入所使用的命令为mongoimport。具体的语法如下：
```bash
mongoimport -d dbname -c collectionname --file filename --headerline --type json/csv -f field
```

参数说明如下：

* -d：数据库名
* -c: 集合名
* -type：导入的格式默认`json`
* -f:导入的字段名
* `--headerline`:如果导入的格式是csv,则可以使用第一行的标题作为导入的字段
* --file：要导入的文件

### 数据的备份

数据库的备份也是经常会涉及到的操作。数据库备份的语法如下：
```bash
mongodump -h dbhost -d dbname -o dbdirectory
```

参数如下：

* -h : MongoDB所在的服务器地址，例如：127.0.0.1，当然也可以指定端口号：127.0.0.1:27017。
* -d:需要备份的数据库实例。
* -o:备份的数据存放位置。

### 数据的恢复

数据库恢复是指将备份的数据库重新还原至MongoDB数据库中。语法如下：
```bash
mongorestore -h dbhost -d dbname --dir dbdirectory
```

参数说明如下：

* -h:MongoDB所在服务器地址
* -d:需要恢复的数据库实例。
* `--dir` : 备份数据所在位置
* `--drop` : 恢复的时候，先删除当前数据，然后恢复备份的数据。就是说，恢复后，备份后添加修改的数据都会被删除，慎用！

## 用户相关操作

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
