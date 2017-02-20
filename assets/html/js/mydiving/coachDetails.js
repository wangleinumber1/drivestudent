/**
 * Created by alex.yang on 15-2-12.
 */
window.mydiving_coachDetails = (function () {
    var  Request=RuiDa.Tool.GetRequest(),titlename=Request['titlename'],strschoolcode=Request['schoolcode']
    console.log('titlename',titlename,'strschoolcode',strschoolcode);
    function start() {
        console.log('-----start-----');
        GetCoachDetails();
    }

    /*单个教练--start*/
    function GetCoachDetails(){
        //schoolCode nextPage pageSize
        var params={
            'methodname':'coach/findCoachId.do',
            'oa': '1',
            'schoolCode': strschoolcode,
            'coachId':titlename,
            'idcard':''
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            /*Medium: 0
            age: 4
            coachId: "YTE150206046"
            coachName: "张青"
            description: ""
            good: 0
            poor: 0
            reviewScore: 0
            sccode: 2020
            sex: "DC00150001"
            sexVal: "男"
            telephone: "1111"*/
            console.log('成功111111',res);
            if(res.code=='1000'){
                var data=res.result;
                console.log(data);
                $('#cd_name').text(data.coachName);
                $('#cd_id').text(data.coachId);
                $('#cd_good').text(data.good);
                $('#cd_poor').text(data.poor);
                $('#cd_tel').text(data.telephone);
                $('#cd_des').text(data.description);

                //$('.cd_bot_one img').attr('src','../../res/img/eva_xing_no.png');
                for(var i=0;i<=data.reviewScore;i++){
                    $('.cd_bot_one img:nth-child('+(parseInt(i)+1)+')').attr('src','../../res/img/eva_xing_yes.png');
                }
            }
        });
    }
    /*单个教练--end*/
    return {
        start: start
    }
})();
mydiving_coachDetails.start();
