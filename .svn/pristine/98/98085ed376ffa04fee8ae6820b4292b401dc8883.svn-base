/**
 * Created by alex.yang on 15-2-12.
 */
window.persontoo_trainingEva = (function () {
    var aa='';
    function start() {
        console.log('-----start-----');
        RuiDa.Module.bindClickArr({
            /*'#register': 'register.html',*/
            '#forget': 'forgetPwd.html'
        });
        RuiDa.Module.bindClickfn('.te_btn>button',function(){
            RuiDa.Alert.getAlert('评价成功');
            setTimeout('window.history.back();',1000);
        });
    }

    return {
        start: start
    }
})();
persontoo_trainingEva.start();
