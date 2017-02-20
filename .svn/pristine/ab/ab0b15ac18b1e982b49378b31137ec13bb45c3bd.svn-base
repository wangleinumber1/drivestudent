/**
 * Created by alex.yang on 15-2-12.
 */
//document.domain = 'www.app.com';
window.login_login = (function () {
    //localStorage样例
    /* user=['12','34'];
     localStorage['user']=JSON.stringify(user);
     var storedNames=JSON.parse(localStorage['user']);
     console.log(111111,storedNames);*/

    //测试接口的地方
    //http://123.57.33.147:30081/DyhWebService/phone/school/findAll.do
    /*$.ajax({
     url: 'http://api.map.baidu.com/telematics/v3/weather?location=北京&output=json&ak=2aa666349eeb844ec720bfdef9f3f181',
     //data: params,
     dataType: 'jsonp',
     *//*type: "post",
     jsonp: "jsonpCallback",*//*
     success: function (res) {
     console.log('OA测试成功',res);
     }, error: function (XMLHttpRequest) {
     console.log('【error】');
     }
     });*/
    /* var user=localStorage['user']?JSON.parse(localStorage['user']):'';
     console.log('user',user,user.memberRef.sscode);*/

    function start() {

        RuiDa.Module.bindClickArr({
            /*'#register': 'register.html',*/
            '#forget': 'forgetPwd.html'
        });
        console.log(121212);
        $('#register').bind('click', function () {
            console.log('register');
            window.location.href='register.html?titlename='+1;
        });
        $('#forgetpwd').bind('click', function () {
            console.log('forgetpwd');
            window.location.href='register.html?titlename='+2;
        });

        $('#login').bind('click', function () {
            console.log(121212);
            logo();
        });
    }
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

    function checkPwd(val1){

        if(!val1.length){
            RuiDa.Alert.getAlert('请输入密码');
            return false;
        }
        if(!RuiDa.Check.isCertainLength(val1,6,15)){
            RuiDa.Alert.getAlert('密码格式不正确');
            return false;
        }
        return true;
    }

    function logo() {
        console.log(121212);
        //var usertest = "usertest";
        var phoneNum = $('#phoneNum').val(),
            password = $('#password').val();
        //RuiDa.Alert.getAlert('点击登陆');
        console.log(phoneNum,password);
        /*phoneNum = "15911017679";
         password = "123456";*/
        if(!checkTel(phoneNum)){
            return false;
        }
        if(!checkPwd(password)){
            return false;
        }
        //setTimeout(function(){ window.location.href='../home/home.html';},200)
        //return;
		
		$(".main_login_wait").attr("style","display:block;");
		smallLoadingIcon('.w-load');
		//password = hex_sha1(password);
        var params={
            'methodname':'app/member/login',
            'tel':phoneNum,
            'pwd':password
        };
        Rui.Ajax(params,function(res){
			$(".main_login_wait").attr("style","display:block;");
            //console.log('成功111111',res);
            console.log('用户信息',res);
            if(res.code=='1000'){
                //添加的假数据
                var datauser=res.content;
                //datauser.schoolCode='2020';
                if(!datauser.name) datauser.name='萌萌哒';
                localStorage['user']=JSON.stringify(res.content);
                //console.log(JSON.parse(localStorage['user']));
				localStorage.removeItem("userpic");
				localStorage['userpic'] = datauser.pic;
				var xinghao=RuiDa.Tool.deviceType();
				if(xinghao=="ios")
				{
					console.log(xinghao);
					//cordova.exec(function(){},function(){},"UM_SharePlugin","print",[title,zixun_url,'']);
				}else if(xinghao=="android")
				{
					console.log("访问"+xinghao+",用户ID："+datauser.id);
					androidjsdemo.adduserData(datauser.id);
				}
                setTimeout(function(){ 
				$(".main_login_wait").attr("style","display:none;");window.location.href='../home/home.html';},200);
            }else if(res.code=='1001'){
				$(".main_login_wait").attr("style","display:none;");
                RuiDa.Alert.getAlert('用户不存在或密码错误');
            }
        });
    }
	function smallLoadingIcon(ele) { //小的loading图标
		var spinner = new Spinner({
		lines: 12,
		length: 5,
		width: 2,
		radius: 6,
		color: '#FFF',
		speed: 1,
		trail: 50,
		shadow: false,
		hwaccel: false, 
		className: 'spinner',
		top: 0,
		left: 0
		});
		var target = $(ele+' .spin')[0];
		spinner.spin(target);
		return spinner;
	}

    return {
        start: start
    }
})();
window.login_login.start();
