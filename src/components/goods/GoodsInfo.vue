<template>
    <div class="goodsinfo-container">
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
                            市场价：<del>¥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;
                            销售价：<span class="now_price">¥{{goodsinfo.sell_price}}</span>
                        </p>
                        <div class="mui-numbox-zm">
                        <p>购买数量：
                            <div class="mui-numbox" data-numbox-min='0' data-numbox-max='9'>
                                <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
                                <input id="test" class="mui-input-numbox" type="number" value="1" />
                                    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
                            </div>
                        </p>
                        </div>
                     
                        <p>
                            <mt-button type="primary" size="small">立即购买</mt-button>
                            <mt-button type="danger" size="small">加入购物车</mt-button>
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
                    <mt-button type="primary" size="large" plain>图文介绍</mt-button>
                    <mt-button type="danger" size="large" plain>商品评论</mt-button>
                </div>
		</div>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
import swiper from "../subcomponents/Swiper.vue"
export default {
    data () {
        return {
            id: this.$route.params.id,
            lunbotu: [],
            goodsinfo:{}
        }
    },
    created () {
        this.getLunbotu()
        this.getGoodsInfo()
    },
    methods: {
        getLunbotu(){
            this.$http.get("api/getthumimages/"+this.id).then((result) => {
                if(result.status === 200){
                    //轮播图中属性都固定了，得修改数据源
                    result.body.forEach(element => {
                        element.img= element.src
                        
                    });
                    this.lunbotu = result.body;
                }
            }).catch((err) => {
                Toast("获取商品轮播图失败")
            });
        },
        getGoodsInfo(){
            this.$http.get("api/goods/getinfo/"+this.id).then((result) => {
                if(result.status === 200){
                    this.goodsinfo = result.body[0]
                }
            }).catch((err) => {
                Toast("获取商品详情失败")
            });
        }
       
    },
    components:{
        swiper
    }
    
}
</script>
<style lang="scss" scoped>
.goodsinfo-container{
    background-color: #eee;
    overflow: hidden;//取消margin
    .now_price{
        color:red;
        font-size: 10px;
        font-weight:bold;

    }
    .mui-card-footer{
        display: block;
        button{
            margin: 10px 0;
        }
        
    }
    .mui-numbox-zm{
        display: flex;
        margin:10px 0;
        line-height:35px;//设置行间的距离（行高）

    }
    
}
</style>