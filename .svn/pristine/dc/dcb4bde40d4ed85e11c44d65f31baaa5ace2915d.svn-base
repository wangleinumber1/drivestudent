/**
 * Created by alex.yang on 15-2-12.
 */
window.mydivingtoo_practiceTest = (function () {
    var aa='';
    function start() {
        console.log('-----start-----');
        RuiDa.Module.bindClickArr({
            /*'#register': 'register.html',
             '#forget': 'forgetPwd.html'*/
        });
        $('li>div:nth-child(2)>div>img').bind('click',function(){
            $(this).parent().parent().find('img').attr('src','../../res/img/exam_no.png');
            $(this).attr('src','../../res/img/exam_yes.png');
        });

        //提交
        RuiDa.Module.bindClickfn('.pt_button>div:nth-child(2)',function(){
            RuiDa.Alert.getAlert('提交成功');
        });
        RuiDa.Module.bindClickfn('.pt_button>div:nth-child(1)',function(){
           /* RuiDa.Alert.showConfirm('您确定要放弃','提示',function(){
                window.history.back();
            });*/
        });

    }

    return {
        start: start
    }
})();
mydivingtoo_practiceTest.start();
