<template>
    <div class="shopcar-container">
        <div class="goods-list">
            <!-- 商品列表项区域 -->
            <div class="mui-card" v-for="(item,i) in goodsList" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch 
                            v-model="$store.getters.getGoodsSelected[item.id]"
                            @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thum_path" alt="">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">${{item.sell_price}}</span>
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <!-- 问题：如何从购物车中获取商品的数量 -->
                                <!-- 1，我们可以先创建一个空对象，然后循环购物车中所有商品的数据，把当前循环
                                这条商品的ID，作为 对象的属性名，count 值作为对象的属性值，当把所有的商品
                                循环一边，就会得到一个对象{88:2,89:1,90:4}-->
                                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                            </p>
                        </div>
					</div>
				</div>
			</div>
            <!-- 结算区域 -->
            <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
                            <p>总计（不含运费）</p>
                            <p>已勾选商品 <span class="red">{{$store.getters.getGoodsNum.num}}</span> 件，总价 <span class="red">¥{{$store.getters.getGoodsNum.totamt}}</span></p>
                        </div>
                        <mt-button type="danger">去结算</mt-button>
					</div>
                    
				</div>
			</div>
        </div>
    </div>
</template>


<script>
import numbox from "../subcomponents/ShopcarNumber.vue"
import {Toast} from "mint-ui"
export default {
    data () {
        return {
            goodsList:[]
        }
    },
    created () {
        this.getGoodsList()   
    },
    methods: {
        getGoodsList() {
            //获取到store中所有商品的id，拼接出一个字符串
            var idArr = []
            this.$store.state.car.forEach(item => idArr.push(item.id));
            //如果，购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
            if(idArr.length<=0){
                return;
            }
            this.$http.get('api/goods/getshopcarlist/'+idArr.join(",")).then((result) => {
                // this.$http.get('api/goods/getshopcarlist').then((result) => {
                if(result.status ===200){
                    this.goodsList = result.body;
                }
            }).catch((err) => {
                Toast("获取购物车商品信息失败")
            });
        },
        remove(id,index){
            //点击删除，把商品从store中根据传递的id删除，同时，把当前组件中的goodslist中
            //对应要删除的那个商品，使用index来删除
            this.goodsList.splice(index,1);
            this.$store.commit("removeFromCar",id);
        },
        selectedChanged(id,val){
            //每当点击开关，把最新的开关状态，同步到store中
            console.log(id+'------'+val)
            this.$store.commit("updateGoodsSelected",{id,selected:val});
        }
    },
    components:{
        numbox
    }
}

</script>

<style lang="scss" scoped>

.shopcar-container{
    background-color: #eee;
    overflow: hidden;//属性规定当内容溢出元素框时发生的事情。
    .goods-list{
        .mui-card-content-inner{
            display: flex;//横向布局
            align-items: center;//居中
        }
        img{
            width: 60px;
            height:60px;
        }
        h1{
            font-size: 13px;
            margin: 5px;
        
        }
        p{
            margin:5px;
        }
        .info{
            
            .price{
                color: red;font-weight: bold;
            }
        }
    }   
    .jiesuan{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .red{
            color:red;
            font-weight: bold;
            font-size: 16px;
        }
    }
}

</style>