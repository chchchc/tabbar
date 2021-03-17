import Vue from 'vue'
import Vuex from 'vuex'

//1.安装插件
Vue.use(Vuex)

//2.创建Store对象
const store = new Vuex.Store({
  state: {
    cartList: []

  },
  getters: {
    cartLength(state) {
      return state.cartList.length
    },
    cartList(state) {
      return state.cartList
    }
  },
  mutations: {
    //mutation尽可能的是把事情做得比较单一，这里还需要判断是否加购过某个商品，所以不合适，这里把他拆成用action里面去
    // addCart(state,payload){
    //   //payload新添加的商品
    //   let oldProduct = null;
    //   for(let item of state.cartList){
    //     if(item.iid === payload.iid){
    //       oldProduct = item;
    //     }
    //   }
    //   //判断
    //   if(oldProduct){
    //     oldProduct.count+=1  //这里其实也是cartList的某一项加一
    //   }else{
    //     payload.count = 1
    //     state.cartList.push(payload)
    //   }
    // }
    addCount(state, payload) {
      payload.count++
    },
    addToCart(state, payload) {
      state.cartList.push(payload)
    }
  },
  actions: {
    addCart(context, payload) {
      return new Promise((resolve, reject) => {
        //payload新添加的商品
        let oldProduct = null;
        for (let item of context.state.cartList) {
          if (item.iid === payload.iid) {
            oldProduct = item;
          }
        }
        //判断
        if (oldProduct) {
          context.commit('addCount', oldProduct)
          resolve('当前商品数量加一')
        } else {
          payload.count = 1;
          payload.checked = true;
          context.commit('addToCart', payload)
          resolve('添加了新的商品')
        }
      })

    }
  }

})

//3.挂在实例
export default store
