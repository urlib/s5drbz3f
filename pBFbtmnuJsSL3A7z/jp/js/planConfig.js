$(function(){$.ajaxDirect({type:"GET",url:urlMap.plans.head,async:!1,afterFn:function(a){"zh"==language?($(document).attr("title",a[0].title),$("#data-plan-text").html(a[0].zh_data_card),$("#voice-plan-text1").html(a[0].zh_voice_data_card_title),$("#voice-plan-text2").html(a[0].zh_voice_data_card_content)):"ja"==language&&($(document).attr("title",a[0].jp_title),$("#data-plan-text").html(a[0].jp_data_card),$("#voice-plan-text1").html(a[0].jp_voice_data_card_title),$("#voice-plan-text2").html(a[0].jp_voice_data_card_content));var b=template("banner",a[0]);$("#banner_content").html(b);isDesktop()?$(".introductionWrap").css("background-image","url("+a[0].second_pc_img+")"):$(".introductionWrap").css("background-image","url("+a[0].second_mobile_img+")")}});"zh"==language?($.ajaxDirect({type:"GET",url:urlMap["public"].data,param:"productType\x3d10004",afterFn:function(a){dataPlan=datas=a.result;a=template("data_plan",dataPlan[0]);document.getElementById("data_plan_detail").innerHTML=a;$("#dataPlanDetail").html(dataPlan[0].zh_pact_content)}}),$.ajaxDirect({type:"GET",url:urlMap["public"].data,param:"productType\x3d10011",afterFn:function(a){voicePlan=voices=a.result;a={list:voicePlan};var b=template("voice_plan",a);document.getElementById("voice_plan_detail").innerHTML=b;a=template("tips",a);document.getElementById("tips_detail").innerHTML=a;isDesktop()?slideDiv("#ProductWrap",3,0):slideDiv("#ProductWrap",1.3,0)}}),$.ajax({type:"GET",url:urlMap.plans.faq,success:function(a){$("#question_1").html(a[0].zh_question);$("#question_2").html(a[1].zh_question);$("#question_3").html(a[2].zh_question);var b=a[0].zh_answer,c=a[1].zh_answer;a=a[2].zh_answer;$("#answer_1").html(b);$("#answer_2").html(c);$("#answer_3").html(a)}})):"ja"==language&&($.ajaxDirect({type:"GET",url:urlMap["public"].data,param:"productType\x3d10004",afterFn:function(a){dataPlan=datas=a.result;a=dataPlan[0].tax_fee;dataPlan[0].product_tax=formatMoney(dataPlan[0].product_tax,0);dataPlan[0].tax_fee=formatMoney(a,0);a=template("data_plan",dataPlan[0]);document.getElementById("data_plan_detail").innerHTML=a;$("#dataPlanDetail").html(dataPlan[0].jp_pact_content)}}),$.ajaxDirect({type:"GET",url:urlMap["public"].data,param:"productType\x3d10011",afterFn:function(a){voicePlan=voices=a.result;for(x in voicePlan)a=voicePlan[x].tax_fee,voicePlan[x].product_tax=formatMoney(voicePlan[x].product_tax,0),voicePlan[x].tax_fee=formatMoney(a,0);a={list:voicePlan};var b=template("voice_plan",a);document.getElementById("voice_plan_detail").innerHTML=b;a=template("tips",a);document.getElementById("tips_detail").innerHTML=a;isDesktop()?slideDiv("#ProductWrap",3,0):slideDiv("#ProductWrap",1.3,0)}}),$.ajax({type:"GET",url:urlMap.plans.faq,success:function(a){$("#question_1").html(a[0].jp_question);$("#question_2").html(a[1].jp_question);$("#question_3").html(a[2].jp_question);var b=a[0].jp_answer,c=a[1].jp_answer;a=a[2].jp_answer;$("#answer_1").html(b);$("#answer_2").html(c);$("#answer_3").html(a)}}));!isDesktop()&&750<=$(window).outerWidth()&&1024>$(window).outerWidth()&&($(".Desktop-product-bg").css("display","block"),$(".Mobile-product-bg").css("display","none"),$("#voice-plan-text2").css("left","0"))});$(window).on("load",function(){isDesktop()?(slideDiv("#ProductWrap",3,0),setTimeout(function(){var a=$(".FAQ_Wrap .QuestionProblem").eq(0).height(),b=$(".FAQ_Wrap .QuestionProblem").eq(1).height(),c=$(".FAQ_Wrap .QuestionProblem").eq(2).height(),a=a>b?a:b,c=a>c?a:c;$(".FAQ_Wrap .QuestionProblem").height(c);a=$(".FAQ_Wrap .AnswerWrap").eq(0).height();b=$(".FAQ_Wrap .AnswerWrap").eq(1).height();c=$(".FAQ_Wrap .AnswerWrap").eq(2).height();a=a>b?a:b;c=a>c?a:c;$(".FAQ_Wrap .AnswerWrap").height(c)},1E3)):slideDiv("#ProductWrap",1.3,0)});(function(){window.addEventListener("DOMContentLoaded",function(){window.addEventListener("orientationchange",function(){},!1)},!1)})();window.addEventListener("orientationchange",function(){window.location.reload()},!1);var language=$("html")[0].lang,unitPrice="",unitTax="",day=1;function calPrice(){day=parseInt($("#day").val());30<=day&&365>=day&&($("#useDay").text(day),$("#unitPrice").text(day*unitPrice),$("#unitTax").text(day*unitTax))}var plan,voices,datas,voicePlan,dataPlan;function buySIM(a){a=$(a).next().val();var b=[];plan=voices;plan[3]=datas[0];for(x in plan)a==plan[x].product_id&&(10011==plan[x].product_type?(b.push("p3_1"),b.push(plan[x].product_type),b.push(plan[x].product_id),b.push(plan[x].data_limit),b.push(plan[x].voice_duration),b.push(plan[x].sms_num),b.push(plan[x].product_tax.split(",").join("")),b.push(plan[x].tax_fee.split(",").join("")),b.push(plan[x].sim_fee)):10004==plan[x].product_type&&(b.push("p1_1"),b.push(plan[x].product_type),b.push(plan[x].product_id),b.push(plan[x].data_limit),b.push(plan[x].product_tax.split(",").join("")),b.push(plan[x].tax_fee.split(",").join("")),b.push(plan[x].sim_fee)));sessionStorage.buydata=b;window.location.href="ja"==language?"/jp/get-sim":"/jp/zh/get-sim"};