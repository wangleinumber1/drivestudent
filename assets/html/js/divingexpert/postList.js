/**
 * Created by alex.yang on 15-2-12.
 */
window.divingexpert_postList = (function () {
    var aa='';
    function start() {
        console.log('-----start-----');
        RuiDa.Module.bindClickArr({
            /*'#register': 'register.html',
             '#forget': 'forgetPwd.html'*/
            '.lst>li>span:nth-child(1)':'../divingexpert/infoDetails.html'
        });
    }

    return {
        start: start
    }
})();
divingexpert_postList.start();
