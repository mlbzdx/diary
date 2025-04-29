在 Vuex 中，**Mutations** 是唯一允许同步修改状态的机制，其核心由**类型（type）**和**回调函数（handler）**组成。以下是详细解析：

---

### 一、Mutation 的类型（Type）
1. **定义**  
   
   - 类型是一个**字符串标识符**，用于唯一标识某个 mutation，例如 `"increment"` 或 `"SET_USER"`。  
   - 类型用于通过 `store.commit(type)` 调用对应的回调函数。
   
2. **命名规范**  
   - 推荐使用**常量命名**（如 `SOME_MUTATION`），以提高代码的可维护性，特别是在大型项目中。  
     ```javascript
     // mutation-types.js
     export const INCREMENT = 'INCREMENT';
     ```

---

### 二、Mutation 的回调函数（Handler）
1. **定义**  
   - 回调函数是实际修改状态的逻辑，接收两个参数：  
     - `state`：当前 Vuex 的状态对象。  
     - `payload`（可选）：提交 mutation 时传递的额外数据。  
   - 示例：  
     ```javascript
     mutations: {
       increment(state, payload) {
         state.count += payload.amount;
       }
     }
     ```

2. **同步性要求**  
   - Mutation 必须是**同步函数**，以确保状态变更能够被 DevTools 追踪和调试。异步操作应交由 Actions 处理。  
   - 错误示例（异步操作会导致状态不可追踪）：  
     ```javascript
     mutations: {
       async fetchData(state) {
         const res = await api.getData(); // 错误！Mutation 不支持异步操作
         state.data = res;
       }
     }
     ```

---

### 三、提交 Mutation 的方式
1. **基本提交**  
   - 使用 `store.commit(type, payload)` 提交：  
     ```javascript
     store.commit('increment', { amount: 10 }); // 载荷形式
     ```

2. **对象风格提交**  
   - 提交时使用对象形式：  
     ```javascript
     store.commit({
       type: 'increment',
       amount: 10
     });
     ```
   - 在这种方式下，提交的整个对象会作为 `payload` 传递给回调函数。

3. **在组件中提交**  
   - 可以通过 `this.$store.commit` 或 `mapMutations` 辅助函数提交：  
     ```javascript
     methods: {
       ...mapMutations(['increment']), // 将 mutation 映射为组件方法
       add() {
         this.$store.commit('increment', { amount: 5 });
       }
     }
     ```

---

### 四、Actions 与 Mutations 的对比
| **特性**     | **Mutations**             | **Actions**                            |
| ------------ | ------------------------- | -------------------------------------- |
| **用途**     | 用于同步修改状态          | 用于处理异步操作（如 API 请求）        |
| **调用方式** | 使用 `store.commit(type)` | 使用 `store.dispatch(type)`            |
| **参数**     | 接收 `state` 和 `payload` | 接收 `context`（包含 `commit` 等方法） |
| **调试支持** | 支持 DevTools 状态快照    | 异步操作需通过 mutations 修改状态      |

---

### 总结
Mutations 是 Vuex 中状态变更的核心工具，具有以下特点：
- 强制同步修改状态，确保状态变化的可预测性和可调试性。
- 类型和回调函数的分离设计使得代码更具结构化，尤其适合中大型项目。
- 配合 Actions 处理异步逻辑，可以实现更清晰的状态管理流程。