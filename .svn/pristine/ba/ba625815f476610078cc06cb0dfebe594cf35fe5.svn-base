/**
 * Created by alex.yang on 15-4-11.
 */
window.home_weather = (function () {
    var aa='';
    function start() {
        console.log('-----start-----');
        RuiDa.Module.bindClickArr({
            /*'#register': 'register.html',*/
            '#forget': 'forgetPwd.html'
        });

        test();
    }
    function test(){
        var str = "XX1122334455XXXX6677889900XX";
        var result = str.match(/XX(.*?)XX/g).map((function(str) {
            return str.match(/XX(.*?)XX/)[1];
        }));
        console.log(result[1]);
        //result = ["1122334455", "6677889900"]
        var aa="周一 05月04日 (实时：19℃)";
        var str = "71.12.24.24231409(2014-05-02)";
        var bb=aa.substring(aa.indexOf("(")+4,aa.indexOf(")")-1);
        console.log('bb',bb);
    }

    return {
        start: start
    }
})();
home_weather.start();
