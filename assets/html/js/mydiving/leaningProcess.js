/**
 * Created by alex.yang on 15-2-12.
 */
window.mydiving_leaningProcess = (function () {
    var pstr=process= 1 ,arrleaningProcess=['','报名','科目一','科目二','科目三','科目四','取证'];
    //var user=JSON.parse(localStorage['user']);
    var user=Rui.GetInfo.getuser();
    console.log('user',user);
    function start() {
        console.log('-----start-----');
        GetleaningProcess();
        //getprocess();
    }
    //获取左边进度
    function getprocess(){
        $('.lp_one>div').empty();
        if(process==6){
            console.log(6666);
            //$('.lp_one>div:nth-child(6)').empty().append('<img src="../../res/img/studyprocessnew/process_6.png"/>');
        }else{
            $('.lp_one>div:nth-child(6)').empty().append('<img src="../../res/img/studyprocessnew/process_8.png"/>');
        }
        //$('.lp_one>div:nth-child(1)').append('<img src="../../res/img/studyprocess/process_2.png"/>');
        for(var p=1;p<=process;p++){
            console.log('p',p);
            $('.lp_one>div:nth-child('+p+')').append('<img src=../../res/img/studyprocessnew/process_'+ p.toString()+'.png />');
           //$('.lp_one>div:nth-child('+ p.toString()+').append(' <img src="../../res/img/studyprocess/process_'+ p.toString()+'.png"/>');
        }
        $('.lp_two>div:nth-child('+process.toString()+')').attr('class','hover');
        process++;
        for(;process<6;process++){
            console.log('5里面');
            $('.lp_one>div:nth-child('+process+')').append('<img src=../../res/img/studyprocessnew/process_8.png />');
        }
        getpcenter();
    }

    //获得中间的进度
    function getpcenter(){
        var pathhead='../../res/img/studyprocessnew/';
      /* if(pstr===1){
           $('.lp_center>span:nth-child('+pstr.toString()+')>img').attr('src',pathhead+'pcenter_'+ pstr.toString()+'.png');
       }*/
        for(var i=1;i<=pstr;i++){
            $('.lp_center>span:nth-child('+i.toString()+')>img').attr('src',pathhead+'pcenter_'+ i.toString()+'.png');
            $('.lp_center>span:nth-child('+i.toString()+')>em').css('color','#006D75');
        }
    }

    /*学习进度--start*/
    function GetleaningProcess(){
        var params={
            'methodname':'student/studyProgress.do',
            'oa': '1',
            'schoolCode': user.memberRef.sscode,
            'stuId':user.memberRef.stuId
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('获取学习进度数据');
            if(res.code=='1000'){
                console.log('data',res);
                var level=res.result.statusStr;
                for(var key in arrleaningProcess)if(level===arrleaningProcess[key]){
                    console.log('level',level,'arrleaningProcess[key]',arrleaningProcess[key]);
                        console.log('key',key);
                        pstr=process=parseInt(key);
                        //pstr=process=6;
                }
                getprocess();
                console.log();
                RuiDa.Module.bindClickArr({'.hover':'leaningProcessDetails.html?titlename='+arrleaningProcess[pstr]+'&username='+user.name});
                BindleaningProcess();
            }
        });
    }


    /*学习进度--end*/
    function BindleaningProcess(){
        RuiDa.Module.bindClickfn('.lp_center span',function(val){
            console.log($(val).find('em').text().substring(0,2));
            console.log($(val).attr('class').split('_')[1]);
            if(parseInt($(val).attr('class').split('_')[1])<=pstr){
                window.location.href = 'leaningProcessDetails.html?titlename='+arrleaningProcess[$(val).attr('class').split('_')[1]]+'&username='+user.name;
            }
        });
    }

    return {
        start: start
    }
})();
mydiving_leaningProcess.start();
