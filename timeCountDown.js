var timeCountDown = function(list,beginTime,endTime) {
    //结合实际，暂时只支持整点
    //list为活动日的星期的数组，beginTime 和 endTime 为整点
    //暂只支持当天活动，即 endTime不能为第二天
    var date = new Date();
    var day = date.getDay();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    var hourLeft =  beginTime - hour;
    var minutesLeft = 59 - minutes;
    var secondsLeft = 59 - seconds;

    var activity = [0,0,0,0,0,0,0];
    for (var i = 0; i <  list.length; i++) {
        var activityDay = list[i];
        if (activityDay == 7) {
            activity[0] = 1;
        }else {
            activity[activityDay] = 1;
        }
    }

    console.log(activity)
    var dayLeft = 0;
    //初步设定 dayLeft
    for (var i = day; i < 7; i++) {
        if (activity[i] == 1) {
            //活动日当天 endTime 点前则设为当天活动日
            //endTime点后循环计算下一个活动日
            if (dayLeft !== 0 || hour < endTime) {
                break;
            }
        }
        if (i == 6) {
            //周日 day 转换为 0
            i = -1;
        }
        dayLeft++;
    }


    if (hour >= beginTime && hour < endTime && dayLeft == 0) {
      //活动当天活动期间
      hourLeft = endTime - hour - 1
      $('.time').text('结束');
    } else {
      //其余时间均未开始
      $('.time').text('开始');
      if (hourLeft > 0) {
          hourLeft --;
      } else {
          hourLeft = beginTime - hour + 23;
          dayLeft--;
      }
    }

    //设置模板
    var timeContent = `${dayLeft}天${hourLeft}小时${minutesLeft}分${secondsLeft}秒`;
    $('.time-count').text(timeContent);
}


//每周二周四的18-21点为活动
timeCountDown([2,4],18,21);

//实时刷新
setInterval(function(){
  timeCountDown([2,4],18,21)
},1000);
