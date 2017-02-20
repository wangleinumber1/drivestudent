/**
 * Created by alex.yang on 15-2-12.
 */
window.mydivingtoo_sectionTest = (function () {
    var aa='';
    function start() {
        console.log('-----start-----');
        RuiDa.Module.bindClickArr({
           'li>div':'../mydivingtoo/orderTest.html'
        });

    }

    return {
        start: start
    }
})();
mydivingtoo_sectionTest.start();
