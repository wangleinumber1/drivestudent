/**
 * Created by alex.yang on 15-2-12.
 */
window.mydiving_EventList = (function () {
    var aa='';
    function start() {
        console.log('-----start-----');
        RuiDa.Module.bindClickArr({
            /*'#register': 'register.html',
             '#forget': 'forgetPwd.html'*/
            '.t_s_one_next2>li>div:nth-child(3)':'../mydiving/ActivityDetails.html'
        });
        GetActivityList();
    }
    /*活动列表接口--start*/
    function GetActivityList(){
        //isTop、page、rows、sort、order
            var params={
                //isTop、page、rows、sort、order（isTop:0、1是否头条；sort、order:可选）
        'methodname':'/business/app/activity/find',
            'isTop': '0',
            'page':'1',
            'rows':'10',
            'sort':'createTime',
            'order':'desc'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){

                var html='',data=res.content.rows;
                console.log(data);
                for(var key in data){
                    html+='';
                    html+='<li>';
                    html+='<div><img src="../../res/img/mycollect_4.png"/></div>';
                    html+='<div><span>'+data[key].name+'</span><span>'+data[key].content+'</span></div>';
                    html+='<div><button class="el_btn" id="'+data[key].id+'">详情</button></div>';
                    html+='</li>';
                }
                $('.t_s_one_next2').empty().append(html);
                BindActivityList();
            }
        });
    }
    /*活动列表接口--end*/
    function BindActivityList(){
        RuiDa.Module.bindClickfn('.el_btn',function(val){
            window.location.href = 'ActivityDetails.html?titlename='+$(val).attr('id');
        });
    }

    return {
        start: start
    }
})();
mydiving_EventList.start();
