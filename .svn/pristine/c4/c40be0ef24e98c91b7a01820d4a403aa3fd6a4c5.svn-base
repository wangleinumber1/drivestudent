/**
 * Created by alex.yang on 15-2-12.
 */
window.home_home = (function () {
    var pageIndex= 1,maxpage=0;
    var myScroll,
        pullDownEl, pullDownOffset,
        pullUpEl, pullUpOffset,
        generatedCount = 0;
    var bInitScorll = 0; //iscroll是否被初始化 0：未，1：有
    var selectnum= 0;

    function loaded() {
        /*  pullDownEl = document.getElementById('pullDown');
         pullDownOffset = pullDownEl.offsetHeight;*/
        pullUpEl = document.getElementById('pullUp');
        pullUpOffset = pullUpEl.offsetHeight;

        myScroll = new iScroll('iScroll', {
            useTransition: true,
            vScrollbar: false,
            topOffset: pullDownOffset,
            onRefresh: function() {
                /*      if (pullDownEl.className.match('loading')) {
                 pullDownEl.className = '';
                 pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
                 } else */
                if (pullUpEl.className.match('loading')) {
                    pullUpEl.className = '';
                    //pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载完毕...';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                }
            },
            onScrollMove: function() {
                /*if (this.y > 5 && !pullDownEl.className.match('flip')) {
                 pullDownEl.className = 'flip';
                 pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
                 this.minScrollY = 0;
                 } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                 pullDownEl.className = '';
                 pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
                 this.minScrollY = -pullDownOffset;
                 } else*/
                if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                    pullUpEl.className = 'flip';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '松开立即刷新...';
                    this.maxScrollY = this.maxScrollY;
                } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                    pullUpEl.className = '';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                    this.maxScrollY = pullUpOffset;
                }
            },
            onScrollEnd: function() {
                /*if (pullDownEl.className.match('flip')) {
                 pullDownEl.className = 'loading';
                 pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';
                 pullDownAction();  // Execute custom function (ajax call?)
                 } else */
                if (pullUpEl.className.match('flip')) {
                    pullUpEl.className = 'loading';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '正在加载...';
                    /* pullUpAction();  // Execute custom function (ajax call?)*/
                    //getData(2);
                    GetSchoolEnterList(selectnum,arrsubject[selectnum],2);
                    //sortEvent(2, '&page=' + page + '&as=' + as);
                }
            }
        });

        //setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
    }
    var loadScroll = null;
    var loadScrollRefresh = null;
    function reScroll(){
        if (bInitScorll === 0) {
            loadScroll = setTimeout(function() {
                loaded();

                bInitScorll = 1;
            }, 200)
        } else {
            loadScrollRefresh = setTimeout(function() {
                myScroll.refresh()
            }, 200);
        }
    }



    var aa='';
    var arrsubject=['DC00080001','DC00080002','DC00080003','DC00080004'],arrkemu=['一','二','三','四'];
    function start() {
        console.log('-----start-----');
        RuiDa.Module.bindClickArr({
            '.h_right>span':'../mydiving/addingRecord.html?titlename=get'
        });

        //console.log();
        var titlebtnArr=['.se_title>li:nth-child(1)','.se_title>li:nth-child(2)','.se_title>li:nth-child(3)','.se_title>li:nth-child(4)'];

        for(var key in titlebtnArr){
            console.log(key,titlebtnArr[key]);
            clickaa(titlebtnArr[key],key);
        }
        function clickaa(id,num){
            RuiDa.Module.bindClickfn(id,function(){
                if(!$(id).attr('class')){
                    console.log('进来',id,num);
                    $(id).siblings().removeClass();
                    $(id).attr('class','hover');
                }
                selectnum=num;
                console.log('selectnum',selectnum);
                GetSchoolEnterList(selectnum,arrsubject[selectnum],1);
                pageIndex=1;
            });
        }

        GetSchoolEnterList(0,arrsubject[0],1);
       /* RuiDa.Module.bindClickfnArr(,function(){
            console.log($('.se_title>li'));
        });*/

    }

    /*学时列表--start*/
    function GetSchoolEnterList(num,kemu,type){
        //schoolCode nextPage pageSize stuId subject
        if(type!=1){
            console.log('页数',pageIndex,maxpage);
            if(pageIndex>maxpage){
                reScroll();
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '已经是最后一页';
                return;
            }
        }
        var params={
            'methodname':'studytime/studyTimeAll.do',
            'oa': '1',
            'schoolCode': '2020',
            'nextPage':pageIndex,
            'pageSize':'10',
            'stuId':'YTS15010088',
            'subject':kemu
        };
        console.log('参数',params);
        Rui.Ajax(params,function(res){
            console.log('成功111111');
            console.log(res);

            var data=res.result,
                datarows=data.rows,
                rowslen=datarows.length,
                totaltime=data.entity.timeCount?(data.entity.timeCount/60).toFixed(0):0,
                studytime=data.entity.amassTime?(data.entity.amassTime/60).toFixed(0):0;

            console.log('时间',totaltime,studytime,rowslen);
            console.log('时间',totaltime/60,(studytime/60).toFixed(0));
            //console.log('时间',parseInt(totaltime)%60,parseInt(studytime)%60);
            if(res.code=='1000'){
                console.log('关键num',num,arrkemu[num],totaltime,studytime);
                /*if(!data.length){
                    reScroll();
                    pullUpEl.className = '';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '已经是最后一页';
                    return;
                }*/
                $('.se_total>span:nth-child(1)>em:nth-child(1)').text(arrkemu[num]);
                $('.se_total>span:nth-child(1)>em:nth-child(2)').text(totaltime);
                $('.se_total>span:nth-child(2)>em:nth-child(1)').text(studytime);

                var html='';
                if(rowslen>0){
                    for(var key in datarows){
                        /*coachId: "YTE150205002"
                        coachName: "相德松"
                        inputDate: "2015-04-25"
                        studyTime: 110
                        subject: "DC00080001"
                        subjectStr: "科目一"
                        subjectType: "DC00070001"
                        subjectTypeStr: "理论"*/
                        html+='<li class="se_head">';
                        html+='<span>'+datarows[key].inputDate+'</span><span>'+datarows[key].subjectStr.substring(2,3)+'</span><span>'+datarows[key].subjectTypeStr+'</span>' +
                            '<span>'+(datarows[key].studyTime/60).toFixed(1)+'</span><span>'+datarows[key].coachName+
                            '</span>';
                        html+='</li>';
                    }
                    //$('.se_ul').show();
                    $('.se_no').hide();
                    $('.se_ul').show();
                    if(type===1){
                        maxpage=parseInt((data.total/10).toFixed(0));
                        console.log('关键的页数',data.total,maxpage);
                        $('.se_ul').empty();
                    }
                    $('.se_ul').append(html);
                    //$('.se_ul').show().empty().append(html);
                    reScroll();
                    pageIndex++;
                }else{
                    $('.se_no em').text(arrkemu[num]);
                    $('.se_ul').hide();
                    $('.se_no').show();
                }
            }
        });
    }
    /*学时列表--end*/

    return {
        start: start
    }
})();
home_home.start();
