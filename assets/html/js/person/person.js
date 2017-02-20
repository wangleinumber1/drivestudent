/**
 * Created by alex.yang on 15-2-12.
 */
window.person_person = (function () {
    var aa='';
    var strperson=['0','1','2','3','4'];
	var user = JSON.parse(localStorage['user']);
	var weburl = window.publicweburl.weburl1;
	console.log(user);



    function start() {
        RuiDa.Module.backUrl('personCenter.html');
        console.log('-----start-----');
        RuiDa.Module.bindClickArr({
            '#forget': 'forgetPwd.html',
            'li:nth-child(2)>div':'../studycar/enterName.html?titlename=0&type=personinfo',
            //'li:nth-child(3)>div':'../studycar/enterName.html?titlename=1&type=personinfo',
            'li:nth-child(4)>div':'../studycar/enterName.html?titlename=2&type=personinfo',
            'li:nth-child(5)>div':'../studycar/enterName.html?titlename=3&type=personinfo',
            'li:nth-child(6)>div':'../studycar/enterName.html?titlename=4&type=personinfo'
        });
		var userhead = "../../res/img/title-user.png";//默认图片
		var userpic = localStorage['userpic'];
		if(userpic!=null&&userpic!="")
		{
			userhead = weburl+"/app/pic/show/"+userpic;
		}else
		{
			if(user.pic!=null&&user.pic!="")
			{
				userhead = weburl+"/app/pic/show/"+user.pic;
			}
		}
		console.log("用户显示头像："+userhead);
		$('#p_pic').attr("src",userhead);
		$('#u_nickname').text(user.nickname);
		$('#u_telNumber').text(user.telNumber);
		$('#u_name').text(user.name);
		var sexstr = "";
		if(user.sex==0){sexstr="男";}else if(user.sex==1){sexstr="女";}
		$('#u_sex').text(sexstr);
		$('#u_age').text(user.age);
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
		if($.getUrlVar('id')!=null&&$.getUrlVar('id')!="")
		{
			var id = parseInt($.getUrlVar('id'));
			switch(id)
			{
				case 0:
					$('#u_nickname').text(decode($.getUrlVar('textvalue')));
				break;
				case 1:
					$('#u_telNumber').text($.getUrlVar('textvalue'));
				break;
				case 2:
					$('#u_name').text(decode($.getUrlVar('textvalue')));
				break;
				case 3:
					if($.getUrlVar('textvalue')=='0'){$('#u_sex').text("男");}else if($.getUrlVar('textvalue')=='1'){$('#u_sex').text("女");}
				break;
				case 4:
					$('#u_age').text($.getUrlVar('textvalue'));
				break;
			}
		}
    }
    RuiDa.Module.bindClickfn('#p_pic',function(){
        console.log(121212);
		var xinghao=RuiDa.Tool.deviceType();
		if(xinghao=="ios")
		{
			//cordova.exec(function(){},function(){},"UM_SharePlugin","print2",[]);
		}else if(xinghao=="android")
		{
			console.log("android--执行上传头像");
			//RuiDa.Alert.getAlert("android--执行上传头像");
			androidjsdemo.takeHeaderPictureAndPost(user.id);
		}
    });
	function getheadimg()
	{
		var userpic = "";
		var params={
            'methodname':'app/member/login',
            'tel':JSON.parse(localStorage['user']).telNumber,
            'pwd':"123456"
        };
        Rui.Ajax(params,function(res){
            console.log('调用成功',res);
            if(res.code=='1000'){
				userpic = res.content.pic;
				localStorage.removeItem("userpic");
				localStorage['userpic'] = userpic;
				console.log("用户最新缓存头像："+userpic);
            }else{
                RuiDa.Alert.getAlert("调用失败");
            }
        });
		return userpic;
	}
    return {
        start: start,
		getheadimg:getheadimg
    }
})();
function imgread(imgid)
{
	//RuiDa.Alert.getAlert(weburl+"头像ID："+imgid);
	console.log("头像截图本地路径："+imgid);
	//localStorage['userimgpath'] = imgpath;
	//getheadimg();
	localStorage.removeItem("userpic");
	localStorage['userpic'] = imgid;
	var weburl = window.publicweburl.weburl1;
	$('#p_pic').attr("src",weburl+"/app/pic/show/"+imgid);
}
person_person.start();
