<template>
  <div class="bottom-menu">
     <!--v-model形式 -->
    <!-- <check-button class="select-all" @checkBtnClick="checkBtnClick" v-model="isSelectAll"></check-button> -->
    <!--绑定value形式-->
    <check-button class="select-all" @checkBtnClick="checkBtnClick" :value="isSelectAll"></check-button>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product">去计算({{cartLength}})</span>
  </div>
</template>

<script>
  import CheckButton from '../CheckButton'
  import { mapGetters } from 'vuex'

	export default {
		name: "CartBottomBar",
    components: {
		  CheckButton
    },
    computed: {
      ...mapGetters([
      	'cartList',
        'cartLength'
      ]),

		  totalPrice() {
        const cartList = this.cartList;
        //reduce函数通常作为函数累加器
        return cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          // return preValue + item.count * item.price
          return preValue + item.count * 59
        }, 0).toFixed(2)
      },
      isSelectAll() {
        //find方法 没有条件符合时，返回undefined-------这里就是要求所有的都是checked=true全选状态
        console.log('selsectAll',this.cartList.find(item => item.checked === false) === undefined)
        return this.cartList.find(item => item.checked === false) === undefined;

      }
    },
    methods: {
      checkBtnClick: function () {
        // 1.判断是否有未选中的按钮,找出没有勾选的那一项
        let isSelectAll = this.cartList.find(item => !item.checked);
        console.log('isSelectAll----click',isSelectAll)
        console.log('cartLit',this.cartList)
        // // 2.有未选中的内容, 则全部选中
        if (isSelectAll) {
          this.cartList.forEach(item => {
            item.checked = true;
          });
        } else {
          this.cartList.forEach(item => {
            item.checked = false;
          });
        }
      }
    }
	}
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
