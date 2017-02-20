/**
 * Created by alex.yang on 14-7-15.
 */
window.RuiDa = window.RuiDa || {
    Module: {},
    Check: {},
    DeValue: {},
    Tool: {},
    Alert:{}
};
window.Rui=window.Rui||{
     Ajax:{},
     GetInfo:{}
};
window.publicweburl={'weburl1':'http://www.onlcy.com/','weburl2':'http://123.57.33.147:30081/DyhWebService/phone/'};
window.Rui=(function(){
    //公司域名
    //var sus='http://111.198.29.170:8080';
    //客户域名
    //var sus='http://123.57.33.147:30081/DyhWebService/phone/';

    //外网可访问http://111.198.29.170:9000/
    //内网可访问http://10.10.0.5:9000/
    //友文的电脑http://10.10.0.8:8080/
    var weburl={'0':'http://www.onlcy.com/','1':'http://123.57.33.147:30081/DyhWebService/phone/'};
    var sus='';

    function Ajax(params, fun1, fun2) {
        //params['channel']= navigator.userAgent.match(/(iPhone|iPod|iPad)/i) ?400:300;
        //console.log('值',params['channel']);
        sus=params['sustype']?params['url']:(params['oa']?weburl[params['oa']]:weburl['0']);
        //sus=params['oa']?weburl[params['oa']]:weburl['0'];
        //console.log('进来了么');
        $.ajax({
            url: sus + params.methodname,
            data: params,
            dataType: 'jsonp',
            /*type: "post",
            jsonp: "jsonpCallback",*/
            success: function (result) {
                if ($.isFunction(fun1)) {
                    fun1(result);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('【error】');
                if ($.isFunction(fun2)) {
                    fun2(XMLHttpRequest);
                }
            }
        });
    }
    return {
        Ajax:Ajax
    };
})();




RuiDa.Module = (function () {
    return{
        bindClickArr: bindClickArr,
        bindClickfnArr:bindClickfnArr,
        bindClickfn:bindClickfn,
        backUrl:backUrl,
        backHistory:backHistory,
        backHome:backHome,
        initIScroll:initIScroll,
        refreshIScroll:refreshIScroll,
        footerlogo:footerlogo
    };

    function footerlogo(index){
        var strhred = ["../home/home.html","../studycar/studyCar.html","../mydiving/myDiving.html","../divingexpert/divingExpert.html","../treasurechest/treasureChest.html"];
        console.log(strhred[1], $('footer nav').length,index);
        for(var i=0;i<5;i++){
            bindchick(i);
        }
        function bindchick(i){
            $('footer nav').eq(i).bind('touchstart',function(){
                //console.log(i,strhred[i]);
                if(index!==i){
                    console.log(index,i);
                    if(i==2){
                        console.log('222222222222222222');
                        Rui.GetInfo.islogined();
                        var user=JSON.parse(localStorage.getItem('user'));
                        //console.log('user',user,user.memberRef.stuId);
                        if(!user.memberRef||!user.memberRef.stuId){
                            console.log(3333333333333333333333);
                            window.location.href='../com/bindDiving.html?titlename=get';
                        }else{
                            window.location.href=strhred[i];
                        }
                    }else{
                        window.location.href=strhred[i];
                    }

                }
                //console.log(i,index);
            });
        }
    }
    function bindClickfnArr(arr,fn){
        console.log(arr);
        if (arr) {
            for (var key in arr)
                if (key && arr[key]) {
                    bindClickfn(arr[key],fn);
                }
        }
    }
    /*function bindClickfn(id,fn){
        $(id).bind('touchstart',function(){
            fn(this);
        });
    }*/
    function bindClickfn(id,fn){
        //console.log(1111,id);
        /*if(fn){
            $(id).click(function(){
                fn(this);
            });
        }*/
        if(fn){
            console.log(3333);
            $(id).on('touchstart', function (event) {
                //$(this).css('background-color','black');//测试
                var pageYStart = event.originalEvent.targetTouches[0].pageY;
                $(this).on('touchend', function (event) {
                    //$(this).css('background-color','');//测试
                    var pageYEnd = event.originalEvent.changedTouches[0].pageY;
                    //console.log(3333,id);
                    if (Math.abs(pageYStart - pageYEnd) < 30) {
                        //console.log('bindclickfn');
                        fn(this);
						$(this).off('touchend');
                    }
                });
            });
        }
    }
    //绑定点击事件，isdelay不填写时为不延时，否则为延时
    function bindClickArr(arr, isdelay) {
        if (arr) {
            for (var key in arr)
                if (key && arr[key]) {
                    bindClickDelay(key, arr[key], isdelay);
                }
        }
    }
    function bindClickDelay(id, url, isdelay) {
        /*$(id).bind('touchstart',function(){
            window.location.href = url;
        });*/
        $(id).on('touchstart', function (event) {
            //$(this).css('background-color','black');//测试
            var pageYStart = event.originalEvent.targetTouches[0].pageY;
            $(this).on('touchend', function (event) {
                //$(this).css('background-color','');//测试
                var pageYEnd = event.originalEvent.changedTouches[0].pageY;
                //console.log(3333,id);
                if (Math.abs(pageYStart - pageYEnd) < 30) {
                    //console.log('bindclickfn');
                    window.location.href = url;
                    $(this).off('touchend');
                }
            });
        });

        /*$(id).on('touchstart', function (event) {
            var pageYStart = event.originalEvent.targetTouches[0].pageY;
            $(this).on('touchend', function (event) {
                var pageYEnd = event.originalEvent.changedTouches[0].pageY;
                //console.log(pageYStart,pageYEnd);
                if (Math.abs(pageYStart - pageYEnd) < 30) {

                    window.location.href = url;
                    if (isdelay) {
                        console.log('延时300ms');
                        setTimeout(function () {
                            window.location.href = url;
                        }, isdelay)
                    } else {
                        console.log('不延时');
                        setTimeout(function () {
                            window.location.href = url;
                        }, 200)
                    }
                }
                $(this).off('touchend');
            });
        });*/


        /*$(id).bind('touchstart', function () {
            if (isdelay) {
                console.log('延时300ms');
                setTimeout(function () {
                    window.location.href = url;
                }, 300)
            } else {
                console.log('不延时');
                window.location.href = url;
            }
        });*/
    }
    function backHome() {
        document.addEventListener("deviceready", function() {
            document.addEventListener("backbutton", function() {
                window.location.href = 'home.html';
            }, false);
        }, false);
    }

    function backHistory() {
        console.log(12121212);
        $('#backBtn').on('touchstart', function() {
            window.history.back();
        });
        document.addEventListener("deviceready", function() {
            document.addEventListener("backbutton", function() {
                window.history.back();
            }, false);
        }, false);
    }

    function backUrl(url) {
        console.log(2222222);
        //$('#backBtn').on('touchend', function () {
        $('#backBtn').on('touchstart', function () {
            window.location.href = url;
        });
        document.addEventListener("deviceready", function() {
            document.addEventListener("backbutton", function() {
                window.location.href = url;
            }, false);
        }, false);
    }

    //滚动初始化
    function initIScroll() {
        setTimeout(function () {
            window.iScroll = new iScroll('iScroll', {
                vScrollbar: false
            });
        }, 200);
    }

    //刷新滚动
    function refreshIScroll() {
        setTimeout(function () {
            window.iScroll.refresh();
        }, 200);
    }
})();
RuiDa.Module.backHistory();

RuiDa.Alert = {
    //显示一个定制的警告框，依赖于 PhoneGap
    //'手机号不能为空', '', '警告', '返回修改'
    showAlert: function (msg, bacFn, title, btnName) {
        if (navigator.notification) {
            navigator.notification.alert(
                msg,                 //要显示的信息
                function () {
                },       //警告被忽略的回调函数
                title,               //标题
                btnName || '好'             //按钮名称
            )
        } else {
            alert(msg)
        }
    },
    //弹出对话框，带回调，btn===1,为第一个按钮，btn===2为第二个按钮
    showConfirm:function(msg,title,backFn,btns){
        navigator.notification.confirm(
            msg,                 //要显示的信息
            backFn,             //警告被忽略的回调函数
            title,               //标题
            btns||'取消,确定'           //按钮名称
        )
    },
    //弹出框
    getAlert:function(msg,time){
        console.log('弹出框');
        $("body").append('<div class="alert"><span>'+msg+'</span></div>');
        setTimeout(function(){
            $('.alert').hide();
        },time?time:2000);
    }
};
RuiDa.Tool = {
    //获取url参数值
    GetRequest: function () {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
            }
        }
        return theRequest;
        //调用方法
        //var Request = new Object();
        //Request = GetRequest();
        //var 参数1, 参数2, 参数3, 参数N;
        //参数1 = Request['参数1'];
    },
    getString:function(str,len){
        //return str;
        if(str.length&&str.length>len){
            return str.substring(0,len)+'...';
        }else{
            return str;
        }
    },
    //如果图片加载失败则加载默认图片
    getDefpicInit:function(){
        $(window).load(function() {
            $('img').each(function() {
                if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
                    this.src = 'img/default.gif';
                }
            });
        });
    },
    GetData: function(val){
        window.Time.UnixToDate(val);
    },
    GetToday:function(){
        var d = new Date(),str = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
        return str;
    },
    //判断设备类型
    deviceType: function () {
        var checker = {
            ios: navigator.userAgent.match(/(iPhone|iPod|iPad)/i),
            blackberry: navigator.userAgent.match(/BlackBerry/i),
            android: navigator.userAgent.match(/Android/i),
            windows: navigator.userAgent.match(/windows/i)
        };
        if (checker.android) {
            return "android";
        } else if (checker.ios) {
            return "ios";
        } else if (checker.blackberry) {
            return "blackberry";
        } else if (checker.windows) {
            return "windows";
        } else {
            return "";
        }
    }
};
//封装2
RuiDa.Check = {
    //【start】
    //检查是否为数字
    isCureNum:function(value){//"^[0-9]*$"
        //console.log('数字',value);
        if (value.match(/^[0-9]*$/) !== null)
            return true;
        else
            return false;
    },
    //检查是否为正整数
    isPositiveInteger: function(value) {
        if (value.match(/^([1-9]\d*|0)$/) !== null)
            return true;
        else
            return false;
    },

    //验证字符串长度value,最小长度min,最大长度max
    isCertainLength: function(value, min, max) {
        var len = value.length;
        if (len >= min && len <= max)
            return true;
        else
            return false;
    },

    //arr是否包含element
    isContains: function(arr, element) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === element)
                return true;
        }
        return false;
    },

    //验证大陆手机号
    isMHMobile: function(value) {
        var mob_preg = /^((\+?86)|(\(\+86\)))?1[3|4|5|7|8][0-9]{9}$/;
        if (!mob_preg.test(value))
            return false;
        else
            return true;
    },

    //验证邮箱
    isEmail: function(value) {
        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        return reg.test(value);
    }

    //【end】
};

/*
RuiDa.Tool = {
    getString:function(str,len){
        //return str;
        if(str.length&&str.length>len){
            return str.substring(0,len)+'...';
        }else{
            return str;
        }
    },
    //如果图片加载失败则加载默认图片
    getDefpicInit:function(){
        $(window).load(function() {
            $('img').each(function() {
                if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
                    this.src = 'img/default.gif';
                }
            });
        });
    },
    //如果图片加载失败则加载默认图片
    getDefpic:function(){
        $('img').each(function() {
            if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
                this.src = 'img/default.gif';
            }
        });
    },

    //判断设备类型
    deviceType: function () {
        var checker = {
            ios: navigator.userAgent.match(/(iPhone|iPod|iPad)/i),
            blackberry: navigator.userAgent.match(/BlackBerry/i),
            android: navigator.userAgent.match(/Android/i),
            windows: navigator.userAgent.match(/windows/i)
        };
        if (checker.android) {
            return "android";
        } else if (checker.ios) {
            return "ios";
        } else if (checker.blackberry) {
            return "blackberry";
        } else if (checker.windows) {
            return "windows";
        } else {
            return "";
        }
    },
    //判断字符是否有效
    isValid: function (value) {
        if (value)
            return true;
        else
            return false;
    },
    //返回当前的索引
    indexOf: function (arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) return i;
        }
        return -1;
    },
    //移除当前元素
    remove: function (arr, val) {
        var index = indexOf(arr, val);
        if (index > -1) {
            arr.splice(index, 1);
        }
    },
    count: function (o) {
        var t = typeof o;
        if (t === 'string') {
            return o.length;
        } else if (t === 'object') {
            var n = 0;
            for (var i in o) {
                n++;
            }
            return n;
        }
        return false;
    },
    //获取url参数值
    GetRequest: function () {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
            }
        }
        return theRequest;
        //调用方法
        //var Request = new Object();
        //Request = GetRequest();
        //var 参数1, 参数2, 参数3, 参数N;
        //参数1 = Request['参数1'];
    },
    GetData2: function (time) {
        return new Date(parseInt(time) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    },
    GetData: window.Time.UnixToDate,
    //6月25日
    GetDataYM: function (unixTime) {
        var time = new Date(unixTime * 1000);
        var ymdhis = "";
        ymdhis += time.getUTCFullYear() + "-";
        ymdhis += time.getUTCMonth() + "-";
        ymdhis += time.getUTCDate();
        return ymdhis;
    },
    RuleNum: function (strid) { //输入规则：只能输入数字或点号
        $(strid).attr("onkeyup", "this.value=this.value.replace(\/[^\\d.]\/g,'')")
            .attr("onblur", "this.value=this.value.replace(\/[^\\d.]\s/g,'')");
    },
    getSafeData: function (value) {
        if (value) {
            if (RuiDa.Check.isMHMobile(value)) {
                return value.substr(0, value.length - 4) + '****';
            }
        }
        return '';
    },
    removeSessionItem_rebate:function(){
        //要清理下session留下的数据
        if(sessionStorage.rebateCloneEl != null && sessionStorage.rebateCloneEl != "" && sessionStorage.rebateCloneEl != "undefined"){
            sessionStorage.removeItem("rebateCloneEl");
            sessionStorage.removeItem("rebateSearchCondition");
        }
    }
};*/

window.Time = {
    /**
     * 当前时间戳
     * @return <int>        unix时间戳(秒)
     */
    CurTime: function () {
        return Date.parse(new Date()) / 1000;
    },
    /**
     * 日期 转换为 Unix时间戳
     * @param <string> 2014-01-01 20:20:20  日期格式
     * @return <int>        unix时间戳(秒)
     */
    DateToUnix: function (string) {
        var f = string.split(' ', 2);
        var d = (f[0] ? f[0] : '').split('-', 3);
        var t = (f[1] ? f[1] : '').split(':', 3);
        return (new Date(
            parseInt(d[0], 10) || null,
            (parseInt(d[1], 10) || 1) - 1,
            parseInt(d[2], 10) || null,
            parseInt(t[0], 10) || null,
            parseInt(t[1], 10) || null,
            parseInt(t[2], 10) || null
        )).getTime() / 1000;
    },
    /**
     * 时间戳转换日期
     * @param <int> unixTime    待时间戳(秒)
     * @param <bool> isFull    返回完整时间(Y-m-d 或者 Y-m-d H:i:s)
     * @param <int>  timeZone   时区
     */
    UnixToDate: function (unixTime, isFull, timeZone) {
        if (typeof (timeZone) == 'number') {
            unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;
        }
        var time = new Date(unixTime * 1000);
        var ymdhis = "";
        ymdhis += Time.GetTwo(time.getUTCFullYear()) + "-";
        ymdhis += Time.GetTwo((time.getUTCMonth() + 1)) + "-";
        ymdhis += Time.GetTwo(time.getUTCDate());
        if (isFull === true) {
            ymdhis += " " + Time.GetTwo(time.getUTCHours()) + ":";
            ymdhis += Time.GetTwo(time.getUTCMinutes()) + ":";
            ymdhis += Time.GetTwo(time.getUTCSeconds());
        }
        return ymdhis;
    },
    GetTwo:function(value){
        if(value.toString().length===1){
            return '0'+value;
        }
        return value;
    }
};


Rui.GetInfo=(function(){
    var user='';
    function islogined(){
        if(localStorage.getItem('user')){
            return true;
        }else{
            console.log('您需要登陆才可以进来');
            RuiDa.Alert.getAlert('您还未登陆');
            setTimeout(function(){
                window.location.href='../login/login.html';
            },2000);
            return false;
        }
    }
    function getuser(){
        if(localStorage.getItem('user')){
            user=JSON.parse(localStorage.getItem('user'));
            console.log('用户信息：',user);
            return user;
        }
        /*localStorage['user']=JSON.stringify(res.content);
         console.log(JSON.parse(localStorage['user']));
         var user=JSON.parse(localStorage['user']);
         console.log('user',user,user.memberRef.stuId);*/
        //user.memberRef.stuId
    }

    function clearcuser(){
        localStorage.removeItem('user');
    }
    return{
        islogined:islogined,
        getuser:getuser,
        clearcuser:clearcuser
    }
})();
