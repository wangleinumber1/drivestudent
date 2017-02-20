/**
 * Created by alex.yang on 15-4-11.
 */
window.home_home = (function () {
    var aa='';
	var weburl = window.publicweburl.weburl1;
    var adIndex = 0,
        timer,
        autoTimer;
    function start() {
        console.log('-----start-----');
		getadv();
		//sessionStorage.setItem('cityname',"北京");
		$("#city").text(localStorage['cityname']);
		var city_name = localStorage['cityname'];
		if(sessionStorage.cityname!=null&&sessionStorage.cityname!=""&&sessionStorage.cityname.length>0)
		{
			$.ajax({
				type:"post",
				url:"http://api.map.baidu.com/telematics/v3/weather?location="+sessionStorage.cityname+"&output=json&ak=DE47ef0dcee1774d255910ac7f68cf3d",
				dataType:"jsonp",
				async:false,
				success:function(data)
				{
					if(data.status=="success")
					{
						var results = data.results;
						var weather_data = results[0].weather_data;
						var wd = weather_data[0].date;
						var y=wd.indexOf("℃");
						var wd1 = wd.substring(y-2,y+1);
						var wd2 = wd.substring(y-2,y);
						$(".Temperature-number").empty().text(wd1);
						$(".Temperature-gap").empty().text(weather_data[0].temperature);
						$(".mp-state").empty().text("指数  :"+results[0].pm25);
						$("#Dailyzwx").empty().text("紫外线  :"+results[0].index	[5].zs);
						$("#Dailfl").empty().text(weather_data[0].wind);
						$("#Dailwd").empty().text("温度 : "+wd2);
					}
				}
			});
		}
        RuiDa.Module.bindClickArr({
            /*'#register': 'register.html',*/
            /*'.h_left':'../person/personCenter.html',*/
            '#forget': 'forgetPwd.html',
            "#adWrap li:nth-child(1)":'../home/weather.html',
            "#adWrap li:nth-child(2)":'../home/limitRun.html',
            "#adWrap li:nth-child(3)":'../home/oilPrice.html',
            "#adWrap li:nth-child(4)":'../home/headlineList.html',
            /*"#city":"../home/cityList.html",*/
            '.Forum-entrance':'../divingexpert/forum.html',
            "#hll_more":"../home/messageList.html"
            //".look-Details":"../home/messageDetails.html"
        });
        RuiDa.Module.footerlogo(0);
        bindEvent();
        RuiDa.Module.bindClickfn('.h_left',function(){
            //var loginflag = Rui.GetInfo.islogined();
			if(Rui.GetInfo.islogined())	{
				console.log("用户已经登录");
				window.location.href='../person/personCenter.html';
			}
			//alert(Rui.GetInfo.islogined());
        });
        /*$("#adWrap li:nth-child(1)").bind("touchstart",function(){
            console.log(123);
        });*/


        $("#city").bind("click",function(){
            console.log(123);
			var xinghao=RuiDa.Tool.deviceType();
			if(xinghao=="ios")
			{
				cordova.exec(function(){},function(){},"UM_SharePlugin","print2",[]);
			}else if(xinghao=="android")
			{
				androidjsdemo.getCityList();
			}
            //showHome(cityid);
        });
		
/*        function showHome(cityid) {
            //alert(document.getElementById("textID").value);
			//window.location.href="home?cityid="+cityid;
        }*/

        //findPwd();
        findPwd1();
        //GetWeather();//天气
        //getstrs();//字符串匹配
        GetNewsList();//资讯头条
    }

    /*资讯列表/头条接口--start*/
    function GetNewsList(){
        //isHead:0,page:1,rows:5,sort:id,order:desc
        var params={
            'methodname':'/app/news/find',
            'isHead': '0',
            'page':'1',
            'rows':'10',
            'sort':'id',
            'order':'asc'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            if(res.code=='1000'){
                console.log('111资讯头条',res);
                var html='';
                var data=res.content.rows;
                console.log('data',data);
                for(var key in data){
                    console.log(key,data[key].id,data[key].title,data[key].content);
                }
                for(var key in data){
					var imgIds = data[key].imgIds;
					var imgIdsarr = imgIds.split(";");
					var imgsrc = weburl+"app/show/";
					if(imgIdsarr.length>0)
					{
						imgsrc = imgsrc+imgIdsarr[0];
					}
                    html+='<li>';
                    html+='<div><img src="'+imgsrc+'" /></div>';
                    html+='<div><span class="title1">'+data[key].title+'</span><span class="Details">'+RuiDa.Tool.getString(data[key].content,23)+'</span></div>';
                    html+='<div><span class="look-Details" id="'+data[key].id+'">详情</span></div>';
                    html+='</li>';
                }
                $('.lst').empty().append(html);
                BindNewsList();
            }else{
                console.log('状态问题',res.code);
            }
        });
    }

    function BindNewsList(){
        $('.look-Details').click(function(){
            if(!Rui.GetInfo.islogined()) return;
            console.log('##########################');
            //window.location.href = 'messageDetails.html?titlename='+$(this).attr('id');
			var params={
				'methodname':'/app/news/get',
				'id':$(this).attr('id'),
				'authorId':JSON.parse(localStorage['user']).id
			};
			console.log('参数',params);
			Rui.Ajax(params,function(res){
				console.log('成功111111');
				if(res.code=='1000'){
					localStorage['newsres'] = JSON.stringify(res);
					window.location.href = 'messageDetails.html';
				}else
				{
					RuiDa.Alert.getAlert('数据获取失败');
				}
			});
        });
        /*RuiDa.Module.bindClickfn('.look-Details',function(val){
            window.location.href = 'messageDetails.html?titlename='+$(val).attr('id');
        });*/
    }
    /*资讯列表/头条接口--end*/


    function getstrs(){
        var d = "1[ddd]sfdsaf[ccc]fdsaf[bbbb]";
        var patt = /\[[^\]]+\]/g;
        d.match(patt);
        console.log('匹配的字符',d.match(patt));

        var a='周一 05月04日 [实时：23℃]';
        var paa=/\[（*?\）]+\]/g;//\[(.*?\)]
        console.log('匹配的字符',a.match(patt));

        var str = "iid0000ffr";
        var substr = str.match(/id(\S*)ff/);
        console.log('111111',str.match(/id(\S*)ff/));
    }
    /*天气接口--start*/
    function GetWeather(){
        var params={
            'sustype':'1',
            'url':'http://api.map.baidu.com/telematics/v3/weather?location=北京&output=json&ak=2aa666349eeb844ec720bfdef9f3f181',
            'methodname':''
        };
        Rui.Ajax(params,function(res){
            if(res.status==='success'){
                console.log('成功111111',res);

                var re=res.results[0];
                //conosle.log(re);
                console.log('要取的数据',re);
                console.groupCollapsed('天气的数据');
                console.log('PM2.5',res.results[0].pm25,'程度',getPMlevel(res.results[0].pm25));
                console.log('温度',re.weather_data[0]);
                console.log('紫外线',re.index[5]);
                console.log('风');
                console.groupEnd();
                console.groupCollapsed('需要的数据');
                console.log('part1',re.weather_data[0]);
                console.groupEnd();

            }
        });
    }
    function getPMlevel(val){
        if(val>=0&&val<=50){
            return '优';
        }else if(val>50&&val<=100){
            return '良';
        }else if(val>100&&val<=150){
            return '轻度污染';
        }else if(val>150&&val<=200){
            return '中度污染';
        }else if(val>200&&val<=300){
            return '重试污染';
        }else if(val>300){
            return '严重污染';
        }
    }
    /*天气接口--end*/

    /*首页轮播图接口--start*/
    function findPwd(){
        var params={
            'methodname':'app/advertising/getAdvertising',
            'appType':'0',
            'location':'home'
        };
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            console.log(res,res.code);
            //http://10.10.0.5:8080/app/show/c43ee92d2b12427dbf68035b203a8be8地址
            if(res.code=='1000'){
                console.log('进来');
            }
        });
    }
    /*--end*/

    /*--start*/
    function findPwd1(){
        var params={
            'methodname':'/app/system/args/query',
            'argsType': 'SYS_APP_ARGS',
            'type':''
        };
        Rui.Ajax(params,function(res){
            console.log('成功111111333');
            console.log(res);
            if(res.code=='1000'){
                console.log('进来');
            }
        });
    }
    /*--end*/

	function getadv()
	{
		var params={
            'methodname':'/app/advertising/getAdvertising',
            'appType': '0',
            'location':'home'
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
function getcityid(cityname)
{
	console.log('城市名称',cityname);
	localStorage.removeItem("cityname");
	localStorage['cityname'] = cityname;
	//sessionStorage.setItem('cityname',cityname);
	$("#city").text(localStorage['cityname']);
}
home_home.start();
