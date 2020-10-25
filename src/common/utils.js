export function debounce(func,delay){
  let timer = null
  return function(...agrs){
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
