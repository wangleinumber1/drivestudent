/**
 * Created by alex.yang on 15-2-12.
 */
window.persontoo_myPost = (function () {
    var postlist='';
    function start() {
        console.log('-----start-----');
		console.log(JSON.parse(localStorage['user']).id);
		var params={
            'methodname':'/app/bbs/topicList',
			'userId':JSON.parse(localStorage['user']).id,
			"page":1,
			"rows":20,
			'type':'',
			"categoryId":''
        };
		console.log(params);
		Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                console.log('帖子信息',res.content);
				var total = res.content.total;
				postlist = res.content.rows;
				var post_li = "";
				if(postlist.length>0)
				{
					for(var i =0;i<postlist.length;i++)
					{
						var likeNum = 0;
						var criticNum = 0;
						var pattern = "yyyy-MM-dd";
						var date = getFormatDate(new Date(postlist[i].postTopicTime), pattern);
						if(postlist[i].likeNum!=null){likeNum=postlist[i].likeNum;}
						if(postlist[i].criticNum!=null){likeNum=postlist[i].criticNum;}
						post_li +="<li onClick=\"postdetails('"+postlist[i].id+"')\"><span>"+
								"<a class=\"uimg\"><img src=\""+postlist[i].image+"\" /></a>"+
								"<a class=\"uname\">"+postlist[i].sender+"</a>"+
								"<a class=\"utime\">"+date+"</a>"+
							"</span><span class=\"comment-value\">"+postlist[i].titile+"</span>"+
							"<span class=\"h-Comments\"><a href=\"#\">点赞("+likeNum+")</a><a href=\"#\">评论("+criticNum+")</a></span></li>";
					}
					$("#user_post").append(post_li);
				}else
				{
					$("#user_post").append("<li>还未发表帖子</li>");
				}
            }else if(res.code=='1001'){
				$("#user_post").append("<li>还未发表帖子</li>");
                RuiDa.Alert.getAlert('数据列表不存在');
            }
        });
    }

    return {
        start: start
    }
})();
persontoo_myPost.start();
