/**
 * Created by alex.yang on 15-2-12.
 */
window.studycar_classExplain = (function () {
    var  Request=RuiDa.Tool.GetRequest(),titlename=Request['titlename'],
        strtype=Request['type'],strclassid=Request['classid'],
        arrstr=['','班制说明','关于我们','关于软件','使用帮助','服务协议','特别说明'];
    $('.h_center').text(arrstr[titlename]);
    console.log(titlename,arrstr[titlename],strtype,strclassid);
    function start() {
        console.log('-----start-----');
        RuiDa.Module.bindClickArr({
           '':'../studycar/apply.html'
        });
        if(strtype==='divingSchoolInfo'){
            var divingSchoolInfo=JSON.parse(sessionStorage.getItem('divingSchoolInfo'));
            console.log('从这里看过来',divingSchoolInfo);
            for(var key in divingSchoolInfo)if(divingSchoolInfo[key].id==strclassid){
                //console.log('$$$$$$$$$$$$$$',divingSchoolInfo[key]);
                $('.p_title>span:nth-child(1)').text(divingSchoolInfo[key].className);
                $('.p_p>p:nth-child(1)').text(divingSchoolInfo[key].description);//description
            }
        }else{
            divingDir();
        }

    }
    /*--start*/
    function divingDir(){
        //id: "bc0785578497420f80c63c3facdc04cb", value: "1", name: "班制说明", dictItemDesc: "c1-周末班，c2-晚班", parentid: "76652149a8f942908885bdde328f26ca"
        //type:2关于我们，3关于软件，4使用帮助，5服务协议，6特别说明
		$.extend({
			getUrlVars: function () {
				var vars = [], hash;
				var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
				for (var i = 0; i < hashes.length; i++) {
					hash = hashes[i].split('=');
					vars.push(hash[0]);
					vars[hash[0]] = hash[1];
				}
				return vars;
			},
			getUrlVar: function (name) {
				return $.getUrlVars()[name];
			}
		});
		var typeId = $.getUrlVar('titlename');
		var params={
            'methodname':'/app/system/args/query',
            'argsType': 'SYS_APP_ARGS',
            'type':typeId
        };
        console.log(params);
        Rui.Ajax(params,function(res){
            console.log('成功111111',res);
            var data=res.content,html='';
            if(res.code=='1000'){
                console.log(data);
               $('.p_title>span:nth-child(1)').text(data.name);
                $('.p_p>p:nth-child(1)').text(data.dictItemDesc);
            }
        });
    }
    /*--end*/

    return {
        start: start
    }
})();
studycar_classExplain.start();
