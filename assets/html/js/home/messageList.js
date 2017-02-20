/**
 * Created by alex.yang on 15-4-11.
 */
window.home_messageList = (function () {
    var aa='';
	var weburl = window.publicweburl.weburl1;
    function start() {
        console.log('-----start-----');
        RuiDa.Module.bindClickArr({

            '.h-lst>li>span:nth-child(1)': '../home/messageDetails.html'
        });
        GetNewsList();
    }

    /*资讯列表/头条接口--start*/
    function GetNewsList(){
        //isHead:0,page:1,rows:5,sort:id,order:desc
        var params={
            'methodname':'/app/news/find',
            'isHead': '0',
            'page':'1',
            'rows':'10',
            'sort':'id',
            'order':'asc'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('11成功');
            if(res.code=='1000'){
                var data=res.content.rows,html="";
                console.log(data);
                for(var key in data){
                    console.log(key,data[key].id);
					var imgIds = data[key].imgIds;
					var imgIdsarr = imgIds.split(";");
					var imghtml = '<span class="h-img">';
					if(imgIdsarr.length>0)
					{
						for(var i =0;i<imgIdsarr.length-1;i++)
						{
							var imgsrc = weburl+"app/show/";
							imgsrc = imgsrc+imgIdsarr[i];
							imghtml =imghtml+"<img src='"+imgsrc+"' />";
						}
						imghtml = imghtml+"</span>";
					}
                    html+='';
                    html+='<li>';
                    html+='<span id="'+data[key].id+'" class="h-title">'+data[key].title+'</span>';
                    html+=imghtml;
                    html+='<span class="h-Comments"><a>点赞('+data[key].praiseNum+')</a><a>评论('+data[key].commentNum+')</a></span>';
                    html+='</li>';
                }
                $('.h-lst').empty().append(html);
                BindNewsList();
            }
        });
    }
    function BindNewsList(){
        RuiDa.Module.bindClickfn('.h-title',function(val){
            //window.location.href = 'messageDetails.html?titlename='+$(val).attr('id');
			if(!Rui.GetInfo.islogined()) return;
			var params={
				'methodname':'/app/news/get',
				'id':$(val).attr('id'),
				'authorId':JSON.parse(localStorage['user']).id
			};
			console.log('参数',params);
			Rui.Ajax(params,function(res){
				console.log('成功111111');
				if(res.code=='1000'){
					localStorage['newsres'] = JSON.stringify(res);
					window.location.href = 'messageDetails.html';
				}else
				{
					RuiDa.Alert.getAlert('数据获取失败');
				}
			});
        });
    }
    /*资讯列表/头条接口--end*/
    return {
        start: start
    }
})();
home_messageList.start();
