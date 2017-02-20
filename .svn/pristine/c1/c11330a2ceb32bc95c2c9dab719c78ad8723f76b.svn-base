/**
 * Created by alex.yang on 15-2-12.
 */
window.mydivingtoo_practiceExam = (function () {
    var aa='';
    function start() {
        console.log('-----start-----');
        RuiDa.Module.bindClickArr({
            /*'#register': 'register.html',
             '#forget': 'forgetPwd.html'*/
            '.pe_one>div:nth-child(1)':'../mydivingtoo/practiceTest.html',
            '.pe_one>div:nth-child(2)':'../mydivingtoo/orderTest.html',
            '.pe_one>div:nth-child(3)':'../mydivingtoo/sectionTest.html',
            '.pe_one>div:nth-child(4)':'../mydivingtoo/errorCount.html'
        });
        $('.pe_title').bind('click',function(){
            $('.pe_title').attr('class','pe_title');
            $(this).addClass('pe_select');
            switch($(this).find('span').text()){
                case '科目一':
                case '科目四':
                    $('.pe_one').show();
                    $('.pe_two').hide();
                    break;
                case '科目二':
                case '科目三':
                    $('.pe_one').hide();
                    $('.pe_two').show();
                    break;
            }
        });
    }

    return {
        start: start
    }
})();
mydivingtoo_practiceExam.start();
