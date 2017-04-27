# datepicker 开发文档
[演示demo](https://lusg02.github.io/components/datepicker/index.html)

## 目录结构

### index.html  

- 静态结构编写

  ```html
  <label>
    <input type="text" class="datepicker">
  </label>  
  ```

- datepicker组件的初始化

  ```html
  <script>
    datepicker.init('.datepicker');
  </script>  
  ```

###  css

组件样式文件夹

### js

逻辑文件夹

#### data.js

- 日历数据的获取

- 返回组件逻辑需要的数据，把datepicker对象暴露在全局环境中

  ```javascript
  (function () {
    var datepicker = {};
    datepicker.getMonthData = function (year, month) {
      // 逻辑代码...
      // 首月末月的数据处理，月初月末的数据处理
      
      return {
        year: year,
        month: month,
        days: ret
      };
    };
    window.datepicker = datepicker;
  })();
  ```

#### datepicker.js

```javascript
(function () {
  var datepicker = window.datepicker;
  
  datepicker.buildUi = function () {
    // 构建组件的静态结构
  };
  
  datepicker.render = function () {
    // 渲染组件DOM结构
  };
  
  datepicker.init = function () {
    // 组件初始化
    
    /**
    *1. 处理日历组件的显示隐藏事件
    *2. 切换月份事件
    *3. 点击日期事件
    */
  };
})();
```



