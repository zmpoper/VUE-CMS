<template>
  <div class="app-container">
    <!-- 顶部header区域 -->
    <mt-header fixed title="不要担心我">
          <mt-button icon="back" slot="left" @click="handleClose">返回</mt-button>
    </mt-header>
    

    <!-- 中间的路由 router-view--->
	<transition >
    <router-view></router-view>
	</transition>

    <!-- 底部Tabbar区域 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-zm" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-zm" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item-zm" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge">0</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item-zm" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>
<script>
//按需导入Toast组件
export default {
  data () {
    return {
      
    }
  },
  methods: {
   handleClose(){
     this.$router.go(-1);//后退
   }
  }
}
</script>
// node-sass@^4.0.0 
// fibers@>= 3.1.0

<style lang="scss" scoped>
.mint-header{
	z-index: 99;//防止上下滑动时盖住顶部标题 z-index 属性设置元素的堆叠顺序。拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面。
}
.app-container {
  padding-top: 40px;//解决数据不会被顶部遮住
  padding-bottom: 50px;//解决底部数据会被底部遮住
  overflow-x: hidden;//解决页面切换时的问题header和taber会暂时错乱
}

.v-enter{
	opacity: 0;
	transform: translateX(100%);
}
.v-leave-to{
	opacity: 0;
	transform: translateX(-100%);
	position: absolute;//解决页面切换时上下漂的问题
}
.v-enter-active,
.v-leave-active{
	transition: all 0.5s ease
}
//改类名解决滑动和tabbar冲突，导致tabbar无法切换 begin
.mui-bar-tab .mui-tab-item-zm.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-zm {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-zm .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-zm .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
//end
</style>