window.post = (function() {

    var Request=RuiDa.Tool.GetRequest();
    var categoryIds = Request['categoryId'];
    var user = JSON.parse(localStorage['user']);
    var postimgids = "";
    $("#Themes").click(function() {
        var z = $(".Theme-lst1").attr("class");
        if (z == undefined) {
            $(".Theme-lst").attr("class", "Theme-lst1");
        } else {
            $(".Theme-lst1").attr("class", "Theme-lst");
            Themea();
        }
    });

    function Themea() {
        $(".Theme-lst>li").click(function() {
            var t = $(this).text();
            var id = $(this).attr("id");
            $("#Themes").text(t);
            $("#Themes_id").val(id);
            $(".Theme-lst").attr("class", "Theme-lst1");

        });
    }
    RuiDa.Module.bindClickfn('.title-Article>span:nth-child(3)',function(){
        console.log(121212);
        var xinghao=RuiDa.Tool.deviceType();
        if(xinghao=="ios")
        {
            //cordova.exec(function(){},function(){},"UM_SharePlugin","print2",[]);
        }else if(xinghao=="android")
        {
			console.log("android--执行帖子图片上传");
            androidjsdemo.takePictureAndPost(user.id);
        }
    });
    RuiDa.Module.bindClickfn('.Theme-input',function(){
        console.log(123456);
        postsave();
    });

    function start() {
        var params_f={
            'methodname':'/app/bbs/categoryList'
        };
        Rui.Ajax(params_f,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                console.log('论坛主题信息',res.content);
                forumcon = res.content;
                var forum_li = "";
                if(forumcon.length>0)
                {
                    for(var i =0;i<forumcon.length;i++)
                    {
                        forum_li +="<li id='"+forumcon[i].id+"'>"+forumcon[i].name+"</li>";
                    }
                    $("#Theme-lst1").append(forum_li);
                    if(categoryIds!=null&&categoryIds!=""&&categoryIds.length>0)
                    {
                        $("#Theme-lst1 li").each(function(){
                            if($(this).attr("id")==categoryIds)
                            {
                                $("#Themes").text($(this).text());
                                $("#Themes_id").val($(this).attr("id"));
                            }
                        });
                    }else
                    {
                        $("#Themes").text(forumcon[0].name);
                        $("#Themes_id").val(forumcon[0].id);
                    }
                }
            }else if(res.code=='1001'){
                RuiDa.Alert.getAlert('数据列表不存在');
            }
        });
    }
    function postsave()
    {
        var categoryId = $("#Themes_id").val();
        var title = $("#Themes_title").val();
        var content = $("#Themes_content").val();
        var user=JSON.parse(localStorage['user']);
        console.log('user',user);
        user = user.id;
        var params = {
            'methodname':'/app/bbs/posts',
            'categoryId':categoryId,
            'sender':user,
            'titile':title,
            'content':content,
            'image':postimgids
        }
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                RuiDa.Alert.getAlert('帖子发布成功');
                setTimeout(function(){
                    window.history.back();
                },500);
            }else if(res.code=='1001'){
                RuiDa.Alert.getAlert('数据列表不存在');
            }
        });
    }
    return {
        start: start
        //postsave:postsave
    };
})();
function postimgread(postimgpath)
{
	console.log("帖子图片："+postimgpath);
	//RuiDa.Alert.getAlert("帖子图片："+postimgpath);
	var imgarr = postimgpath.split(",");
	window.post.postimgids = imgarr[1];
	//RuiDa.Alert.getAlert("帖子地址："+imgarr[0]);
	$(".post_img img").attr("src",imgarr[0]);
}
window.post.start();