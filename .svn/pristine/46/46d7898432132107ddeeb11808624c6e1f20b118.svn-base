/**
 * Created by alex.yang on 15-2-12.
 */
window.studycar_applay = (function () {
    var titlename=['0','1','2'],bindarr=['#a_en','#a_zj','#a_lx'];
    var  Request=RuiDa.Tool.GetRequest(),titlenum=Request['titlename'],strback=Request['back'];

    console.log('titlenum',titlenum,'strback',strback,'divingname',sessionStorage.baomingdivingname);
    function start() {
        $('#a_divingname').text(sessionStorage.baomingdivingname);
        RuiDa.Module.backUrl('studyCar.html');

        console.log('-----start-----');
        if(titlenum){
            sessionStorage.divingid=titlenum;
            sessionStorage.applay_type0='';
            sessionStorage.applay_type1='';
            sessionStorage.applay_type2='';
            sessionStorage.applay_type3='';
        }
        if(strback){
            console.log(1111,sessionStorage.applay_type0,sessionStorage.applay_type1,sessionStorage.applay_type2,sessionStorage.applay_type3);
            console.log(bindarr[0]+'>span:nth-child(3)');
            if(sessionStorage.applay_type3){
                $('#a_cs>span:nth-child(3)').text(sessionStorage.applay_type3.split('^')[1]);
            }else{
                $('#a_cs>span:nth-child(3)').text('请选择班制');
            }
            $(bindarr[0]+'>span:nth-child(3)').text(sessionStorage.applay_type0||'请输入您的真实姓名');
            $(bindarr[1]+'>span:nth-child(3)').text(sessionStorage.applay_type1||'请输入您的身份证号');
            $(bindarr[2]+'>span:nth-child(3)').text(sessionStorage.applay_type2||'请输入您的联系方式');
        }
        RuiDa.Module.bindClickArr({
            '#a_cs':'../studycar/classSelect.html?type=baoming&divingid='+sessionStorage.divingid,
            '#a_en':'../studycar/enterName.html?type=baoming&titlename='+titlename[0],
            '#a_zj':'../studycar/enterName.html?type=baoming&titlename='+titlename[1],
            '#a_lx':'../studycar/enterName.html?type=baoming&titlename='+titlename[2]
           /* '.a_bot_pay>div:nth-child(2)>button':'pay.html'*/
        });
    }

    RuiDa.Module.bindClickfn('#a_applay_no',function(){
        console.log('a_applay_no');
        GetApply();
    });
    function checkinfo(){
        if(!sessionStorage.applay_type0||!sessionStorage.applay_type1||!sessionStorage.applay_type2||!sessionStorage.applay_type3){
            console.log('为假');
            RuiDa.Alert.getAlert('信息不完整，请填写完整');
            return false;
        }
        return true;
    }
    /*报名--start*/
    function GetApply(){
        //
        if(!checkinfo()) return;
        //return ;
        var user=JSON.parse(localStorage['user']);
        console.log(user);
        /*age: 0
        birthday: ""
        email: ""
        id: "2b3551ae7bc7451081c454ee1169ed4c"
        idCard: ""
        name: "测试"
        nickname: ""
        sex: 0
        telNumber: "15911017679"
        token: "2b3551ae7bc7451081c454ee1169ed4c"*/

        var params={
            'methodname':'apply/signUp.do',
            'oa': '1',
            'schoolCode': sessionStorage.divingid,
            'stuName':sessionStorage.applay_type0,
            'idcard':sessionStorage.applay_type1,
            'stuPhone':user.telNumber,
            'eduSystem':sessionStorage.applay_type3.split('^')[0]
        };
        console.log('报名参数',params);
        //return;
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                console.log(res);//studycar/studyCar.html
                RuiDa.Alert.getAlert('报名信息已提交');
                setTimeout(function(){
                    window.location.href ='studyCar.html'
                },1000);

            }
        });
    }
    /*报名--end*/
    RuiDa.Module.bindClickfn('#a_applay_yes',function(){
        console.log('a_applay_yes');
        GetApplyPay();
    });
    /*报名缴费--start*/
    function GetApplyPay(){
        //stuName idcard stuPhone feeprice eduSystem schoolCode
        if(!checkinfo()) return;
        var user=JSON.parse(localStorage['user']);
        console.log(user);
        var params={
            'methodname':'apply/signUpPayment.do',
            'oa': '1',
            /*'schoolCode': '2020',
            'stuName':'test1',
            'idcard':'6124154141214512141',
            'stuPhone':'15911017675',
            'eduSystem':'4',
            'feeprice':'5000'*/
            'schoolCode': sessionStorage.divingid,
            'stuName':user.name,
            'idcard':'YTS150504011',
            'stuPhone':user.telNumber,
            'eduSystem':sessionStorage.applay_type3.split('^')[0],
            'feeprice':sessionStorage.applay_type3.split('^')[2]
        };
        console.log('参数',params);
        //return;
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*报名缴费--end*/
    return {
        start: start
    }
})();
studycar_applay.start();
