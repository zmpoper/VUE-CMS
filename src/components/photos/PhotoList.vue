<template>
  <div>
    <!-- 顶部滑动栏 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item',item.id==0 ? 'mui-active':'']"
            v-for="item in categorylist"
            :key="item.id"
            @click="getPhotoListByCateId(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>
    <!-- 图片列表区域 -->
    <ul class="photo-list">
        <!-- 指定渲染成li加tag -->
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
        <img v-lazy="item.img_url" />
            <div class="info">
                <h1 class="info-title">{{item.title}}</h1>
                <div class="info-body">{{item.zhaiyao}}</div>
            </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
import mui from "../../lib/mui/js/mui.min.js";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      categorylist: [], //所有分类的列表数组
      list: [] //图片列表的数组
    };
  },
  mounted() {
    //当组件中的DOM结构被渲染好，并放到页面中后，会执行这个钩子函数
    // 2. 初始化滑动控件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  created() {
    this.getAllCategory();
    //默认进去页面，就主动请求，所有图片
    this.getPhotoListByCateId(0);
  },
  methods: {
    getAllCategory() {
      this.$http
        .get("api/getimgcategory")
        .then(result => {
          if (result.status === 200) {
            result.body.unshift({ title: "全部", id: 0 });
            this.categorylist = result.body;
          }
        })
        .catch(err => {
          Toast("获取分类失败");
        });
    },
    getPhotoListByCateId(cateId) {
      // 根据分类id，获取图片列表
      this.$http
        .get("api/getimage/" + cateId)
        .then(result => {
          if (result.status === 200) {
            this.list = result.body;
          }
        })
        .catch(err => {
          Toast("获取图片失败");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  touch-action: pan-y; //该样式用于谷歌浏览器解决滑动时出现的警告
}

.photo-list {
    list-style:none;//去除小圆点
    margin: 0;
    padding: 10px;//左右留白
    padding-bottom: 0;//最底部不用照片之间留白
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;//照片之间留白
    box-shadow: 0 0 9px #999;//图片阴影
    position: relative;//为了让标题文字盖在图片上
    img{
        width: 100%;//图片100%
        vertical-align: middle;//控制图片与底色对齐
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info{
        color: white;
        text-align: left;//居左对齐
        position:absolute;//让标题文字盖在图片上
        bottom: 0;//让标题文字盖在图片上
        background-color: rgba(0,0,0,0.4);//透明度
        max-height: 84px;
        .info-title{
            font-size: 14px;
        }
        .info-body{
            font-size: 13px;
        }

    }
  }
}
</style>