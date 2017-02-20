/**
 * Created by alex.yang on 15-2-12.
 */
window.login_test2 = (function () {

    function start() {
        console.log('-----test2start-----');
        console.log('33333333333333');
        console.groupCollapsed('新闻资讯管理(高升)');
        //GetNewsList();
        //GetNewsDetails();
        //GetNewsPics();
        console.groupEnd('结束');

        console.groupCollapsed('学习进度管理(高升)');
        GetLeaningProcess();
        console.groupEnd('结束');



        console.groupCollapsed('启动页面(梁栋)');
        //GetWelcome();
        console.groupEnd('结束');



        console.groupCollapsed('论坛管理(有文)');
        //GetForum();
        //GetPostList();
        //GetPostDetails();
        //GoPost();
        //GetPostCommentList();
        console.groupEnd('结束');

        console.groupCollapsed('消息管理(有文)');
        //GetMessage();
        console.groupEnd('结束');

        console.groupCollapsed('图片管理(客户)');
        //UploadPic();
        console.groupEnd('结束');
    }

//新闻资讯管理start
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
            console.log('成功111111',res);
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*资讯列表/头条接口--end*/

    /*资讯详情接口--start*/
    function GetNewsDetails(){
            var params={
            'methodname':'/app/news/get',
            'id':'4'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111',res);
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*资讯详情接口--end*/

    /*资讯图集接口--start*/
    function GetNewsPics(){
        //这里非请求，直接用img的uro定位就可以了
        //图片查看接口
        //app/show/{resId}
        //说明resId是资源图片的id，访问的例子 http://localhost:8080/app/show/f51de0f864d741ecbd6ff4bc63e77b00

        var params={
            'methodname':'app/show/{resId}'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功GetNewsPics',res);
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*资讯图集接口--end*/
//新闻资讯管理end

//学习进度管理start
    /*学习进度项目接口--start*/
    function GetLeaningProcess(){
        //type =  s1 学员学习进度项，报名
        //type =  s2 学员学习进度项，科目一
        //type =  s3 学员学习进度项，科目二
        //type =  s4 学员学习进度项，科目三
        //type =  s5 学员学习进度项，科目四
        //type =  s6 学员学习进度项，取证

        var params={
            'methodname':'/app/system/args/findStudyList'
    };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111',res);
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*学习进度项目接口--end*/
//学习进度管理end

//启动页面start
    /*引导页接口--start*/
    function GetWelcome(){
        //
        var params={
            'methodname':'/app/lead/list'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111',res);
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*引导页接口--end*/
//启动页面end

//论坛管理start
    /*论坛主题列表接口--start*/
    function GetForum(){
        //
        var params={
            'methodname':'/app/bbs/categoryList  '
        };
        console.log('参数',params);
        console.log('论坛进来');
        Rui.Ajax(params,function(res){
            console.log('成功111111',res);
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*论坛主题列表接口--end*/

    /*论坛主题帖子列表接口--start*/
    function GetPostList(){
        //categoryId:1,page:1,rows=1
        var params={
            'methodname':'/app/bbs/topicList',
            'categoryId':'17901901-ef04-427b-9492-0f85b006a2c3',
            'page':'1',
            'rows':'10'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111',res);
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*论坛主题帖子列表接口--end*/

    /*论坛主题帖子详情接口--start*/
    function GetPostDetails(){
        // topicId
        var params={
            'methodname':'/app/bbs/topic ',
            'topicId':'3'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111',res);
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*论坛主题帖子详情接口--end*/

    /*论坛主题发帖接口--start*/
    function GoPost(){
//        categoryId;
//        sender;
//        titile;
//        content;
//        image;
//        isTop;
//        senderId;
        var params={
            'methodname':'/app/bbs/posts',
            'categoryId':'17901901-ef04-427b-9492-0f85b006a2c3',
            'sender':'test',
            'titile':'我想发100个帖子',
            'content':'我想发100个帖子，可惜不太会，求发帖方法',
            'image':'',
            'senderId':'222'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111',res);
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*论坛主题发帖接口--end*/

    /*评论列表接口--start*/
    function GetPostCommentList(){
        //
        var params={
            'methodname':'/app/comment/list ',
            'ref_Id':'8'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111',res);
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*评论列表接口--end*/
//论坛管理end

//消息管理start
    /*消息通知接口--start*/
    function GetMessage(){
        //
        var params={
            'methodname':'/app/message/getMessage',
            'userId':'1121212121212'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111',res);
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*消息通知接口--end*/
//消息管理end

//图片管理start
    /*上传文件（原生来做）--start*/
    function UploadPic(){
        //
        var params={
            'methodname':'/app/stream/upload',
            'userId':'1',
            'file':''
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111',res);
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*上传文件（原生来做）--end*/
//图片管理end


    return {
        start: start
    }
})();
login_test2.start();
