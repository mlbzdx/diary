CSS 动画是一种通过 `@keyframes` 和 `animation` 属性实现动态样式变化的技术，能够轻松创建多样化的视觉效果。以下是相关核心属性及其用法解析：

---

### **一、关键帧定义（`@keyframes`）**
1. **功能**  
   用于定义动画的中间状态，可以通过百分比或 `from/to` 语法来指定关键帧。  
   ```css
   @keyframes fadeIn {
     0% { opacity: 0; }
     100% { opacity: 1; }
   }
   ```

2. **特点**  
   - 支持多个关键帧（如 `30%`、`60%`），浏览器会自动进行插值过渡。
   - 如果未定义 `0%` 或 `100%`，则会使用元素的默认样式作为起始或结束状态。

---

### **二、动画属性详解（`animation`）**
`animation` 是一个简写属性，由以下几个子属性组成：

1. **`animation-name`**  
   指定绑定的 `@keyframes` 动画名称，例如 `fadeIn`。

2. **`animation-duration`**  
   定义动画的持续时间，单位为 `s`（秒）或 `ms`（毫秒），如 `2s`。

3. **`animation-timing-function`**  
   控制动画的速度曲线，常用值包括：
   - `ease`（默认，慢-快-慢）
   - `linear`（匀速）
   - `cubic-bezier(n,n,n,n)`（自定义贝塞尔曲线）。

4. **`animation-delay`**  
   设置动画开始前的延迟时间，支持负值（跳过动画的部分内容）。

5. **`animation-iteration-count`**  
   指定动画的播放次数，例如 `1`（播放一次）或 `infinite`（无限循环）。

6. **`animation-direction`**  
   控制动画播放方向：
   - `normal`（默认，从头到尾）
   - `reverse`（反向，从尾到头）
   - `alternate`（交替，奇数次正向，偶数次反向）。

7. **`animation-fill-mode`**  
   决定动画开始前和结束后的样式：
   - `forwards`（保持动画结束时的样式）
   - `backwards`（应用动画开始时的样式，延迟期间也生效）。

8. **`animation-play-state`**  
   控制动画的播放状态：
   - `running`（播放中）
   - `paused`（暂停）。

---

### **三、应用示例**
1. **基础动画（淡入效果）**  
   ```css
   .box {
     animation: fadeIn 2s ease-in-out 1s infinite alternate;
   }
   ```

2. **组合多个动画**  
   ```css
   .element {
     animation: 
       slide 3s ease-out,
       rotate 1s linear 3s;
   }
   ```

3. **动态控制动画状态**  
   可通过 JavaScript 修改 `animation-play-state` 来实现动画的暂停或继续：
   ```javascript
   document.querySelector('.box').style.animationPlayState = 'paused';
   ```

---

### **四、`animation` 与 `transition` 的区别**
| 特性           | `animation`                      | `transition`               |
| -------------- | -------------------------------- | -------------------------- |
| **触发方式**   | 自动或手动触发                   | 需事件触发（如 `:hover`）  |
| **关键帧数量** | 支持多个关键帧                   | 仅支持起始和结束两帧       |
| **循环控制**   | 支持无限循环                     | 仅能单次执行               |
| **适用场景**   | 适合复杂动画（如旋转、缩放组合） | 适合简单过渡（如颜色渐变） |
| **代码复杂度** | 需要定义 `@keyframes`            | 直接绑定样式变化           |

---

### **五、性能优化建议**
1. **优先使用 GPU 加速属性**  
   使用 `opacity` 和 `transform` 等不会触发重排的属性（例如 `translate`、`scale`）。

2. **避免触发重排**  
   尽量避免直接操作 `width`、`height` 等会导致浏览器重排的属性，改用 `transform` 实现相应效果。

3. **使用 `will-change` 提示优化**  
   在动画元素上添加 `will-change`，提示浏览器提前优化：
   ```css
   .box {
     will-change: transform, opacity;
   }
   ```

通过合理运用这些属性和优化技巧，可以轻松实现从简单过渡到复杂交互的多样化动画效果。