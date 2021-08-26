import { data } from "autoprefixer"

export function debounce(func,delay){
  let timer = null
  return function(...agrs){   //这种是剩余参数的写法，也就是展开运算符，不是解构 注意区分
    // console.log('agrs',agrs) //[1,2]
    // console.log('...args',...agrs)  //1,2  这里就是扩展运算符，就是将数组形式的数据分割成参数列表
    if( timer) clearTimeout(timer)
    timer = setTimeout(()=>{
      console.log('aaaaa',agrs)
      // console.log('bbbthis',this)  //this指向的是home组件
      //apply和call都是改变this指向的，只是接受参数不同
      //apply:接受的的参数，是一个数组
      //call:接受的是参数列表，个数不定
      // func.call(this,...agrs)
      func.apply(this,agrs)
      // func(agrs)
    },delay)
  }
}

export function formateDate(date,fmt){
  //获取年份
  if(/(y+)/.test(fmt)){
    fmt = fmt.replace(RegExp.$1,(date.getFullYear() + '').substr(4-RegExp.$1.length))
  }
  //获取
  let o ={
    'M+':date.getMonth()+1,
    'd+':date.getDate(),
    'h+':date.getHours(),
    'm+':date.getMinutes(),
    's+':date.getSeconds()
  };
  for(let k in o){
    if(new RegExp(`(${k})`).test(fmt)){
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1,(RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  };
  return fmt;
};

function padLeftZero(str){
  return ('00' + str).substr(str.length)
}
