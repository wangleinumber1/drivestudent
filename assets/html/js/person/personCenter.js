/**
 * Created by alex.yang on 15-2-12.
 */
window.person_person = (function () {
    var aa='';
	var user = JSON.parse(localStorage['user']);
	var weburl = window.publicweburl.weburl1;
    console.log(user);
    function start() {
        console.log('-----start-----');
        RuiDa.Module.backUrl('../home/home.html');
        RuiDa.Module.bindClickArr({
            /*'#register': 'register.html',*/
            'li:nth-child(1)>div': '../person/person.html',

            'li:nth-child(2)>div': '../com/bindDiving.html?titlename=get',
            'li:nth-child(3)>div': '../person/moreSet.html',
            'li:nth-child(4)>div': '../mydiving/message.html',
            'li:nth-child(5)>div': '../person/myCollection.html',
            'li:nth-child(6)>div': '../persontoo/myBusiness.html',
            'li:nth-child(7)>div': '../persontoo/myPost.html',
            /*'li:nth-child(8)>div': '../studyCar/divingSchoolInfo.html?titlename='+user.memberRef.sscode,*/
            'li:nth-child(9)>div': '../persontoo/servicePhone.html'
            /*'li:nth-child(10)>div': '../login/login.html'*/
        });

        RuiDa.Module.bindClickfn('li:nth-child(10)>div',function(){
            Rui.GetInfo.clearcuser();
            window.location.href='../login/login.html';
        });
        RuiDa.Module.bindClickfn('li:nth-child(8)>div',function(){
            window.location.href= user.memberRef!==null?'../studycar/divingSchoolInfo.html?titlename='+user.memberRef.sscode:'../com/bindDiving.html?titlename=get';
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
		$('#img_head').attr("src",userhead);
        sessionStorage.setItem('binddivingschool','personcenter');
		//alert(JSON.parse(localStorage['user']));
    }
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
person_person.start();
