/**
 * Created by alex.yang on 15-2-12.
 */
window.treasurechest_treasureChest = (function () {
    var aa='';
    function start() {
        console.log('-----start-----');
        RuiDa.Module.bindClickArr({
            /*'#register': 'register.html',
             '#forget': 'forgetPwd.html'*/
        });
		RuiDa.Module.bindClickfn('.tc_main>div:nth-child(1)',function(){
            console.log("today youjia");
			var xinghao=RuiDa.Tool.deviceType();
			if(xinghao=="ios")
			{
				console.log(xinghao);
				//cordova.exec(function(){},function(){},"UM_SharePlugin","print",[title,zixun_url,'']);
			}else if(xinghao=="android")
			{
				console.log(xinghao);
				androidjsdemo.getWeather();
			}
        });
		RuiDa.Module.bindClickfn('.tc_main>div:nth-child(2)',function(){
            console.log("today youjia");
			var xinghao=RuiDa.Tool.deviceType();
			if(xinghao=="ios")
			{
				console.log(xinghao);
				//cordova.exec(function(){},function(){},"UM_SharePlugin","print",[title,zixun_url,'']);
			}else if(xinghao=="android")
			{
				console.log(xinghao);
				androidjsdemo.getTadayOilPrice();
			}
        });
		RuiDa.Module.bindClickfn('.tc_main>div:nth-child(3)',function(){
            console.log("today youjia");
			var xinghao=RuiDa.Tool.deviceType();
			if(xinghao=="ios")
			{
				console.log(xinghao);
				//cordova.exec(function(){},function(){},"UM_SharePlugin","print",[title,zixun_url,'']);
			}else if(xinghao=="android")
			{
				console.log(xinghao);
				androidjsdemo.xianxingActivity();
			}
        });
        RuiDa.Module.footerlogo(4);
    }

    return {
        start: start
    }
})();
treasurechest_treasureChest.start();
