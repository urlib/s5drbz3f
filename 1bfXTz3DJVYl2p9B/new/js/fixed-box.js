$(function(){
// 固定功能栏
    var toTop = true; // 点击回到顶部节流
    var scrollT = 300; // 页面滚动到scrollT时候显示回到顶部按钮
    $(".fb-list li").on("mouseenter", function(){
        $(this).find(".fb-des").show();
        $(this).find(".fb-img").hide();
    })
    $(".fb-list li").on("mouseleave", function(){
        $(this).find(".fb-des").hide();
        $(this).find(".fb-img").show();
    })

    $(document).scroll(function() {
        var scrollH = $(document).scrollTop(); //滚动高度
        if(scrollH > scrollT){
            $(".fb-to-top").show();
        }else{
            $(".fb-to-top").hide();
        }
    });

    $(".fb-to-top").on("click", function(){
        if(toTop){
            toTop = false;
            $("html, body").stop().animate({
                scrollTop: 0
            }, 500, function(){
                toTop = true;
            });
        }
    })

    $(".fb-service").on("click",function(){//【智能客服】按钮点击事件
        var kefu=getCookie("kf_code");
        if(kefu!=null&&kefu!=undefined&&kefu!=""){
            $.ajax({
                //url : 'http://117.136.240.96/masterService/huawei/onlineService?mobile='+kefu,
                url : 'https://rcsoa-app1.zone139.com/masterService/huawei/onlineService?mobile='+kefu,
                data:null,
                cache : false,
                async : true,
                type : "GET",
                success : function (data){
                    if(data!=null&&data.msg=="success"){
                        window.open(data.accessUrl);
                    }
                }
            });
        }
    });
})

function getCookie(objName) {//获取指定名称的cookie的值
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == objName) return unescape(temp[1]);
    }
}
