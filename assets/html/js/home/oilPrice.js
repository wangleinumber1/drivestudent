/**
 * Created by alex.yang on 15-4-11.
 */
window.home_oilPrice = (function () {
    var aa='';
    function start() {
        console.log('-----start-----');
        RuiDa.Module.bindClickArr({
            /*'#register': 'register.html',*/
            '#forget': 'forgetPwd.html'
        });
    }

    return {
        start: start
    }
})();
home_oilPrice.start();
