export function formatDate(val) { 
     let time = val.replace("T", " ");
        let result = time.split(' ')[0];
        let date = new Date(time.replace('-', '/').replace('-', '/'));
        let oneminute = 1000 * 60;
        let onehour = oneminute * 60;
        let oneday = onehour * 24;
        let nowdate = new Date();
        let timeDiff = nowdate.getTime() - date.getTime();
        let dayDiff = nowdate.getDate() - date.getDate();
        if (timeDiff < 0) {
            result = "刚刚";
        }
        else if (timeDiff < oneminute * 5) {
            result = "刚刚";
        }
        else if (timeDiff < onehour) {
            result = Math.floor(timeDiff / oneminute) + "分钟前";
        }
        else if (timeDiff < oneday && dayDiff == 0) {
            result = Math.floor(timeDiff / onehour) + "小时前";
        }
        else if (timeDiff < oneday * 2 && dayDiff == 1) {
            result = "昨天 " + date.Format("hh:mm");
        }
        else if (timeDiff < oneday * 3 && dayDiff == 2) {
            result = "前天 " + date.Format("hh:mm");
        }
        return result;
};

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}