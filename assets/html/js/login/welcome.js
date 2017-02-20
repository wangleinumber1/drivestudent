/**
 * Created by alex.yang on 15-2-12.
 */
window.login_welcome = (function () {
    var arrnum={'1':[1,1000],'2':[]};
    function start() {
        console.log('-----start -----');
        $('button').click(function(){
            settime('#num');
            //gonum('#num',1);
        });
    }

    var numstart1 = 1,numend1=100;
    function settime(id) {
        if(numstart1<=numend1){
            $(id).text(numstart1.toFixed(0));
            numstart1=numstart1+0.1;
            setTimeout(function () {
                settime(id)
            }, 1)
        }
    }


    /*var countdown = 1,num=998.1;
    function settime(val) {
        if (countdown == 0) {
            //$(val).text('获取验证码');
            countdown = 10;
            $(val).css('color','red').bind('touchstart', function () {
                //getCheckCode();
            });
        } else if(countdown<=num){
            $(val).text(countdown.toFixed(2));
            countdown=countdown+0.1
            setTimeout(function () {
                settime(val)
            }, 1)
        }
    }*/

    return {
        start: start
    }
})();
login_welcome.start();
