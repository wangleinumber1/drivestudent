/**
 * Created by alex.yang on 15-2-12.
 */
window.studycar_classExplain = (function () {
    function start() {
        console.log('-----start-----');
		var xinghao=RuiDa.Tool.deviceType();
		var platform;
		if(xinghao=="ios"){platform=1;}else if(xinghao=="android"){platform=0}
        var params={
            'methodname':'/system/sysVersion/queryVersion',
            'platform': platform
        };
        console.log(params);
        Rui.Ajax(params,function(res){
            console.log('成功111111',res);
            var data=res.content;
            if(res.code=='1000'){
                console.log(data);
				var html = "";
				html+="<p>当前版本号："+data.versionNum+"</p>";
				if(data.versionNum<data.minpermVersionNum)
				{
					html+="<p>最新版本号："+data.minpermVersionNum+"</p>";
					if(data.platform==0)
					{
						html +="<a href='http://www.onlcy.com/app/download/"+data.url+"'><div id='submit' class='version_btn'>版本更新</div></a>"
					}
				}else
				{
					html+="<p>当前版本为最新版本，无需更新</p>";
				}
				$("#version_con").append(html);
            }else{
				console.log('状态问题',res.code);
			}
        });
    }

    return {
        start: start
    }
})();
studycar_classExplain.start();
