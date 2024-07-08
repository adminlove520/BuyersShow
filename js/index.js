/*
 * @Author: LX
 * @Description: BY:LX
 * @Date: 2022-05-20 19:34:25
 */
// 懒加载开始
$("img.lazyload").lazyload({
  effect: "fadeIn",
});
// 开始自动调用图片
img_num();
// 获取图片数量
function img_num() {
  var sum_img = $("#walBox a>img").length;
  $(".number").html(
    "当前捕获到了" +
      "<b style='color:red;font-weight:bold;font-size:18px'> " +
      sum_img +
      "</b> " +
      "张淘宝买家秀图片"
  );
  setTimeout("img_num()", "3500"); //3.5秒执行一次
  console.log("买家秀图片" + sum_img + "张"); //控制台打印当前图片数量
}

//默认获取28张
var data = 28;
window.onload = function () {
  for (var i = 0; i < data; i++) {
    tbshow();
  }
};
// 换一批
$("#next,#app_next").click(function () {
  $("#walBox").empty();
  for (var i = 0; i < data; i++) {
    tbshow();
  }
});

// 获取淘宝秀图片
function tbshow() {
  $("#loadmore").hide();
  $.ajax({
    type: "POST",
    url: "https://api.uomg.com/api/rand.img3?format=json",
    dataType: "json",
    success: function (data) {
      addtbshow(data.imgurl);
    },
  });
}

// 获取图片地址
function addtbshow(imgurl) {
  url =
    '<a class="btn_save" href="' + imgurl + '"  target="_blank">保存图片</a>';
  newHtml =
    '<li><a href="' +
    imgurl +
    '"  data-fancybox="images"><img  class="lazyload" data-src="' +
    imgurl +
    '" src="' +
    imgurl +
    '" />' +
    "</a>" +
    url +
    "</li>";

  contAdd(newHtml);
}

// 换一批
function contAdd(html) {
  var myBox = $(" #walBox");
  var $newHtml = $(html);
  myBox.prepend($newHtml);
}

// 停止获取
interval = null;
var interval = setInterval("tbshow()", 1000); //每隔一秒执行一次redoMethod()
// 暂停
$(".Stp").click(function () {
  if (interval) {
    clearInterval(interval);
    interval = null;
    $(".Stp").text("停止成功");
    $(".start").hide();
    $(".Strat_img").css({
      "background-color": "#409eff",
      "border-color": "#409eff",
    });
    $(".Strat_img").css("cursor", "pointer");
    $(".Strat_img").attr("disabled", false);
  }
});

// 开始获取
$(".Strat_img").click(function () {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
  interval = setInterval("tbshow()", 1000);
  $(".Stp").text("停止获取");
  $(".start").show();
});

// 输入验证
function btn() {
  var nu = $(".str_mark input").val();
  if (nu == "") {
    $("#diong").show(300);
    $("#ok_diong").hide(300);
  } else if (nu != "") {
    $("#ok_diong").show(300);
    $("#diong").hide();
  }
  // 自定义获取内容
  var num = $(".str_mark input").val();
  for (var i = 0; i < num; i++) {
    $("#str").hide(300);
    tbshow();
  }
}
// 清空输入框内容
function clears() {
  var inp = $(".str_mark input");
  $("#ok_diong").hide();
  inp.val("");
}
// 自定义窗口打开关闭
$("#sub,#app_ding").click(function () {
  $("#str").show();
});
$(".off").click(function () {
  $("#str").hide();
});
$(".btn_list").click(function () {
  $("#data_div").toggle(10);
});
// 获取图片列表

function btn_list() {
  $("#data_div").show();
  $("#list_img li").remove();
  // 获取当前全部图片列表链接
  var str = [""];
  $("#walBox img").each(function () {
    str.push($(this).attr("src"));
  });
  // 自动添加图片
  var imagedata = $("#list_img");
  for (var i = 1; i < str.length; i++) {
    var url =
      '<a class="btn_down" href="' + str[i] + '"  target="_blank">下 载</a>';
    var image =
      '<li><a href="' +
      str[i] +
      '" data-fancybox="images" download="' +
      str[i] +
      '"><img  class="lazyload down-images" data-src="' +
      str[i] +
      '" src="' +
      str[i] +
      '" />' +
      "</a> " +
      url +
      "</li>";
    imagedata.prepend(image);
  }
}
// setTimeout("btn_list()", "3000"); //3秒后执行一次s

//开启列表自动获取图片
//定时器对象

//打开定时器
function btn_on() {
  var list_images = setInterval("btn_list()", 3000);
  if (list_images != undefined) {
    alert("已经启动！");
  }
}

// 分享按钮
$(function () {
  var pageURL = $(location).attr("href");
  $("#Turl").text(pageURL);
});
function btn_share() {
  const range = document.createRange();
  range.selectNode(document.getElementById("Turl"));
  const selection = window.getSelection();
  if (selection.rangeCount > 0) selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand("copy");
  alert("链接复制成功,可以分享给好友！");
}

// 按钮选择
var btn1 = $(".button_1").attr("name");
var btn5 = $(".button_5").attr("name");
var btn10 = $(".button_10").attr("name");
var btn20 = $(".button_20").attr("name");
$(".button_1").click(function () {
  $(".str_mark input").val(btn1);
});
$(".button_5").click(function () {
  $(".str_mark input").val(btn5);
});

$(".button_10").click(function () {
  $(".str_mark input").val(btn10);
});

$(".button_20").click(function () {
  $(".str_mark input").val(btn20);
});
