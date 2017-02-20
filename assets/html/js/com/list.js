/**
 * Created by alex.yang on 15-2-12.
 */
window.com_list = (function () {
    var  Request=RuiDa.Tool.GetRequest(),titlename=Request['titlename'],strtype=Request['type'],
        arrtitle=['选择驾校'];
    console.log('titlename',titlename,'strtype',strtype);

    var user=JSON.parse(localStorage['user']);
    console.log('user',user);

    function start() {
        if(strtype==='binddiving'){
            $('.h_center').text(arrtitle[titlename]);
            GetAllDivingInfo();
        }else if(strtype==='BindCoach'){
            console.log('教练列表');

            GetCoachInfo();
        }
    }
    /*获取所有的驾校信息--start*/
    function GetAllDivingInfo(){
        //
        var params={
            'methodname':'school/findAll.do',
            'oa': '1'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                var data=res.result.rows,html='';
                console.log(data);
                for(var key in data){
                    console.log('驾校：',data[key].id,data[key].namedesc);
                    html+='<div id="'+data[key].id+'"><span>'+data[key].namedesc+'</span></div>';
                }
                $('.main_login').empty().append(html);
                BindAllDivingInfo();
            }
        });
    }
    /*获取所有的驾校信息--end*/

    function BindAllDivingInfo(){
        RuiDa.Module.bindClickfn('.main_login>div',function(val){
            console.log($(val).attr('id'));
            sessionStorage.setItem('bindDiving_type2',$(val).attr('id')+'^'+$(val).find('span:nth-child(1)').text());
            window.location.href = 'bindDiving.html?back='+strtype;
        });

    }

    /*教练信息--start*/
    function GetCoachInfo(){
        //schoolCode nextPage pageSize
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
                    console.log('驾校：',data[key].id,data[key].coachName);
                    html+='<div id="'+data[key].id+'"><span>'+data[key].coachName+'</span></div>';
                }
                $('.main_login').empty().append(html);
                BindCoachInfo();
            }
        });
    }
    /*教练信息--end*/

    function BindCoachInfo(){
        RuiDa.Module.bindClickfn('.main_login>div',function(val){
            console.log($(val).attr('id'));
            sessionStorage.setItem('bindCoach',$(val).attr('id')+'^'+$(val).find('span:nth-child(1)').text());
            window.location.href = '../mydiving/addingRecord.html?back='+strtype;
        });

    }

    return {
        start: start
    }
})();
com_list.start();
