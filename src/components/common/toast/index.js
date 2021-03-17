import Toast from "./Toast"

const obj = {}

obj.install = function(Vue){
    //添加到文档上面
    // document.body.appendChild(Toast.$el)

    //1.创建组件构造器
    const toastContrustor = Vue.extend(Toast)
    //2.new的方式，根据组件构造器，可以创建出来的一个组件对象
    const toast = new toastContrustor()
    //3.将组件对象，手动挂载到某一个元素上
    toast.$mount(document.createElement('div'))
    //4.toast.$el对应的就是div
    document.body.appendChild(toast.$el)


    Vue.prototype.$toast = toast; //放到原型上
}
export default obj   //这样子带了default 代表可以在main.js引入的时候  自己命名名字
