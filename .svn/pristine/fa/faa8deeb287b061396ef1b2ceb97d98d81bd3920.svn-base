/**
 * Created by alex.yang on 15-2-12.
 */
window.mydiving_addingRecord=(function(){
    var arrsubject={'科目一':'DC00080001','科目二':'DC00080002','科目三':'DC00080003','科目四':'DC00080004'},
        arrsubjecttype={'理论':'DC00070001','实操':'DC00070002'},
        strpingjia=0,arrpingjia=['DC00650001','DC00650002','DC00650003'],arrxing=['5','3','1'];

    var  Request=RuiDa.Tool.GetRequest(),titlenum=Request['titlename'],strback=Request['back'];
    console.log('strback',strback,'titlenum',titlenum);

    var user=JSON.parse(localStorage['user']);
    console.log('user',user,user.memberRef.stuId);

    function start(){
        console.log('start');
        setTimeout(function(){
            RuiDa.Module.initIScroll();
        },200);
        $('.ar_one>span:nth-child(1)>em').text(user.name);
        $('.ar_one>span:nth-child(2)>em').text(user.memberRef.stuId);
        if(titlenum=='get'){
            console.log('get');
            sessionStorage.bindCoach='';
        }
        if(strback==='BindCoach'){
            console.log('进来了BindCoach',sessionStorage.bindCoach);
            $('.ar_thr>span:nth-child(2)').text(sessionStorage.bindCoach.split('^')[1]);
        }

       $('#ar_kemu>span').bind('click',function(){
           $(this).siblings().removeClass();
           $(this).addClass('aa');
           console.log($(this).text());
           if($(this).text()=='科目一'){
               console.log('进来');
               $('#ar_lixing>span:nth-child(2)').text('').removeClass().siblings().removeClass();
               $('#ar_lixing>span:nth-child(3)').text('');
               $('#ar_lixing>span:nth-child(1)').addClass('aa');
           }else{
               $('#ar_lixing>span:nth-child(2)').text('模拟').removeClass().siblings().removeClass();
               $('#ar_lixing>span:nth-child(3)').text('实操');
               $('#ar_lixing>span:nth-child(1)').addClass('aa');
           }
       });
        $('#ar_lixing>span').bind('click',function(){
            $(this).siblings().removeClass();
            $(this).addClass('aa');
        });

        $('.ar_sev>div:nth-child(1)>img').bind('click',function(){
            $(this).siblings().attr('src','../../res/img/eva_sel_no.png');
            $(this).attr('src','../../res/img/eva_sel_yes.png');
            switch($(this).next().text()){
                case '好评':
                    strpingjia=0;
                    $('.ar_sev>div:nth-child(2)>img').attr('src','../../res/img/eva_xing_yes.png');
                    break;
                case '中评':
                    strpingjia=1;
                    $('.ar_sev>div:nth-child(2)>img').attr('src','../../res/img/eva_xing_yes.png');
                    $('.ar_sev>div:nth-child(2)>img:nth-child(4)').attr('src','../../res/img/eva_xing_no.png');
                    $('.ar_sev>div:nth-child(2)>img:nth-child(5)').attr('src','../../res/img/eva_xing_no.png');
                    break;
                case '差评':
                    strpingjia=2;
                    $('.ar_sev>div:nth-child(2)>img').attr('src','../../res/img/eva_xing_no.png');
                    $('.ar_sev>div:nth-child(2)>img:nth-child(1)').attr('src','../../res/img/eva_xing_yes.png');
                    break;
            }
        });

        RuiDa.Module.bindClickArr({
            '.ar_thr>span:nth-child(3)':'../com/list.html?type=BindCoach'
        });
        /*RuiDa.Module.bindClickfn('.ar_thr>span:nth-child(3)',function(){
           console.log('找到教练');

        });*/

        RuiDa.Module.bindClickfn('.ar_eig>button',function(){
            GetSchoolEnter();
        });

        //GetSchoolEnter();
    }

    function checkinfo(){
        if(!sessionStorage.bindCoach){
            RuiDa.Alert.getAlert('请选择教练');
            return false;
        }
        //学习时间的验证
        if(!RuiDa.Check.isCureNum($('#ar_studytime').val())||$('#ar_studytime').val().length===0){
            RuiDa.Alert.getAlert('本次学习时间无效，请重新填写');
            return false;
        }
        //学习内容验证

        return true;
    }

    /*学时录入--start*/
    function GetSchoolEnter(){
        //stuId subject subjectType coachId inputDate studyTime reviewScore reviewType  reviewContent schoolCode
        //var str
        if(!checkinfo()) return;

        var strcontent=$('textarea').val()==='请输入您的评论内容（25字之内）'?'':$('textarea').val();

        var user=JSON.parse(localStorage['user']);
        console.log('user',user);
        console.log('subject',arrsubject[$('#ar_kemu>.aa').text()]);
        console.log('subjectType',arrsubjecttype[$('#ar_lixing>.aa').text()]);
        console.log('coachId','');
        console.log('inputDate',RuiDa.Tool.GetToday());
        console.log('studyTime',$('#ar_studytime').val());
        console.log('reviewType',strpingjia);
        console.log('reviewContent',strcontent);

        var params={
            'methodname':'studytime/stuStudyTime.do',
            'oa': '1',
            'stuId': user.memberRef.stuId,
            'subject':arrsubject[$('#ar_kemu>.aa').text()],
            'subjectType':arrsubjecttype[$('#ar_lixing>.aa').text()],
            'coachId':sessionStorage.bindCoach.split('^')[0],
            'inputDate':RuiDa.Tool.GetToday(),
            'studyTime':$('#ar_studytime').val(),
            'reviewScore':arrxing[strpingjia],
            'reviewType':arrpingjia[strpingjia],
            'reviewContent':strcontent,
            'schoolCode':user.memberRef.sscode
        };
        console.log('参数',params);


        Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                console.log(res);
                RuiDa.Alert.getAlert('新增记录，提交评价成功！');
                //setTimeout(function(){ window.location.href='schoolEnter.html';},1000);
            }
        });
    }
    /*学时录入--end*/

    return {
        start:start
    }
})();
mydiving_addingRecord.start();