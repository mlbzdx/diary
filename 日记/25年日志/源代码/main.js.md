## 源代码

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 导入ElementPlus的相关内容
import ElementPlus from 'element-plus'
// 01 导入消息提示（Message）组件
import { ElMessage } from 'element-plus'
// 02 导入ElementPlus的全局主题样式
import 'element-plus/theme-chalk/index.css'
// 03 导入ElementPlus的中文支持
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// 04 导入ElementPlus的所有图表
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'

// 全局样式表
import "./assets/css/base.css"

const app = createApp(App)

// 添加全局变量
app.config.globalProperties.$message = ElMessage


// 注册全部element图标
app.use(ElementPlus, { locale: zhCn })
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(createPinia())
app.use(router)

app.mount('#app')
```

## 分析