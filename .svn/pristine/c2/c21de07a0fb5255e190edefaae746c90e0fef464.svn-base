/**
 * Created by alex.yang on 15-2-12.
 */
window.studycar_classSelect = (function () {
    var  Request=RuiDa.Tool.GetRequest(),strdivingid=Request['divingid'],strtype=Request['type'];
    console.log(strdivingid,strtype);
    function start() {
        console.log('-----start-----');
        $('#cs_divingname').text(sessionStorage.baomingdivingname);
        RuiDa.Module.bindClickArr({
            /*'#register': 'register.html',
             '#forget': 'forgetPwd.html'*/
        });
        GetDivingAllClass();
    }

    /*获取该驾校的所有的班制--start*/
    function GetDivingAllClass(){
        //
        var params={
            'methodname':'edusystem/findEduSystem.do',
            'oa': '1',
            'schoolCode':strdivingid,
            'nextPage':'1',
            'pageSize':'10'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            var data=res.result.rows,html='';
            if(res.code=='1000'){
                /*className: "C1-普桑-贵宾-上午"
                classPrice: 5000
                createDate: "2015-04-20 12:52:34"
                id: 7
                sccode: 77*/
                console.log(data);
                for(var key in data){
                    html+='<li id="'+data[key].eduID+'"><div><span>'+data[key].className+'</span><span><!--周一~周末-->'+data[key].createDate+'</span><span><em>'+data[key].classPrice+'</em>元</span></div></li>';
                }
                $('ul').empty().append(html);
                BindDivingAllClass();
            }
        });
    }
    /*获取该驾校的所有的班制--end*/

    function BindDivingAllClass(){
        RuiDa.Module.bindClickfn('ul>li',function(val){
            //window.location.href = 'messageDetails.html?titlename='+$(val).attr('id');
            setTimeout(function(){
                sessionStorage.setItem('applay_type3',$(val).attr('id')+'^'+$(val).find('span:nth-child(1)').text()+'^'+$(val).find('em:nth-child(1)').text());
                console.log($(val).attr('id')+'^'+$(val).find('span:nth-child(1)').text());
                window.location.href='apply.html?back=baoming';
            },200);
        });
    }

    return {
        start: start
    }
})();
studycar_classSelect.start();
