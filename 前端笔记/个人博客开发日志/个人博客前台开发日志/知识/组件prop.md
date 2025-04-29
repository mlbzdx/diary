## 1. prop简介

在Vue.js中，组件中的`prop`（属性）是一种用于从父组件向子组件传递数据的机制。默认情况下，props 是单向数据流的，子组件不能直接修改父组件传递的props,这有助于维护应用程序的数据流的可预测性。

## 2. 定义Props

在Vue组件中，可以通过在子组件的选项中定义`props`属性来声明要接收的属性。例如：

```vue
<script>
export default {
  props: {
    message: String,
    count: Number
  }
}
</script>
```

在上述示例中，子组件声明了两个props：`message`和`count`，分别用于接收字符串和数字类型的属性。

定义的`props`属性可以为一个数组的配置，或者为有一定prop验证的对象配置。

* 数组形式

  ```vue
  props: ['message','count']
  ```

* 对象形式

  ```vue
  props: {
      message: String,
      count: Number
    }
  ```

## 3. 传递Props

在父组件中，可以通过将属性绑定到子组件的标签来传递数据。例如：

```vue
<template>
  <child-component :message="parentMessage" :count="totalCount" />
</template>

<script>
export default {
  data() {
    return {
      parentMessage: "Hello from parent",
      totalCount: 42
    };
  }
}
</script>
```

在这个例子中，`parentMessage`和`totalCount`数据被传递到子组件的`message`和`count`props中。

## 4. prop验证

我们可以为组件的 prop 指定验证要求，例如你知道的这些类型。如果有一个需求没有被满足，则 Vue 会在浏览器控制台中警告你。这在开发一个会被别人用到的组件时尤其有帮助。

为了定制 prop 的验证方式，你可以为 `props` 中的值提供一个带有验证需求的对象，而不是一个字符串数组。例如：

```vue
Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].includes(value)
      }
    }
  }
})
```

当 prop 验证失败的时候，(开发环境构建版本的) Vue 将会产生一个控制台的警告。

## 5. 类型检查

类型检查属于prop验证的一部分，用来判断检查父组件传递的数据类型是否正确，通过在子组件的`props`中设置type，来决定需要传入的数据类型。

`type` 可以是下列原生构造函数中的一个：

- `String`
- `Number`
- `Boolean`
- `Array`
- `Object`
- `Date`
- `Function`
- `Symbol`

额外的，`type` 还可以是一个自定义的构造函数，并且通过 `instanceof` 来进行检查确认。例如，给定下列现成的构造函数：

```js
function Person (firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}
```

你可以使用：

```vue
Vue.component('blog-post', {
  props: {
    author: Person
  }
})
```

来验证 `author` prop 的值是否是通过 `new Person` 创建的。

1. Vue.js支持对props的类型进行检查，以确保传递的数据符合预期。

   ```vue
   codeprops: {
     count: {
       type: Number,
       required: true
     }
   }
   ```

2. **默认值**：你可以为props设置默认值，以便在父组件未提供该prop时使用默认值。

   ```vue
   codeprops: {
     message: {
       type: String,
       default: "Default Message"
     }
   }
   ```

