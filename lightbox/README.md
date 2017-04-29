# lightbox 组件开发文档

[演示demo](https://lusg02.github.io/components/lightbox/lightbox.html)

## 目录结构

index.html

js 逻辑文件

lib 引用库`jQuery`和修复IE6不兼容PNG图片的插件

style 组件样式文件

images 组件测试图片文件

## 特点

- 自定义配置（动画事件，组件图片的宽高，遮罩透明度等）。
- 一个页面中可以存在多个`lightbox`组件。
- 动态创建图片展示弹窗和遮罩层。
- 支持键盘事件和浏览器窗口缩放事件。

## 使用方法

1. 页面中引入`jQuery`库和`lightbox.js`文件。

   示例代码：

   ```html
   <script src="js/jquery.js"></script>
   <script src="js/lightbox.js"></script>
   ```

2. 图片容器配置。

   示例代码：

   ```html
   <img src="images/2-1.jpg"
   	     class="js-lightbox"
   	     data-role="lightbox"
   	     data-source="images/2-1.jpg"
   	     data-group="group-2"
   	     data-id="lkj565lj"
   	     data-caption="it's a long long long picture"
   	     width="100"
   	     height="100"
   >
   ```

   参数说明：

   `data-role`：当前图片是否属于`lightbox`组件；

   `data-source`：当前图片地址，同`src`；

   `data-group`：当前图片属于组件的组别；

   `data-id`：为逻辑代码中区分`caption`；

   `data-caption`：图片展示后的信息。

3. 在`index.html`页面中初始化`carousel`组件。

   ```javascript
   $(function () {
     var lightbox = new LightBox({
       speed: 'fast', // 动画时间
       maxWidth: 900, // 组件容器最大宽度
       maxHeight: 600, // 组件容器最大高度
       maskOpacity: 0.4 // 遮罩透明度
     });
   });
   ```

   ​