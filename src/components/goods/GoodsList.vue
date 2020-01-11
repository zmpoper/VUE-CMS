<template>
    <div class="goods-list">
        <div class="goods-item">
            <img src="https://placekitten.com/600/400" alt="">
            <h1 class="title">可爱的小猫禁止售卖！！！！！！</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥2199</span>
                    <span class="old">$2199</span>
                </p>
                <p class="sell">
                <span> 热卖中</span>
                <span> 剩余60件</span>
                </p>
            </div>
        </div>
        <div class="goods-item">
            <img src="https://placekitten.com/600/400" alt="">
            <h1 class="title">可爱的小猫禁止售卖！！！！！！！可爱的小猫禁止售卖！！！！！！！</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥2199</span>
                    <span class="old">$2199</span>
                </p>
                <p class="sell">
                <span> 热卖中</span>
                <span> 剩余60件</span>
                </p>
            </div>
        </div>
        <div class="goods-item">
            <img src="https://placekitten.com/600/400" alt="">
            <h1 class="title">可爱的小猫禁止售卖！！！！！！</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥2199</span>
                    <span class="old">$2199</span>
                </p>
                <p class="sell">
                <span> 热卖中</span>
                <span> 剩余60件</span>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
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