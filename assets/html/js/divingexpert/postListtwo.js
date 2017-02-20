/**
 * Created by alex.yang on 15-2-12.
 */
window.divingexpert_postListtwo = (function () {
    var postlist;
    function start() {
        console.log('-----start-----');
		$.extend({
			getUrlVars: function () {
				var vars = [], hash;
				var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
				for (var i = 0; i < hashes.length; i++) {
					hash = hashes[i].split('=');
					vars.push(hash[0]);
					vars[hash[0]] = hash[1];
				}
				return vars;
			},
			getUrlVar: function (name) {
				return $.getUrlVars()[name];
			}
		});
		var categoryId = $.getUrlVar('categoryId');
		$(".h_right a").attr("href","post.html?categoryId="+categoryId);
		var page = 1;
		var rows = 20;
		var params={
            'methodname':'/app/bbs/topicList',
			'categoryId':categoryId,	
			"page":page,
			"rows":rows,
			"userId":''
        };
		Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                console.log('论坛信息',res.content);
				var total = res.content.total;
				postlist = res.content.rows;
				var post_li = "";
				
				for(var i =0;i<postlist.length;i++)
				{
					var likeNum = 0;
					var criticNum = 0;
					var pattern = "yyyy-MM-dd";
					var date = getFormatDate(new Date(postlist[i].postTopicTime), pattern);
					if(postlist[i].likeNum!=null){likeNum=postlist[i].likeNum;}
					if(postlist[i].criticNum!=null){likeNum=postlist[i].criticNum;}
					post_li +="<li class='topic_details' id='"+postlist[i].id+"'><span>"+
							"<a class=\"uimg\"><img src=\""+postlist[i].image+"\" /></a>"+
							"<a class=\"uname\">"+postlist[i].sender+"</a>"+
							"<a class=\"utime\">"+date+"</a>"+
						"</span><span class=\"comment-value\">"+postlist[i].titile+"</span>"+
						"<span class=\"h-Comments\"><a href=\"#\">点赞("+likeNum+")</a><a href=\"#\">评论("+criticNum+")</a></span></li>";
				}
				$("#post_lst").append(post_li);
				BindTopicList();
                //localStorage['user']=JSON.stringify(res.content);
                //console.log(JSON.parse(localStorage['user']));

                //setTimeout(function(){ window.location.href='../home/home.html';},200)
            }else if(res.code=='1001'){
                RuiDa.Alert.getAlert('数据列表不存在');
            }
        });
    }
	function BindTopicList(){
        $('.topic_details').click(function(){
            if(!Rui.GetInfo.islogined()) return;
            console.log('##########################');
			var params={
				'methodname':'/app/bbs/topic',
				'topicId':$(this).attr('id'),
				'authorId':JSON.parse(localStorage['user']).id
			};
			console.log('参数',params);
			Rui.Ajax(params,function(res){
				console.log('成功111111');
				if(res.code=='1000'){
					localStorage['topicres'] = JSON.stringify(res);
					window.location.href = 'infoDetails.html';
				}else
				{
					RuiDa.Alert.getAlert('数据获取失败');
				}
			});
        });
        /*RuiDa.Module.bindClickfn('.look-Details',function(val){
            window.location.href = 'messageDetails.html?titlename='+$(val).attr('id');
        });*/
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
divingexpert_postListtwo.start();
