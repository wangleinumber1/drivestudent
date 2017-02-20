/**
 * Created by alex.yang on 15-2-12.
 */
window.mydiving_coachInfo = (function () {

    var user=JSON.parse(localStorage['user']);
    console.log('user',user);

    function start() {
        console.log('-----start-----');
        RuiDa.Module.bindClickArr({
            /*'#register': 'register.html',
             '#forget': 'forgetPwd.html'*/
            '.t_bot button':'../mydiving/coachDetails.html'
        });
        GetCoachInfo();
    }

    /*教练信息--start*/
    function GetCoachInfo(){
        var params={
            'methodname':'coach/findCoachAll.do',
            'oa': '1',
            'schoolCode': user.memberRef.sscode,
            'nextPage':'1',
            'pageSize':'10'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                var data=res.result.rows,html='';
                console.log(data);
                for(var key in data){
                    //schoolCode nextPage pageSize
                    /*coachId: "YTE150206046"
                     coachName: "张青"
                     description: ""
                     good: 0
                     id: 45
                     poor: 0
                     reviewScore: 0
                     telephone: "1111"*/
                    html+='<li>';
                    html+='<div><img src="../../res/img/mycollect_4.png"/></div>';
                    html+='<div class="t_mid">';
                    html+='<div><span>'+data[key].coachName+'</span><span>'+data[key].coachId+'</span></div>';
                    html+='<span><img src="../../res/img/eva_xing_yes.png"/><img src="../../res/img/eva_xing_yes.png"/><img src="../../res/img/eva_xing_yes.png"/>';
                    html+='<img src="../../res/img/eva_xing_yes.png"/><img src="../../res/img/eva_xing_yes.png"/></span>';
                    html+='</div>';
                    html+='<div class="t_bot"><button id="'+data[key].coachId+'">详情</button><div><span>好评<em>'+data[key].good+'</em></span><span></span><span>差评<em>'+data[key].poor+'</em></span></div></div>';
                    html+='</li>';
                }
                $('.main_login>ul').empty().append(html);
                BindCoachInfo();
            }
        });
    }
    /*教练信息--end*/
    function BindCoachInfo(){
        RuiDa.Module.bindClickfn('.t_bot>button',function(val){
            window.location.href = 'coachDetails.html?titlename='+$(val).attr('id')+'&schoolcode='+user.memberRef.sscode;
        });
    }

    return {
        start: start
    }
})();
mydiving_coachInfo.start();
