;(function () {

  var datepicker = window.datepicker;

  var monthData, $wrapper;

  datepicker.buildUi = function (year, month) {

    monthData = datepicker.getMonthData(year, month);

    var html = '<div class="ui-datepicker-header">' +
        '<a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn"><</a>' +
        '<a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">></a>' +
        '<span class="ui-datepicker-month">' + monthData.year + '-' + monthData.month + '</span>' +
        '</div>' +
        '<div class="ui-datepicker-body">' +
        '<table>' +
        '<thead>' +
        '<tr>' +
        '<th>一</th>' +
        '<th>二</th>' +
        '<th>三</th>' +
        '<th>四</th>' +
        '<th>五</th>' +
        '<th>六</th>' +
        '<th>七</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>';

    monthData.days.forEach(function (elem, index) {
      if (index % 7 === 0) {
        html += '<tr>';
      }
      html += '<td data-date="' + elem.date + '">' + elem.showDate + '</td>';
      if (index % 7 === 6) {
        html += '</tr>';
      }
    });

    html += '</tbody>' + '</table>' + '</div>';

    return html;

  };

  datepicker.render = function (direction) {

    var year, month;

    if (monthData) {
      year = monthData.year;
      month = monthData.month;
    }

    if (direction === 'prev') month--;
    if (direction === 'next') month++;

    if (month === 0) {
      year--;
      month = 12;
    }
    if (month === 13) {
      year++;
      month = 1;
    }

    var html = datepicker.buildUi(year, month);

    if (!$wrapper) {
      $wrapper = document.createElement('div');
      document.body.appendChild($wrapper);
      $wrapper.className = 'ui-datepicker-wrapper';
    }

    $wrapper.innerHTML = html;

  };

  datepicker.init = function (input) {

    datepicker.render();

    var $input = document.querySelector(input);

    var isShow = false;

    // 日历组件的显示隐藏
    $input.addEventListener('click', function () {
      if (isShow) {
        $wrapper.classList.remove('ui-datepicker-wrapper-show');
        isShow = false;
      } else {
        $wrapper.classList.add('ui-datepicker-wrapper-show');

        var left = $input.offsetLeft;
        var top = $input.offsetTop;
        var height = $input.offsetHeight;
        $wrapper.style.top = top + height + 2 + 'px';
        $wrapper.style.left = left + 'px';

        isShow = true;
      }
    }, false);

    //  切换月份
    $wrapper.addEventListener('click', function (e) {
      var $target = e.target;

      if (!$target.classList.contains('ui-datepicker-btn')) return;

      if ($target.classList.contains('ui-datepicker-prev-btn')) {  // 上一月
        datepicker.render('prev');
      } else if ($target.classList.contains('ui-datepicker-next-btn')) {  // 下一月
        datepicker.render('next');
      }

    }, false);

    // 点击日期
    $wrapper.addEventListener('click', function (e) {
      var $target = e.target;
      if ($target.tagName.toLowerCase() !== 'td') return false;

      var date = new Date(monthData.year, monthData.month - 1, $target.dataset.date);

      $input.value = format(date);

      $wrapper.classList.remove('ui-datepicker-wrapper-show');
      isShow = false;
    }, false);
  };

  function format(date) {
    var ret = '';

    var double = function (num) {
      if (num <= 9) {
        return '0' + num;
      }
      return num;
    };

    ret += date.getFullYear() + '-';
    ret += double(date.getMonth() + 1) + '-';
    ret += double(date.getDate());

    return ret;
  }

})();
