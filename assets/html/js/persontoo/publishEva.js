/**
 * Created by alex.yang on 15-2-12.
 */
window.persontoo_publishEva = (function () {

    var  Request=RuiDa.Tool.GetRequest(),titlename=Request['titlename'],strtype=Request['type'],strpingjia= 0,arrxing=['5','3','1'];
    console.log('titlename',titlename,'strtype',strtype);
    var user=JSON.parse(localStorage['user']);
    console.log('user',user,user.memberRef.stuId);
    function start() {
        console.log('-----start-----');
        GetDivingDetails();

        RuiDa.Module.bindClickfn('#pe_but>button',function(val){
            console.log(121212);
            var strcontent=$('textarea').val()=='请输入评价内容（20个字以内）'?'':$('textarea').val();
            console.log('strcontent',strcontent);
            GoEvaluate(strcontent);
        });

        RuiDa.Module.bindClickfn('.pt_pingjiatype>img',function(val){
            $(val).siblings().attr('src','../../res/img/eva_sel_no.png');
            $(val).attr('src','../../res/img/eva_sel_yes.png')
            console.log($(val).next().text());
            switch($(val).next().text()){
                case '好评':
                    strpingjia=0;
                    $('.pt_xing>img').attr('src','../../res/img/eva_xing_yes.png');
                    break;
                case '中评':
                    strpingjia=1;
                    $('.pt_xing>img').attr('src','../../res/img/eva_xing_yes.png');
                    $('.pt_xing>img:nth-child(4)').attr('src','../../res/img/eva_xing_no.png');
                    $('.pt_xing>img:nth-child(5)').attr('src','../../res/img/eva_xing_no.png');
                    break;
                case '差评':
                    strpingjia=2;
                    $('.pt_xing>img').attr('src','../../res/img/eva_xing_no.png');
                    $('.pt_xing>img:nth-child(1)').attr('src','../../res/img/eva_xing_yes.png');
                    break;
            }
        });
        $('textarea').bind('focus',function(){
            if($(this).val()=='请输入评价内容（20个字以内）'){
                $(this).val('');
            }
        }).bind('blur',function(){
                var strcontent= $.trim($(this).val());
                console.log('什么东西',strcontent.length);
                if(!strcontent||strcontent.length==0){
                    $(this).val('请输入评价内容（20个字以内）');
                }
            });
    }

    /*获取该驾校详细信息信息--start*/
    function GetDivingDetails(){
        var params={
            'methodname':'school/findSchool.do',
            'oa': '1',
            'schoolCode': strtype?titlename:user.memberRef.sscode
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功获取该驾校详细信息信息');
            if(res.code=='1000'){
                console.log(res);
                $('#pe_divingname').text(res.result.namedesc);
            }
        });
    }
    /*获取该驾校详细信息信息--end*/

    /*评价接口--start*/
    function GoEvaluate(val2){
        //refId,type,content,star,author,isGood
        var params={
            'methodname':'/app/assess/saveOrUpdate',
            'refId': user.memberRef.stuId,
            'type':'0',
            'content':val2,
            'star':arrxing[strpingjia],
            'author':user.name
            /*'isGood':strpingjia*/
        };
        console.log('参数',params);

        Rui.Ajax(params,function(res){
            console.log('成功111111',res);
            if(res.code=='1000'){
                console.log(res);
                RuiDa.Alert.getAlert('评价成功');
                setTimeout(function () {
                    //RuiDa.Module.backHistory();
                    window.history.back();
                }, 1000);
            }
        });
    }
    /*评价接口--end*/

    return {
        start: start
    }
})();
persontoo_publishEva.start();
