/**
 * Created by alex.yang on 15-2-12.
 */
window.persontoo_myBusiness = (function () {
    var aa='';
    function start() {
        console.log('-----start-----');
        RuiDa.Module.bindClickArr({
            'ul>li:nth-child(1)':'trainingRecord.html',
            'ul>li:nth-child(2)':'myEvaRecord.html'
        });
    }

    return {
        start: start
    }
})();
persontoo_myBusiness.start();
