import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import("../views/home/Home"); //路由懒加载
const Category = () => import("../views/category/Category");
const Cart = () => import("../views/cart/Cart");
const Profile = () => import("../views/profile/Profile");
const Detail = () => import("../views/detail/Detail");

//安装插件
Vue.use(VueRouter);

//创建路由对象
const routes = [
  {
    path: "",
    redirect: "/home",
    meta:{title:'首页'}
  },
  {
    path: "/home",
    component: Home,
    meta:{title:'首页'}
  },
  {
    path: "/category",
    component: Category,
    meta:{title:'分类'},
    beforeEnter: (to, from, next) => {

    }
  },
  {
    path: "/cart",
    component: Cart,
    meta:{title:'购物车'}
  },
  {
    path: "/profile",
    component: Profile,
    meta:{title:'我的'}
  },
  {
    path:"/detail/:iid",
    component: Detail,
    meta:{title:'商品详情页'}
  }
];
const router = new VueRouter({
  routes,
  mode: "history"
});

// 解决导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const VueRouterReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(to) {
  return VueRouterReplace.call(this, to).catch(err => err);
};


router.beforeEach((to, from, next) => {
  // if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  // else next()

  alert('router.beforeEach')
  next()

  // if(to.meta.title) {
  //   document.title = to.meta.title;    //在路由里面写入的meta里面的title字段
  // }
  // next();
})
router.afterEach((to, from) => {
  // ViewUI.LoadingBar.finish()  //用来结束loading标识
  // window.scrollTo(0, 0)   // 跳转到页面顶端
  // alert('router.afterEach')
})
//导出路由
export default router;
