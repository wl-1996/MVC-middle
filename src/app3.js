import "./app3.css";
import $ from "jquery";

const html = `
      <section id="app3">
        <div class="square"></div>
      </section>
`
//把上边的字符串html变为标签，后置到body里的.page元素的后边
const $element = $(html).appendTo($('body>.page'))

const $square = $("#app3 .square");
const localKey = 'app3.active'
//active的值为true或者false：
const active = localStorage.getItem(localKey) === 'yes'

// if(active){//active值为true时(即localKey为yes）添加类active
//   $square.addClass('active')
// }else{//active值为false时(即localKey为no）删除类active
//   $square.removeClass('active')
// }
//上边5行代码可以简化为：
$square.toggleClass('active',active)

$square.on("click", () => {
  if($square.hasClass("active")){
    $square.removeClass('active')
    localStorage.setItem('app3.active','no')
  }else{
    $square.addClass('active')
    localStorage.setItem('app3.active','yes')
  }
});
