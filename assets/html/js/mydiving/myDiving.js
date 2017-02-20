/**
 * Created by alex.yang on 15-2-12.
 */
window.mydiving_myDiving = (function () {
    var aa='';
    var adIndex = 0,
        timer,
        autoTimer;
    var user=JSON.parse(localStorage['user']);
    console.log('user',user,user.memberRef.stuId);
    function start() {

        setTimeout(function(){
            RuiDa.Module.initIScroll();
        },200);

        console.log('-----start-----');
        RuiDa.Module.bindClickArr({
            '.h_right':'../mydiving/contactUs.html',
            '#md_wdjd':'../mydiving/leaningProcess.html',
            '#md_wyyc':'../mydiving/Training.html',
            '#md_xslr':'../mydiving/schoolEnter.html',
            '#md_xxtz':'../mydiving/message.html',
           /* '#md_mlks':'../mydivingtoo/practiceExam.html',*/
           /* '#md_jxpj':'../persontoo/publishEva.html',*/
            '#md_jlxx':'../mydiving/coachInfo.html',
            '#md_hdlb':'../mydiving/EventList.html'
           /* '#md_jlxx':'../mydiving/contactUs.html'*/
        });
        RuiDa.Module.footerlogo(2);
		getadv();
        sessionStorage.setItem('binddivingschool','mydiving');
		bindEvent();
        GetDivingDetails();
    }
    RuiDa.Module.bindClickfn('#md_jxpj',function(){
        RuiDa.Alert.getAlert('取证后才能进行教学评价');
        //window.location.href='../persontoo/publishEva.html';
         //'#md_jxpj':'../persontoo/publishEva.html'
    });
    RuiDa.Module.bindClickfn('#md_mlks',function(){
        console.log('模拟考试');
		var myksstr ="{'userid':"+JSON.parse(localStorage['user']).id+",'jiaxiaoid':"+JSON.parse(localStorage['user']).memberRef.sscode+"}";
		androidjsdemo.questionLib(myksstr);
    });

    /*获取该驾校详细信息信息--start*/
    function GetDivingDetails(){
        //
        var params={
            'methodname':'school/findSchool.do',
            'oa': '1',
            'schoolCode':user.memberRef.sscode
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功驾校信息',res.result);
            if(res.code=='1000'){
                //console.log(res);namedesc
                $('.md_center>div:nth-child(1)>span').text(res.result.namedesc);
            }
        });
    }
    /*获取该驾校详细信息信息--end*/

	function getadv()
	{
		var params={
            'methodname':'/app/advertising/getAdvertising',
            'appType': '0',
            'location':'myDiving'
        };
        Rui.Ajax(params,function(res){
            console.log('成功111111333');
            console.log(res);
            if(res.code=='1000'){
                console.log('进来');
				var data = res.content;
				if(data.length>0)
				{
					var resIds = data[0].resIds;
					var resIdarr = resIds.split(";");
					if(resIdarr.length>0)
					{
						var imghtml = "";
						var imgahtml="";
						for(var i =0;i<resIdarr.length-1;i++)
						{
							imghtml += "<li><img src='http://www.onlcy.com/app/show/"+resIdarr[i]+"' /></li>";
							imgahtml += "<a href='javascript:;'></a>";
						}
						$("#adWrap_ul").empty().append(imghtml);
						$(".ad_btn_wrap").empty().append(imgahtml);
					}
				}
            }
        });
	}
//广告图的滚动
    function adMove(el) {
        clearInterval(autoTimer);

        var ind = 0;
        var start = el.scrollLeft;
        var end = el.clientWidth * adIndex;
        var change = end - start;
        var max=$('#adWrap li').length;

        clearInterval(timer);
        timer = setInterval(function() {
            ind++;
            if (ind == 20) {
                $('.ad_btn_wrap a').eq(adIndex).css('background', 'black');
                clearInterval(timer);
                autoTimer = setInterval(function() {
                    adIndex++;
                    if (adIndex >= max) {
                        adIndex = 0;
                    }
                    $('.ad_btn_wrap a').css('background', '#888888');
                    adMove(document.getElementById('adWrap'));
                }, 3333);
            }
            //console.log('滚动',ind, start, change);
            el.scrollLeft = Tween.Expo.easeOut(ind, start, change, 20);
        }, 33);
    }

    function bindEvent(){
        //广告事件
        $('#adWrap').on('touchstart', 'img', function(event) {
            var wrap = $(this).parent().parent().parent();
            adIndex = $(this).parent().index();
            pageXStart = event.originalEvent.targetTouches[0].pageX;
        });

        $('#adWrap').on('touchend', 'img', function(event) {
            pageXEnd = event.originalEvent.changedTouches[0].pageX;
            if (pageXEnd - pageXStart > 30 && adIndex != 0) {
                // 左移
                adIndex--;
                $('.ad_btn_wrap a').css('background', '#888888');
                adMove(document.getElementById('adWrap'));
            } else if (pageXEnd - pageXStart < -30 && adIndex + 1 != $('#adWrap li').length) {
                // 右移
                adIndex++;
                $('.ad_btn_wrap a').css('background', '#888888');
                adMove(document.getElementById('adWrap'));
            }
        });

        autoTimer = setInterval(function() {
            adIndex++;
            if (adIndex >= 4) {
                adIndex = 0;
            };
            $('.ad_btn_wrap a').css('background', '#888888');
            adMove(document.getElementById('adWrap'));
        }, 3333);
    }
    return {
        start: start
    }
})();
mydiving_myDiving.start();
