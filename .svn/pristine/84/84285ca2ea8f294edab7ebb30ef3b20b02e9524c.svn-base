/**
 * Created by alex.yang on 15-2-12.
 */
window.mydiving_Training = (function () {
    var user=JSON.parse(localStorage['user']),selecttime='2015-4-28',
        yuyuetimeid='',yuyuetimestr='';
    var arrsubject=['DC00080001','DC00080002','DC00080003','DC00080004'],subject=arrsubject[1];

    console.log('user',user);

    function start() {
        console.log('-----start-----');
        RuiDa.Module.bindClickArr({
            /*'#register': 'register.html',
             '#forget': 'forgetPwd.html'*/
        });
        $('.t_title>div>span:nth-child(1)').bind('click',function(){
            console.log(111,$(this).attr('class'));
            if($(this).attr('class')){
                console.log('有');
            }else{
                console.log('无11');
                $(this).attr('class',$(this).next().attr('class')).next().removeClass();
				$('.demo').show();
                $('.t_s_one').show();
                $('.t_s_one_next').hide();
                $('.t_s_one_footer').show();
                $('.t_s_two').hide();
                $('.t_s_title').hide();
            }
        });
        $('.t_title>div>span:nth-child(2)').bind('click',function(){
            console.log(111,$(this).prev().attr('class'),$(this).attr('class'));
            if($(this).attr('class')){
                console.log('有');
            }else{
                $(this).attr('class',$(this).prev().attr('class')).prev().removeClass();
				$('.demo').hide();
                $('.t_s_one').hide();
                $('.t_s_one_next').hide();
                $('.t_s_one_footer').hide();
                $('.t_s_one_next2').hide();
                $('.t_s_two').show();
                $('.t_s_title').show();
                console.log('无');
                console.log('1111111111111111');
                GetTrainingList();
            }
        });

        $('.t_s_one>div:nth-child(2)>div>button').bind('click',function(){
            console.log('fj');
            if($(this).attr('class')){
                console.log('有');
            }else{
                console.log('无',$(this).parent().siblings().children().first().attr('class') );
                $(this).attr('class',$(this).parent().siblings().children().first().attr('class')).parent().siblings().children().first().removeClass();
            }
            subject=$(this).text()==='科目二'?arrsubject[1]:arrsubject[2];
            console.log('subject',subject);
        });


        /*$('.t_s_one_footer>button').bind('touchstart',function(){});*/
        RuiDa.Module.bindClickfn('.t_s_one_footer>button',function(){
            $('.t_s_one').hide();
            $('.t_s_one_next').show();
            $('.t_s_one_footer').hide();
            console.log(1111);	
            $('.demo').hide();
            GetTrainingTime();
        });

       /* $('.t_s_one_next>li>div:nth-child(3)>button').bind('touchstart',function(){
            $('.t_s_one_next').hide();
            $('.t_s_one_next2').show();
        });*/
       /* $('.t_s_one_next2>li>div:nth-child(3)>button').bind('touchstart',function(){
            RuiDa.Alert.getAlert('预约成功，请按时参加训练！');
        });*/

       /* $('.t_s_two button').bind('touchstart',function(){
            RuiDa.Alert.getAlert('预约已经取消！');
        });*/
    }


    /*查看已约数据列表--start*/
    function GetTrainingList(){
        //schoolCode nextPage  pageSize  stuId
        var params={
            'methodname':'appointcar/appointCarList.do',
            'oa': '1',
            'schoolCode': user.memberRef.sscode,
            'nextPage':'1',
            'pageSize':'10',
           /* 'stuId':'YTS15010088'*/
            'stuId':user.memberRef.stuId
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('');
            console.log('成功111111');
            if(res.code=='1000'){
                /*appointDate: "2015-04-25"
                appontCarId: 42
                status: "已取消"
                timeName: "09:00-10:00"*/
                var data=res.result.rows,html='';
                console.log('data',data,data.length);
                if(data.length>0){
                    for(var key in data){
                        html+='<li>';
                        html+='<div><span>'+data[key].appointDate+'</span><span>'+data[key].timeName+'</span></div>';
                        html+='<div><span>'+data[key].coachName+'</span></div>';//coachName
                        html+=data[key].status=='已预约'?'<div><span>已预约</span></div><div><button class="t_cancel" id='+data[key].appontCarId+'>取消预约</button></div>':'<div><span></span></div><div><span>已取消</span></div>';
                        html+='</li>';
                    }
                }else{
                    html+='<div class="t_yuyueno"><span>您尚未预约</span></div>';
                }

                $('.t_s_two').empty().append(html);
                BindTrainingList();
            }
        });
    }
    /*查看已约数据列表--end*/

    function BindTrainingList(){
        RuiDa.Module.bindClickfn('.t_cancel',function(val){
            //window.location.href = 'messageDetails.html?titlename='+$(val).attr('id');
            GoNoTraining($(val).attr('id'),$(val));
        });
    }
    /*取消约车--start*/
    function GoNoTraining(id,dom){
        //
        var params={
            'methodname':'appointcar/appointCarCancel.do',
            'oa': '1',
            'stuId': user.memberRef.stuId,
            'appontCarId':id
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                console.log(res);
                $(dom).parent().prev().find('span').text('');
                $(dom).parent().empty().append('<span>已取消</span>');
                RuiDa.Alert.getAlert('取消预约成功');
            }
        });
    }
    /*取消约车--end*/


    /*预约时间段--start*/
    function GetTrainingTime(){
        //schoolCode nextPage pageSize appointDate
        var params={
            'methodname':'appointcar/appointmentTime.do',
            'oa': '1',
            'schoolCode': user.memberRef.sscode,
            'nextPage':'1',
            'pageSize':'10',
            'appointDate':selecttime
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功预约时间段',res);
            if(res.code=='1000'){
                var data=res.result.rows,html='';
                console.log(data);
                for(var key in data) if(data[key].peopleCount>0){
                    html+='<li>';
                    html+='<div><span>'+selecttime+'</span><span>'+data[key].timeName+'</span></div>';
                    html+='<div><span><em>'+data[key].peopleCount+'</em>人可预约</span></div>';
                    html+='<div><button class="t_s_kan" ktime="'+data[key].timeName+'" id="'+data[key].timeId+'">查看</button></div>';
                    html+='</li>';
                }
                $('.t_s_one_next').empty().append(html);
                BindTrainingTime();
            }
        });
    }

    function BindTrainingTime(){
        RuiDa.Module.bindClickfn('.t_s_kan',function(val){
            $('.t_s_one_next').hide();
            $('.t_s_one_next2').show();
            //window.location.href = 'messageDetails.html?titlename='+$(val).attr('id');
            console.log('111111111111111111111111111',$(val).attr('ktime'));
            yuyuetimeid=$(val).attr('id');
            yuyuetimestr=$(val).attr('ktime');
            GetTrainingTimeDetails();
        });
    }
    /*预约时间段--end*/

    /*每个时间段详细--start*/
    function GetTrainingTimeDetails(){
        //schoolCode nextPage  pageSize  appointDate timeName
        var params={
            'methodname':'appointcar/appointTimeDetailed.do',
            'oa': '1',
            'schoolCode': user.memberRef.sscode,
            'nextPage':'1',
            'pageSize':'10',
            'appointDate':selecttime,
            'timeName':yuyuetimestr
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                var data=res.result.rows,html='';
                console.log('data',data);
                for(var key in data){
                    /*carName: "冀C2454545"
                     coachId: "YTE150205010"
                     coachName: "白林祥"
                     groupId: 93*/
                    html+='';
                    html+='<li>';
                    html+='<div><img id='+data[key].coachId+' src="../../res/img/mycollect_4.png"/></div>';
                    html+='<div><span>'+data[key].carName+'</span><span>'+data[key].coachName+'</span></div>';
                    html+='<div><button class="t_s_yuyue" id="'+data[key].groupId+'">预约</button></div>';
                    html+='</li>';
                }
                $('.t_s_one_next2').empty().append(html);
                BindTrainingTimeDetails();
                BindCoachDetails();
            }

        });
    }
    /*每个时间段详细--end*/

    function BindTrainingTimeDetails(){
        RuiDa.Module.bindClickfn('.t_s_yuyue',function(val){
            GoTraining($(val).attr('id'),$(val));
        });
    }

    function BindCoachDetails(){
        RuiDa.Module.bindClickfn('.t_s_one_next2>li>div:nth-child(1)>img',function(val){
           window.location.href='coachDetails.html?titlename='+$(val).attr('id')+'&schoolcode='+user.memberRef.sscode;
        });
    }
    /*提交预约--start*/
    function GoTraining(groupId,id){
        //schoolCode appointDate subject stuId stuName groupId appointmentId timeName

        var params={
            'methodname':'appointcar/appointCarAfter.do',
            'oa': '1',
            'schoolCode': user.memberRef.sscode,
            'appointDate':selecttime,
            'subject':subject,
            'stuId':user.memberRef.stuId,
            'stuName':user.name,
            'groupId':groupId,
            'appointmentId':yuyuetimeid,
            'timeName':yuyuetimestr
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                console.log(res);
                $(id).parent().parent().hide();
                RuiDa.Alert.getAlert('预约成功');
            }
        });
    }
    /*提交预约--end*/


    return {
        start: start
    }
})();
mydiving_Training.start();
