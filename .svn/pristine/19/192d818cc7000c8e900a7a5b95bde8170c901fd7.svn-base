/**
 * Created by alex.yang on 15-2-12.
 */
window.person_feedback = (function () {
    var aa='';
    function start() {
        console.log('-----start-----');

        $('.h_right').bind('click',function(){
            RuiDa.Alert.getAlert('发送成功');

            feedback();
            
        });

    }
    /*找回密码--start*/
    function feedback(){
        var smscode='640107';
        /*nickname;
        content;
        linkTel;
        linkEmail;
        token;
        userId;*/
        var user=JSON.parse(localStorage['user']);
        var params={
            'methodname':'/app/feedback/save',
            'token':user.token,
            'nickname':user.nickname,
            'content':$('textarea').val(),
            'linkTel':user.telNumber
        };
        console.log(11,user,22,params);
        console.log('textarea1',$('textarea').val());

        Rui.Ajax(params,function(res){
            console.log('成功111111');
            console.log(res);
			setTimeout(function(){
                window.history.back();
            },500);
        });
    }
    /*找回密码--end*/

    return {
        start: start
    }
})();
person_feedback.start();
