/**
 * Created by alex.yang on 15-2-12.
 */
window.com_bindDiving = (function () {
    var user=JSON.parse(localStorage['user']);
    console.log('user',user);

    var  Request=RuiDa.Tool.GetRequest(),titlenum=Request['titlename'],strback=Request['back'];
    console.log('strback',strback,'titlenum',titlenum);

    function start() {
        console.log('-----start-----');
        /*$('#a_studyname').text(user.name);
        user.memberRef=null;
        console.log('useraaaa',user);
        localStorage['user']=JSON.stringify(user);*/
        /*RuiDa.Module.bindClickfn('#backBtn',function(){
            window.location.href =sessionStorage.binddivingschool==='personcenter'?'../person/personCenter.html':'../person/myDiving.html';
        });*/


        RuiDa.Module.bindClickArr({
            '#bd_stuid':'input.html?type=binddiving&titlename=0',
            '#bd_idcard':'input.html?type=binddiving&titlename=1',
            '#bd_divingname':'list.html?type=binddiving&titlename=0'
        });

        if(titlenum=='get'){
            console.log('get');
            sessionStorage.bindDiving_type0='';
            sessionStorage.bindDiving_type1='';
            sessionStorage.bindDiving_type2='';
            GetDivingDetails();
        }
        if(strback==='binddiving'){
            console.log('binddiving',sessionStorage.bindDiving_type0,sessionStorage.bindDiving_type1,sessionStorage.bindDiving_type2);
            $('#bd_stuid>span:nth-child(3)').text(sessionStorage.bindDiving_type0||'请输入您的编号');
            $('#bd_idcard>span:nth-child(3)').text(sessionStorage.bindDiving_type1||'请输入您的身份证号');
            if(sessionStorage.bindDiving_type2){
                $('#bd_divingname>span:nth-child(3)').text(sessionStorage.bindDiving_type2.split('^')[1]);
            }else{
                $('#bd_divingname>span:nth-child(3)').text('请选择您的驾校名称');
            }

        }

        RuiDa.Module.bindClickfn('#a_applay_no',function(){
            console.log('点击了');
            GetBindDiving();
        });
    }
    function checkinfo(){
        if(!sessionStorage.bindDiving_type0||!sessionStorage.bindDiving_type1||!sessionStorage.bindDiving_type2){
            RuiDa.Alert.getAlert('信息不完整，请填写完整');
            return false;
        }
        return true;
    }

    /*绑定接口--start*/
    function GetBindDiving(){
        if(!checkinfo()) return;
        /*YTS150504011  530121197006145263
        YTS150504009  530121198405246947
        YTS150504006  530121198105253328
        YTS150504002  530121197008214197*/
        /*sessionStorage.bindDiving_type0='YTS150504011';
        sessionStorage.bindDiving_type1='530121197006145263';
        sessionStorage.bindDiving_type2='2020^宇通驾校';*/
        var params={
            'methodname':'student/findStudent.do',
            'oa': '1',
            'stuId':sessionStorage.bindDiving_type0,
            'idNumber':sessionStorage.bindDiving_type1,
            'schoolCode':sessionStorage.bindDiving_type2.split('^')[0],
            'stuCode':user.id
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            console.log(res);
            if(res.code=='1000'){
                console.log(res);
                GetBindBackSystem(res.result);
            }
        });
    }
    /*绑定接口--end*/

    /*绑定信息到后台--start*/
    function GetBindBackSystem(userinfo_oa){
        if(!checkinfo()) return;
        console.log('发起请求********************');
        /*age: 45
        eduSystem: "YTB150427001"
        eduSystemVal: "C1-普桑-补录C1车型-自由"
        idNumber: "530121197006145263"
        phone: "123545685445"
        sccode: 2020
        sex: "DC00150002"
        sexVal: "女"
        stuId: "YTS150504011"
        stuName: "孟丹红"*/
        var params={
            'methodname':'/app/member/savetieinfo',
            'userId':user.id,
            'eduSystem':userinfo_oa.eduSystem,
            'stuId':userinfo_oa.stuId,
            'eduSystemVal':userinfo_oa.eduSystemVal,
            'idNumber':userinfo_oa.idNumber,
            'stuName':userinfo_oa.stuName,
            'sex':userinfo_oa.sex,
            'sexVal':userinfo_oa.sexVal,
            'sscode':userinfo_oa.sccode

            /*'eduSystemVal':encodeURI(encodeURI(userinfo_oa.eduSystemVal)),
            'idNumber':userinfo_oa.idNumber,
            'stuName':encodeURI(encodeURI(userinfo_oa.stuName)),
            'sex':userinfo_oa.sex,
            'sexVal':encodeURI(encodeURI(userinfo_oa.sexVal))*/
        };
        //console.log('参数绑定信息到后台',params);
        Rui.Ajax(params,function(res){
            console.log('成功参数绑定信息到后台');
            console.log(res);
            if(res.code=='1000'){
                user.memberRef=params;
                localStorage['user']=JSON.stringify(user);
                console.log(user);
                //console.log(res);
                window.location.href ='../mydiving/myDiving.html';
            }
        });
    }
    /*绑定信息到后台--end*/



    /*获取该驾校详细信息信息--start*/
    function GetDivingDetails(){
        //
        var params={
            'methodname':'school/findSchool.do',
            'oa': '1',
            'schoolCode': user.memberRef.sscode
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                console.log(res);
                $('#bd_stuid>span:nth-child(3)').text(user.memberRef.stuId);
                $('#bd_idcard>span:nth-child(3)').text(user.memberRef.idNumber);
                $('#bd_divingname>span:nth-child(3)').text(res.result.namedesc);
                if(user.memberRef!==null){
                    $('.a_bot').hide();
                }
            }
        });
    }
    /*获取该驾校详细信息信息--end*/

    return {
        start: start
    }
})();
com_bindDiving.start();
