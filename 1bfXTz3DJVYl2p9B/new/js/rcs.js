
$(function(){
    // 导航
    $(".nav .nav-link").on("mouseenter", function(){
        var targetLeft = $(this).position().left;
        var targetWidth = $(this).innerWidth();
        $(this).find("ul").show();
        $(".move-wire").stop().width(targetWidth).animate({left: targetLeft});
    })
    $(".nav .nav-link").on("mouseleave", function(){
        var targetWidth = $(".nav .nav-link").eq(1).innerWidth();
        var targetLeft = $(".nav .nav-link").eq(1).position().left;
        $(this).find("ul").hide();
        if($(this).hasClass("rcs-company")){
            $(".move-wire").stop().width(0).css("left",targetLeft);
        }else{
            $(".move-wire").stop().width(targetWidth).animate({left: targetLeft});
        }
    })

    // 扫码领取10G定向流量  个人
    $(".ug-scan-qrcode").on("mouseenter", function(){
        $(".ug-qrcode").show();
    })
    $(".ug-scan-qrcode").on("mouseleave", function(){
        $(".ug-qrcode").hide();
    })

    // 产品形态 企业
    $(".modality-list li").on("click", function(){
        var index=$(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(".modality-content .modality-content-tab").eq(index).show().siblings().hide();
    })

})