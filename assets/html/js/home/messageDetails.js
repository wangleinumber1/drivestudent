/**
 * Created by alex.yang on 15-4-11.
 */
window.home_messageDetails = (function () {
	var weburl = window.publicweburl.weburl1;
    var  Request=RuiDa.Tool.GetRequest(),titlename=Request['titlename'];
        console.log('titlename',titlename);
    function start() {
        console.log('-----start-----');
        RuiDa.Module.bindClickArr({
            /*'#register': 'register.html',*/
            '#forget': 'forgetPwd.html'
        });

        GetNewsDetails(titlename);//资讯详情接口


		RuiDa.Module.bindClickfn('.b-lst>li:nth-child(1)',function(){
            console.log(111);
			var zixunid = $('#zixun_id').val();
			var title = $('.this-title').text();
			window.location.href="commentAdd.html?typeId=0&refId="+zixunid+"&refTitle="+title;
        });

		RuiDa.Module.bindClickfn('.b-lst>li:nth-child(2)',function(){
            console.log(222);
			var zixunid = $('#zixun_id').val();
			window.location.href="commentList.html?typeId=0&refId="+zixunid;
        });
        RuiDa.Module.bindClickfn('.b-lst>li:nth-child(3)',function(){
            console.log(111);
			var xinghao=RuiDa.Tool.deviceType();
			var zixun_url = $('#zixun_url').val();
			var title = $('.this-title').text();
			
			if(xinghao=="ios")
			{
				cordova.exec(function(){},function(){},"UM_SharePlugin","print",[title,zixun_url,'']);
			}else if(xinghao=="android")
			{
				//var androidjson="{'contenturl':"+zixun_url+",'title':"+title+",'imgurl':''}";
				var androidjson="{'contenturl':'"+zixun_url+"','title':'"+title+"','imgurl':''}";
				console.log(androidjson);
				androidjsdemo.getShare(androidjson);
			}
        });
		RuiDa.Module.bindClickfn('.b-lst>li:nth-child(4)',function(){
			var zixunid = $('#zixun_id').val();
			var liid = $(".b-lst>li:nth-child(4)").attr("id");
			var params={
				'methodname':'/app/collect/update',
				'refId':zixunid,
				'type':1,
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
			var zixunid = $('#zixun_id').val();
			
			var liid = $(".b-lst>li:nth-child(5)").attr("id");
			var params={
				'methodname':'/app/praise/update',
				'refId':zixunid,
				'type':1,
				'author':JSON.parse(localStorage['user']).id
			};
            console.log(params);
			Rui.Ajax(params,function(res){
				console.log('成功111111');
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
    }
    /*资讯详情接口--start*/
	/*
    function GetNewsDetails(titleid){
        var params={
            'methodname':'/app/news/get',
            'id':titleid,
			'authorId':JSON.parse(localStorage['user']).id
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                var data=res.content;
                console.log('data',data,'1',data.content);
				var imgIds = data.imgIds;
				var imgIdsarr = imgIds.split(";");
				var imghtml = '';
				if(imgIdsarr.length>0)
				{
					for(var i =0;i<imgIdsarr.length-1;i++)
					{
						var imgsrc = weburl+"app/show/";
						imgsrc = imgsrc+imgIdsarr[i];
						imghtml =imghtml+"<img src='"+imgsrc+"' />";
					}
					imghtml = imghtml+'<span class="showimglst">查看图集</span>';
				}
				$('#zixun_id').val(data.id);
                $('.this-title').text(data.title);//标题
				$('.img-show').append(imghtml);
                $('.auther-left>em').text(data.author);
				var pattern = "yyyy-MM-dd";
				var date = getFormatDate(new Date(res.content.createTime), pattern);
                console.log('时间',data.createTime,RuiDa.Tool.GetData(data.createTime));
                $('.time-right').text(date);
                //$('.').text('');
                $('#content').text(data.content);
				$('#zixun_url').val(data.shareUrl);
				if(data.isCollect==1)
				{
					$(".b-lst>li:nth-child(4)").attr("id",data.isCollect);
					$(".b-lst>li:nth-child(4)>span").text("取消收藏");
				}else
				{
					$(".b-lst>li:nth-child(4)").attr("id",0);
					$(".b-lst>li:nth-child(4)>span").text("收藏");
				}
				if(data.isPraise==1)
				{
					$(".b-lst>li:nth-child(5)").attr("id",data.isPraise);
					$(".b-lst>li:nth-child(5)>span").text("取消点赞");
				}else
				{
					$(".b-lst>li:nth-child(5)").attr("id",0);
					$(".b-lst>li:nth-child(5)>span").text("点赞");
				}
            }
        });
    }
	*/
	function GetNewsDetails(){
		var res = JSON.parse(localStorage['newsres']);
        console.log('成功111111');
		if(res.code=='1000'){
			var data=res.content;
			console.log('data',data,'1',data.content);
			var imgIds = data.imgIds;
			var imgIdsarr = imgIds.split(";");
			var imghtml = '';
			if(imgIdsarr.length>0)
			{
				for(var i =0;i<imgIdsarr.length-1;i++)
				{
					var imgsrc = weburl+"app/show/";
					imgsrc = imgsrc+imgIdsarr[i];
					imghtml =imghtml+"<img src='"+imgsrc+"' />";
				}
				imghtml = imghtml+'<span class="showimglst">查看图集</span>';
			}
			$('#zixun_id').val(data.id);
			$('.this-title').text(data.title);//标题
			$('.img-show').append(imghtml);
			$('.auther-left>em').text(data.author);
			var pattern = "yyyy-MM-dd";
			var date = getFormatDate(new Date(res.content.createTime), pattern);
			console.log('时间',data.createTime,RuiDa.Tool.GetData(data.createTime));
			$('.time-right').text(date);
			//$('.').text('');
			$('#content').text(data.content);
			$('#zixun_url').val(data.shareUrl);
			if(data.isCollect==1)
			{
				$(".b-lst>li:nth-child(4)").attr("id",data.isCollect);
				$(".b-lst>li:nth-child(4)>span").text("取消收藏");
			}else
			{
				$(".b-lst>li:nth-child(4)").attr("id",0);
				$(".b-lst>li:nth-child(4)>span").text("收藏");
			}
			if(data.isPraise==1)
			{
				$(".b-lst>li:nth-child(5)").attr("id",data.isPraise);
				$(".b-lst>li:nth-child(5)>span").text("取消点赞");
			}else
			{
				$(".b-lst>li:nth-child(5)").attr("id",0);
				$(".b-lst>li:nth-child(5)>span").text("点赞");
			}
		}
    }
    /*资讯详情接口--end*/
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
home_messageDetails.start();
