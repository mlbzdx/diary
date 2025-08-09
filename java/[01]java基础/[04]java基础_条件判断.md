# **Java 条件判断详解：if 和 switch**

条件判断是 Java 编程中控制程序执行流程的核心结构。Java 提供了两种主要的条件判断方式：`if` 和 `switch`，用于根据不同的条件执行不同的代码块。

---

### **一、条件判断概述**

条件判断是程序逻辑的基础，用于根据条件的真假来决定程序的执行路径：
- **`if` 语句**：适用于范围判断或复杂条件。
- **`switch` 语句**：适用于离散值匹配。

---

### **二、if 语句**

#### **1. 单分支判断（if）**
- **语法**：
  ```java
  if (条件表达式) {
      // 当条件为 true 时执行
  }
  ```

- **示例**：
  ```java
  int score = 85;
  if (score >= 60) {
      System.out.println("及格");
  }
  ```

- **流程**：

  ```mermaid
  graph TD
      A[开始] --> B{条件成立?}
      B -- Yes --> C[执行代码块]
      B -- No --> D[跳过]
      C --> E[继续后续代码]
      D --> E
  ```

  

---

#### **2. 双分支判断（if-else）**
- **语法**：
  ```java
  if (条件表达式) {
      // 条件为 true 时执行
  } else {
      // 条件为 false 时执行
  }
  ```

- **示例**：
  ```java
  int age = 18;
  if (age >= 18) {
      System.out.println("成年人");
  } else {
      System.out.println("未成年人");
  }
  ```

- **流程**：

  ```mermaid
  graph TD
      A[开始] --> B{条件成立?}
      B -- Yes --> C[执行if代码块]
      B -- No --> D[执行else代码块]
      C --> E[继续后续代码]
      D --> E
  ```

  

---

#### **3. 多分支判断（if-else if-else）**
- **语法**：
  
  ```java
  if (条件1) {
      // 条件1为 true 时执行
  } else if (条件2) {
      // 条件2为 true 时执行
  } else {
      // 所有条件为 false 时执行
  }
  ```
  
- **示例**：
  ```java
  int score = 75;
  if (score >= 90) {
      System.out.println("优秀");
  } else if (score >= 80) {
      System.out.println("良好");
  } else if (score >= 60) {
      System.out.println("及格");
  } else {
      System.out.println("不及格");
  }
  ```

- **流程**：

  ```mermaid
  graph TD
      A[开始] --> B{条件1成立?}
      B -- Yes --> C[执行代码块1]
      B -- No --> D{条件2成立?}
      D -- Yes --> E[执行代码块2]
      D -- No --> F[执行else代码块]
      C --> G[继续后续代码]
      E --> G
      F --> G
  ```

  

---

### **三、switch 语句**

#### **1. 基本语法**
- **语法**：
  ```java
  switch (表达式) {
      case 值1:
          // 匹配值1时执行
          break;
      case 值2:
          // 匹配值2时执行
          break;
      default:
          // 无匹配时执行
  }
  ```

- **示例**：
  ```java
  int day = 3;
  switch (day) {
      case 1:
          System.out.println("星期一");
          break;
      case 2:
          System.out.println("星期二");
          break;
      default:
          System.out.println("其他");
  }
  ```

- **流程**：

  ```mermaid
  graph TD
      A[开始] --> B[计算表达式]
      B --> C{匹配case值?}
      C -- 值1 --> D[执行代码块1]
      C -- 值2 --> E[执行代码块2]
      C -- 无匹配 --> F[执行default代码块]
      D --> G[break跳出]
      E --> G
      F --> G
      G --> H[继续后续代码]
  ```

  

---

#### **2. switch 的注意事项**
1. **支持的表达式类型**：
   - Java 7+ 支持 `String`、`enum`、`int`、`char` 等。
   - **不支持** `long`、`float`、`double`。

2. **`break` 的作用**：
   - 如果省略 `break`，会继续执行下一个 `case`（即“穿透”现象）。

3. **Java 12+ 的增强语法**：
   - 新增 `->` 简化语法，并支持多个值匹配：
     ```java
     switch (day) {
         case 1, 2, 3 -> System.out.println("工作日");
         case 4, 5 -> System.out.println("临近周末");
         default -> System.out.println("周末");
     }
     ```

---

### **四、关键知识点补充**

#### **1. 三元运算符（简化 if-else）**
- **语法**：
  ```java
  变量 = (条件) ? 值1 : 值2;
  ```
- **示例**：
  ```java
  int a = 10, b = 20;
  int max = (a > b) ? a : b; // 等效于 if-else
  ```

#### **2. 避免条件判断的常见错误**
- **`=` 和 `==` 混淆**：
  ```java
  if (a = 5) {} // 编译错误，应写为 if (a == 5)
  ```
- **浮点数比较**：
  ```java
  // 错误写法
  if (x == 0.3) {}
  
  // 正确写法
  if (Math.abs(x - 0.3) < 1e-6) {}
  ```

#### **3. 使用 `switch` 还是 `if`？**
- **选择依据**：
  | **场景**                    | **推荐结构** |
  | --------------------------- | ------------ |
  | 范围判断（如 `score > 60`） | `if`         |
  | 离散值匹配（如 `day == 1`） | `switch`     |

---

### **五、总结**

| **结构**   | **适用场景**       | **特点**               |
| ---------- | ------------------ | ---------------------- |
| `if`       | 条件复杂或范围判断 | 灵活，可嵌套           |
| `switch`   | 多分支离散值匹配   | 代码更简洁，支持穿透   |
| 三元运算符 | 简化单行条件赋值   | 代码简洁，但可读性较低 |

