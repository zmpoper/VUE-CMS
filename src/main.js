//入口文件
import Vue from 'vue'
//1.1导入路由的包
import VueRouter from 'vue-router'
//1.2安装路由
Vue.use(VueRouter)

//定义全局的时间过滤器
import moment from 'moment'
Vue.filter('dateFormat',function (dataStr,pattern="YYYY-MM-DD HH:mm:ss") {
  return  moment(dataStr).format(pattern)
})

//2.1 导入 vue-resource
import VueResource from 'vue-resource'
//2.2 安装 vue-resource
Vue.use(VueResource)
//全局设置请求根路径
Vue.http.options.root='http://127.0.0.1:1337';
//全局设置post时候表单数据格式组织形式 application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;
//导入MUI的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
//按需导入Mint-UI中的组件
import {Header,Swipe, SwipeItem,Button,Lazyload,Switch} from 'mint-ui'
Vue.component(Header.name,Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button)
Vue.component(Switch.name, Switch)
Vue.use(Lazyload)
//略缩图组件图片预览
import VuePreview from 'vue2-preview'
Vue.use(VuePreview)
//导入Vuex
import Vuex from 'vuex'
Vue.use(Vuex)
//每次刚进入网站肯定会调用main,先从本地存储中，把购物车的数据读出来放到store中
var car = JSON.parse(localStorage.getItem('car')||'[]')
//new Vuex.Store() 实例，得到一个 数据仓库对象
var store = new Vuex.Store({
  state: {
    //大家可以把state想象成组件中的data，专门用来存储数据的
    car: car//将购物车中的商品的数据，用一个数组存储起来，在car数组中
    //存储一些商品的对象，可以设计成这样{id:商品的id,count:购买的数量，price:商品的单价，selected:是否选中}
  },
  mutations: {
    //注意：如果要操作store中的state值，只能通过调用mutations提供的方法，才能操作
    //对应的数据，不推荐直接操作state中的数据，因为万一导致了数据的混论，不能快速定位到
    //错误的原因，因为，每个组件都可能有操作数据的方法
    addToCar(state,goodsinfo){
      //点击加入购物车，将商品信息，保存到store中的car上
      //分析：
      //1，如果购物车中，之前就已经有这个对应的商品了，那么，只需要更新数量
      //2，如果没有，则直接把商品数据，push到car中即可
      var flag = false;
      state.car.some(item=>{
        if(item.id == goodsinfo.id){
          item.count+=parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })
      if(!flag){
        state.car.push(goodsinfo)
      }
      //当更新car之后，把car数组，存储到本地的localStorage中
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    updateGoodsInfo(state,goodsinfo){
      state.car.some(item=>{
        if(item.id==goodsinfo.id){
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      //当修改完商品的数量，把最新的购物车数据，保存到本地存储中
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    removeFromCar(state,id){
      //根据id，从store中的购物车中删除对应的那条商品数据
      state.car.some((item,i)=>{
        if(item.id==id){
          state.car.splice(i,1)
          return true;

        }
      })
      //将删除完毕后的最新的购物车数据，同步到本地存储中
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    updateGoodsSelected(state,info){
      state.car.some(item=>{
        if(item.id==info.id){
          item.selected = info.selected
        }
      })
      //把最新所有购物车的状态数据更新完，同步到本地存储中
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    //注意：如果组件想要调用mutations中的方法，只能使用this.$store.commit('方法名', payload)
    //这种调用mutations方法的格式，和this.$emit('父组件中方法名')
    //注意：mutations的函数参数列表中，最多支持两个参数，其中，参数1:是state状态；参数2:通过commit提交过来的参数
  },
  getters: {
    //只负责对外提供数据，不负责修改数据，如果要修改数据，去找mutations
      // optCount: function (state) {
      //   return '当前最新的count值是' + state.count

      // }
      //购物车徽标数字值
      getAllCount(state){
        var c = 0;
        state.car.forEach(element => {
           c+=element.count
          
        });
        return c
      },
      //numbox的数字
      getGoodsCount(state){
        var cou= {}
        state.car.forEach(item=>{
          cou[item.id] = item.count;
        })
        return cou;
      },
      //购物车勾选
      getGoodsSelected(state){
        var cou = {}
        state.car.forEach(item=>{
          cou[item.id] = item.selected
        })
        console.log(cou);
        return cou
      },
      //购物车总数量和金额
      getGoodsNum(state){
        var num=0;
        var totamt = 0;
        state.car.forEach(item=>{
          if(item.selected==true){
            totamt=totamt+ (item.price)*(item.count)
            num = num+item.count
          }
        })
       return {totamt,num} 
      }
      //getters中的方法，和组件中的过滤器比较类似，都是把数据做了一层包装
      //其次，getters也和 computed比较像，只要state中的数据发生变化了，那么，
      //如果getters正好也引用了这个数据，那么就会立即触发getters的重新求值
  }
})
//全部导入（非按需导入）begin
// import MintUI from 'mint-ui'
// Vue.use(MintUI)
// import 'mint-ui/lib/style.css'
//end



//1.3导入自己的router.js路由模块
import router from './router.js'
//导入App组件
import app from './App.vue'

var vm = new Vue({
    el:'#app',
    render:c=>c(app),
    router,  //1.4挂载路由对象 到 vm实例上
    store    //挂载store
})