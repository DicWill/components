# JS+CSS3 实现散列海报画廊

## 案例的思路方法

1. 模块分析法
2. VCD分析法
   - View：HTML + CSS 实现基本界面模板
   - Controller：JavaScript内容处理、事件处理
   - Data

## View

对View进行模块分解，各模块职责如下

- 当前展现的海报区
  - 水平垂直居中
  - 可以被控制条按钮控制实现展现、翻转
- 左右存放海报区
  - 以当前海报区为中间位置分为左右区，存放其他的海报
  - 每个海报位置随机，角度随机
- 控制条区
  - 自身按钮的翻转
  - 展现、翻转对应的海报

模板html代码如下

```html
<div class="wrap" id="wrap">
  <!-- photo 负责平移、旋转 -->
  <div class="photo photo_front" onclick="turn(this)" id="photo_{{index}}">
    <!-- photo-wrap 负责翻转 -->
    <div class="photo-wrap">
      <div class="side side-front">
        <p class="image">
          <img src="images/{{img}}">
        </p>
        <p class="caption">{{caption}}</p>
      </div>
      <div class="side side-back">
        <p class="desc">{{desc}}</p>
      </div>
    </div>
  </div>
</div>
```

模板里的`{{img}}`，`{{caption}}`， ，`{{desc}}`即为要替换的模板字符串。

## Data

data.js的主要代码如下

```javascript
var data = [];
var dataStr = '1、美国往事<br>\
<br>\
导演: 赛尔乔·莱翁内<br>\
编剧: 皮耶罗·德·伯纳迪 / 恩里科·梅迪欧力 / 弗兰科·费里尼 / 赛尔乔·莱翁内<br>\
主演: 罗伯特·德尼罗 / 詹姆斯·伍兹 / 伊丽莎白·麦戈文 / 乔·佩西 / 波特·杨<br>\
类型: 剧情 / 犯罪<br>\
制片国家/地区: 意大利 / 美国<br>\
语言: 英语 / 法语 / 意大利语<br>\
上映日期: 1984-02-17(波士顿首映) / 1984-09-28(意大利)<br>\
片长: 229分钟(导演剪辑版) / 251分钟(导演剪辑加长版)<br>\
<br>\
<br>\
...\
';

var d = dataStr.split('<br><br><br>');
for (var i = 0; i < d.length; i++) {
  var c = d[i].split('<br><br>');
  data.push({
    img: c[0].replace('、', '-') + '.jpg',
    caption: c[0].split('、')[1],
    desc: c[1]
  });
}
```

data数组的每一项的`img`，`caption`，`desc`将替换  View中模板字符串`{{img}}`，`{{caption}}`， `{{desc}}`。

## Controller

- 翻面控制 `function turn() {}`

- 输出所有的海报`function addPhotos() {}`

- 海报排序`function rsort() {}`

- 计算左右分区的范围`function range() {}`

   {left: {x: [min, max], y: []}, right: {}}

- 控制按钮处理

  ```javascript
  var navs = $('.i');
  Array.prototype.forEach.call(navs, function (elem) {
    elem.className = elem.className.replace(/\s*i_current\s*/, ' ');
    elem.className = elem.className.replace(/\s*i_back\s*/, ' ');
  });
  $('#nav_' + n).className += ' i_current ';
  ```

  ​