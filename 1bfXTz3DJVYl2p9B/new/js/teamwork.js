
$(function(){
    // 导航
    $(".nav .nav-link").on("mouseenter", function(){
        var targetLeft = $(this).position().left;
        var targetWidth = $(this).innerWidth();
        $(this).find("ul").show();
        $(".move-wire").stop().width(targetWidth).animate({left: targetLeft});
    })
    $(".nav .nav-link").on("mouseleave", function(){
        // var targetWidth = $(".nav .nav-link").eq(0).innerWidth();
        // var targetLeft = $(".nav .nav-link").eq(0).position().left;
        $(this).find("ul").hide();
        $(".move-wire").width(0);
        // $(".move-wire").stop().width(targetWidth).animate({left: targetLeft});
    })

    // 海量应用选择，应用商场体验
    $("#cell .cells").on("mouseenter", function(){
        if(!$(this).hasClass("active")){
            $(this).addClass("cells-hover");
        }
        $(this).find("h4").stop().animate({left: 76}, 60).end().find(".bg").show();
    })
    $("#cell .cells").on("mouseleave", function(){
        if($(this).hasClass("cells-hover")){
            $(this).removeClass("cells-hover")
        }
        $(this).find("h4").stop().animate({left: 0}, 60).end().find(".bg").hide();
    })

    $("#cell .cells").on("click", function(){
        if(!$(this).hasClass("active")){
            var index=$(this).index();
            $(this).addClass("active").siblings().removeClass("active");
            for(var i = 0; i<3; i++){ //查找当前中心显示文本的索引
                if($(".texttitle .text h4").eq(i).css("display") == "block"){
                    var indexPre = i;
                }
            }

            $(".texttitle").stop().animate({opacity: 0}, 900, function(){
                $(".texttitle").find("h4").eq(index).show().siblings().hide();
                $(".texttitle").stop().animate({opacity: 1}, 900);
            });

            $("#sun img").eq(indexPre).stop().animate({opacity: 0}, 900, function(){
                $("#sun img").eq(index).show().siblings().hide().end().stop().animate({opacity: 1}, 900);
            });

            // $(".shop-right .list").eq(index).show().siblings().hide();
            $(".shop-right .list").eq(indexPre).stop().animate({top: 20, opacity: 0}, 900, function(){
                $(".shop-right .list").eq(index).show().siblings().hide().end().stop().animate({top: 0, opacity: 1}, 900);
            })
        }
    })

    // 专业服务支持，移动品牌背书
    $(".enterprise .btn").on("mouseenter", function(){
        $(".expert-qrcode").show();
    })
    $(".enterprise .btn").on("mouseleave", function(){
        $(".expert-qrcode").hide();
    })

    // 典型案例
    $("#case li").on("mouseenter", function(){
        $(this).find(".panel").css("top",0)
    })
    $("#case li").on("mouseleave", function(){
        $(this).find(".panel").css("top",170)
    });


    var targetWidth = $(".nav ul li").eq(1).innerWidth();
    var targetLeft = $(".nav ul li").eq(1).position().left;
    $(".move-wire").stop().width(targetWidth).animate({left: targetLeft});

    scroll(0,0);
    window.parent.scrollTo(0, 0);
    if(typeof window.parent.reinitIframe != 'undefined' /*&& window.parent.reinitIframe instanceof Function*/){
        window.parent.reinitIframe();
    }
})