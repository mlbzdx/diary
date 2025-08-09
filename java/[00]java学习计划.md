## 结合项目的具体学习计划

既然你已经安装好开发环境，现在可以结合这个 **Spring Boot 项目** 来学习 Java 基础。以下是分阶段的学习路径和项目中的对应文件参考，帮助你高效过渡到实战开发：

### **一、Java 基础核心语法（1-2周）**

#### **1. 基础语法（从零开始） **

- **学习目标**：变量、循环、条件判断、方法
- 对应项目文件
  - `entity/` 下的简单类（如 `User.java`）：

```java
public class User {
        private Long id;      // 变量定义
        private String name;  // 数据类型（String为Java内置类）
        // Getter/Setter 方法（基础方法）
    }
```

#### **2. 面向对象（OOP）**

- **学习目标**：类、继承、接口、多态
- 对应项目文件
  - `service/` 和 `impl/` 目录（接口与实现类）：

```java
// 接口定义（UserService.java）
    public interface UserService {
        User getUserById(Long id);  // 抽象方法
    }

    // 实现类（UserServiceImpl.java）
    @Service
    public class UserServiceImpl implements UserService {
        @Override
        public User getUserById(Long id) {  // 方法重写
            return userMapper.selectById(id);
        }
    }
```

#### **3. 集合框架**

- **学习目标**：List、Map、Set 的使用
- 对应项目文件
  - 查看 `utils/PoetryUtil.java` 中的集合操作示例。

### **二、Java 进阶与项目结合（1-2周）**

#### **1. 异常处理**

- **学习目标**：`try-catch`、自定义异常
- 对应项目文件
  - `handle/PoetryExceptionHandler.java`（全局异常处理）：

```java
 @ExceptionHandler(Exception.class)
    public PoetryResult handleException(Exception e) {
        return PoetryResult.error("系统错误: " + e.getMessage());
    }
```

#### **2. 注解（Annotation）**

- **学习目标**：`@Override`、`@Service`、`@Autowired`
- 对应项目文件
  - 所有 `@Controller` 和 `@Service` 类（如 `UserController.java`）。

#### **3. 文件与IO**

- **学习目标**：文件读写、工具类封装

- 对应项目文件

  ：`utils/storage/` 目录（文件上传下载实现）。

### **三、数据库与Spring Boot（1-2周）**

#### **1. JDBC 基础**

- **学习目标**：数据库连接、SQL 执行
- 对应项目文件
  - `dao/UserMapper.java`（MyBatis 接口） + `resources/mapper/UserMapper.xml`（SQL 映射）。

#### **2. Spring Boot 核心**

- **学习目标**：启动流程、配置、RESTful API
- 对应项目文件
  - `PoetryApplication.java`（主启动类）：

```
Java    @SpringBootApplication
    public class PoetryApplication {
        public static void main(String[] args) {
            SpringApplication.run(PoetryApplication.class, args);  // 启动Spring Boot
        }
    }
```

- `controller/UserController.java`（API 示例）：

```
Java    @RestController
    @RequestMapping("/user")
    public class UserController {
        @Autowired
        private UserService userService;

        @GetMapping("/{id}")  // RESTful 风格API
        public User getUser(@PathVariable Long id) {
            return userService.getUserById(id);
        }
    }
```

### **四、实战任务（逐步深入）**

#### **任务1：添加一个简单接口**

1. 在 `entity/` 下新建 `Book.java`（模仿 `User.java`）。
2. 在 `controller/` 下创建 `BookController.java`，实现一个返回字符串的接口：

```java
@GetMapping("/hello")
   public String sayHello() {
       return "Hello from BookController!";
   }
```

1. 启动项目，访问 `http://localhost:8080/book/hello` 测试。

#### **任务2：连接数据库查询**

1. 在 `dao/` 下新增 `BookMapper.java`（参考 `UserMapper.java`）。
2. 在 `resources/mapper/` 下创建 `BookMapper.xml`，写一条简单查询 SQL。
3. 通过 `BookController` 调用查询并返回数据。