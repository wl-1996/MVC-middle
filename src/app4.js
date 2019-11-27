import $ from "jquery";
import "./app4.css";

const html = `
      <section id="app4">
        <div class="circle"></div>
      </section>
`
//把上边的字符串html变为标签，后置到body里的.page元素的后边
const $element = $(html).appendTo($('body>.page'))

const $circle = $("#app4 .circle");

$circle
  // 鼠标进入时添加类：active，那么css里给类active设置的样式就会生效：
  .on("mouseenter", () => {
    $circle.addClass("active");
  })
  // 鼠标离开时删除类：active，那么css里给类active设置的样式就会失效：
  .on("mouseleave", () => {
    $circle.removeClass("active");
  });
