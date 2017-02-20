/**
 * Created by alex.yang on 15-2-12.
 */
window.commentadd = (function () {
    var aa='';
    function start() {
        console.log('-----start-----');

        RuiDa.Module.bindClickfn('.h_right',function(){
            commentadd();
            setTimeout(function(){
                window.history.back();
            },1000);
        });
        /*$('.h_right').bind('touchstart',function(){

            commentadd();
            setTimeout(function(){
                window.history.back();
            },1000);
        });*/

    }
    /*找回密码--start*/
    function commentadd(){
        //var smscode='640107';
        var user=JSON.parse(localStorage['user']);
		$.extend({
			getUrlVars: function () {
				var vars = [], hash;
				var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
				for (var i = 0; i < hashes.length; i++) {
					hash = hashes[i].split('=');
					vars.push(hash[0]);
					vars[hash[0]] = hash[1];
				}
				return vars;
			},
			getUrlVar: function (name) {
				return $.getUrlVars()[name];
			}
		});
		/*
		var Request=RuiDa.Tool.GetRequest();
		var typeId = Request['typeId'];
		var refId = Request['refId'];
		var refTitle = Request['refTitle'];
		*/
		var typeId = $.getUrlVar('typeId');
		var refId = $.getUrlVar('refId');
		var refTitle = $.getUrlVar('refTitle');
		var content = $('textarea').val();
        var params={
            'methodname':'/app/comment/saveOrUpdate',
            'refId':refId,
			'refTitle':refTitle,
			'type':typeId,
			'content':content,
			'author':user.id 
        };
        console.log(11,user,22,params);
        console.log('textarea1',$('textarea').val());

        Rui.Ajax(params,function(res){
            console.log('成功111111');
            console.log(res);
            RuiDa.Alert.getAlert('发送成功');
        });
    }
    /*找回密码--end*/

    return {
        start: start
    }
})();
commentadd.start();