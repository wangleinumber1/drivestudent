/**
 * Created by alex.yang on 15-2-12.
 */
window.divingexpert_forum = (function () {
	var forumcon;
    function start() {
        console.log('-----start-----');
		var params={
            'methodname':'/app/bbs/categoryList'
        };
		Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                console.log('论坛信息',res.content);
				forumcon = res.content;
				var forum_li = "";
				if(forumcon.length>0)
				{
					for(var i =0;i<forumcon.length;i++)
					{
						forum_li +="<li><a style='width:100%;' href='postListtwo.html?categoryId="+forumcon[i].id+"'><div style='width:100%;'>"+forumcon[i].name+"</div></a></li>";
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
        RuiDa.Module.bindClickfn('.h_right>a',function(){
            if(Rui.GetInfo.islogined()){
                window.location.href='post.html';
            }
        });
		/*
        RuiDa.Module.bindClickArr({
            'ul>li':'../divingexpert/postList.html'
        });
		*/
    }

    return {
        start: start
    }
})();
divingexpert_forum.start();
