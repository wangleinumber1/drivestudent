/**
 * Created by alex.yang on 15-2-12.
 */
window.home_home = (function () {
    var aa='';
    function start() {
        console.log('-----start-----');
        RuiDa.Module.bindClickArr({
            /*'#register': 'register.html'*/
        });
    }

    return {
        start: start
    }
})();
home_home.start();
