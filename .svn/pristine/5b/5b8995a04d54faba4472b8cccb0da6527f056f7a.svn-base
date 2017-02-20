/**
 * Created by alex.yang on 15-2-12.
 */
window.studycar_enterName = (function () {
    console.log(JSON.parse(localStorage['user']));

    var  Request=RuiDa.Tool.GetRequest(),titlename=Request['titlename'],strtype=Request['type'];
    console.log('titlename',titlename,'strtype',strtype);
    if(strtype==='binddiving'){
        var arrbinddiving={1:['输入学员编号','输入身份证号','选择驾校'],2:['请输入您的编号','请输入您的身份证号','请选择您的驾校']};
        $('.h_center').text(arrbinddiving[1][titlename]);
        $('.main_login input').attr('placeholder',arrbinddiving[2][titlename]);
    }


   /* if(strtype==='personinfo'){
        var arrstr={1:['输入姓名','输入联系方式','输入昵称','选择性别','输入年龄'],2:['请输入您的真实姓名','请输入您的身份证号','请输入您的昵称','请选择您的性别','请输入您的年龄']};
        $('.h_center').text(arrstr[1][titlename]);
        $('.main_login input').attr('placeholder',arrstr[2][titlename]);
    }else{
        var arrstr={1:['输入姓名','输入证件','联系方式','昵称'],2:['请输入您的真实姓名','请输入您的身份证号','请输入您的手机号','请输入您的昵称']};
        $('.h_center').text(arrstr[1][titlename]);
        $('.main_login input').attr('placeholder',arrstr[2][titlename]);
    }*/


    console.log('titlename',titlename,'strtype',strtype);
    function start() {
        console.log('-----start-----');
        RuiDa.Module.bindClickfn('#en_but>button',function(){
            var strtext=$('#txt').val();
            if(strtype==='binddiving'){
                console.log(121212,strtext);
                setTimeout(function(){
                    sessionStorage.setItem('bindDiving_type'+titlename,strtext);
                    window.location.href='bindDiving.html?back='+strtype;
                },200);
            }
            return;

            if(strtype==='person'){

            }else if(strtype==='baoming'){
                console.log(121212,strtext);
                setTimeout(function(){
                    sessionStorage.setItem('applay_type'+titlename,strtext);
                    window.location.href='apply.html?back=baoming';
                },200);
            }else{
                RuiDa.Alert.getAlert('提交成功');
                /* setTimeout(function () {
                 window.history.back();
                 }, 2000);*/
                update();
            }
        });

        /*$('#en_but>button').bind('touchstart',function(){
            if(type==='baoming'){
                console.log(121212);


            }else{
                RuiDa.Alert.getAlert('提交成功');
                *//* setTimeout(function () {
                 window.history.back();
                 }, 2000);*//*
                update();
            }

        });*/
    }

    /*修改信息--start*/
    function update(){
        var params={
            'methodname':'app/member/modify',
            'token':JSON.parse(localStorage['user']).id,
            'name':'yangrui'
        };
        console.log(params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            console.log(res);
        });
    }
    /*修改信息--end*/

    return {
        start: start
    }
})();
studycar_enterName.start();
