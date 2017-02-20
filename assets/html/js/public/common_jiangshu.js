/**
 * Created by alex.yang on 14-7-15.
 */
window.RuiDa = window.RuiDa || {
    Module: {},
    Check: {},
    DeValue: {},
    Tool: {}
};

window.RuiDa = window.RuiDa || {
	Module:{},
	Check:{},
	Tool:{}	
};


//封装1
RuiDa.Module = (function() {
    return {
		bindClickBtn:bindClickBtn,
		/*bindClickBtnByArr:bindClickBtnArr,*/
		binClick:scrollOrClick,
		
        binClick: scrollOrClick,
        binMain: bindClickByArr,
        bindClickBtn: bindClickBtn,
        bindClickBtnByArr: bindClickBtnByArr,
        getSex: getSex,
        initBottomNav: initBottomNav,
        initIScroll: initIScroll,
        backHome: backHome,
        backHistory: backHistory,
        backUrl: backUrl,
        checkcon:checkcon
    };

    function checkcon(){
        // 等待加载PhoneGap
        document.addEventListener("deviceready", onDeviceReady_checkConnection, false);
        // PhoneGap加载完毕，可以安全调用PhoneGap方法
        function onDeviceReady_checkConnection() {
            checkConnection();
        }
        function checkConnection() {
            var networkState = navigator.network.connection.type;
            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.NONE]     = 'No network connection';
            if(networkState===Connection.NONE){
                RuiDa.Alert.showAlert('当前无网络服务', '', '警告', '确定');
                hideDiv();//隐藏加载效果
            }
        }
    }

    //直接点击绑定跳转事件(手机上有延迟，最好用下面的)
    function bindClickBtn(id, url) {
        $(id).bind('touchstart', function() {
            window.location.href = url;
        });
    }
	
	function bindClickBtn(id,url){
		$(id).blnd('touchstart',function(){
			window.location.href =  url;			
		});
	}

    function bindClickBtnByArr(arr) {
        if (arr) {
            for (var key in arr)
                if (key && arr[key]) {
                    bindClickBtn(key, arr[key]);
                }
        }
    }
	
	function bindClickBtnByArr(arr){
		if(arr){
			for(var key in arr){
				if(key && arr[key]){
					bindClickBtn(key, arr[key]);
				}
			}
		}	
	}

    //滚动或点击绑定跳转事件
    function scrollOrClick(element, url) {
        $(element).on('touchstart', function(event) {
            var pageYStart = event.originalEvent.targetTouches[0].pageY;
            $(this).on('touchend', function(event) {
                var pageYEnd = event.originalEvent.changedTouches[0].pageY;
                if (Math.abs(pageYStart - pageYEnd) < 30) {
                    window.location.href = url;
                }
                $(this).off('touchend');
            });
        });
    }
	
	function scrollOrClick(element, url){
		$(element).on('touchstart',function(event){
			
		});					
	}

    //按数组进行绑定
    function bindClickByArr(arr) {
        if (arr) {
            for (var key in arr)
				if (key && arr[key]) {
					scrollOrClick(key, arr[key]);
				}
        	}
    }

    function getSex(key) {
        var sexarr = {
            1: '男',
            2: '女',
            3: '保密'
        };
        return sexarr[key] || '未知';
    }

    // 底部导航
    function initBottomNav() {
        var urlArr = ['home.html', 'collect.html', 'fans.html', 'person.html'];
        for (var i = 0; i < 4; i++) {
            $('footer nav').eq(i).on('touchstart', function() {
                var index = $(this).index();
                if (window.location.href.indexOf(urlArr[index]) != -1) return;
                window.location.href = urlArr[index];
            });
        };
    }

    //滚动初始化
    function initIScroll() {
        setTimeout(function() {
            window.iScroll = new iScroll('iScroll', {
                vScrollbar: false
            });
        }, 200);
    }

    function backHome() {
        document.addEventListener("deviceready", function() {
            document.addEventListener("backbutton", function() {
                window.location.href = 'home.html';
            }, false);
        }, false);
    }

    function backHistory() {
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
        document.addEventListener("deviceready", function() {
            document.addEventListener("backbutton", function() {
                window.location.href = url;
            }, false);
        }, false);
    }
})();

//封装2
RuiDa.Check = {
    //【start】
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

//封装3
RuiDa.Tool = {
    //返回当前的索引
    indexOf: function(arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) return i;
        }
        return -1;
    },
    //移除当前元素
    remove: function(arr, val) {
        var index = indexOf(arr, val);
        if (index > -1) {
            arr.splice(index, 1);
        }
    },
    count: function(o) {
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
    GetRequest: function() {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
        //调用方法
        //var Request = new Object();
        //Request = GetRequest();
        //var 参数1, 参数2, 参数3, 参数N;
        //参数1 = Request['参数1'];
    },
    GetData2: function(time) {
        return new Date(parseInt(time) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    },
    GetData: function(unixTime, isFull, timeZone) {
        if (typeof(timeZone) == 'number') {
            unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;
        }
        var time = new Date(unixTime * 1000);
        var ymdhis = "";
        ymdhis += time.getUTCFullYear() + "-";
        ymdhis += time.getUTCMonth() + "-";
        ymdhis += time.getUTCDate();
        if (isFull === true) {
            ymdhis += " " + time.getUTCHours() + ":";
            ymdhis += time.getUTCMinutes(); //+ ":";
            //ymdhis += time.getUTCSeconds();
        }
        return ymdhis;
    }
}

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
    }
};

function Loading(targetNode){
    this._targetNode = targetNode  || $("section");
    this._loadingEl = null;
    this.init();
    //this.addEvent();
}
function setHeight(height){
     var _h=$(window).height();
        var ht=_h-height;
        $("#iScroll").css("height",ht+"px");
}

Loading.prototype={
    constructor:Loading,
    init:function(){

        //创建元素
        var markLayout = document.createElement("div");
        markLayout.className="loading";
        markLayout.id="showLoading";
        var img = document.createElement("img");
        img.src = "images/wait.gif";
        markLayout.appendChild(img);
        this._loadingEl = markLayout;
        //ajax过滤器,用于监听ajax状态
        $.ajaxPrefilter(function(options) {
            options.global = true;
            options.timeout=20000;
        });

    },
    addLoading:function(){
        //页面中没有loading元素，并且loading已经初始化完毕
        if(this._loadingEl){
            //将内容插入到指定的元素中去（前面），是用jquery
            this._targetNode.prepend(this._loadingEl);
        }
    },
    removeLoading:function(){
        if($("#showLoading")){
            $("#showLoading").remove();
        }
    },
    addEvent:function(){
        var _this = this;
        $(document).ajaxStart(function(){
            _this.addLoading();
        }).ajaxStop(function(){
                _this.removeLoading();
            }).ajaxSuccess(function(event, request, settings){
                _this.removeLoading();
            }).ajaxError(function(event,request, settings){
                _this.removeLoading();
            });
    }

};

RuiDa.Module.checkcon();