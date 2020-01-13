<template>
  <div>
    <!-- 轮播图 -->
    <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>
    <!-- 9宫格到6宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <!-- <span class="mui-icon mui-icon-home"></span> -->
          <!-- 用绝对路径才可以 -->
          <img src="images/briefcase.png" alt="" >
          <div class="mui-media-body">新闻咨询</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photo">
          <span class="mui-icon mui-icon-email">
            <span class="mui-badge">5</span>
          </span>
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <span class="mui-icon mui-icon-chatbubble"></span>
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon mui-icon-location"></span>
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon mui-icon-search"></span>
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon mui-icon-phone"></span>
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>


<script>
import { Toast } from "mint-ui";
import swiper from '../subcomponents/Swiper.vue'

export default {
  data() {
    return {
      lunbotuList: [] //保存轮播图的数组
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    getLunbotu() {
      //获取轮播图数据
      this.$http
        .get("api/getlunbo")
        .then(result => {
            console.log(result);
          if (result.status === 200) {
            this.lunbotuList = result.body;
          }
        })
        .catch(err => {
          console.log(err);
          
          Toast("加载轮播图失败");
        });
    }
  },
  components:{
    swiper
  }
};
</script>

<style lang="scss" scoped>


.mui-grid-view.mui-grid-9{
    background-color:white;
    border: 0;
    img{
        width: 60px;
        height: 60px;
    }

    .mui-media-body{
        font-size: 13px;
    }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border:0;
}
</style>