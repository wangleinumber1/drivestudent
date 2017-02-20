/**
 * Created by alex.yang on 15-2-12.
 */
window.login_register=(function(){
    var  Request=RuiDa.Tool.GetRequest(),
        titlename=Request['titlename'],
        titlearr={1:'注册',2:'找回密码',3:'修改密码'};
    console.log('titlename',titlename);
    $('.h_center').text(titlearr[titlename]);

    function start(){
        //console.log('login_register');
        console.log(RuiDa);
        RuiDa.Module.bindClickArr({
            '#next': 'setPwd.html',
            '.user': 'registerAgree.html'
        });

        //获取验证码
        $('#getchecked').bind('click',function(){
            //getCheckCode();
            if(titlename==='1'){
                isregister();
            }else{
                getCheckCode();
            }

        });

        //注册/找回密码/修改密码
        $('#submit').bind('click',function(){
            console.log(123321,titlename);
            if(titlename==='1'){
                console.log('register');
                register();
            }else if(titlename==='2'){
                console.log('findPwd');
                findPwd();
            }else if(titlename==='3'){
                console.log('updatePwd');
                updatePwd();
            }

        });

    }
    /*修改密码--start*/
    function updatePwd(){
        var strtel=$('#telnum').val(),smscode=$('#checknum').val(),strpwd=$('#newpwd').val(),strpwdtoo=$('#newpwdtoo').val();
        console.log(strtel,strpwd);
        if(!checkTel(strtel)){
            return false;
        }
        if(!checkCheckNum(smscode)){
            return false;
        }
        if(!checkOldPwd(strpwd,strpwdtoo)){
            return false;
        }
       /* var params={
            'methodname':'app/member/modifypwd',
            'token':JSON.parse(localStorage['user']).id,
            'smscode':smscode,
            'tel':'15911017679',
            'newPwd':'112233',
            'pwd':'123123'
        };
        Rui.Ajax(params,function(res){
            console.log('成功111111修改密码');
            if(res.code=='1000'){
                console.log(res);
            }
        });*/

        var params={
            'methodname':'app/member/modifypwd',
            'token':JSON.parse(localStorage['user']).id,
            'smscode':smscode,
            'tel':strtel,
            'pwd':strpwd,
            'newPwd':strpwdtoo
        };
        Rui.Ajax(params,function(res){
            console.log('成功111111修改密码',res);
            if(res.code=='1000'){
                console.log(res);
                RuiDa.Alert.getAlert('密码修改成功');
                setTimeout(function(){ window.location.href='../login/login.html';},1000)
            }else
			{
				RuiDa.Alert.getAlert('密码修改失败');
			}
        });
    }
    /*修改密码--end*/

    /*找回密码--start*/
    function findPwd(){
        var strtel=$('#telnum').val(),smscode=$('#checknum').val(),strpwd=$('#newpwd').val(),strpwdtoo=$('#newpwdtoo').val();
        console.log(strtel,strpwd);
        if(!checkTel(strtel)){
            return false;
        }
        if(!checkCheckNum(smscode)){
            return false;
        }
        if(!checkPwd(strpwd,strpwdtoo)){
            return false;
        }

        var params={
            'methodname':'app/member/resetpwd',
            'token':'1',
            'smscode':smscode,
            'tel':strtel,
            'newPwd':strpwd
        };
        Rui.Ajax(params,function(res){
            console.log('成功111111找回密码');
			if(res.code=='1000'){
            	console.log(res);
                RuiDa.Alert.getAlert('找回修改成功');
                setTimeout(function(){ window.location.href='../login/login.html';},1000)
            }else
			{
				RuiDa.Alert.getAlert('找回密码失败');
			}
            
        });
    }
    /*找回密码--end*/

    /*注册--start*/
    function register(){
        var strtel=$('#telnum').val(),smscode=$('#checknum').val(),strpwd=$('#newpwd').val(),strpwdtoo=$('#newpwdtoo').val();
        if(!checkTel(strtel)){
            return false;
        }
        if(!checkCheckNum(smscode)){
            return false;
        }
        if(!checkPwd(strpwd,strpwdtoo)){
            return false;
        }
		//strpwd = hex_sha1(strpwd);
        var params={
            'methodname':'app/member/register',
            'pwd':strpwd,
            'smscode':smscode,
            'tel':strtel
        };
		console.log(params);
        Rui.Ajax(params,function(res){
            console.log('调用成功111111注册',res);
            if(res.code=='1000'){
                console.log('注册成功');
                RuiDa.Alert.getAlert('注册成功');
                console.log(res);
				localStorage['user'] = JSON.stringify(res.content);
				if(res.content!=null)
				{
					localStorage.removeItem("userpic");
					localStorage['userpic'] = res.content.pic;
					var xinghao=RuiDa.Tool.deviceType();
					if(xinghao=="ios")
					{
						console.log(xinghao);
						//cordova.exec(function(){},function(){},"UM_SharePlugin","print",[title,zixun_url,'']);
					}else if(xinghao=="android")
					{
						console.log("访问"+xinghao+",用户ID："+res.content.id);
						androidjsdemo.adduserData(datauser.id);
					}
					setTimeout(function(){ window.location.href='../home/home.html';},1000)
				}else
				{
					setTimeout(function(){ window.location.href='../login/login.html';},1000)
				}
            }else if(res.code='1003'){
                //RuiDa.Alert.getAlert('您的手机号已注册过');
                RuiDa.Alert.getAlert(res.message);
            }
        });
    }
    /*注册--end*/

    function checkTel(val){
        if(!val.length){
            RuiDa.Alert.getAlert('请输入手机号');
            return false;
        }
        if(!RuiDa.Check.isCertainLength(val,11,11)||!RuiDa.Check.isMHMobile(val)){
            RuiDa.Alert.getAlert('手机号格式不正确');
            return false;
        }
        return true;
    }

    function checkCheckNum(val){
        if(!val.length){
            console.log(val);
            RuiDa.Alert.getAlert('请输入验证码');
            return false;
        }
        if(!RuiDa.Check.isCertainLength(val,6,6)||!RuiDa.Check.isCureNum(val)){
            RuiDa.Alert.getAlert('验证码格式不正确');
            return false;
        }
        return true;
    }

    function checkOldPwd(oldpwd,newpwd){
        if(!oldpwd.length){
            RuiDa.Alert.getAlert('请输入原密码');
            return false;
        }
        if(!newpwd.length){
            RuiDa.Alert.getAlert('请输入新密码');
            return false;
        }
        if(!RuiDa.Check.isCertainLength(oldpwd,6,15)){
            RuiDa.Alert.getAlert('原密码格式不正确');
            return false;
        }
        if(!RuiDa.Check.isCertainLength(newpwd,6,15)){
            RuiDa.Alert.getAlert('新密码格式不正确');
            return false;
        }
        if(oldpwd===newpwd){
            RuiDa.Alert.getAlert('原密码和新密码不能相同');
            return false;
        }
        return true;
    }

    function checkPwd(val1,val2){

        if(!val1.length){
            RuiDa.Alert.getAlert('请输入新密码');
            return false;
        }
        if(!val2.length){
            RuiDa.Alert.getAlert('请再次输入新密码');
            return false;
        }
        if(val1!==val2){
            RuiDa.Alert.getAlert('两次输入的密码不一致');
            return false;
        }
        if(!RuiDa.Check.isCertainLength(val1,6,15)){
            RuiDa.Alert.getAlert('密码格式不正确');
            return false;
        }
        return true;
    }

    /*获取验证码--start*/
    //判断是否注册过
    function isregister(){
        console.log('电话号码',$('#telnum').val());
        var strtel=$('#telnum').val();
        if(!checkTel(strtel)){
            return false;
        }
        //console.log('成功进来 ');
        //return;
        var params={
            'methodname':'app/member/validTel',
            'tel':strtel
        };
        Rui.Ajax(params,function(res){
            console.log('调用成功111111333',res);
            if(res.code==='1000'){
                console.log(res,res.content===0);
                if(res.content===0){
                    getCheckCode();
                }else{
                    RuiDa.Alert.getAlert('您已经注册过');
                }
                //settime('#getchecked');
                //$('#getchecked').css('color','gray').unbind('touchstart');
            }
        });
    }


    function getCheckCode(){
        console.log('点击了短信');
        var strtel=$('#telnum').val();
        if(!checkTel(strtel)){
            return false;
        }
        var params={
            'methodname':'app/member/smscode',
            'token':'0',
            'tel':strtel
        };
        Rui.Ajax(params,function(res){
            console.log('调用成功111111222');
            if(res.code==='1000'){
                console.log(res);
                settime('#getchecked');
                $('#getchecked').css('color','gray').unbind('click');
            }
        });
    }
    var countdown = 10;
    function settime(val) {
        if (countdown == 0) {
            $(val).text('获取验证码');
            countdown = 10;
            $(val).css('color','red').bind('click', function () {
                getCheckCode();
            });
        } else {
            $(val).text("重新发送(" + countdown + ")");
            countdown--;
            setTimeout(function () {
                settime(val)
            }, 1000)
        }
    }
    /*获取验证码--end*/


    return {
        start:start
    }

})();
login_register.start();