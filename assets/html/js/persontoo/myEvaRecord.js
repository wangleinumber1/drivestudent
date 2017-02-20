/**
 * Created by alex.yang on 15-2-12.
 */
window.persontoo_myEvaRecord = (function () {
    var aa='';
    function start() {
        console.log('-----start-----');
        RuiDa.Module.bindClickArr({
            /*'#register': 'register.html',*/
            'ul>li': 'EvaInfo.html'
        });
      		var params={
            'methodname':'/app/assess/list',
			'author':JSON.parse(localStorage['user']).id,
			'refId':'',
			'type':'',
			'page':1,
			'rows':20
        };
		Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                console.log('论坛信息',res.content);
				var recordcon = res.content.rows;
				var record_li = "";
				if(recordcon.length>0)
				{
					for(var i =0;i<recordcon.length;i++)
					{
						record_li +="<li><span><a class=\"uimg\"><img src=\"../../res/img/dome1.png\" /></a>"+
							"<a class=\"uname\">"+recordcon[i].author+"</a><a class=\"utime\">"+recordcon[i].createTime+"</a></span>"+
						"<span class=\"comment-value\">"+recordcon[i].content+
						"</span></li>";
						
					}
					$("#record_ul").empty().append(record_li);
				}else
				{
					$("#record_ul").empty().append("<li>还没有评价数据</li>");
				}
            }else if(res.code=='1001'){
				$("#record_ul").empty().append("<li>还没有评价数据</li>");
                RuiDa.Alert.getAlert('数据列表不存在');
            }
        });
    }

    return {
        start: start
    }
})();
persontoo_myEvaRecord.start();
