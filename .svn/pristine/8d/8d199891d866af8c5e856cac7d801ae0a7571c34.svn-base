/**
 * Created by alex.yang on 15-2-12.
 */
window.studycar_divingSchoolInfo=(function(){
    var  Request=RuiDa.Tool.GetRequest(),titlennum=Request['titlename'];
    console.log(titlennum);
    function start(){
        console.log('start');
        setTimeout(function(){
            RuiDa.Module.initIScroll();
        },300);
        RuiDa.Module.bindClickArr({
           /* '#ds_info>div>span':'../studycar/classExplain.html?titlename=1',*/
            '#ds_eva':'../home/commentList.html'
            /*'.ds_fif>button':'../persontoo/publishEva.html?titlename='+titlennum*/
        });
        /*RuiDa.Module.bindClickfn('#ds_pingjia',function(){
            RuiDa.Alert.getAlert('取证后才能进行教学评价');
            //window.location.href = '../persontoo/publishEva.html?type=divingSchoolInfo&titlename='+titlennum;
        });*/
        GetDivingDetails();
        GetDivingAllClass();
        GetEvaluateList();
    }

    /*获取该驾校详细信息信息--start*/
    function GetDivingDetails(){
        var params={
            'methodname':'school/findSchool.do',
            'oa': '1',
            'schoolCode': titlennum
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            var data=res.result;
            if(res.code=='1000'){
                console.log(data);
				$('#diving_id').val(data.schoolCode);
                $('#diving_name').text(data.namedesc);
                $('#diving_tel').text(data.telphone);
                $('#diving_adress').text(data.address);
                $('#diving_content').text(data.description);
            	sessionStorage.setItem('baomingdivingname',data.namedesc);
            }
        });
    }
    /*获取该驾校详细信息信息--end*/

    /*获取该驾校的所有的班制--start*/
    function GetDivingAllClass(){
        var params={
            'methodname':'edusystem/findEduSystem.do',
            'oa': '1',
            'schoolCode': titlennum,
            'nextPage':'1',
            'pageSize':'10'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            var data=res.result.rows,html="",lth=data.length;
            if(res.code=='1000'){
                console.log(data,data.length);
                sessionStorage.setItem('divingSchoolInfo',JSON.stringify(data));
                //var divingSchoolInfo=JSON.parse(sessionStorage.getItem('divingSchoolInfo'));
                //console.log('从这里看过来',divingSchoolInfo);
                html+='<div>';
                /*<div>
                    <span>A - 速成</span><span>B - 速成</span><span>C - 速成</span>
                </div>*/
                for(var key in data){
                    console.log(key,(key+1)%3,data[key].className,(key+1)%3==0,parseInt(key)+1,parseInt(key)+1!==lth);
                    html+='<span id="'+data[key].id+'">'+RuiDa.Tool.getString(data[key].className,5)+'</span>';
                    if((parseInt(key)+1)%3===0){
                        html+='</div>';
                        console.log(key+1,lth);
                        if((parseInt(key)+1)!==lth){
                            html+='<div>';
                        }
                    }
                }
                $('#ds_info').empty().append(html);
               /* setTimeout(function(){
                },1000);*/
                //RuiDa.Module.refreshIScroll();
                console.log(html);
                RuiDa.Module.bindClickfn('#ds_info>div>span',function(val){
                    //'#ds_info>div>span':'../studycar/classExplain.html?titlename=1',
                    window.location.href = 'classExplain.html?type=divingSchoolInfo&titlename=1&classid='+$(val).attr('id');
                });
            }
        });
		$("#ds_baoming").bind("click",function(){
            console.log(123);
			var id = $('#diving_id').val();
            console.log(id);
			window.location.href = 'apply.html?titlename='+id;
        });
    }
    /*获取该驾校的所有的班制--end*/



    /*评价列表接口--start*/
    function GetEvaluateList(){
        /*author
         refId
         type 0:驾校评价，1:教练评价，2:学员端学时评价
         page
         rows*/

        var params={
            'methodname':'schoolstars/schoolStarsAll.do',
            'oa': '1',
            'schoolCode':titlennum,
            'nextPage':'0',
            'pageSize':'10'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            //console.log('成功驾校评价数据',res);
            if(res.code=='1000'){
                var data=res.result.rows,html='';
                console.log('成功驾校评价数据',data);
                //return;
                for(var key in data)if(key<3) {
                    console.log('key',key);
                    html+='<li><div><img src="../../res/img/person_head1.png"/><span>'+data[key].stuName+'</span><span>'+data[key].createDate.split(' ')[0]+'</span></div>';
                    html+=' <div><span>评分：</span>';
                    html+=getStar(data[key].reviewScore.toFixed(0));
                    html+=' </div><div><span>评价内容：</span><span>'+data[key].reviewContent+'</span></div></li>';
                }
                $('.ds_fou>ul').empty().append(html);
                //RuiDa.Module.refreshIScroll();
            }
        });
    }
    /*评价列表接口--end*/

    function getStar(num){
        var strhtml='';
        //var num=1;
        for(var i=0;i<num;i++){
            strhtml+='<img src="../../res/img/eva_xing_yes.png"/>';
        }
        for(var j=0;j<5-num;j++){
            strhtml+='<img src="../../res/img/eva_xing_no.png"/>';
        }
        //console.log('strhtml',strhtml);
        return strhtml;
    }

    return {
        start:start
    }
})();
studycar_divingSchoolInfo.start();