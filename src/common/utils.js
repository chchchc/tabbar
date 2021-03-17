import { data } from "autoprefixer"

export function debounce(func,delay){
  let timer = null
  return function(...agrs){   //这种是剩余参数的写法，不是解构 注意区分
    // console.log('agrs',agrs) //[1,2]
    // console.log('...args',...agrs)  //1,2
    if( timer) clearTimeout(timer)
    timer = setTimeout(()=>{
      console.log('aaaaa',agrs)
      //apply和call都是改变this指向的，只是接受参数不同
      //apply:接受的是未解构的参数
      //call:接受的是经过解构的参数
      // func.call(this,...agrs)
      func.apply(this,agrs)
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
