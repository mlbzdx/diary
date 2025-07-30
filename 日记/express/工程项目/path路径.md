---

### Node.js `path` 模块：8 个常用方法详解

`path` 模块是 Node.js 中处理文件路径的核心工具，提供跨平台兼容的路径操作方法。以下是 **8 个常用方法**及其示例：

---

### 1. `path.join(...paths)`
**功能**：拼接路径片段，自动处理分隔符和相对路径。  
**示例**：
```javascript
path.join('/user', 'docs', 'file.txt'); 
// 输出: '/user/docs/file.txt' (Unix) 或 '\user\docs\file.txt' (Windows)
```

---

### 2. `path.resolve(...paths)`
**功能**：生成绝对路径，从右向左拼接路径，直到构造出绝对路径。  
**示例**：
```javascript
path.resolve('src', 'app.js'); 
// 假设当前目录是 /home/project → 输出: '/home/project/src/app.js'
```

---

### 3. `path.dirname(path)`
**功能**：获取文件所在的目录路径。  
**示例**：
```javascript
path.dirname('/user/docs/report.txt'); 
// 输出: '/user/docs'
```

---

### 4. `path.basename(path[, ext])`
**功能**：提取文件名，可选择移除扩展名。  
**示例**：
```javascript
path.basename('/user/docs/report.txt');        // 输出: 'report.txt'
path.basename('/user/docs/report.txt', '.txt'); // 输出: 'report'
```

---

### 5. `path.extname(path)`
**功能**：提取文件的扩展名（包含 `.`）。  
**示例**：
```javascript
path.extname('index.html'); // 输出: '.html'
path.extname('data.json');  // 输出: '.json'
```

---

### 6. `path.parse(path)`
**功能**：将路径解析为对象，包括目录、文件名和扩展名等。  
**示例**：
```javascript
path.parse('/home/user/file.txt');
// 输出:
{
  root: '/',
  dir: '/home/user',
  base: 'file.txt',
  ext: '.txt',
  name: 'file'
}
```

---

### 7. `path.format(pathObject)`
**功能**：将路径对象转换为字符串（`path.parse` 的逆操作）。  
**示例**：
```javascript
path.format({ 
  dir: '/home/user', 
  base: 'file.txt' 
}); 
// 输出: '/home/user/file.txt'
```

---

### 8. `path.normalize(path)`
**功能**：规范化路径，移除冗余的分隔符和相对路径。  
**示例**：
```javascript
path.normalize('/user//docs/../src'); 
// 输出: '/user/src' (Unix) 或 '\user\src' (Windows)
```

---

### ⚠️ 注意事项

1. **跨平台兼容**：  
   `path` 会自动处理路径分隔符，Windows 使用 `\`，Unix 使用 `/`。

2. **避免字符串拼接**：  
   使用 `path.join()` 或 `path.resolve()` 构建路径，避免手动拼接导致错误。  
   示例：
   
   ```javascript
   const fullPath = path.join(__dirname, 'data', 'file.json');
   ```
   
3. **路径安全**：  
   在处理用户输入路径时，建议结合 `path.normalize()` 或 `path.resolve()` 进行校验。

