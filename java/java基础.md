

## 编写第一个java文件

```java
public class Welcome {
	public static void main(String[] args){
		System.out.printIn("hello world");
	}
}
```

类名 Welcom 必须与编写的文件名保持一致，且文件保存为ascll编码保存。

运行javac+文件名进行文件编译

运行java + 文件名进行运行

> 总结：
>
> 1. java对大小写敏感
>
> 2. 关键字class是类，java是面向对象的语言，所有代码必须位于类里面。
>
> 3. 源文件编译后，得到相关的字节码文件，编译器为每个类生成独立的字节码文件
>
> 4. main方法是java应用程序的入口方法，格式固定：
>
>    ```java
>    public static void main(String[] args){...}
>    ```
>
> 5. 一个源文件可以包含多各类
>
> 6. 每个语句必须以分号结束。

## 一、变量

### **一、变量的核心分类**

#### 1. **按数据类型划分**

| 类型         | 关键字/示例                | 内存占用 | 默认值 | 用途               |
| ------------ | -------------------------- | -------- | ------ | ------------------ |
| **基本类型** | `int`, `double`, `boolean` | 固定     | 见下表 | 存储简单数据       |
| **引用类型** | `String`, `数组`, 自定义类 | 不固定   | `null` | 存储对象或复杂数据 |

**基本类型详解**：

| 类型      | 示例                   | 默认值     | 取值范围       |
| --------- | ---------------------- | ---------- | -------------- |
| `byte`    | `byte b = 1;`          | `0`        | -128 ~ 127     |
| `short`   | `short s = 2;`         | `0`        | -32768 ~ 32767 |
| `int`     | `int i = 10;`          | `0`        | -2³¹ ~ 2³¹-1   |
| `long`    | `long l = 100L;`       | `0L`       | -2⁶³ ~ 2⁶³-1   |
| `float`   | `float f = 3.14f;`     | `0.0f`     | 约 ±3.4e38     |
| `double`  | `double d = 3.14;`     | `0.0d`     | 约 ±1.7e308    |
| `char`    | `char c = 'A';`        | `'\u0000'` | 0 ~ 65535      |
| `boolean` | `boolean flag = true;` | `false`    | `true`/`false` |

#### 2. **按作用域划分**

| 类型         | 声明位置               | 生命周期              | 示例                            |
| ------------ | ---------------------- | --------------------- | ------------------------------- |
| **局部变量** | 方法或代码块内         | 方法/代码块结束即销毁 | `void foo() { int x = 10; }`    |
| **成员变量** | 类内，方法外           | 对象销毁时销毁        | `class A { private int age; }`  |
| **静态变量** | 类内，用 `static` 修饰 | 程序结束时销毁        | `class A { static int count; }` |

### **二、变量的声明与初始化**

#### 1. **基本语法**

```java
// 声明
数据类型 变量名;

// 声明并初始化
数据类型 变量名 = 值;

// 多变量声明
int a = 1, b = 2;
```

#### 2. **初始化规则**

| 变量类型 | 是否必须初始化 | 未初始化的后果                                         |
| -------- | -------------- | ------------------------------------------------------ |
| 局部变量 | **必须**       | 编译错误（`Variable might not have been initialized`） |
| 成员变量 | 可选           | 自动赋默认值（如 `int` 为 `0`）                        |
| 静态变量 | 可选           | 自动赋默认值                                           |

**示例对比**：

```java
public class Test {
    private int memberVar;    // 成员变量（自动初始化为0）
    static int staticVar;     // 静态变量（自动初始化为0）

    public void method() {
        int localVar;         // 局部变量（必须手动初始化）
        // System.out.println(localVar); // 编译错误！
        localVar = 10;       // 正确
    }
}
```

### **三、关键特性与注意事项**

#### 1. **类型转换**

- **自动转换（隐式）**：小类型 → 大类型

```java
int i = 100;
  long l = i;  // 自动转为long
```

- **强制转换（显式）**：大类型 → 小类型（可能丢失精度）

```java
double d = 3.14;
  int i = (int)d;  // i=3（小数部分丢失）
```

#### 2. **`final` 变量（常量）**

```java
final double PI = 3.14159;  // 不可修改
// PI = 3.14; // 编译错误！
```

#### 3. **变量命名规范**

- 驼峰命名法：`userName`, `totalCount`
- 常量全大写：`MAX_SIZE`, `DEFAULT_TIMEOUT`
- 避免保留字：不能使用 `int`, `class` 等

#### 4. **作用域冲突**

```java
int x = 10;
{
    int x = 20; // 编译错误！与外部x冲突
}
```

### **四、项目中的实际应用**

#### 1. **成员变量 vs 局部变量**

```java
public class User {
    private String name; // 成员变量（对象级别）

    public void setName(String name) { // 参数是局部变量
        this.name = name; // 用this区分同名变量
    }
}
```

#### 2. **静态变量的共享性**

```java
public class Counter {
    static int count = 0; // 所有对象共享

    public Counter() {
        count++; // 每创建一个对象，count+1
    }
}
```

#### 3. **基本类型与引用类型的区别**

```java
int a = 10;
int b = a;  // 值拷贝（b=10，修改a不影响b）

String s1 = "Hi";
String s2 = s1; // 引用拷贝（s1和s2指向同一对象）
```

|      |      |      |
| ---- | ---- | ---- |
|      |      |      |
|      |      |      |