jQuery(document).ready(function () {
    $.ajax({
        type: "get",
        async: false,
        url: "http://flightQuery.com/jsonp/flightResult.aspx?code=CA1998",
        dataType: "jsonp",
        jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
        jsonpCallback: "flightHandler", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
        success: function (json) {
            alert(json.price, json.tickets);
        },
        error: function () {
            alert('fail');
        }
    });
});

var flightHandler = function (data) {
    alert(data.price, data.tickets);
};
// 提供jsonp服务的url地址（不管是什么类型的地址，最终生成的返回值都是一段javascript代码）
var url = "http://flightQuery.com/jsonp/flightResult.aspx?code=CA1998&callback=flightHandler";
// 创建script标签，设置其属性
var script = document.createElement('script');
script.setAttribute('src', url);
// 把script标签加入head，此时调用开始
document.getElementsByTagName('head')[0].appendChild(script);