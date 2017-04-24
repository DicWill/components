;(function ($) {

  function LightBox(settings) {
    var self = this;

    // 默认参数
    this.settings = {
      speed: 500
    };
    // 配置参数覆盖默认参数
    $.extend(this.settings, settings || {});

    //  创建遮罩和弹出框
    this.popupMask = $('<div id="J_LightBoxMask">');
    this.popupWin = $('<div id="J_LightBoxPopup">');

    //  保存body
    this.bodyNode = $(document.body);


    //  渲染剩余的DOM，并插入到body中
    this.render();

    this.picViewArea = this.popupWin.find('div.lightbox-pic-view'); // 图片预览区
    this.popupPic = this.popupWin.find('img.lightbox-image');
    this.picCaptionArea = this.popupWin.find('div.lightbox-pic-caption');
    this.nextBtn = this.popupWin.find('span.lightbox-next-btn');
    this.prevBtn = this.popupWin.find('span.lightbox-prev-btn');

    this.captionText = this.popupWin.find('p.pic-desc');
    this.currentIndex = this.popupWin.find('span.pic-index');
    this.closeBtn = this.popupWin.find('span.lightbox-close-btn');

    //  事件委托，获取组数据
    this.groupName = null;
    this.groupData = [];
    this.bodyNode.delegate('.js-lightbox,*[data-role="lightbox"]', 'click', function (e) {
      // 阻止事件冒泡
      e.stopPropagation();
      var currentGroupName = $(this).attr('data-group');
      if (currentGroupName !== self.groupName) {
        self.groupName = currentGroupName;
        //  根据当前组名获取同一组数据
        self.getGroup();
      }

      // 初始化弹出
      self.initPopup($(this));
    });
    
  //  关闭弹出框
    this.popupMask.click(function () {
      $(this).fadeOut();
      self.popupWin.fadeOut();
      self.clear = false;
    });
    this.closeBtn.click(function () {
      self.popupMask.fadeOut();
      self.popupWin.fadeOut();
      self.clear = false;
    });

  //  绑定左右按钮切换事件
    this.flag = true;
    this.nextBtn.hover(function () {
      if (!$(this).hasClass('disabled') && self.groupData.length > 1) {
        $(this).addClass('lightbox-next-btn-show ');
      }
    }, function () {
      if (!$(this).hasClass('disabled') && self.groupData.length > 1) {
        $(this).removeClass('lightbox-next-btn-show');
      }
    }).click(function (e) {
      if (!$(this).hasClass('disabled') && self.flag) {
        self.flag = false;
        e.stopPropagation();
        self.goto('next');
      }
    });

    this.prevBtn.hover(function () {
      if (!$(this).hasClass('disabled') && self.groupData.length > 1) {
        $(this).addClass('lightbox-prev-btn-show');
      }
    }, function () {
      if (!$(this).hasClass('disabled') && self.groupData.length > 1) {
        $(this).removeClass('lightbox-prev-btn-show');
      }
    }).click(function (e) {
      if (!$(this).hasClass('disabled') && self.flag) {
        self.flag = false;
        e.stopPropagation();
        self.goto('prev');
      }
    });

  //  判断是否IE6浏览器
    this.isIE6 = /MSIE 6.0/gi.test(window.navigator.userAgent);

  //  绑定窗口调整事件和键盘事件
    this.clear = false;
    var timer = null;
    $(window).resize(function () {
      if (self.clear) {
        clearTimeout(timer);
        timer = setTimeout(function () {
          self.loadPic(self.groupData[self.index].src);
        }, 500);

        if (self.isIE6) {
          self.popupMask.css({
            width: $(window).width(),
            height: $(window).height()
          })
        }
      }
    }).keyup(function (e) {
      var key_code = e.which;
      if (self.clear) {
        if (key_code === 38 || key_code === 37) {
          self.prevBtn.click();
        } else if (key_code === 39 || key_code === 40) {
          self.nextBtn.click();
        }
      }
    });

  //  IE6
    if (this.isIE6) {
      $(window).scroll(function () {
        self.popupMask.css('top', $(window).scrollTop());
      });
    }


  }

  LightBox.prototype = {
    goto: function (dir) {
      if (dir === 'next') {
        //  this.groupData
        //  this.index
        this.index++;
        if (this.index >= this.groupData.length - 1) {
          this.nextBtn.addClass('disabled').removeClass('lightbox-next-btn-show');
        }
        if (this.index !== 0) {
          this.prevBtn.removeClass('disabled');
        }

        var src = this.groupData[this.index].src;
        this.loadPic(src);

      } else if (dir === 'prev') {
        this.index--;
        if (this.index <= 0) {
          this.prevBtn.addClass('disabled').removeClass('lightbox-prev-btn-show');
        }
        if (this.index !== this.groupData.length - 1) {
          this.nextBtn.removeClass('disabled');
        }
        src = this.groupData[this.index].src;
        this.loadPic(src);
      }
    },
    loadPic: function (src) {
      var self = this;
      this.popupPic.css({
        width: 'auto',
        height: 'auto'
      }).hide();

      this.preLoadPic(src, function () {
        self.popupPic.attr('src', src);
        var picWidth = self.popupPic.width(),
            picHeight = self.popupPic.height();

        self.changePic(picWidth, picHeight);
      })
    },
    changePic: function (width, height) {
      var self = this;
      var winHeight = $(window).height(),
          winWidth = $(window).width();

      // 如果图片的宽高大于浏览器视口的宽高
      var scale = Math.min(winWidth / (width + 10), winHeight / (height + 10), 1);
      width = width * scale;
      height = height * scale;

      this.picViewArea.animate({
        width: width - 10,
        height: height - 10
      }, self.settings.speed);

      var top = (winHeight - height) / 2;

      top = this.isIE6 ? (top + $(window).scrollTop()) : top;
      this.popupWin.animate({
        width: width,
        height: height,
        marginLeft: -width / 2,
        top: top
      }, self.settings.speed, function () {
        self.popupPic.css({
          width: width - 10,
          height: height - 10
        }).fadeIn();
        self.picCaptionArea.fadeIn();
        self.flag = true;
        self.clear = true;
      });

      //  设置文字描述和索引
      this.captionText.text(this.groupData[this.index].caption);
      this.currentIndex.text(this.index + 1 + ' / ' + this.groupData.length);
    },
    preLoadPic: function (src, callback) {
      var img = new Image();
      if (window.ActiveXObject) {
        img.onreadystatechange = function () {
          if (this.readyState === 'complete') {
            callback();
          }
        }
      } else {
        img.onload = function () {
          callback();
        }
      }

      img.src = src;
    },
    showMaskAndPopup: function (src, id) {
      var self = this;

      this.popupPic.hide();
      this.picCaptionArea.hide();

      var winWidth = $(window).width();
      var winHeight = $(window).height();

      this.picViewArea.css({
        width: winWidth / 2,
        height: winHeight / 2
      });

      if (this.isIE6) {
        var scrollTop = $(window).scrollTop();
        this.popupMask.css({
          width: winWidth,
          height: winHeight,
          top: scrollTop
        })
      }

      this.popupMask.fadeIn();
      this.popupWin.fadeIn();

      var viewHeight = winHeight / 2 + 10;
      var animateTop = (winHeight - viewHeight) / 2;
      this.popupWin.css({
        width: winWidth / 2 + 10,
        height: viewHeight,
        marginLeft: -(winWidth / 2 + 10) / 2,
        top: ((this.isIE6) ? -(viewHeight+scrollTop) : -viewHeight)
      }).animate({
        top: this.isIE6 ? (animateTop + scrollTop) : animateTop
      }, self.settings.speed, function () {
        //  回调函数加载图片
        self.loadPic(src);
      });

      //  根据当前点击元素的ID获取在当前组别里的索引
      this.index = this.getIndexOf(id);
      var length = this.groupData.length;
      if (length > 1) {
        if (this.index === 0) {
          this.prevBtn.addClass('disabled');
          this.nextBtn.removeClass('disabled');
        } else if (this.index === length - 1) {
          this.prevBtn.removeClass('disabled');
          this.nextBtn.addClass('disabled');
        } else {
          this.prevBtn.removeClass('disabled');
          this.nextBtn.removeClass('disabled');
        }
      } else {
        this.prevBtn.addClass('disabled');
        this.nextBtn.addClass('disabled');
      }
    },
    getIndexOf: function (id) {
      var index = 0;
      $(this.groupData).each(function (i) {
        index = i;
        if (this.id === id) {
          return false;
        }
      });

      return index;
    },
    initPopup: function (current) {
      var sourceSrc = current.attr('data-source'),
          currentId = current.attr('data-id');
      this.showMaskAndPopup(sourceSrc, currentId);
    },
    getGroup: function () {
      var self = this;
      //  根据当前的组名称获取页面所有相同组名称的对象
      var groupList = this.bodyNode.find('*[data-group=' + this.groupName + ']');

      // 清空数组数据
      this.groupData.length = 0;
      groupList.each(function () {
        self.groupData.push({
          src: $(this).attr('data-source'),
          id: $(this).attr('data-id'),
          caption: $(this).attr('data-caption')
        });
      });
    },
    render: function () {
      var str =
          '<div class="lightbox-pic-view">\
            <span class="lightbox-btn lightbox-prev-btn"></span>\
            <img src="../images/1-1.jpg" class="lightbox-image">\
            <span class="lightbox-btn lightbox-next-btn"></span>\
            </div>\
            <div class="lightbox-pic-caption">\
            <div class="caption-area">\
            <p class="pic-desc"></p>\
            <span class="pic-index">0 of 0</span>\
            </div>\
            <span class="lightbox-close-btn"></span>\
          </div>';
      this.popupWin.html(str);
      this.bodyNode.append(this.popupMask);
      this.bodyNode.append(this.popupWin);
    }
  };

  window['LightBox'] = LightBox;
})(jQuery);
