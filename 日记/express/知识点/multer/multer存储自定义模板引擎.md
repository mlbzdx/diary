---

`multer.diskStorage` 是 Multer 提供的一个方法，用于自定义上传文件的存储方式（即将文件保存到本地硬盘）。通过该方法，你可以灵活地设置文件保存路径和命名规则，而不仅限于默认的临时存储。以下是详细介绍：

---

### 基本用法

```javascript
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 设置文件保存路径
    cb(null, '目标存储路径');
  },
  filename: (req, file, cb) => {
    // 设置文件名
    cb(null, '自定义文件名');
  }
});

const upload = multer({ storage: storage });
```

---

### 参数解析

#### 1. `destination`
**作用**：指定文件存储的目录。  
**参数**：

- `req`：请求对象。
- `file`：上传文件的信息（如 `originalname`、`mimetype` 等）。
- `cb(error, path)`：回调函数，第一个参数为错误（`null` 表示无错误），第二个参数为存储路径。

**示例**：根据用户 ID 动态创建目录

```javascript
destination: (req, file, cb) => {
  const userId = req.user.id; // 从请求中获取用户 ID
  const path = `uploads/${userId}`;
  fs.mkdirSync(path, { recursive: true }); // 确保目录存在
  cb(null, path);
}
```

---

#### 2. `filename`
**作用**：自定义保存文件的名称，避免文件名冲突。  
**常见技巧**：
- 添加时间戳（`Date.now()`）。
- 保留原始文件扩展名（通过 `file.originalname`）。
- 使用随机字符串（如 `uuid`）。

**示例**：时间戳 + 原始文件名

```javascript
filename: (req, file, cb) => {
  const uniqueName = `${Date.now()}-${file.originalname}`;
  cb(null, uniqueName);
}
```

---

### 完整示例

以下是一个完整的实现，将文件按用户 ID 分类存储，并使用时间戳命名：

```javascript
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.user.id; // 假设从请求中获取用户 ID
    const path = `uploads/${userId}`;
    fs.mkdirSync(path, { recursive: true }); // 确保目录存在
    cb(null, path);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
```
