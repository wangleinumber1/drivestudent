/**
 * Created by alex.yang on 15-2-12.
 */
window.login_test = (function () {
    var aa='';
    function start() {
        console.log('-----start-----');


        console.groupCollapsed('收藏管理(高升)');
        //GetCollectYesOrNo();
        //GetCollectList();
        console.groupEnd('结束');

        console.groupCollapsed('点赞管理(高升)');
        //GetZanYesOrNo();
        console.groupEnd('结束');

        console.groupCollapsed('活动管理(高升)');
        //GetActivityList();
        //GetActivityDetails();
        console.groupEnd('结束');


        //注：驾校管理是OA端的
        console.groupCollapsed('驾校管理(梁栋)');
        //GetDivingList();
        //GetDivingDetails();
        //GetDivingapply();
        console.groupEnd('结束');

        console.groupCollapsed('评论管理(梁栋)');
        //GetCommentList();
        //GoComment();
        //GetCommentDetails();
        console.groupEnd('结束');

        console.groupCollapsed('评价管理(梁栋)');
        GetEvaluateList();
        //GoEvaluate();
        //GetEvaluateDetails();
        console.groupEnd('结束');
    }
//收藏管理start
    /*收藏/取消收藏接口--start*/
    function GetCollectYesOrNo(){
        //refId，type,author
        var params={
            'methodname':'/app/collect/update',
            'refId': '1',
            'type':'1',
            'author':'test'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111',res);
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*收藏/取消收藏接口--end*/

    /*收藏列表接口--start*/
    function GetCollectList(){
        //author,page,rows
        var params={
            'methodname':'/app/collect/find',
            'author': 'test',
            'page':'0',
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
    /*收藏列表接口--end*/
//收藏管理end

//点赞管理start
    /*点赞/取消点赞接口--start*/
    function GetZanYesOrNo(){
        //refId,type,author
        var params={
            'methodname':'/app/praise/update',
            'refId': '1',
            'type':'0',
            'author':'test'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111',res);
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*收藏列表接口--end*/
//点赞管理end

//活动管理start
    /*活动列表接口--start*/
    function GetActivityList(){
        //isTop、page、rows、sort、order
        var params={
            'methodname':'/business/app/activity/find',
            'isTop': '0',
            'page':'1',
            'rows':'10',
            'sort':'createTime',
            'order':'desc'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111',res);
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*活动列表接口--end*/

    /*活动详情接口--start*/
    function GetActivityDetails(){
        //id
        var params={
            'methodname':'/business/app/activity/get',
            'id': '10'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111',res);
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*--end*/
//活动管理end

//驾校管理start
    /*驾校列表接口--start*/
    function GetDivingList(){
        //
        var params={
            'methodname':'/app/school/list'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111',res);
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*驾校列表接口--end*/

    /*驾校详情接口--start*/
    function GetDivingDetails(){
        //schoolCode
        var params={
            'methodname':'/app/school/query ',
            'schoolCode': ''
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111',res);
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*驾校详情接口--end*/

    /*驾校报名接口--start*/
    function GetDivingapply(){
        //type : 0,普通报名；1，缴费报名、schId ： 驾校、stuName ： 名称、idCard ： 身份证、stuPhone ： 手机号、eduSystem ： 班制、feeprice 缴费金额
        var params={
            'methodname':'/app/member/signUp',
            'type': '',
            'schId':'1',
            'stuName':'',
            'idCard':'',
            'stuPhone':'',
            'eduSystem':'',
            'feeprice':''
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111',res);
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*驾校报名接口--end*/
//驾校管理end

//评论管理start
    /*评论列表接口--start*/
    function GetCommentList(){
        //
        var params={
            'methodname':'/app/comment/list',
            'author':'',
            'refId':'2020',//驾校id
            'type':'2',//0,新闻；1，帖子
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
    /*评论列表接口--end*/

    /*评论接口--start*/
    function GoComment(){
        //refId:9,type:2,content:test1,author:Tom
        var params={
            'methodname':'/app/comment/saveOrUpdate',
            'refId': '2020',
            'refTitle':'',
            'type':'2',
            'content':'凹凸慢打怪兽能力比较强，以后每打一个怪兽，加工资一毛。',
            'author':'1'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111',res);
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*评论接口--end*/

    /*评论详情接口--start*/
    function GetCommentDetails(){
        //id
        var params={
            'methodname':'/app/comment/query',
            'id': '3cf05ed658a74d63a8c93c357bdad2e3'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111',res);
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*评论详情接口--end*/
//评论管理end

//评价管理start
    /*评价列表接口--start*/
    function GetEvaluateList(){
        /*author
        refId
        type 0:驾校评价，1:教练评价，2:学员端学时评价
        page
        rows*/
        var params={
            'methodname':'/app/assess/list',
            'author': '1',
            'refId':'2020',
            'type':'0',
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
    /*评价列表接口--end*/

    /*评价接口--start*/
    function GoEvaluate(){
        //refId,refTitle,type,content,star,author,isGood
        var params={
            'methodname':'/app/assess/saveOrUpdate',
            'refId': '2020',
            'refTitle':'驾校评价',
            'type':'0',
            'content':'凹凸慢打怪兽能力比较强，以后每打一个怪兽，加工资一毛!OY!myGod!',
            'star':'3',
            'author':'1',
            'isGood':'1'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111',res);
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*评价接口--end*/

    /*评价详情接口--start*/
    function GetEvaluateDetails(){
        //id  
        var params={
            'methodname':'/app/assess/query ',
            'id': '8fce20d4ec7c4e8f99ff9fea41a30199'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111',res);
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*评价详情接口--end*/
//评价管理end


    return {
        start: start
    }
})();
login_test.start();
