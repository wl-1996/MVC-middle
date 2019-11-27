import './app1.css'
import $ from 'jquery'

const eventBus = $(window)
//数据相关都放到m
const m = {
    data: {
        n: parseInt(localStorage.getItem('n'))//把本地存储里的字符串数据转变为整型
    },
    create() {
    },
    delete() {
    },
    update(data) {
        Object.assign(m.data, data)//把data的所有属性挨个赋值给m.data
        eventBus.trigger('m:updated')//触发 m:updated
        localStorage.setItem('n', m.data.n)//设置本地存储（key，value）
    },
    get() {
    }
}
//视图相关都放到v
const v = {
    el: null,
    html: `
  <div> 
    <div class="output">
      <span id="number">{{n}}</span>
    </div>
    <div class="actions">
      <button id="add1">+1</button>
      <button id="minus1">-1</button>
      <button id="mul2">*2</button>
      <button id="divide2">÷2</button>
    </div>
  </div>
  `,
    init(container) {
        v.el = $(container)
    },
    render(n) {
        if (v.el.children.length !== 0) v.el.empty()//先清空v.el里的内容
        $(v.html.replace('{{n}}', n))//然后替换v.html里的{{n}}
            .appendTo(v.el)//最后把新的v.html内容放到v.el的里面
    }
}
//其他内容放到c
const c = {
    init(container) {
        v.init(container)
        v.render(m.data.n)//view = render(data)，所有的视图就是把数据渲染一下
        c.autoBindEvents()
        eventBus.on('m:updated', () => {//监听m的updated事件
            v.render(m.data.n)
        })
    },
    events: {
        'click #add1': 'add',//点击#add1元素的时候调用下面的add函数
        'click #minus1': 'minus',//点击#minus1元素的时候调用下面的minus函数
        'click #mul2': 'mul',
        'click #divide2': 'div',
    },
    add() {
        m.update({n: m.data.n + 1})
    },
    minus() {
        m.update({n: m.data.n - 1})
    },
    mul() {
        m.update({n: m.data.n * 2})
    },
    div() {
        m.update({n: m.data.n / 2})
    },
    autoBindEvents() {
        for (let key in c.events) {//遍历events对象
            const value = c[c.events[key]]//value获取的是上边的四个加减乘除函数
            const spaceIndex = key.indexOf(' ')//获取空格字符串的索引
            const part1 = key.slice(0, spaceIndex)//获取从0到spaceIndex处的字符串（即：'click'）
            const part2 = key.slice(spaceIndex + 1)//获取从spaceIndex+1到最后的字符串（即：'#add1' '#minus1' '#mul2' '#divide2'）
            v.el.on(part1, part2, value)//监听part2元素的part1事件，然后调用value函数
        }
    }
}

export default c