# carousel 组件开发文档

[演示demo](https://lusg02.github.io/components/carousel/index.html)

## 目录结构

index.html

js 逻辑文件和引用库`jQuery`

css 组件样式文件

images 组件测试图片文件

## 特点

- 自定义配置（组件容器的宽高、单张图片的宽高，是否缩放，自动播放，播放延迟事件等）。
- 一个页面中可以存在多个`carousel`组件。
- 支持按钮切换图片

## 使用方法

1. 页面中引入`jQuery`库和`carousel.js`文件。

   示例代码：

   ```html
   <script src="js/jquery.js"></script>
   <script src="js/carousel.js"></script>
   ```

2. 配置组件容器节点，添加自定义配置属性`data-settings`。

   示例代码：

   ```html
   <div class="container j_poster"
     data-settings='{ 
       "width": 1000, `
       "height": 270, `
       "poster_w": 640, `
       "poster_h": 270, `
       "scale": 0.9, `
       "speed": 500, `
       "delay": 2000, `
       "autoPlay": true`
      }'>
   ```

3. 图片容器配置，添加`class`为`j_poster_list`。

   示例代码：

   ```html
   <ul class="poster-list j_poster_list">
     <li class="item">
       <a href="javascript:">
         <img src="images/1.jpg">
       </a>
     </li>
   </ul>
   ```

4. 按钮配置容器，添加`class`为`poster-btn`。

   示例代码：

   ```html
   <div class="poster-btn poster-prev-btn"></div>
   <div class="poster-btn poster-next-btn"></div>
   ```

5. 在`index.html`页面中初始化`carousel`组件。

   ```javascript
   $(function () {

     Carousel.init($('.j_poster'));

   });
   ```

   ​





