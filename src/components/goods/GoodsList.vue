<template>
    <div class="goods-list">
        <!-- <router-link :to="'/home/goodsinfo/'+item.id" class="goods-item" 
        v-for="item in goodslist" :key="item.id" tag="div">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥{{item.sell_price}}</span>
                    <span class="old">${{item.market_price}}</span>
                </p>
                <p class="sell">
                <span> 热卖中</span>
                <span> 剩余{{item.stock_quantity}}件</span>
                </p>
            </div>
        </router-link> -->

        <!-- 在网页中有两种跳转方式 -->
        <!-- 方式1，使用a标签的形式 叫做标签跳转 -->
        <!-- 方式2，使用window.location.href的形式，叫做编程式导航 -->
        <div  class="goods-item" 
        v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥{{item.sell_price}}</span>
                    <span class="old">${{item.market_price}}</span>
                </p>
                <p class="sell">
                <span> 热卖中</span>
                <span> 剩余{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getMore()">加载</mt-button>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data () {
        return {
            pageindex:1,//分页的页数
            goodslist: []
        }
    },
    created () {
        this.getGoodsList()
    },
    methods: {
        getGoodsList(){
            this.$http.get("api/getgoodslist?pageindex="+this.pageindex).then((result) => {
               if(result.status ===200) {
                //    this.goodslist = result.body
                this.goodslist = this.goodslist.concat(result.body);
               }
            }).catch((err) => {
                Toast("获取商品列表失败")
            });
        },
        getMore(){
            this.pageindex++;
            this.getGoodsList();
        },
        goDetail(id){
            //不用router-link实现跳转
            //使用js形式进行路由导航
            //注意：一定要区分 this.$route 和this.$router 这两个对象
            //其中： this.$route是路由参数对象，所有路由中的参数，params,query都属于它
            //其中： this.$router是一个路由导航对象，用它可以方便的使用JS代码，实现路由的
            //前进，后退，跳转到新的URL地址
            //1 最简单的传递字符串
            // this.$router.push("/home/goodsinfo/" +id)
            //2 传递对象
            // this.$router.push({path:"/home/goodsinfo/"+id})
            //3 传递命名路由 注意这个name
            this.$router.push({name:"goodsinfo",params:{id}})


        }
    }
    
}
</script>
<style lang="scss" scoped>
.goods-list{
    display: flex;//左右布局
    flex-wrap: wrap;//换行
    padding: 7px;//每个左右都有留白
    justify-content: space-between;//挤两边，给中间留出间隔
    .goods-item{
        width: 49%;
        border: 1px solid #ccc;//每个都有边框
        box-shadow: 0 0 8px #ccc;
        margin: 3px 0;//上下留白，左右0
        padding: 2px;
        display: flex;
        flex-direction: column;//将flex主轴横向的改成纵向的
        justify-content: space-between;
        min-height: 177px;//默认最小高度，解决网速慢，图片会特别小的问题
        img{
            width: 100%;
        }
        .title{
            font-size: 14px;
        }
        .info{
            background-color: #eee;
            p{
                margin: 0;
                padding: 5px;

            }
            .price{
                .now{
                    color: red;
                    font-weight: bold;//加粗
                    font-size: 16px;

                }
                .old{
                    text-decoration: line-through;//价格划掉
                    font-size: 12px;
                    margin-left: 10px;//给左侧间距
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
                font-size: 13px;
            }
        }
    }
    
}

</style>