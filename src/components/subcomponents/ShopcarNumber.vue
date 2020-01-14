<template>
  <!-- 问题： 我们不知道什么时候能够拿到max值，但是总归有一刻，会得到一个真正的max值 -->
  <!-- 我们可以使用watch 属性监听，来监听父组件传递过来的max值，不管watch被触发几次，
  但是最后一次肯定是一个合法的max数据-->
  <div class="mui-numbox" data-numbox-min="1" data-numbox-step="1" style="height:25px">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      :value="initcount"
      @change="countChanged"
      ref="numbox"
      readonly
    />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
  <!-- 子组件什么时候把数字传给父组件 -->
</template>
<script>
import mui from "../../lib/mui/js/mui.min.js";

export default {
  mounted() {
    mui(".mui-numbox").numbox();
  },
  methods: {
    countChanged() {
      console.log(this.$refs.numbox.value);
      //每当数量值改变，则立即把最新的数量同步到购物车的store中，覆盖之前的数据值
      this.$store.commit("updateGoodsInfo",{id:this.goodsid,count:this.$refs.numbox.value});
    }
  },
  props:['initcount','goodsid']
};
</script>
<style lang="scss" scoped>
</style>