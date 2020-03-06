
$(function(){
    $(".move-wire").width(0);
    // 导航
    $(".nav .nav-link").on("mouseenter", function(){
        var targetLeft = $(this).position().left;
        var targetWidth = $(this).innerWidth();
        $(this).find("ul").show();
        $(".move-wire").stop().width(targetWidth).animate({left: targetLeft});
    })
    $(".nav .nav-link").on("mouseleave", function(){
        $(this).find("ul").hide();
        $(".move-wire").width(0);
    })


    scroll(0,0);
    window.parent.scrollTo(0, 0);
    if(typeof window.parent.reinitIframe != 'undefined'/* && window.parent.reinitIframe instanceof Function*/){
        window.parent.reinitIframe();
    }
})