<template>
  <div class="goodsinfo-container">
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
        <div class="ball" v-show="ballFlag" ref="ball"></div>
      </transition>
    <!-- 商品轮播图 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <!-- 自己封装的轮播图组件 -->
          <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
        </div>
      </div>
    </div>
    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>¥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;
            销售价：
            <span class="now_price">¥{{goodsinfo.sell_price}}</span>
          </p>
          <!-- <div class="mui-numbox-zm"> -->
            <p>购买数量：<numberbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numberbox></p>
          <!-- </div> -->

          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar()">加入购物车</mt-button>
            <!-- 分析：如何实现加入购物车时候，拿到选择的数量 -->
            <!-- 1,经过分析发现：按钮属于goodsinfo页面，数字属于 numberbox组件-->
            <!-- 2，由于涉及到了父子组件的嵌套了，所以，无法直接在goodsinfo 页面中获取到选中的商品数量值 -->
            <!-- 3,怎么解决这个问题 ，涉及到了子组件向副组件传值了(事件调用机制)-->
            <!-- 4，事件调用的本质：父向子传递方法，子调用这个方法，同时把数据当作参数，传递给这个方法 -->
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{goodsinfo.goods_no}}</p>
          <p>库存情况：{{goodsinfo.stock_quantity}}件</p>
          <p>上架时间：{{goodsinfo.add_time}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import swiper from "../subcomponents/Swiper.vue";
import numberbox from "../subcomponents/GoodsNumber.vue"
export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotu: [],
      goodsinfo: {},
      ballFlag: false,//小球标识符
      selectedCount:1,//保存用户选中的商品数量，默认为1
    };
  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
  },
 
  methods: {
    getLunbotu() {
      this.$http
        .get("api/getthumimages/" + this.id)
        .then(result => {
          if (result.status === 200) {
            //轮播图中属性都固定了，得修改数据源
            result.body.forEach(element => {
              element.img = element.src;
            });
            this.lunbotu = result.body;
          }
        })
        .catch(err => {
          Toast("获取商品轮播图失败");
        });
    },
    getGoodsInfo() {
      this.$http
        .get("api/goods/getinfo/" + this.id)
        .then(result => {
          if (result.status === 200) {
            this.goodsinfo = result.body[0];
          }
        })
        .catch(err => {
          Toast("获取商品详情失败");
        });
    },
    goDesc(id) {
      //点击使用编程式导航跳转到 图文介绍页面
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    goComment(id) {
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    addToShopCar(){
        //添加购物车
        this.ballFlag=!this.ballFlag;
    },
    beforeEnter(el){
        //小球起点
        el.style.transform= "translate(0,0)"
    },
    enter(el,done){
        el.offsetWidth;
        //小球动画优化思路
        //1 先分析导致 动画不准确的本质原因：我们把小球最终唯一到的位置，
        //已经限定了在同一分辨率下，滚动条未滚动的情况下
        //因为位移的横纵坐标不能写死，应该能根据不同情况动态计算坐标值
        //如何动态：先得到徽标的横纵坐标，再得到小球的横纵坐标
        //然后让y值求差，x值也求差，得到的结果，就是横纵坐标位移的距离
        //如何获取徽标和小球的位置？？？domObject.getBoundingClientRect()
        //获取小球的位置
        const ballPosition = this.$refs.ball.getBoundingClientRect();
        //获取徽标的位置
        const badgePosition = document.getElementById('badge').getBoundingClientRect();

        const xDist = badgePosition.left - ballPosition.left;
        const yDist = badgePosition.top - ballPosition.top;



        el.style.transform=`translate(${xDist}px,${yDist}px)`;
        el.style.transition = 'all 0.5s cubic-bezier(.4,-0.3,.1,.68)';
        done()

    },
    afterEnter(el){
        this.ballFlag =!this.ballFlag
        // this.addToShopCar()
    },
    getSelectedCount(count){
        //当子组件把选中的数量传递给父组件方法时，绑定到data身上
        this.selectedCount = count;
        console.log('父组件拿到的数值：'+ this.selectedCount);
    }
  },
  components: {
    swiper,
    numberbox
  }
};
</script>
<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden; //取消margin
  .now_price {
    color: red;
    font-size: 10px;
    font-weight: bold;
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 10px 0;
    }
  }
//   .mui-numbox-zm {
//     display: flex;
//     margin: 10px 0;
//     line-height: 35px; //设置行间的距离（行高）
//   }
  .ball{
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: red;
      position: absolute;//定位小球就不会挤下面页面
      z-index: 99;
      top:421px;
      left:147px;
      transform: translate(90px,201px)

  }
}
</style>