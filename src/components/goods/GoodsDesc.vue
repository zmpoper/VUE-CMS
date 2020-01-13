<template>
  <div class="goodsdesc-container">
      <h3>{{info.title}}</h3>
      <hr>
      <div class="content" v-html="info.content"></div>
  </div>
</template>

<script>
import {Toast} from "mint-ui"
export default{
    data () {
        return {
            info:{}//图文数据
        }
    },
    created () {
        this.getGoodsDesc()
    },
    methods: {
        getGoodsDesc(){
            this.$http.get('api/goods/getdesc/'+ this.$route.params.id).then((result) => {
                if(result.status === 200){
                    this.info = result.body
                }
            }).catch((err) => {
                Toast("获取商品图文介绍失败！") 
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.goodsdesc-container{
    padding: 4px;//不让文字贴边
    h3{
        font-size: 16px;
        color: #226aff;
        text-align: center;
        margin: 15px 0;//让标题上下有间隙
    }
    //如果有图片没有100%宽度，去掉scoped
    //.content{img{width:100%}}
}

</style>