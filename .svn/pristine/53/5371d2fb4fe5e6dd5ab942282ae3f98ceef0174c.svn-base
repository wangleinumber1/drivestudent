/**
 * Created by alex.yang on 15-2-12.
 */
window.mydiving_leaningProcessDetails = (function () {//username
    var  Request=RuiDa.Tool.GetRequest(),titlename=Request['titlename'],strusername=Request['username'];
    console.log('titlename',titlename);
    //titlename='取证';
    function start() {
        console.log('-----start-----');
        $('.lpd_demo1>p:nth-child(1)').text(strusername+'：');

        if(titlename!=='取证'){
            $('.lpd_demo1').show();
            $('.lpd_demo2').hide();
        }else{
            $('.lpd_demo1').hide();
            $('.lpd_demo2').show();

        }
        RuiDa.Module.bindClickfn('.lpd_demo2>button',function(){
            RuiDa.Alert.getAlert('取证后才能进行教学评价');
            /* '#md_jxpj':'../persontoo/publishEva.html',*/
        });
        GetLeaningProcess();
    }
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
            console.log('进度详情',res);
            if(res.code=='1000'){
                var data=res.content;
                console.log(data);
                for(var key in data) if(titlename===data[key].name){
                     console.log('选中',111,data[key]);
                    if(titlename!=='取证')
                        $('.lpd_demo1>p:nth-child(2)').text(data[key].dictItemDesc);
                    else
                        $('.lpd_demo2>p:nth-child(2)').text(data[key].dictItemDesc);
                }
            }
        });
    }
    /*学习进度项目接口--end*/

    return {
        start: start
    }
})();
mydiving_leaningProcessDetails.start();
