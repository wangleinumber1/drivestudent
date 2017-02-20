/**
 * Created by alex.yang on 15-2-12.
 */
window.divingexpert_infoDetails = (function () {
    var aa='';
	var datainfo;
    function start() {
        console.log('-----start-----');
		RuiDa.Module.bindClickfn('.b-lst>li:nth-child(1)',function(){
            console.log(111);
			//var zixunid = $('#zixun_id').val();
			//var title = $('.this-title').text();
			window.location.href="../home/commentAdd.html?typeId=1&refId="+datainfo.id+"&refTitle="+datainfo.titile;
        });

		RuiDa.Module.bindClickfn('.b-lst>li:nth-child(2)',function(){
            console.log(222);
			//var zixunid = $('#zixun_id').val();
			window.location.href="../home/commentList.html?typeId=1&refId="+datainfo.id;
        });
        RuiDa.Module.bindClickfn('.b-lst>li:nth-child(3)',function(){
            console.log(111);
			var xinghao=RuiDa.Tool.deviceType();
			//var zixun_url = $('#zixun_url').val();
			//var title = $('.this-title').text();
			
			if(xinghao=="ios")
			{
				cordova.exec(function(){},function(){},"UM_SharePlugin","print",[datainfo.title,datainfo.shareUrl,'']);
			}else if(xinghao=="android")
			{
				//var androidjson="{'contenturl':"+zixun_url+",'title':"+title+",'imgurl':''}";
				var androidjson="{'contenturl':'"+datainfo.shareUrl+"','title':'"+datainfo.titile+"','imgurl':''}";
				console.log(androidjson);
				androidjsdemo.getShare(androidjson);
			}
        });
		RuiDa.Module.bindClickfn('.b-lst>li:nth-child(4)',function(){
			//var zixunid = $('#zixun_id').val();
			var liid = $(".b-lst>li:nth-child(4)").attr("id");
			var params={
				'methodname':'/app/collect/update',
				'refId':datainfo.id,
				'type':0,
				'author':JSON.parse(localStorage['user']).id
			};
            console.log(params);
			Rui.Ajax(params,function(res){
				console.log('成功111111');
				if(res.code=='1000'){
					if(liid==0)
					{
						$(".b-lst>li:nth-child(4)").attr("id",1);
						$(".b-lst>li:nth-child(4)>span").text("取消收藏");	
					}else if(liid==1)
					{
						$(".b-lst>li:nth-child(4)").attr("id",0);
						$(".b-lst>li:nth-child(4)>span").text("收藏");
					}
				}else{
					console.log('状态问题',res.code);
				}
			});
        });
		RuiDa.Module.bindClickfn('.b-lst>li:nth-child(5)',function(){
			//var zixunid = $('#zixun_id').val();
			
			var liid = $(".b-lst>li:nth-child(5)").attr("id");
			var params={
				'methodname':'/app/praise/update',
				'refId':datainfo.id,
				'type':0,
				'author':JSON.parse(localStorage['user']).id
			};
            console.log(params);
			Rui.Ajax(params,function(res){
				console.log('成功111111'+liid);
				if(res.code=='1000')
				{
					if(liid==0)
					{
						$(".b-lst>li:nth-child(5)").attr("id",1);
						$(".b-lst>li:nth-child(5)>span").text("取消点赞");	
					}else if(liid==1)
					{
						$(".b-lst>li:nth-child(5)").attr("id",0);
						$(".b-lst>li:nth-child(5)>span").text("点赞");
					}
				}else{
					console.log('状态问题',res.code);
				}
			});
        });
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
		/*
		var topicId = $.getUrlVar('topicId');
		var params={
            'methodname':'/app/bbs/topic',
			'topicId':topicId,
			'authorId':JSON.parse(localStorage['user']).id
        };
		console.log(params);
		Rui.Ajax(params,function(res){
			var res = JSON.parse(localStorage['topicres']);
            console.log('成功111111');
            if(res.code=='1000'){
				datainfo =res.content;
                console.log('论坛信息',res.content);
				var pattern = "yyyy-MM-dd";
				var date = getFormatDate(new Date(res.content.postTopicTime), pattern);
				var post_detail = "<span class=\"this-title\">"+res.content.titile+"</span><span class=\"h-auther\">"+
								"<a class=\"auther-left\">作者:"+res.content.sender+"</a><a class=\"time-right\">"+date+"</a></span>"+
								"<div class=\"img-show\"><img src=\""+res.content.image+"\" /><span class=\"showimglst\">查看图集</span></div>"+
								"<div class=\"h-alue\"><p>"+res.content.content+"</p></div>";
				$("#h-details").append(post_detail);
				if(res.content.isCollect==1)
				{
					$(".b-lst>li:nth-child(4)").attr("id",res.content.isCollect);
					$(".b-lst>li:nth-child(4)>span").text("取消收藏");
				}else
				{
					$(".b-lst>li:nth-child(4)").attr("id",0);
					$(".b-lst>li:nth-child(4)>span").text("收藏");
				}
				if(res.content.isPraise==1)
				{
					$(".b-lst>li:nth-child(5)").attr("id",res.content.isPraise);
					$(".b-lst>li:nth-child(5)>span").text("取消点赞");
				}else
				{
					$(".b-lst>li:nth-child(5)").attr("id",0);
					$(".b-lst>li:nth-child(5)>span").text("点赞");
				}
            }else if(res.code=='1001'){
                RuiDa.Alert.getAlert('数据列表不存在');
            }
        });
		*/
		var res = JSON.parse(localStorage['topicres']);
		console.log('成功111111');
		if(res.code=='1000'){
			datainfo =res.content;
			console.log('论坛信息',res.content);
			var pattern = "yyyy-MM-dd";
			var date = getFormatDate(new Date(res.content.postTopicTime), pattern);
			var post_detail = "<span class=\"this-title\">"+res.content.titile+"</span><span class=\"h-auther\">"+
							"<a class=\"auther-left\">作者:"+res.content.sender+"</a><a class=\"time-right\">"+date+"</a></span>"+
							"<div class=\"img-show\"><img src=\""+res.content.image+"\" /><span class=\"showimglst\">查看图集</span></div>"+
							"<div class=\"h-alue\"><p>"+res.content.content+"</p></div>";
			$("#h-details").append(post_detail);
			if(res.content.isCollect==1)
			{
				$(".b-lst>li:nth-child(4)").attr("id",res.content.isCollect);
				$(".b-lst>li:nth-child(4)>span").text("取消收藏");
			}else
			{
				$(".b-lst>li:nth-child(4)").attr("id",0);
				$(".b-lst>li:nth-child(4)>span").text("收藏");
			}
			if(res.content.isPraise==1)
			{
				$(".b-lst>li:nth-child(5)").attr("id",res.content.isPraise);
				$(".b-lst>li:nth-child(5)>span").text("取消点赞");
			}else
			{
				$(".b-lst>li:nth-child(5)").attr("id",0);
				$(".b-lst>li:nth-child(5)>span").text("点赞");
			}
		}else if(res.code=='1001'){
			RuiDa.Alert.getAlert('数据列表不存在');
		}
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
divingexpert_infoDetails.start();
