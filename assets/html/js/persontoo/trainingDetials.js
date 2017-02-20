/**
 * Created by alex.yang on 15-2-12.
 */
window.persontoo_trainingDetials = (function () {
    var aa='';
    function start() {
        console.log('-----start-----');
        RuiDa.Module.bindClickArr({
            '.td_oprate>div:nth-child(2)>button':'trainingEva.html'
        });
    }

    return {
        start: start
    }
})();
persontoo_trainingDetials.start();
