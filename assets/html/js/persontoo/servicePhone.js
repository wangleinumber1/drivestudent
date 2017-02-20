/**
 * Created by alex.yang on 15-2-12.
 */
window.persontoo_servicePhone = (function () {
    var aa='';
    function start() {
        console.log('-----start-----');
		RuiDa.Module.bindClickfn('#telphone_img1',function(){
			console.log('客服电话1');
			var telphone = $("#telphone1").text();
			androidjsdemo.callphone(telphone);
		});
		RuiDa.Module.bindClickfn('#telphone_img2',function(){
			console.log('客服电话2');
			var telphone = $("#telphone2").text();
			androidjsdemo.callphone(telphone);
		});
		RuiDa.Module.bindClickfn('#telphone_img3',function(){
			console.log('客服电话3');
			var telphone = $("#telphone3").text();
			androidjsdemo.callphone(telphone);
		});
    }

    return {
        start: start
    }
})();
persontoo_servicePhone.start();
