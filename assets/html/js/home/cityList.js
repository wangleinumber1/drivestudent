/**
 * Created by alex.yang on 15-4-11.
 */
window.home_home = (function () {
    var aa='';
    function start() {
        console.log('-----start-----');
        RuiDa.Module.bindClickArr({
            /*'#register': 'register.html',*/
            '#forget': 'forgetPwd.html'
        });
		RuiDa.Module.bindClickfn('.city-name>a:nth-child(1)',function(){
            console.log(111);
			cordova.exec(function(){},function(){},"DY_TKPlugin","print",[]);
			//androidjsdemo.androidjsdemo();
        });
    }

    return {
        start: start
    }
})();
function citypost(cityid)
{
	alert(cityid);
}
window.home_home.start();
