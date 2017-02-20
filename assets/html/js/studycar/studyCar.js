/**
 * Created by alex.yang on 15-2-12.
 */
window.studycar_studyCar = (function () {
    var aa='';
    var strsearch='',arrprovince=[],isfirst=true;
    //DC00660001：按班制价格正序 DC00660002：按班制价格倒序 DC00660003：按学员正序DC00660004：按学员倒序
    var arrstr={'全城招生':'0','人气最高':'1','排行榜排序':'2'}, arrsort={'0':['',''],'1':['DC00660001','DC00660002'],'2':['DC00660003','DC00660004']},sort='',province='';
    function start() {
       $("#carcityname").text(localStorage['cityname']);
        RuiDa.Module.bindClickArr({
            /*'#register': 'register.html',*/
            '.sc_li_two': '../studycar/divingSchoolInfo.html',
            '.sc_li>div:nth-child(3)>span:nth-child(2)':'../studycar/apply.html'
        });
        RuiDa.Module.footerlogo(1);

        $('.h_right').bind('click',function(){
           if($(".h_search").is(':hidden')){
               console.log('显示');
               $('.h_right>img').addClass('hover');
               $('.h_search').show();
               $('.h_center').hide();
               $('.h_left').hide();
           }else{
               console.log('隐藏');

               strsearch= $.trim($('#sc_search').val());
               console.log(strsearch);
               if(strsearch){
                   console.log('有数据');
                   GetAllDivingInfo();
               }else{
                   console.log('无数据');
                 /*  $('.h_right>img').removeClass('hover');
                   $('.h_search').hide();
                   $('.h_center').show();
                   $('.h_left').show();*/
               }
           }
        });

        $('#sc_searchback').bind('click',function(){
            strsearch='';
            console.log('1111111111sc_searchback');
            $('.h_right>img').removeClass('hover');
            $('.h_search').hide();
            $('.h_center').show();
            $('.h_left').show();
            $('#sc_search').val('')
        });
        $('.sc_title>div').click(function(){
        //RuiDa.Module.bindClickfn('.sc_title>div',function(val){
            //console.log($(val).find('span').text(),$(val).find('img').hasClass('sort'));
            console.log('进来了么',$(this).find('span').text(),'全城招生');
            if($(this).find('span').text()==='全城招生'){
                console.log('go go');
                if($('.sc_droplist').is(':hidden')){
                    console.log(1111111);
                    $('.sc_droplist').show();
                }else{
                    console.log(2222222);
                    $('.sc_droplist').hide();
                }
            }else{
                if($(this).find('img').hasClass('sort')){
                    $(this).find('img').removeClass('sort');
                    sort=arrsort[arrstr[$(this).find('span').text()]][0];
                }else{
                    $(this).find('img').addClass('sort');
                    sort=arrsort[arrstr[$(this).find('span').text()]][1];
                }
                console.log('sort',arrstr[$(this).find('span').text()],sort);
                GetAllDivingInfo();
                /*if(sort){
                 GetAllDivingInfo();
                 }*/
            }

        });
                            
        RuiDa.Module.bindClickfn('.h_center>span',function(){
			var xinghao=RuiDa.Tool.deviceType();
			console.log('型号',xinghao);
			if(xinghao=="ios")
			{
				cordova.exec(function(){},function(){},"UM_SharePlugin","print3",[]);
			}else if(xinghao=="android")
			{
				androidjsdemo.Map();
			}
            //cordova.exec(function(){},function(){},"UM_SharePlugin","print3",[]);
        });
		$("#carcityname").bind("click",function(){
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
        GetAllDivingInfo();
    }
    /*获取所有的驾校信息--start*/
    function GetAllDivingInfo(){
        //DC00660001：按班制价格正序 DC00660002：按班制价格倒序 DC00660003：按学员正序DC00660004：按学员倒序
        var params={
            'methodname':'school/findAllSchool.do',
            'oa': '1',
            'criteria':sort?sort:'',
            'district':province?province:'',
            'search':strsearch?strsearch:''
        };
       /* if(strsearch){
            params.search=strsearch;
        }*/
        //if()

        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                var data=res.result.rows, html='',htmlprovince='';
                console.log('data',data);
                for(var key in data){
                    console.log('星级：',data[key].ReviewScore,data[key].ReviewScore.toFixed(0));
                    html+='<li>';
                    html+='<div class="sc_li">';
                    html+='<div><img src="../../res/img/mycollect_1.png"/></div>';
                    html+='<div id="'+data[key].id+'" class="sc_li_two"><span>'+data[key].namedesc+'</span>';
                    html+='<div>';
                    html+=getxing(data[key].ReviewScore.toFixed(0));
                    html+='</div>';
                  /*  html+='<div><img src="../../res/img/eva_xing_yes.png"/><img src="../../res/img/eva_xing_yes.png"/><img src="../../res/img/eva_xing_yes.png"/>';
                    html+='<img src="../../res/img/eva_xing_yes.png"/><img src="../../res/img/eva_xing_no.png"/></div>';*/
                    html+='<div><span>学员：</span><span><em>'+data[key].count+'</em>+</span></div></div>';
                    html+='<div><span>'+data[key].min+'<em>起</em></span><span class="sc_li_baoming" kid="'+data[key].id+'" kdir="'+data[key].namedesc+'" >我要报名</span></div></div>';
                    html+='</li>';

                    if(isfirst){
                        if(arrprovince.length==0||!RuiDa.Check.isContains(arrprovince,data[key].province)){
                            arrprovince.push(data[key].province);
                            htmlprovince+='<span>'+data[key].province+'</span>';
                        }
                    }

                }
                console.log('所有省份',arrprovince);
                $('ul').empty().append(html);
                if(isfirst){
                    $('.sc_droplist').empty().append(htmlprovince).hide();
                    isfirst=false;
                    bindarea();
                }
                BindAllDivingInfo();
            }
        },function(error){

        });
    }

    function getxing(num){

        var strsing='',html='';
        for(var i=0;i<num;i++){
            html+='<img src="../../res/img/eva_xing_yes.png"/>';
        }
        for(var j=0;j<5-num;j++){
            html+='<img src="../../res/img/eva_xing_no.png"/>';
        }
        //console.log('html',html);
        return html;
    }
    function BindAllDivingInfo(){
       /* RuiDa.Module.bindClickfn('.sc_li_two',function(val){
            window.location.href = 'divingSchoolInfo.html?titlename='+$(val).attr('id');
        });
        RuiDa.Module.bindClickfn('.sc_li_baoming',function(val){
            window.location.href = 'apply.html?titlename='+$(val).attr('kid');
            sessionStorage.setItem('baomingdivingname',$(val).attr('kdir'));
        });*/
        RuiDa.Module.bindClickfn('.sc_li_two',function(val){
            if(Rui.GetInfo.islogined()){
                window.location.href = 'divingSchoolInfo.html?titlename='+$(val).attr('id');
            }
        });
       /* $('.sc_li_two').bind('touchstart',function(){
            if(Rui.GetInfo.islogined()){
                window.location.href = 'divingSchoolInfo.html?titlename='+$(this).attr('id');
            }
        });*/
        RuiDa.Module.bindClickfn('.sc_li_baoming',function(val){
            if(Rui.GetInfo.islogined()){
                sessionStorage.setItem('baomingdivingname',$(val).attr('kdir'));
                window.location.href = 'apply.html?titlename='+$(val).attr('kid');
            }
        });
      /*  $('.sc_li_baoming').bind('touchstart',function(){
            if(Rui.GetInfo.islogined()){
                sessionStorage.setItem('baomingdivingname',$(this).attr('kdir'));
                window.location.href = 'apply.html?titlename='+$(this).attr('kid');
            }
        });*/

    }
    function bindarea(){
        $('.sc_droplist>span').click(function(){
            //RuiDa.Module.bindClickfn('.sc_droplist>span',function(val){
            province=$(this).text();
            $(this).parent().hide();
            GetAllDivingInfo();
            setTimeout(function(){
                province='';
            },1000);
        });
    }
    /*获取所有的驾校信息--end*/

    return {
        start: start
    }
})();
function divingSchoolInfo(titlename)
{
	console.log('驾校',titlename);
	window.location.href="divingSchoolInfo.html?titlename="+titlename;
}
function getcityid(cityname)
{
	console.log('城市名称',cityname);
	localStorage.removeItem("cityname");
	localStorage['cityname'] = cityname;
	//sessionStorage.setItem('cityname',cityname);
	$("#carcityname").text(localStorage['cityname']);
}
studycar_studyCar.start();
