<template>
    <div>
       <mt-swipe :auto="4000">
      <!-- 在组件中使用v-for循环一定要使用key -->
       <!-- 谁使用此轮播图，谁传递此lunbotuList -->
       <!-- 此时，lunbotuList 应该是父组件向子组件传值来设置 -->
        <mt-swipe-item v-for="item in lunbotuList" :key="item.img">
          <a :href="item.url">
              <!-- 通过外部传参来控制属性用:class -->
          <img :src="item.img" alt="" :class="{full:isfull}">
          </a>
        </mt-swipe-item>
      <!-- <mt-swipe-item>2</mt-swipe-item>
      <mt-swipe-item>3</mt-swipe-item> -->
    </mt-swipe>
    </div>
    <!-- 分析为什么商品评论中的轮播图那么丑 -->
    <!-- 1.首页中的图片宽和高都是100% -->
    <!-- 2.在商品详情页面中，轮播图的图片，如果也使用宽高100%页面就不好看 -->
    <!-- 3.商品详情中的页面，期望高度是100%，但是宽度为自适应 -->
    <!-- 4.经过分析，得到问题的原因，首页中的轮播图和详情中轮播图分歧点是宽度 -->
    <!-- 5.既然这两个轮播图只是宽度有分歧，那么可以定义一个属性，让轮播图的调用者手动指定是否为100%宽度 -->

</template>
<script>
export default {
    props: ["lunbotuList","isfull"]
}
</script>
<style lang="scss" scoped>
.mint-swipe {
  height: 230px;// 适应iphone6
  .mint-swipe-item {
      text-align: center;//图片居中
    // &:nth-child(1) {
    //   background-color: red;
    // }
    // &:nth-child(2) {
    //   background-color: blue;
    // }
    // &:nth-child(3) {
    //   background-color: black;
    // }
    img{
        height:100%
    }
  }
}
.full{
    width:100%
}
</style>