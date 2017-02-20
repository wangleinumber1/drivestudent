/**
 * Created by alex.yang on 15-2-12.
 */
window.studycar_pay = (function () {
    var paytype=$('.p_thr>img').first().attr('class'),
        paymoney=0.01;
    console.log(paytype);
    function start() {
        console.log('-----start-----');
        RuiDa.Module.bindClickArr({
            /*'#register': 'register.html',
             '#forget': 'forgetPwd.html'*/
        });
        $('.p_thr>img').bind('click',function(){
            $(this).siblings().css('border','0');
            $(this).css('border','1px red solid');
            paytype=$(this).attr('class');
            console.log(paytype);
        });
        //确认支付
        RuiDa.Module.bindClickfn('.p_for>button',function(){
            console.log('支付方式',paytype,'价格',paymoney);
        });
    }

    return {
        start: start
    }
})();
studycar_pay.start();
