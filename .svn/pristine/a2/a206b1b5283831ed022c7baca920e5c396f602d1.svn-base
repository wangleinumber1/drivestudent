/**
 * Created by alex.yang on 15-2-12.
 */
window.person_myCollection = (function () {
    var aa='';
	var weburl = window.publicweburl.weburl1;
	var user = JSON.parse(localStorage['user']);
	console.log(user);
    function start() {
        console.log('-----start-----');
        var params={
            'methodname':'/app/collect/find',
            'author':JSON.parse(localStorage['user']).id,
            'page':1,
			'rows':10
        };
        console.log(params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            console.log(res);
			var html="";
			if(res.code)
			{
				var data = res.content.rows;
				if(data.length>0)
				{
					for(var i=0;i<data.length;i++)
					{
						/*
						var imgIds = data[i].imgIds;
						var imgIdsarr = imgIds.split(";");
						var imghtml = '';
						if(imgIdsarr.length>0)
						{
							for(var j =0;j<imgIdsarr.length-1;j++)
							{
								var imgsrc = weburl+"app/show/";
								imgsrc = imgsrc+imgIdsarr[j];
								imghtml =imghtml+"<img class='img_head' src='"+imgsrc+"' />";
							}
						}
						*/
						html +="<li><div class='mc_one'><div><img class='img_head' src='../../res/img/person_head.png'/><span>"+user.nickname+"</span><span>"+data[i].ctime+"</span></div>"+
                				"<div><span>"+data[i].title+"</span><span>"+data[i].content+"</span></div></div></li>";
					}
					$("#collection_ul").empty().append(html);
				}else
				{
					html +="<li><div class='mc_one'><div><span>未收藏数据</span></div></div></li>";
					$("#collection_ul").empty().append(html);
				}
				
			}else
			{
				html +="<li><div class='mc_one'><div><span>未收藏数据</span></div></div></li>";
				$("#collection_ul").empty().append(html);
			}
        });
    }

    return {
        start: start
    }
})();
person_myCollection.start();
