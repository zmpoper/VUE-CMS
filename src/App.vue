<template>
  <div class="app-container">
    <!-- 顶部header区域 -->
    <mt-header fixed title="不要担心我"></mt-header>
    

    <!-- 中间的路由 router-view--->
	<transition >
    <router-view></router-view>
	</transition>

    <!-- 底部Tabbar区域 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge">0</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>
<script>
//按需导入Toast组件
</script>
// node-sass@^4.0.0 
// fibers@>= 3.1.0

<style lang="scss" scoped>
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

</style>