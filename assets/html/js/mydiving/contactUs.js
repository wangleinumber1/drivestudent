/**
 * Created by alex.yang on 15-2-12.
 */
window.mydiving_contactUs = (function () {
    function start() {
                             
                              var aa=['010-46668881'];
        console.log('-----start-----');
       /* RuiDa.Module.bindClickArr({
            *//*'#register': 'register.html',
             '#forget': 'forgetPwd.html'*//*
        });*/
		RuiDa.Module.bindClickfn('.main_login>ul>li:nth-child(1)',function(){
			console.log(123456);
			var phonenum = $("#jiaxiao1").text();
			var xinghao=RuiDa.Tool.deviceType();
			if(xinghao=="ios")
			{
				console.log(xinghao);
            	cordova.exec(function(){},function(){},"MethodManager","callPhone",[phonenum]);
			}else if(xinghao=="android")
			{
				console.log("访问"+xinghao+",用户ID："+res.content.id);
				androidjsdemo.callphone(phonenum);
			}
		});
		RuiDa.Module.bindClickfn('.main_login>ul>li:nth-child(2)',function(){
			console.log(123456);
			var phonenum = $("#jiaxiao2").text();
			var xinghao=RuiDa.Tool.deviceType();
			if(xinghao=="ios")
			{
				console.log(xinghao);
            	cordova.exec(function(){},function(){},"MethodManager","callPhone",[phonenum]);
			}else if(xinghao=="android")
			{
				console.log("访问"+xinghao+",用户ID："+res.content.id);
				androidjsdemo.callphone(phonenum);
			}
		});
		/*
        $('li>img').bind('touchstart',function(){
            var telnum=$(this).parent().find('em').text();
            console.log(123,telnum);
        });
		*/
    }

    return {
        start: start
    }
})();
mydiving_contactUs.start();
