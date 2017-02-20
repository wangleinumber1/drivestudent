/**
 * Created by alex.yang on 15-2-12.
 */
window.studycar_enterName = (function () {
    console.log(JSON.parse(localStorage['user']));

    var  Request=RuiDa.Tool.GetRequest(),titlename=Request['titlename'],strtype=Request['type'];

    if(strtype==='personinfo'){
        var arrstr={1:['输入姓名','输入联系方式','输入昵称','选择性别','输入年龄'],2:['请输入您的真实姓名','请输入您的手机号','请输入您的昵称','请选择您的性别','请输入您的年龄']};
        $('.h_center').text(arrstr[1][titlename]);
		if(parseInt(titlename)==3)
		{
			$('.main_login div:nth-child(1)').attr("id","div_sex");
			$('.main_login div:nth-child(1)').empty().append("<input type='radio' name='sex' id='input_sex' value='0' checked />男<br/><input name='sex' type='radio' id='input_sex' value='1' />女");
		}else
		{
        	$('.main_login input').attr('placeholder',arrstr[2][titlename]);
		}
    }else{
        var arrstr={1:['输入姓名','输入证件','联系方式','昵称'],2:['请输入您的真实姓名','请输入您的身份证号','请输入您的手机号','请输入您的昵称']};
        $('.h_center').text(arrstr[1][titlename]);
        $('.main_login input').attr('placeholder',arrstr[2][titlename]);
    }
    console.log('titlename',titlename,'strtype',strtype);
    function start() {
        console.log('-----start-----');
        RuiDa.Module.bindClickfn('#en_but>button',function(){
            var strtext=$('#txt').val();
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
                 }, 1000);*/
                update(titlename);
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
    function update(titlename){
		var id = parseInt(titlename);
		var textvalue=$("#txt").val();
		var params;
		switch(id)
		{
			case 0:
				params={
					'methodname':'app/member/modify',
					'token':JSON.parse(localStorage['user']).id,
					'nickname':textvalue
				};
			break;
			case 1:
				params={
					'methodname':'app/member/modify',
					'token':JSON.parse(localStorage['user']).id,
					'telNumber':textvalue
				};
			break;
			case 2:
				params={
					'methodname':'app/member/modify',
					'token':JSON.parse(localStorage['user']).id,
					'name':textvalue
				};
			break;
			case 3:
				var sex = $("input[name='sex']:checked").val();
				params={
					'methodname':'app/member/modify',
					'token':JSON.parse(localStorage['user']).id,
					'sex':sex
				};
			break;
			case 4:
				params={
					'methodname':'app/member/modify',
					'token':JSON.parse(localStorage['user']).id,
					'age':textvalue
				};
			break;
		}
		/*var params={
            'methodname':'app/member/modify',
            'token':JSON.parse(localStorage['user']).id,
            'name':'yangrui'
        };*/
        console.log(params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            console.log(res);
			switch(id)
			{
				case 0:
					var user = localStorage['user'];
					var nickname = JSON.parse(localStorage['user']).nickname;
					user = user.replace(nickname,textvalue);
					localStorage['user'] = user;
				break;
				case 1:
					var user = localStorage['user'];
					var telNumber = JSON.parse(localStorage['user']).telNumber;
					user = user.replace(telNumber,textvalue);
					localStorage['user'] = user;
				break;
				case 2:
					var user = localStorage['user'];
					var name = JSON.parse(localStorage['user']).name;
					user = user.replace(name,textvalue);
					localStorage['user'] = user;
				break;
				case 3:
					var user = localStorage['user'];
					var sexstr = JSON.parse(localStorage['user']).sex;
					var sex = $("input[name='sex']:checked").val();
					if(sex==0){textvalue="男";}else if(sex==1){textvalue="女";}
					user = user.replace(sexstr,textvalue);
					localStorage['user'] = user;
				break;
				case 4:
					var user = localStorage['user'];
					var age = JSON.parse(localStorage['user']).age;
					user = user.replace(age,textvalue);
					localStorage['user'] = user;
				break;
			}
			if(parseInt(titlename)==3){textvalue=$("input[name='sex']:checked").val();}
            console.log('textvalue',textvalue);
			setTimeout(function(){
				window.location.href='../person/person.html?id='+id+"&textvalue="+textvalue;
			},500);
			
        });
    }
    /*修改信息--end*/

    return {
        start: start
    }
})();
studycar_enterName.start();
