/**
 * Created by alex.yang on 15-4-11.
 */
window.home_commentList = (function () {
    var datalist;
	//JSON.parse(localStorage['user']).id
    function start() {
        console.log('-----start-----');
		var Request=RuiDa.Tool.GetRequest();
		var typeId = Request['typeId'];
		var refId = Request['refId'];
      	/*var params={
            'methodname':'/app/comment/list',
			"author":'',
			"refId":'',
			"type" : typeId,
			"page":0,
			"rows":10
        };*/
        var params={
            'methodname':'schoolstars/schoolStarsAll.do',
            'oa': '1',
            'schoolCode': '2020',
            'nextPage':'0',
            'pageSize':'10'
        };

		Rui.Ajax(params,function(res){
            //console.log('成功111111',res);
            if(res.code=='1000'){
                var datalist = res.result.rows;
                console.log('论坛信息',datalist);
                //return;
				var forum_li = "";
				if(datalist.length>0){
					for(var i =0;i<datalist.length;i++){
						var datetime = "";
						var pattern = "yyyy-MM-dd";
						if(datalist[i].createDate!=null&&datalist[i].createDate!=""){
                            console.log('时间');
							datetime = getFormatDate(new Date(datalist[i].createDate), pattern);
						}
						forum_li +="<li><span><a class=\"uimg\"><img src=\"../../res/img/dome1.png\" /></a>"+
							"<a class=\"uname\">"+datalist[i].stuName+"</a><a class=\"utime\">"+datetime+"</a></span>"+
						"<span class=\"comment-value\">"+datalist[i].reviewContent+
						"</span></li>";
						/*<span class=\"comment-Reply\">回复</span>*/
					}
					$("#forum_ul").append(forum_li);
				}
                //localStorage['user']=JSON.stringify(res.content);
                //console.log(JSON.parse(localStorage['user']));

                //setTimeout(function(){ window.location.href='../home/home.html';},200)
            }else if(res.code=='1001'){
                RuiDa.Alert.getAlert('数据列表不存在');
            }
        });
    }

    return {
        start: start
    }
})();
Date.prototype.format = function (format) {  
	var o = {  
		"M+": this.getMonth() + 1,  
		"d+": this.getDate(),  
		"h+": this.getHours(),  
		"m+": this.getMinutes(),  
		"s+": this.getSeconds(),  
		"q+": Math.floor((this.getMonth() + 3) / 3),  
		"S": this.getMilliseconds()  
	}  
	if (/(y+)/.test(format)) {  
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));  
	}  
	for (var k in o) {  
		if (new RegExp("(" + k + ")").test(format)) {  
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));  
		}  
	}  
	return format;  
}
function getFormatDate(date, pattern) {  
	if (date == undefined) {  
		date = new Date();
	}  
	if (pattern == undefined) {  
		pattern = "yyyy-MM-dd hh:mm:ss";  
	}  
	return date.format(pattern);  
}
home_commentList.start();
