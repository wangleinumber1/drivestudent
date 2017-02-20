/**
 * Created by alex.yang on 15-2-12.
 */
window.persontoo_myDiving = (function () {
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
persontoo_myDiving.start();
