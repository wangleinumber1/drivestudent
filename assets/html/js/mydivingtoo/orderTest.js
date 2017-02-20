/**
 * Created by alex.yang on 15-2-12.
 */
window.mydivingtoo_orderTest = (function () {
    var aa='';
    function start() {
        console.log('-----start----11-');
        RuiDa.Module.bindClickArr({
            /*'#register': 'register.html',
             '#forget': 'forgetPwd.html'*/
        });
        $('.ot_ti>div:nth-child(2)>div>img').bind('click',function(){
            $(this).parent().parent().find('img').attr('src','../../res/img/exam_no.png');
            $(this).attr('src','../../res/img/exam_yes.png');
        });

        RuiDa.Module.bindClickfn('.pt_button>div:nth-child(1)>span',function(){
            if($('ul').is(":hidden")){
                $('ul').show();
                $('.ot_answer').hide();
            }else{
                $('ul').hide();
                $('.ot_answer').show();
            }
        });
        RuiDa.Module.bindClickfn('.pt_button>div:nth-child(2)>span',function(){
            if($('.ot_answer').is(':hidden')){
                $('.ot_answer').show();
                $('ul').hide();
            }else{
                $('.ot_answer').hide();
                $('ul').show();
            }
        });
    }

    return {
        start: start
    }
})();
mydivingtoo_orderTest.start();
