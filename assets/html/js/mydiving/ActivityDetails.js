/**
 * Created by alex.yang on 15-2-12.
 */
window.mydiviing_ActivityDetails = (function () {
	var adIndex = 0,
        timer,
        autoTimer;
    var  Request=RuiDa.Tool.GetRequest(),titlename=Request['titlename'];
    console.log('titlename',titlename);
    function start() {
        console.log('-----start-----');
        RuiDa.Module.bindClickArr({
            /*'#register': 'register.html',
             '#forget': 'forgetPwd.html'*/
        });
		bindEvent();
        GetActivityDetails();
		
		RuiDa.Module.bindClickfn('.pt_button>div:nth-child(1)',function(){
			console.log(111);
			var xinghao=RuiDa.Tool.deviceType();
			if(xinghao=="ios")
			{
				cordova.exec(function(){},function(){},"UM_SharePlugin","print",['东岳驾校','http://www.onlcy.com/','']);
			}else if(xinghao=="android")
			{
				var androidjson="{'contenturl':'http://www.onlcy.com/','title':'东岳驾校','imgurl':''}";
				console.log(androidjson);
				androidjsdemo.getShare(androidjson);
			}
		});
		RuiDa.Module.bindClickfn('.pt_button>div:nth-child(2)',function(){
            var activityid = $("#activity_id").val();
			var spanid = $(".pt_button>div:nth-child(2)>span").attr("id");
			var params={
				'methodname':'/app/collect/update',
				'refId':activityid,
				'type':2,
				'author':JSON.parse(localStorage['user']).id
			};
            console.log(params);
			Rui.Ajax(params,function(res){
				console.log('成功111111');
				if(res.code=='1000'){
					if(spanid==0)
					{
						$(".pt_button>div:nth-child(2)>span").attr("id",1);
						$(".pt_button>div:nth-child(2)>span").text("取消收藏");	
					}else if(spanid==1)
					{
						$(".pt_button>div:nth-child(2)>span").attr("id",0);
						$(".pt_button>div:nth-child(2)>span").text("收  藏");
					}
				}else{
					console.log('状态问题',res.code);
				}
			});
        });
    }
    /*活动详情接口--start*/
    function GetActivityDetails(){
        //id
        var params={
            'methodname':'/business/app/activity/get',
            'id': titlename
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111',res);
            if(res.code=='1000'){
                var data=res.datas;
                console.log(data);
                $('.ad_mid_one>div:nth-child(2)>span:nth-child(2)').text(ChangeToData(data.startTimeRender)+'-'+ChangeToData(data.endTimeRender));
                $('.ad_mid>div:nth-child(2)>p:nth-child(2)').text(data.content);
				$("#activity_id").val(data.id);
				if(data.isCollect==1)
				{
					$(".pt_button>div:nth-child(2)>span").attr("id",data.isCollect);
					$(".pt_button>div:nth-child(2)>span").text("取消收藏");
				}else
				{
					$(".pt_button>div:nth-child(2)>span").attr("id",0);
					$(".pt_button>div:nth-child(2)>span").text("收  藏");
				}
            }
        });
    }
    /*--end*/
    function ChangeToData(datavalue){
        if(datavalue){
            var str=datavalue.split('-'),res=str[0]+'年'+ parseInt(str[1])+'月'+str[2]+'日';
            return res;
        }else{
            return '';
        }


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
mydiviing_ActivityDetails.start();
