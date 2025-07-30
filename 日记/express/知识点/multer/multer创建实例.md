### 📁 1. **存储配置**

#### a. `dest`（字符串）
- **作用**：指定文件保存目录（简单存储方式）。
- **特点**：
  - 自动生成唯一文件名（无扩展名）。
  - 无法自定义文件名。
- **示例**：
  ```javascript
  multer({ dest: 'uploads/' });
  ```

#### b. `storage`（存储引擎）
- **作用**：提供灵活的存储控制，支持以下两种内置存储引擎：
  - **磁盘存储**：将文件保存在硬盘。
  - **内存存储**：将文件以 Buffer 形式存储在内存中（适合云存储上传）。
- **示例**：
  ```javascript
  const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => { ... },
    filename: (req, file, cb) => { ... }
  });
  
  const memoryStorage = multer.memoryStorage();
  ```

---

### 🚫 2. **文件过滤**

#### `fileFilter`（函数）
- **作用**：控制允许上传的文件类型。
- **参数**：`(req, file, cb)`。
- **示例**：
  ```javascript
  multer({
    fileFilter: (req, file, cb) => {
      if (file.mimetype === 'image/jpeg') {
        cb(null, true); // 允许上传
      } else {
        cb(new Error('仅支持 JPEG 格式'), false); // 拒绝上传
      }
    }
  });
  ```

---

### 📏 3. **限制配置**

#### `limits`（对象）
- **作用**：设置上传的大小和数量限制。
- **常用属性**：
  | 属性            | 类型   | 默认值    | 说明                       |
  | --------------- | ------ | --------- | -------------------------- |
  | `fieldNameSize` | number | 100 bytes | 字段名最大长度             |
  | `fieldSize`     | number | 1MB       | 非文件字段值最大尺寸       |
  | `fields`        | number | Infinity  | 非文件字段最大数量         |
  | `fileSize`      | number | Infinity  | **文件最大尺寸（最常用）** |
  | `files`         | number | Infinity  | 文件字段最大数量           |
  | `parts`         | number | Infinity  | 表单数据部分总数           |
  | `headerPairs`   | number | 2000      | 请求头键值对数量           |

- **示例**：
  ```javascript
  multer({
    limits: {
      fileSize: 5 * 1024 * 1024, // 文件大小限制为 5MB
      files: 3                  // 最多允许上传 3 个文件
    }
  });
  ```

---

### 🗂 4. **路径保留**

#### `preservePath`（布尔值）
- **作用**：是否保留文件原始路径。
- **默认值**：`false`（只保留文件名）。
- **示例**：
  ```javascript
  multer({ preservePath: true });
  ```
  上传 `images/profile.jpg` → 保存为 `images/profile.jpg`（完整路径）。

---

### ⚙ 完整配置示例

```javascript
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'user-uploads/'); // 自定义存储目录
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // 自定义文件名
    }
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true); // 允许图片文件
    } else {
      cb(new Error('仅支持图片文件'), false); // 拒绝非图片文件
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 文件大小限制为 10MB
    files: 5                    // 最多允许上传 5 个文件
  },
  preservePath: false           // 默认值，可省略
});
```

---

### ⚠ 注意事项

1. **`dest` 和 `storage` 不能同时使用**  
   如果同时设置，`storage` 优先级更高。

2. **内存存储的风险**  
   使用 `memoryStorage` 时必须设置合理的文件大小限制，以避免内存溢出：
   ```javascript
   multer({
     storage: multer.memoryStorage(),
     limits: { fileSize: 200 * 1024 } // 限制文件大小为 200KB
   });
   ```

3. **中间件顺序**  
   Multer 中间件必须在 `body-parser` 之前，否则 `req.body` 会为空：
   ```javascript
   // 正确顺序
   app.post('/upload', multer().single('file'), bodyParser.json(), handler);
   
   // 错误顺序
   app.post('/upload', bodyParser.json(), multer().single('file'), handler);
   ```

4. **安全建议**  
   - 使用 `fileFilter` 限制文件类型，避免上传恶意文件。
   - 不直接暴露用户上传目录，防止未授权访问。
   - 对文件名进行清理，移除特殊字符：
     ```javascript
     filename: (req, file, cb) => {
       const safeName = file.originalname.replace(/[^a-z0-9.]/gi, '_');
       cb(null, safeName);
     };
     ```

---

通过以上配置项，你可以灵活地控制文件上传行为，满足各种复杂的业务需求。