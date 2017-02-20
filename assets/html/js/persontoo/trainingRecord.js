/**
 * Created by alex.yang on 15-2-12.
 */
window.persontoo_trainingRecord = (function () {
    var aa='';
	var user = JSON.parse(localStorage['user']);
	console.log(user);
    function start() {
        console.log('-----start-----');
        RuiDa.Module.bindClickArr({
            /*'#register': 'register.html',*/
            'ul>li>div:nth-child(2)>span:nth-child(2)': 'trainingDetials.html',
            '.tr_no>span':'trainingDetials.html'
        });
		showyclist();
        $('.mc_title>div').bind('click',function(){
            $(this).siblings().attr('class','mc_nosel');
            $(this).attr('class','mc_sel');
            if($(this).find('span').text()==='已预约'){
                $('.tr_one').show();
                $('.tr_two').hide();
				$('.tr_three').hide();
            }else if($(this).find('span').text()==='已取消'){
                $('.tr_one').hide();
                $('.tr_two').show();
				$('.tr_three').hide();
            }else if($(this).find('span').text()==='已结束'){
                $('.tr_one').hide();
                $('.tr_two').hide();
				$('.tr_three').show();
            }
        });
    }
	function showyclist()
	{
        var user=JSON.parse(localStorage['user']);
		console.log(user);
		var params={
            'methodname':'appointcar/appointCarList.do',
            'oa': '1',
            'schoolCode': user.memberRef.sscode,
            'nextPage':'1',
            'pageSize':'10',
            /*'stuId':'YTS15010088'*/
            'stuId':user.memberRef.stuId
        };
		var html='',html_yuyue='',html_qxyuyue='',html_jsyuyue='';
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                /*appointDate: "2015-04-25"
                appontCarId: 42
                status: "已取消"
                timeName: "09:00-10:00"*/
                var data=res.result.rows;
                console.log(data);
                for(var key in data){
					if(data[key].status=='已预约')
					{
						html_yuyue+='';
						html_yuyue+='<li>';
						html_yuyue+='<div><span>'+data[key].appointDate+'</span><span>'+data[key].timeName+'</span></div>';
						html_yuyue+='<div><span>'+data[key].coachName+'</span></div>';
						html_yuyue+='<div><span id="'+data[key].appontCarId+'">取消预约</span></div>';
						html_yuyue+='</li>';
					}else if(data[key].status=='已取消')
					{
						html_qxyuyue+='';
						html_qxyuyue+='<li>';
						html_qxyuyue+='<div><span>'+data[key].appointDate+'</span><span>'+data[key].timeName+'</span></div>';
						html_qxyuyue+='<div><span>'+data[key].coachName+'</span></div>';
						html_qxyuyue+='</li>';
					}else if(data[key].status=='已结束')
					{
						html_jsyuyue+='';
						html_jsyuyue+='<li>';
						html_jsyuyue+='<div><span>'+data[key].appointDate+'</span><span>'+data[key].timeName+'</span></div>';
						html_jsyuyue+='<div><span>'+data[key].coachName+'</span></div>';
						html_jsyuyue+='</li>';
					}
                    /*html+='';
                    html+='<li>';
                    html+='<div><span>'+data[key].appointDate+'</span><span>'+data[key].timeName+'</span></div>';
					html+='<div><span>取消预约</span><span>详情</span></div>';
                    html+='</li>';*/
					/*
                    html+=data[key].status=='已预约'?'<div><span>已预约</span></div><div><button class="t_cancel" id='+data[key].appontCarId+'>取消预约</button></div>':'<div><span></span></div><div><span>已取消</span></div>';
					*/
                }
                $('.tr_one').empty().append(html_yuyue);
				$('.tr_two').empty().append(html_qxyuyue);
				$('.tr_three').empty().append(html_jsyuyue);
                BindTrainingList();
            }else
			{
				html+='';
                    html+='<li>';
                    html+='<div>无约车数据</div>';
                    html+='</li>';
				$('.tr_one').empty().append(html);
				$('.tr_two').empty().append(html);
				$('.tr_three').empty().append(html);
			}
        });
	}
	function BindTrainingList(){
        RuiDa.Module.bindClickfn('ul>li>div:nth-child(3)>span:nth-child(1)',function(val){
            //window.location.href = 'messageDetails.html?titlename='+$(val).attr('id');
            GoNoTraining($(val).attr('id'));
        });
    }
    /*取消约车--start*/
    function GoNoTraining(id){
        //
        var params={
            'methodname':'appointcar/appointCarCancel.do',
            'oa': '1',
            'stuId': user.memberRef.stuId,
            'appontCarId':id
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                console.log(res);
                RuiDa.Alert.getAlert('取消预约成功');
				showyclist();
            }
        });
    }
    return {
        start: start
    }
})();
persontoo_trainingRecord.start();
