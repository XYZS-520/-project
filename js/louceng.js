$(".navigation").children(".dhul").children("li").click(function () {
    // // 索引
    // var i = $(this).index();
    // // 选中div
    // var now = $(".main-dh").eq(i);

    // var t = now.offset().top;

    // $("html").animate({
    //     scrollTop:t
    // })
    $("html").stop().animate({
        scrollTop: $(".main-dh").eq($(this).index()).offset().top
    })
})

$(".navigation").children(".go-top").click(function () {
    // 索引
    var i = $(this).index();
    // 选中div
    var now = $(".topper").eq(i);

    var t = now.offset().top;

    $("html").animate({
        scrollTop:t
    })
    // $("html").stop().animate({
    // 	scrollTop: $(".topper").eq($(this).index()).offset().top
    // })
})