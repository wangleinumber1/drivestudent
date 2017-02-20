/**
 * Created by alex.yang on 15-2-12.
 */
window.login_test3 = (function () {

    function start() {
        console.log('-----start-----');

        console.groupCollapsed('驾校相关信息(客户)');
        //GetAllDivingInfoSearch();
        //GetAllDivingInfo();
        GetDivingDetails();
        //GetDivingAllClass();
        //GetBindDiving();//有问题 已经修改完成
        console.groupEnd('结束');

        console.groupCollapsed('报名(客户)');
        //GetApply();
        //GetApplyPay();//有问题????????????
        console.groupEnd('结束');

        console.groupCollapsed('学习进度(客户)');
        //GetleaningProcess();//有问题 已经修改完成
        console.groupEnd('结束');

        console.groupCollapsed('约车(客户)');
        //GetTrainingTime();
        //GetTrainingTimeDetails();
        //GoTraining();
        //GetTrainingList();
        //GoNoTraining();
        console.groupEnd('结束');

        console.groupCollapsed('学时(客户)');
        //GetSchoolEnterList();
        //GetSchoolEnter();
        console.groupEnd('结束');

        console.groupCollapsed('模拟考试(客户)');
        //GetPracticeExam();//有问题????????????
        console.groupEnd('结束');

        console.groupCollapsed('教练(客户)');
        //GetCoachInfo();
        //GetCoachDetails();
        console.groupEnd('结束');

        console.groupCollapsed('驾校评价(客户)');
        //GoEvaluate();
        //GetEvaluateList();
        console.groupEnd('结束');

    }

//驾校相关信息start
    /*获取所有的驾校信息新--start*/
    function GetAllDivingInfoSearch(){
        //
        var params={
            'methodname':'school/findAllSchool.do',
            'oa': '1',
            'criteria':'',
            'search':'东方',
            'district':'北京'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                console.log(res);
            }
        },function(error){

        });
    }
    /*获取所有的驾校信息新--end*/
    /*获取所有的驾校信息新--start*/
    function GetAllDivingInfo(){
        //
        var params={
            'methodname':'school/findAllSchool.do',
            'oa': '1',
            'criteria':''
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                console.log(res);
            }
        },function(error){

        });
    }
    /*获取所有的驾校信息新--end*/
    /*获取所有的驾校信息旧的--start*/
    function oldGetAllDivingInfo(){
        //
        var params={
            'methodname':'school/findAll.do',
            'oa': '1'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                console.log(res);
            }
        },function(error){

        });
    }
    /*获取所有的驾校信息--end*/

    /*获取该驾校详细信息信息--start*/
    function GetDivingDetails(){
        //
        var params={
            'methodname':'school/findSchool.do',
            'oa': '1',
            'schoolCode': '77'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*获取该驾校详细信息信息--end*/

    /*获取该驾校的所有的班制--start*/
    function GetDivingAllClass(){
        //
        var params={
            'methodname':'edusystem/findEduSystem.do',
            'oa': '1',
            'schoolCode': '77',
            'nextPage':'1',
            'pageSize':'10'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*获取该驾校的所有的班制--end*/

    /*绑定接口--start*/
    function GetBindDiving(){
        //
        var params={
            'methodname':'student/findStudent.do',
            'oa': '1',
            'stuId': 'YTS14040102',
            'idNumber':'120102198908110018',
            'schoolCode':'2020',
            'stuCode':''
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            console.log(res);
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*绑定接口--end*/
//驾校相关信息end

//报名start
    /*报名--start*/
    function GetApply(){
        //
        var params={
            'methodname':'apply/signUp.do',
            'oa': '1',
            'schoolCode': '77',
            'stuName':'1111',
            'idcard':'YTS11010330',
            'stuPhone':'15911017675',
            'eduSystem':'7'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*报名--end*/

    /*报名缴费--start*/
    function GetApplyPay(){
        //stuName idcard stuPhone feeprice eduSystem schoolCode
        var params={
            'methodname':'apply/signUpPayment.do',
            'oa': '1',
            'schoolCode': '2020',
            'stuName':'test1',
            'idcard':'6124154141214512141',
            'stuPhone':'15911017675',
            'eduSystem':'4',
            'feeprice':'5000'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*报名缴费--end*/
//报名end

//学习进度start
    /*学习进度--start*/
    function GetleaningProcess(){
        //
        var params={
            'methodname':'student/studyProgress.do',
            'oa': '1',
            'schoolCode': '2020',
            'stuId':'YTS14040102'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*学习进度--end*/
//学习进度end

//约车start
    /*预约时间段--start*/
    function GetTrainingTime(){
        //schoolCode nextPage pageSize appointDate

        var params={
            'methodname':'appointcar/appointmentTime.do',
            'oa': '1',
            'schoolCode': '2020',
            'nextPage':'1',
            'pageSize':'10',
            'appointDate':'2015-4-28'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*预约时间段--end*/

    /*每个时间段详细--start*/
    function GetTrainingTimeDetails(){
        //schoolCode nextPage  pageSize  appointDate timeName

        var params={
            'methodname':'appointcar/appointTimeDetailed.do',
            'oa': '1',
            'schoolCode': '2020',
            'nextPage':'1',
            'pageSize':'10',
            'appointDate':'2015-4-28',
            'timeName':'09:00-10:00'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*每个时间段详细--end*/

    /*提交预约--start*/
    function GoTraining(){
        //schoolCode appointDate subject stuId stuName groupId appointmentId timeName
        var params={
            'methodname':'appointcar/appointCarAfter.do',
            'oa': '1',
            'schoolCode': '2020',
            'appointDate':'2015-4-28',
            'subject':'DC00080001',
            'stuId':'YTS15010088',
            'stuName':'刘利娜',
            'groupId':'92',
            'appointmentId':'5',
            'timeName':'09:00-10:00'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*提交预约--end*/

    /*查看已约数据列表--start*/
    function GetTrainingList(){
        //schoolCode nextPage  pageSize  stuId
        var params={
            'methodname':'appointcar/appointCarList.do',
            'oa': '1',
            'schoolCode': '2020',
            'nextPage':'1',
            'pageSize':'10',
            'stuId':'YTS15010088'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            console.log(res);
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*查看已约数据列表--end*/

    /*取消约车--start*/
    function GoNoTraining(){
        //
        var params={
            'methodname':'appointcar/appointCarCancel.do',
            'oa': '1',
            'stuId': 'YTS15010088',
            'appontCarId':'43'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*取消约车--end*/
//约车end

//学时start
    /*学时列表--start*/
    function GetSchoolEnterList(){
        //schoolCode nextPage pageSize stuId subject

        var params={
            'methodname':'studytime/studyTimeAll.do',
            'oa': '1',
            'schoolCode': '2020',
            'nextPage':'1',
            'pageSize':'10',
            'stuId':'YTS15010088',
            'subject':'DC00080001'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*学时列表--end*/

    /*学时录入--start*/
    function GetSchoolEnter(){
        //stuId subject subjectType coachId inputDate studyTime reviewScore reviewType  reviewContent schoolCode

        var params={
            'methodname':'studytime/stuStudyTime.do',
            'oa': '1',
            'stuId': 'YTS15010088',
            'subject':'DC00080001',
            'subjectType':'DC00070001',
            'coachId':'YTE150205002',
            'inputDate':'2015-04-28',
            'studyTime':'120',
            'reviewScore':'4.5',
            'reviewType':'DC00650001',
            'reviewContent':'学的不错',
            'schoolCode':'2020'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*学时录入--end*/
//学时end

//模拟考试start
    /*模拟考试--start*/
    function GetPracticeExam(){
        //stuId subject testResult schoolCode
        var params={
            'methodname':'examroom/simulateExam.do',
            'oa': '1',
            'stuId': 'YTS15010088',
            'subject':'DC00080001',
            'testResult':'70',
            'schoolCode':'2020'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*模拟考试--end*/
//模拟考试end

//教练start
    /*教练信息--start*/
    function GetCoachInfo(){
        //schoolCode nextPage pageSize
        var params={
            'methodname':'coach/findCoachAll.do',
            'oa': '1',
            'schoolCode': '2020',
            'nextPage':'1',
            'pageSize':'10'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*教练信息--end*/

    /*单个教练--start*/
    function GetCoachDetails(){
        //schoolCode nextPage pageSize

        var params={
            'methodname':'coach/findCoachId.do',
            'oa': '1',
            'schoolCode': '2020',
            'coachId':'YTE150206046',
            'idcard':''
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111',res);
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*单个教练--end*/
//教练end

//驾校评价 start
    /*对驾校的评价--start*/
    function GoEvaluate(){
        //stuId reviewScore reviewContent schoolCode
        var params={
            'methodname':'schoolstars/schoolReview.do',
            'oa': '1',
            'stuId':'1',
            'schoolCode': '2020',
            'reviewContent':'凹凸慢打怪兽能力比较强，以后每打一个怪兽，加工资一毛。',
            'reviewScore':'2'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*对驾校的评价--end*/

    /*驾校评价列表--start*/
    function GetEvaluateList(){
        //schoolCode nextPage pageSize
        var params={
            'methodname':'schoolstars/schoolStarsAll.do',
            'oa': '1',
            'schoolCode': '2020',
            'nextPage':'0',
            'pageSize':'10'
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111',res);
            if(res.code=='1000'){
                console.log(res);
            }
        });
    }
    /*驾校评价列表--end*/
//驾校评价end


    return {
        start: start
    }
})();
login_test3.start();
