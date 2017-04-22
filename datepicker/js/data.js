;(function () {
  var datepicker = {};

  datepicker.getMonthData = function (year, month) {

    var ret = [];

    if (!year || !month) {
      var today = new Date();
      year = today.getFullYear();
      month = today.getMonth() + 1;
    }

    var firstDay = new Date(year, month - 1, 1);  // 当月第一天
    var firstDayWeekDay = firstDay.getDay();  // 当月第一天是星期几(1,2,3,4,5,6,0)
    if (firstDayWeekDay === 0) {
      firstDayWeekDay = 7;
    }

    year = firstDay.getFullYear();
    month = firstDay.getMonth() + 1;

    var lastDay = new Date(year, month, 0);  // 当月的最后一天
    var lastDate = lastDay.getDate();  // 当月的最后一天是几号

    var lastDayOfLastMonth = new Date(year, month - 1, 0);  // 上月最后一天
    var lastDateOfLastMonth = lastDayOfLastMonth.getDate();  // 上月最后一天是几号

    var preMonthDayCount = firstDayWeekDay - 1;  // 根据本月第一天星期几(1,2,3,4,5,6,7)判断日历界面显示上一个月的几天

    for (var i=0; i<7*6; i++) {  // 一个月份最多出现跨了六周的情况
      /**
       * 日历上显示上个月preMonthDayCount天，
       * 也就是 i 从 0 到 preMonthDayCount-1 都是上一个月的数据。
       * 那么当月1号对应的i: preMonthDayCount-1 + 1;
       * 当月2号对应的i: preMonthDayCount-1 + 2;
       * 当月date号对应的i: i = preMonthDayCount-1 + date;
       * 也就是 var date = i + 1 - preMonthDayCount.
       */
      var date = i + 1 - preMonthDayCount;
      var showDate = date;
      var thisMonth = month;

      if (date <= 0) {  // 上一个月
        thisMonth = month - 1;
        showDate = lastDateOfLastMonth + date;
      } else if (date > lastDate) {  // 下一个月
        thisMonth = month + 1;
        showDate = showDate - lastDate;
      }

      if (thisMonth === 0) thisMonth = 12;  // 上一年的12月份
      if (thisMonth === 13) thisMonth = 1;  // 下一年的1月份

      ret.push({
        month: thisMonth,
        date: date,
        showDate: showDate
      });
    }

    return {
      year: year,
      month: month,
      days: ret
    };
  };

  window.datepicker = datepicker;
})();
