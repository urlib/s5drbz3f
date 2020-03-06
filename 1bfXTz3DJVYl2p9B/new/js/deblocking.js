$(function(){
    var isSending=0;
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

    //查看示例
    $(".how2 .sample").on("mouseenter", function(){
        $(".sample-pic").show();
    })
    $(".how2 .sample").on("mouseleave", function(){
        $(".sample-pic").hide();
    })



    $("#sendMeil").on("click",function(){
        var picUrl=$(".upload-pic img").attr('src');
        if(picUrl!=null&&picUrl!=undefined&&picUrl!=""){
            $('#choiceWindow').fadeIn();
            $('body').append('<div id="mask_layer1"></div>');
            $('#mask_layer1').css({'filter' : 'alpha(opacity=40)'}).fadeIn();
            var popuptopmargin = ($('#choiceWindow').height() + 10) / 2;
            var popupleftmargin = ($('#choiceWindow').width() + 10) / 2;
            $('#choiceWindow').css({
                'margin-top' : -popuptopmargin,
                'margin-left' : -popupleftmargin,
            });
        }
    });
    $('#okBut').on("click",function(){
        var phone=$("#phone").val();
        var picUrl=$(".upload-pic img").attr('src');
        if(phone==null||phone==undefined||phone==""){
            $("#message").html("请输入受理号码！");
            return;
        }else if(!(/^1[3456789]\d{9}$/.test(phone))){
            $("#message").html("受理号码有误，请重填！");
            return;
        }
        if(picUrl!=null&&picUrl!=undefined&&picUrl!=""){
            $("#message").html("正在提交，请等待.....");
            $("#buttonDiv").fadeOut();
            var data = new FormData();
            data.append('suffix', suffix);
            data.append('date', date);
            data.append('fileName', fileName);
            data.append('phone',phone)
            //alert(data.get("suffix")+"\r\n"+data.get("date")+"\r\n"+data.get("fileName")+"\r\n"+data.get("phone"));
            if(isSending==0){
                isSending=1;
                $.ajax({
                    type: "POST",
                    url: "unsealing/sendMail",
                    data: data,
                    cache: false,
                    contentType: false,    //不可缺
                    processData: false,    //不可缺
                    dataType:"json",
                    success: function(ret) {
                        console.log(ret);
                        if(ret.result.code==1){
                            $('#mask_layer1 , #choiceWindow').fadeOut();
                            $("#phone").val("");
                            $("#message").html("");
                            $("#buttonDiv").fadeIn();
                            alert("您已提交成功，会在两个工作日为您处理，建议您届时再留意");
                        }else if(ret.result.code==0){
                            alert("申请提交失败");
                        }else if(ret.result.code==2){
                            alert("请输入受理号码！");
                        }else{
                            alert("申请提交失败");
                        }
                        isSending=0;
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        alert("上传失败，请检查网络后重试");
                        isSending=0;
                    }
                });
            }


        }
    });

    $('#cancleBut').on("click",function() {
        $('#mask_layer1 , #choiceWindow').fadeOut();
        $("#message").html("");
        $("#phone").val("");
        return false;
    });

    //照片上传
    /*$(".upload").on("change", function() {
        var imgMsg = this.files;
        if(imgMsg.length === 0){
            return;
        }

        var src = null;
        //转成可以在本地预览的格式
        if (window.createObjcectURL != undefined) {
            src = window.createOjcectURL(imgMsg[0]);
        } else if (window.URL != undefined) {
            src = window.URL.createObjectURL(imgMsg[0]);
        } else if (window.webkitURL != undefined) {
            src = window.webkitURL.createObjectURL(imgMsg[0]);
        }

        // 检查是否是符合要求的图片
        if(!imgMsg[0].name.match(/.png|.jpg|.jpeg/)) {
            window.alert("上传错误,文件格式必须为：png/jpg/jpeg");
            return;
        }else{
            $(".upload-pic").show();
            $(".upload-btn").hide();
            $(".submit").removeClass("no-click");
            $(".upload-pic img").attr('src', src);
            $(".upload-pic p").html(imgMsg[0].name);
        }

    });*/



});

var suffix;
var date;
var fileName;

//用于进行图片上传，返回地址
function setImg(obj){
    var f=$(obj).val();
    //alert(f);
    console.log(obj);
    if(f == null || f ==undefined || f == ''){
        return false;
    }
    if(!/\.(?:png|jpg|bmp|PNG|JPG|BMP)$/.test(f))
    {
        alert("类型必须是图片(.png|jpg|bmp|PNG|JPG|BMP)");
        $(obj).val('');
        return false;
    }
    var data = new FormData();
    console.log(data);
    $.each($(obj)[0].files,function(i,file){
        data.append('file', file);
    });
    console.log(data);
    $.ajax({
        type: "POST",
        url: "unsealing/uploadPic",
        data: data,
        cache: false,
        contentType: false,    //不可缺
        processData: false,    //不可缺
        dataType:"json",
        success: function(ret) {
            console.log(ret);
            if(ret.code==0){
                /*$("#photoUrl").val(ret.result.url);//将地址存储好
                $("#photourlShow").attr("src",ret.result.url);//显示图片
                alertOk(ret.message);*/
                $(".upload-pic").show();
                $(".upload-btn").hide();
                $(".submit").removeClass("no-click");
                $(".upload-pic img").attr('src', ret.result.url);
                $(".upload-pic p").html("");
                suffix=ret.result.suffix;
                date=ret.result.date;
                fileName=ret.result.name;
            }else if(ret.code==1){
                alert("请上传图片格式的文件！");
            }else{
                alertError(ret.message);
                $("#url").val("");
                $(obj).val('');
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("上传失败，请检查网络后重试");
        }
    });
}