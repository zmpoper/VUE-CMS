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
import {Header,Swipe, SwipeItem,Button,Lazyload} from 'mint-ui'
Vue.component(Header.name,Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button)
Vue.use(Lazyload)
//略缩图组件图片预览
import VuePreview from 'vue2-preview'
Vue.use(VuePreview)
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
    router  //1.4挂载路由对象 到 vm实例上
})