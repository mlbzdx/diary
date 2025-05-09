## 源代码：

```js
import axios from 'axios';
import store from '../store'
import { ElMessage } from 'element-plus';

/** 这两个封装方法适合有返回值的请求 **/

// get请求
export function get(url, config) {

  // 请求超过30秒则判定为超时
  const instance = axios.create({
    baseURL: '/api',
    timeout: 30000,
    withCredentials: true,
  });

  // axios拦截器
  // 请求拦截
  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (err) => {
      console.log(err);
    },
  );

  // 响应拦截
  instance.interceptors.response.use(
    (config) => {
      const code = config.data.code;
      if (code && code !== 200)
        ElMessage.error(config.data.message || '未知错误, 请打开控制台查看');
      return config;
    },
    (err) => {
      console.log(err);
      if (err.response.headers.message === 'not login') {
        // 修改当前的登录状态
        store.commit("initData");
        // 关闭websocket
        if (store.state.ws) {
          store.state.ws.close();
          store.commit('setWebSocket', null);
        }
        // 清除本地token缓存
        localStorage.removeItem("teri_token");
        ElMessage.error("请登录后查看");
        store.state.isLoading = false;
      } else {
        ElMessage.error("特丽丽被玩坏了(¯﹃¯)");
        store.state.isLoading = false;
      }
    },
  );

  instance.defaults.withCredentials = true;

  // axios.get("http://xxx/xxx",{
  //   //参数列表
  //   params:{ id: id},
  //   //请求头配置  
  //   headers:{ token: token }
  // })

  if (config) {
    if (config.params) {
      if (config.headers) {
        return instance.get(url, {params: config.params, headers: config.headers}); // 有参数和请求头
      }
      return instance.get(url, {params: config.params}); // 有参数没请求头
    }
    if (config.headers) {
      return instance.get(url, {headers: config.headers}); // 没参数有请求头
    }
  } else {
    return instance.get(url); // 没参数和请求头
  }

}

// post请求
export function post(url, data, headers) {

  // 请求超过30秒则判定为超时
  const instance = axios.create({
    baseURL: '/api',
    timeout: 30000,
    withCredentials: true,
  });

  // axios拦截器
  // 请求拦截
  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (err) => {
      console.log(err);
    },
  );

  // 响应拦截
  instance.interceptors.response.use(
    (config) => {
      const code = config.data.code;
      if (code && code !== 200)
        ElMessage.error(config.data.message || '未知错误, 请打开控制台查看');
      return config;
    },
    (err) => {
      console.log(err);
      if (err.response.headers.message == 'not login') {
        // 修改当前的登录状态
        store.commit("initData");
        // 关闭websocket
        if (store.state.ws) {
          store.state.ws.close();
          store.commit('setWebSocket', null);
        }
        // 清除本地token缓存
        localStorage.removeItem("teri_token");
        ElMessage.error("请登录后查看");
        store.state.isLoading = false;
      } else {
        ElMessage.error("特丽丽被玩坏了(¯﹃¯)");
        store.state.isLoading = false;
      }
    },
  );

  instance.defaults.withCredentials = true;

  // axios.post("http://xxx/xxx",
  //   //参数列表
  //   { 'id': id },
  //   //请求头配置   
  //   { headers: {'token':token }}
  // )

  // 如果 data 是 Content-Type: application/json ，后端要用 @RequestBody 接收
  if (headers) {
    return instance.post(url, data, headers); // 有请求头
  }
  return instance.post(url, data);  // 没请求头
}

```

## 分析：

这段代码封装了 Axios 的 `get` 和 `post` 请求方法，涵盖了以下核心知识点：

---

### **1. Axios 实例化 (`axios.create`)**
- **功能**：通过 `axios.create` 创建独立的 Axios 实例，设置默认配置，包括：
  - `baseURL`（基础路径）：如 `/api`，方便统一管理接口前缀。
  - `timeout`（超时时间）：设置为 `30000ms`，避免请求长时间无响应。
  - `withCredentials`（跨域凭证）：允许携带 Cookie 等认证信息。
- **优势**：避免全局配置污染，支持针对不同接口定制独立实例。

---

### **2. 拦截器（Interceptors）**
#### **请求拦截器**
- **作用**：在请求发送前统一处理，如添加认证 Token 或其他自定义请求头。
- **代码示例**：
  
  ```javascript
  instance.interceptors.request.use(config => {
    // 可在此添加请求头，如 Authorization: 'Bearer xxx'
    return config;
  });
  ```
- **扩展性**：虽然当前代码未修改请求配置，但保留了后续灵活扩展的空间。

#### **响应拦截器**
- **功能**：统一处理服务端返回的响应数据或错误。
  - **成功响应**：检查返回的 `code` 字段，若非 `200`，通过 Element Plus 的 `ElMessage.error` 提示错误信息。
  - **失败响应**：根据错误类型分类处理，例如未登录状态的清理操作。
    ```javascript
    if (err.response.headers.message === 'not login') {
      store.commit("initData"); // 重置 Vuex 状态
      localStorage.removeItem("teri_token"); // 移除本地存储的 Token
    }
    ```

---

### **3. 请求方法封装**
#### **GET 请求**
- **灵活适配**：根据传入的 `config` 动态判断是否需要携带 `params` 或 `headers`，适应多种接口需求。
  ```javascript
  if (config.params && config.headers) {
    return instance.get(url, { params: config.params, headers: config.headers });
  }
  ```

#### **POST 请求**
- **数据与头部分离**：支持传递请求体 `data` 和可选的 `headers`，以适配不同的请求格式（如 `application/json`）。
  ```javascript
  return instance.post(url, data, headers);
  ```

---

### **4. 错误处理机制**
- **分类处理**：
  - **未登录状态**：跳转登录页面，并清理本地状态（如 Token 和 Vuex 数据）。
  - **其他错误**：通过统一的错误提示（如“特丽丽被玩坏了”）提升用户体验。
- **日志输出**：使用 `console.log` 打印错误信息，便于开发调试。

---

### **5. 安全性与状态管理**
- **跨域认证**：通过 `withCredentials: true` 配置，支持跨域请求时携带 Cookie 等认证信息。
- **全局状态联动**：
  - 使用 Vuex (`store`) 管理应用状态，例如登录状态和 WebSocket 连接。
  - 确保状态清理和错误处理的一致性，提升代码的可维护性。

---

### **6. 总结：Axios 封装的核心知识点**
| 知识点           | 代码体现                     | 作用                               |
| ---------------- | ---------------------------- | ---------------------------------- |
| **实例化**       | `axios.create`               | 独立实例，避免全局配置污染         |
| **请求拦截器**   | `interceptors.request`       | 请求发送前统一处理（如添加 Token） |
| **响应拦截器**   | `interceptors.response`      | 统一响应数据处理与错误分类         |
| **动态参数传递** | `config.params/headers` 判断 | 灵活适配不同接口需求               |
| **错误分类处理** | 检查 `err.response.headers`  | 精细化错误提示，提升用户体验       |
| **跨域凭证**     | `withCredentials: true`      | 支持跨域认证                       |
| **状态管理**     | 使用 Vuex 管理全局状态       | 确保业务逻辑解耦和状态一致性       |

---

### **封装的优势**
通过对 Axios 的实例化、拦截器、动态参数处理和错误分类的封装，实现了以下功能：
1. **配置统一管理**：基础路径、超时时间、跨域认证等全局配置集中管理。
2. **错误全局处理**：统一处理异常状态，减少重复代码。
3. **业务逻辑解耦**：将请求逻辑与业务逻辑分离，提升代码可维护性。
4. **灵活适配接口**：支持动态传参和自定义请求头，适应多种接口需求。

这种封装方式非常适合中大型前端项目，能够有效提升开发效率和代码质量。

## 改进：

```js
import axios from "axios";
import { ElMessage } from "element-plus";
import store from "@/stores/index.js";

const api = axios.create({
  baseURL: "/api",
  timeout: 30000,
  withCredentials: true,
});

// 全局拦截器（仅注册一次）
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("teri_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    const code = response.data.code;
    if (code && code !== 200) {
      ElMessage.error(response.data.msg || "未知错误，请打开控制台查看");
    }
    return response;
  },
  (err) => {
    console.error("请求错误:", err);
    if (err.response?.headers?.message === "not login") {
      store.commit("initData");
      if (store.state.ws instanceof WebSocket) {
        store.state.ws.close();
        store.commit("setWebSocket", null);
      }
      localStorage.removeItem("teri_token");
      ElMessage.error("请登录后查看");
      store.commit("setLoading", false);
    } else {
      ElMessage.error("特丽丽被玩坏了(¯﹃¯)");
      store.commit("setLoading", false);
    }
    return Promise.reject(err);
  }
);

export const get = (url, config = {}) => {
  return api.get(url, {
    params: config.param,
    headers: config.headers,
    ...config,
  });
};

export const post = (url, data, config = {}) => {
  return api.post(url, data, config);
};
```

