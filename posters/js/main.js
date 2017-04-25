// 3. 通用函数
var $ = function (selector) {
  var method = selector.substr(0, 1) === '.' ? 'getElementsByClassName' : 'getElementById';
  return document[method](selector.substr(1));
};

var random = function (range) {
  var max = Math.max(range[0], range[1]);
  var min = Math.min(range[0], range[1]);

  var diff = max - min;  // 差值, [1, 6] => 5 (0~5)(x>0, x<5,不对，需要加上min)
  var number = Math.ceil(Math.random() * diff + min);

  return number;
};

// 1. 翻面控制
function turn(elem) {
  var cls = elem.className;
  var n = elem.id.split('_')[1];
  var nav_n = $('#nav_' + n);

  if (!/photo_center/.test(cls)) {
    return rsort(n);
  }

  if (/photo_front/.test(cls)) {
    cls = cls.replace(/photo_front/, 'photo_back');
    nav_n.className += ' i_back';
  } else {
    cls = cls.replace(/photo_back/, 'photo_front');
    nav_n.className = nav_n.className.replace(/\s*i_back\s*/, ' ');
  }
  return elem.className = cls;
}

// 6. 计算左右分区的范围 {left: {x: [min, max], y: []}, right: {}}
function range() {
  var range = {
    left: {
      x: [],
      y: []
    },
    right: {
      x: [],
      y: []
    }
  };

  var wrap = {
    w: $('#wrap').clientWidth,
    h: $('#wrap').clientHeight
  };

  var photo = {
    w: $('.photo')[0].clientWidth,
    h: $('.photo')[0].clientHeight
  };

  range.wrap = wrap;
  range.photo = photo;

  // 左分区取值范围
  range.left.x = [0 - photo.w + 100, wrap.w / 2 - photo.w / 2];
  range.left.y = [0 - photo.h + 200, wrap.h - 50];

  // 右分区取值范围
  range.right.x = [wrap.w / 2 + photo.w / 2, wrap.w + photo.w - 50];
  range.right.y = range.left.y;

  return range;
}

// 4. 输出所有的海报
var data = data;
var addPhotos = function () {
  var wrap = $('#wrap');
  var template = wrap.innerHTML;
  var html = [];
  var nav = [];

  data.forEach(function (elem, index) {
    var _html = template
        .replace('{{index}}', index)
        .replace('{{img}}', elem.img)
        .replace('{{caption}}', elem.caption)
        .replace('{{desc}}', elem.desc);

    html.push(_html);
    nav.push('<span id="nav_' + index + '" onclick="turn($(\'#photo_' + index + '\'))" class="i">&nbsp;</span>');
  });

  html.push('<div class="nav">' + nav.join('') + '</div>');
  wrap.innerHTML = html.join('');

  rsort(random([0, data.length]));
};
addPhotos();


// 5. 排序海报
function rsort(n) {
  var _photo = $('.photo');
  var photos = [];

  Array.prototype.forEach.call(_photo, function (elem) {
    elem.className = elem.className.replace(/\s*photo_center\s*/, ' ');
    elem.className = elem.className.replace(/\s*photo_front\s*/, ' ');
    elem.className = elem.className.replace(/\s*photo_back\s*/, ' ');

    elem.className += ' photo_front';
    elem.style.left = '';
    elem.style.top = '';
    elem.style['transform'] = 'rotate(360deg) scale(1.3)';

    photos.push(elem);
  });

  var photo_center = $('#photo_' + n);
  photo_center.className += ' photo_center';
  photo_center = photos.splice(n, 1)[0];

  // 把海报分为左、右区域两个部分
  var photos_left = photos.splice(0, Math.ceil(photos.length / 2));
  var photos_right = photos;

  var ranges = range();

  photos_left.forEach(function (elem) {
    elem.style.left = random(ranges.left.x) + 'px';
    elem.style.top = random(ranges.left.y) + 'px';

    elem.style['transform'] = 'rotate(' + random([-150, 150]) + 'deg) scale(1)';
  });

  photos_right.forEach(function (elem) {
    elem.style.left = random(ranges.right.x) + 'px';
    elem.style.top = random(ranges.right.y) + 'px';

    elem.style['transform'] = 'rotate(' + random([-150, 150]) + 'deg) scale(1)';
  });

  // 控制按钮处理
  var navs = $('.i');
  Array.prototype.forEach.call(navs, function (elem) {
    elem.className = elem.className.replace(/\s*i_current\s*/, ' ');
    elem.className = elem.className.replace(/\s*i_back\s*/, ' ');
  });
  $('#nav_' + n).className += ' i_current ';

}