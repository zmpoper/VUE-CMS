<template>
    <div class="newsinfo-container">
        <h3 class="title">{{newsinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{newsinfo.add_time|dateFormat}}</span>
            <span>点击：{{newsinfo.click}}次</span>
        </p>
        <hr>
        <!-- 内容区域 -->
        <div class="content" v-html="newsinfo.content"></div>

        <!-- 评论组件区域 -->
        <comment-box :id="this.id"></comment-box>



    </div>
</template>
<script>
//1，导入评论组件
import comment from '../subcomponents/Comment.vue'
export default {
    data () {
        return {
            id: this.$route.params.id,//将url地址中传递过来的id值，挂载到data上方便以后调用
            newsinfo: {}
        }
    },
    created () {
      this.getNewsInfo()  
    },
    methods: {
        getNewsInfo(){
            this.$http.get('api/getnewsinfo/'+this.id).then((result) => {
                if(result.status===200){
                    this.newsinfo = result.body
                }
            }).catch((err) => {
                
            });
        }
    },
    components:{//用阿里注册子组件的节点
      "comment-box": comment

    }
}
</script>
<style lang="scss" scoped>
.newsinfo-container{
    padding: 0 4px;//上下无间距，左右留有间距
    .title{
        font-size: 16px;
        text-align: center;//居中
        margin:10px 0;//上下距离15，左右零
        color:red;

    }
    .subtitle{
        font-size: 13px;
        color: #226aff;
        display: flex;//左右对齐
        justify-content: space-between;//左右对齐

    }
    .content{
        img{
            width: 100%
        }
    }
}

</style>