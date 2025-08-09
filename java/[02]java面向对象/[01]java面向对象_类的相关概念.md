# **面向对象编程（OOP）核心概念详解**

## **一、面向对象与面向过程的比较**

### **1. 面向过程（Procedure-Oriented Programming, POP）**
- **核心思想**：以**过程和步骤**为中心，将问题分解为一系列的**函数**（无状态的操作）。
- **特点**：
  - 数据与操作分离（数据通过参数传递给函数）。
  - 代码复用性较低（函数难以直接复用）。
  - 适用于简单问题（如计算器、脚本工具）。
- **示例**：用面向过程实现“烤蛋糕”
```java
// 步骤1：准备材料
void prepareIngredients() { ... }
// 步骤2：混合材料
void mix() { ... }
// 步骤3：烘烤
void bake() { ... }
// 主流程：按照步骤顺序调用函数
public static void main(String[] args) {
    prepareIngredients();
    mix();
    bake();
}
```

### **2. 面向对象（Object-Oriented Programming, OOP）**
- **核心思想**：以**对象**为中心，将问题分解为**对象之间的交互**（对象 = 数据 + 操作）。
- **特点**：
  - 数据与操作封装在对象中（高内聚）。
  - 通过**类**实现代码复用（支持继承和多态）。
  - 适用于复杂系统（如电商平台、游戏开发）。
- **示例**：用面向对象实现“烤蛋糕”
```java
// 定义“烤箱”类（包含数据和操作）
class Oven {
    int temperature; // 属性（数据）
    void setTemperature(int temp) { ... } // 方法（操作）
    void bake(Cake cake) { ... }
}
// 定义“蛋糕”类
class Cake {
    String flavor; // 属性
}
// 主流程：通过对象之间的交互完成任务
public static void main(String[] args) {
    Oven oven = new Oven(); // 创建烤箱对象
    Cake cake = new Cake(); // 创建蛋糕对象
    oven.setTemperature(180);
    oven.bake(cake); // 使用烤箱对象的方法
}
```

### **3. 两者的本质区别**
| **面向过程**         | **面向对象**         |
| -------------------- | -------------------- |
| 关注“怎么做”（步骤） | 关注“谁来做”（对象） |
| 函数是最小单位       | 类/对象是最小单位    |
| 数据分散在函数间传递 | 数据封装在对象内部   |

---

## **二、类（Class）的基本概念与定义**

### **1. 什么是类？**
- **类是对象的模板**：它定义了对象的**属性**（数据）和**方法**（操作）。
- **对象是类的实例**：通过类创建的具体实体（例如，“人”是类，“张三”是对象）。

### **2. Java 中类的定义语法**
```java
[修饰符] class 类名 {
// 成员变量（属性）
// 构造器
// 成员方法
}
```
- **修饰符**：如 `public`（公开）、`private`（私有，仅类内部可见）、默认（包内可见）。
- **类名**：遵循大驼峰命名法（如 `Student`、`UserAccount`）。

**示例**：定义一个“学生”类			

```java
public class Student { // 公开类
    // 属性（成员变量）
    String name; // 姓名
    int age;    // 年龄

    // 构造器（用于初始化对象）
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // 方法（行为）
    public void study() {
        System.out.println(name + "正在学习");
    }
}
```

---

## **三、类的三种主要成员**

### **1. 属性（成员变量）**
#### **（1）概念**
属性是类中定义的变量，用于存储对象的**状态数据**（例如学生的姓名和年龄）。

#### **（2）默认值初始化规则**
如果成员变量没有显式赋值，Java 会自动赋予默认值：
| 数据类型                     | 默认值  |
| ---------------------------- | ------- |
| 整数类型（`int`/`long`）     | `0`     |
| 浮点类型（`float`/`double`） | `0.0`   |
| 布尔类型                     | `false` |
| 引用类型（如 `String`）      | `null`  |

**示例**：
```java
class Test {
    int num;      // 默认值为0
    boolean flag; // 默认值为false
    String str;   // 默认值为null
}
```

#### **（3）定义语法**
```java
[修饰符] 数据类型 属性名 [= 默认值];
```
- **修饰符**：如 `public`、`private`（推荐）、`protected`。
- **数据类型**：可以是基本类型或引用类型。

 **示例**：
```java
public class Person {
    private String name; // 私有属性，仅类内部可访问
    public int age = 18; // 公开属性，默认值为18
}
```

#### **（4）属性的封装（getter/setter）**
为了保护属性不被随意修改，通常将属性设为 `private`，并通过 `public` 的 `getter` 和 `setter` 方法访问：
```java
public class Student {
    private String name; // 私有属性

    // getter：获取name的值
    public String getName() {
        return name;
    }

    // setter：设置name的值（可以添加校验逻辑）
    public void setName(String name) {
        if (name != null && !name.isEmpty()) { // 校验非空
            this.name = name;
        }
    }
}
```

---

### **2. 方法（成员方法）**
#### **（1）概念**
方法是类中定义的函数，用于描述对象的**行为**（例如学生的“学习”和“吃饭”）。

#### **（2）定义语法**
```java
[修饰符] 返回值类型 方法名([参数列表]) {
// 方法体
[return 返回值;]
}
```
- **返回值类型**：可以是 `void`（无返回值）或具体数据类型。
- **参数列表**：可以是空，也可以包含多个参数。

**示例**：
```java
public class Calculator {
    // 无参无返回值方法
    public void showMenu() {
        System.out.println("1. 加法 2. 减法");
    }

    // 有参有返回值方法（计算和）
    public int add(int a, int b) {
        return a + b; // 返回计算结果
    }
}
```

#### **（3）方法的调用**
通过对象调用方法：
```java
Calculator calc = new Calculator(); // 创建对象
calc.showMenu(); // 调用无参方法
int sum = calc.add(3, 5); // 调用有参方法，并接收返回值
```

---

### **3. 构造器（Constructor）**
#### **（1）概念**
构造器是**创建对象时自动调用的特殊方法**，用于初始化对象的属性（例如设置 `name` 和 `age`）。

#### **（2）特点**
- 方法名与类名**完全相同**。
- 没有返回值类型（甚至没有 `void`）。
- 如果没有显式定义，Java 会自动生成一个**默认无参构造器**。

#### **（3）定义语法**
```java
[修饰符] 类名([参数列表]) {
// 初始化代码（例如给属性赋值）
}
```

#### **（4）示例**
```java
public class Person {
    String name;
    int age;

    // 无参构造器（默认构造器）
    public Person() {
        name = "未知";
        age = 0;
    }

    // 有参构造器（自定义初始化）
    public Person(String name, int age) {
        this.name = name; // 使用 this 指代当前对象
        this.age = age;
    }
}

// 使用构造器创建对象
Person p1 = new Person(); // 调用无参构造器
Person p2 = new Person("张三", 20); // 调用有参构造器
```

#### **（5）构造器重载**
一个类可以定义多个构造器，参数列表不同（个数/类型/顺序），以实现灵活的初始化：
```java
class Student {
    String name;
    int age;

    // 构造器重载1：无参
    public Student() {}

    // 构造器重载2：仅name
    public Student(String name) {
        this.name = name;
    }

    // 构造器重载3：name+age
    public Student(String name, int age) {
        this(name); // 调用其他构造器（必须是第一行）
        this.age = age;
    }
}
```

---

## **四、补充知识点**

### **1. `this` 关键字**
- **指代当前对象**：用于区分成员变量和局部变量（当名称冲突时）。
```java
public void setName(String name) {
    this.name = name; // this.name：成员变量；name：形参
}
```
- **调用本类其他构造器**：`this(参数)` 必须在构造器的第一行。
- **调用本类成员方法**：`this.study()`（通常可以省略 `this`）。

---

### **总结**
- **面向对象编程**：以对象为中心，封装数据与操作，适合处理复杂系统。
- **类的核心组成**：
  - 属性：用于存储对象的状态，推荐使用封装（`getter`/`setter`）。
  - 方法：定义对象的行为。
  - 构造器：用于初始化对象，支持构造器重载。
- **必须掌握**：构造器重载、`this` 关键字、封装（`getter`/`setter`）、局部变量与成员变量的区别。

这些概念是 Java 面向对象编程的基础，后续的继承、多态等高级特性都基于这些内容展开。