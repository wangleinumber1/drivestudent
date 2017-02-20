/**
 * Created by alex.yang on 15-2-12.
 */
window.mydiving_message = (function () {
    var aa='';
    function start() {
        console.log('-----start-----');
		showlist(0);
		
        $('.mc_title>div').bind('click',function(){
            $(this).siblings().attr('class','mc_nosel');
            $(this).attr('class','mc_sel');
			if($(this).find('span').text()==='公告信息'){
				$("#mc_ul").empty();
                showlist(0);
            }else if($(this).find('span').text()==='约考信息'){
				$("#mc_ul").empty();
                showlist(1);
            }else if($(this).find('span').text()==='约车信息'){
				$("#mc_ul").empty();
                showlist(2);
            }
        });
		
    }

	function showlist(typeid){
		var params={
            'methodname':'/app/message/getMessage',
            'userId':JSON.parse(localStorage['user']).id,
			'type':typeid
        };
        console.log('参数',params);
		Rui.Ajax(params,function(res){
            console.log('成功111111');
			console.log(res);
			var mc_li = "";
            if(res.code=='1000'){
                console.log('消息中心',res.content);
				mccon = res.content;
				if(mccon.length>0){
					for(var i =0;i<mccon.length;i++)
					{
						mc_li +="<li><p>"+mccon[i].pushTime+"</p><p>"+mccon[i].title+"</p></li>";
					}
					$("#mc_ul").append(mc_li);
				}else{
					mc_li +="<li>无消息通知</p></li>";
					$("#mc_ul").append(mc_li);
				}
            }else if(res.code=='1001'){
                mc_li +="<li>无消息通知</p></li>";
				$("#mc_ul").append(mc_li);
            }
        });
	}
    return {
        start: start
    }
})();
mydiving_message.start();
