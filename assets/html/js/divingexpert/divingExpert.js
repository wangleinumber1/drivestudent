/**
 * Created by alex.yang on 15-2-12.
 */
window.divingexpert_divingExpert = (function () {
    var adIndex = 0,
        timer,
        autoTimer;
    var arrpic=['','divingexpert_14.png','divingexpert_23.png','divingexpert_23.png','divingexpert_14.png','divingexpert_5.png'];
    function start() {
        console.log('-----start-----');

       /* setTimeout(function(){
            RuiDa.Module.initIScroll();
        },200);*/

		getadv();
        $('#md_1').show();
        RuiDa.Module.bindClickArr({
            /*'#register': 'register.html',
             '#forget': 'forgetPwd.html'*/
            '.navsp>a:nth-child(2)':'../divingexpert/forum.html'
        });
        RuiDa.Module.footerlogo(3);
        $('.course-list>li').bind('click',function(){
            $(this).siblings().removeClass();
            $(this).attr('class','this');
            var index=$(this).find('a').text();
            //console.log(index);
            $('.nab2>img').attr('src','../../res/img/'+arrpic[index]);
            //$('.kmus-lst>li:nth-child(2)>ul').hide();
            $('#md_'+index).siblings().removeAttr("style");
            $('#md_'+index).show();
        });
		RuiDa.Module.bindClickfn('#showtk',function(){
            console.log(123);
			var xinghao=RuiDa.Tool.deviceType();
			if(xinghao=="ios"){
				console.log("型号："+xinghao);
				cordova.exec(function(){},function(){},"DY_TKPlugin","print",[]);
			}else if(xinghao=="android"){
				console.log("型号："+xinghao);
				var myksstr ="{'userid':"+JSON.parse(localStorage['user']).id+",'jiaxiaoid':"+JSON.parse(localStorage['user']).memberRef.sscode+"}";
				alert(myksstr);
				androidjsdemo.questionLib(myksstr);
			}
        });
		/*
		$("#showtk").bind('touchstart',function(){
            console.log(123);
			var xinghao=RuiDa.Tool.deviceType();
            alert(12121212,xinghao);
			if(xinghao=="ios"){
				console.log("型号："+xinghao);
				cordova.exec(function(){},function(){},"DY_TKPlugin","print",[]);
			}else if(xinghao=="android"){
				console.log("型号："+xinghao);
				var myksstr ="{'userid':"+JSON.parse(localStorage['user']).id+",'jiaxiaoid':"+JSON.parse(localStorage['user']).memberRef.sscode+"}";
				androidjsdemo.questionLib(myksstr);
			}
        });
		*/
        $(".kmus-lst ul>li").bind('click',function(){
            console.log($(this).text());
			var id = $(this).attr("id");
			var clickstatu = $(this).attr("class");
			$(this).siblings().removeAttr("style");
			$(this).css('background-color','#DEE2EB');
			if(clickstatu=="md_true")
			{
				window.location.href='../divingrule/showrule'+id+'.html';
			}else
			{
				window.location.href='../divingrule/showrule.html';
			}
			/*
            $(this).css('background-color','#DEE2EB');//测试
		    $(this).on('touchend', function (event) {
			    window.location.href='showlist.html?titlename='+$(this).text();
		    });
			*/
        });
		bindEvent();
    }
	function getadv()
	{
		var params={
            'methodname':'/app/advertising/getAdvertising',
            'appType': '0',
            'location':'driverExpert'
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
						$(".adWrap_ul").empty().append(imghtml);
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
divingexpert_divingExpert.start();
