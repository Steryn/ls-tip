//工具函数

// 获取URL参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

// 转化数字千分符
function numToMil(num) {
    return (num.toFixed(0) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}

//电话号码加密
function mobileMask(e){
	e = e+'';
	return e?e.substr(0,3)+'****'+e.substr(7):'';
}