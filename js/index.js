var startX;
var endX;
var isMove=false;

$(document).ready(function () {
//    轮播图
    timer=setInterval(lunbo,5000);
//    轮播图滑动
    var banner=$(".banner");

    var bannerMove;
    var bannerLeft;
    banner.on("touchstart",function (e) {
        e.preventDefault();
        clearInterval(timer);
        startX=e.touches[0].pageX;
        bannerLeft=parseFloat( $(".banner").children("ul").eq(0).css("left"));

    });
    banner.on("touchmove",function (e) {
        e.preventDefault();
        isMove=true;
        bannerMove=e.touches[0].pageX;
        console.log(bannerLeft);
        $(".banner").children("ul").eq(0).animate({left:bannerMove-startX+bannerLeft+"px"},10);

    })
    banner.on("touchend",function (e) {
        e.preventDefault();
        endX=e.changedTouches[0].pageX;
        if(Math.abs(endX-startX)>banner.width()/3){
            if(startX-endX>0&&isMove==true){
                if(lunboIndex==8){
                    $(".banner").children("ul").eq(0).animate({left:"-900%"},"fast",function () {
                        $(".banner").children("ul").eq(0).css("left","-100%");
                    });
                    lunboIndex=1;
                }
                else{
                    lunboIndex++;
                    $(".banner").children("ul").eq(0).animate({left:-100*lunboIndex+"%"},"fast");
                }
                //原点
                for(var i=0;i<$(".banner").children("ul").eq(1).children("li").length;i++){
                    $(".banner").children("ul").eq(1).children("li").eq(i).css("border-width","1px");
                }
                if(lunboIndex>8){
                    $(".banner").children("ul").eq(1).children("li").eq(0).css("border-width","3px");
                }
                else{
                    $(".banner").children("ul").eq(1).children("li").eq(lunboIndex-1).css("border-width","3px");
                }
                timer=setInterval(lunbo,5000);
            }
            else if(startX-endX<0&&isMove==true){
                console.log(lunboIndex);
                if(lunboIndex==1){
                    $(".banner").children("ul").eq(0).animate({left:"0"},"fast",function () {
                        $(".banner").children("ul").eq(0).css("left","-800%");
                    });
                    lunboIndex=8;
                }
                else{
                    lunboIndex--;
                    $(".banner").children("ul").eq(0).animate({left:-100*lunboIndex+"%"},"fast");
                }
                //原点
                for(var i=0;i<$(".banner").children("ul").eq(1).children("li").length;i++){
                    $(".banner").children("ul").eq(1).children("li").eq(i).css("border-width","1px");
                }
                $(".banner").children("ul").eq(1).children("li").eq(lunboIndex-1).css("border-width","3px");
                timer=setInterval(lunbo,5000);
            }
        }
        else {
            $(".banner").children("ul").eq(0).animate({left:-100*lunboIndex+"%"},"fast");
        }
    });

//    滚动播报
    var kbTimer=setInterval(function () {

        var kb=$(".kb_ul");
        var kbFirst=kb.children().eq(0);
        kbFirst.remove();
        kb.append(kbFirst);
        // kb.css("transition","all 0.5s");
        // // kb.css("transform","translate3d(0,0,0)",function () {
        // //     kb.css("transform","translate3d(0,-29px,0)")
        // // });
        // kb.css("transform","translate3d(0,-29px,0)");
        //
        //
        //
        //
        // //
        // setTimeout(function () {
        //
        //     // kb.css("transform","translate3d(0,0,0)");
        // },500);

    },4001);

//    计时器
    var dateTimer=setInterval(function () {
        var now=new Date();
        var future=new Date("2017/11/03 24:00:00");
        var cha=future.getTime()-now.getTime();
        var hour=Math.floor(cha/1000/60/60%60);
        var minute=Math.floor(cha/1000/60%60);
        var second=Math.floor(cha/1000%60);
        if(cha<0){
            clearInterval(dateTimer);
            return;
        }
        if(hour<10){
            $(".ti").eq(0).html("0");
            $(".ti").eq(1).html(hour);
        }
        else{
            $(".ti").eq(0).html(Math.floor(hour/10));
            $(".ti").eq(1).html(Math.floor(hour%10));
        }
        if(minute<10){
            $(".ti").eq(2).html("0");
            $(".ti").eq(3).html(minute);
        }
        else{
            $(".ti").eq(2).html(Math.floor(minute/10));
            $(".ti").eq(3).html(Math.floor(minute%10));
        }
        if(second<10){
            $(".ti").eq(4).html("0");
            $(".ti").eq(5).html(second);
        }
        else{
            $(".ti").eq(4).html(Math.floor(second/10));
            $(".ti").eq(5).html(Math.floor(second%10));
        }
    },1000);


//    滑动商品
    var proSX;
    var moveX;
    var proMove=false;
    var proLeft;
    $(".box_content").on("touchstart",function (e) {
        e.preventDefault();
        proSX=e.touches[0].pageX;
        proLeft=parseFloat($(".box_content").css("left"));
    });
    $(".box_content").on("touchmove",function (e) {
        e.preventDefault();
        proMove=true;
        moveX=e.touches[0].pageX;
        if(moveX-proSX+proLeft>0){
            $(".box_content").animate({left:0+"px"},10);
        }
        else {
            if(Math.abs(moveX-proSX+proLeft)>Math.abs($(".box_content").children().eq(0).width()*5)){
                $(".box_content").animate({left:-parseFloat($(".box_content").children().eq(0).width()*5)},10);
            }
            else{
                $(".box_content").animate({left:moveX-proSX+proLeft+"px"},10);
            }
        }
    });
    $(".box_content").on("touchend",function (e) {
        e.preventDefault();
    })

//    滚动监听
    $(window).scroll(function () {
        if($(document).scrollTop()>=banner.height()-$(".search").height()){
            $(".search").css("background-color","red");
        }
        else {
            $(".search").css("background-color","");
        }
    })
})

var timer=null;
var lunboIndex=1;
function lunbo() {
    var ul=$(".banner").children("ul").eq(0);
    lunboIndex++;
    if(lunboIndex>9){
        ul.css("left","-100%");
        lunboIndex=2;
    }
    ul.animate({left:-100*lunboIndex+"%"},"fast");
    //原点
    for(var i=0;i<$(".banner").children("ul").eq(1).children("li").length;i++){
        $(".banner").children("ul").eq(1).children("li").eq(i).css("border-width","1px");
    }
    if(lunboIndex>8){
        $(".banner").children("ul").eq(1).children("li").eq(0).css("border-width","3px");
    }
    else{
        $(".banner").children("ul").eq(1).children("li").eq(lunboIndex-1).css("border-width","3px");
    }

}