<template>
  <div class="photoinfo-container">
    <h3>{{photoinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间：{{photoinfo.add_time|dateFormat}}</span>
      <span>点击：{{photoinfo.click}}次</span>
    </p>

    <hr />

    <!-- 缩略图区域 -->
    <vue-preview
      :list="list" 
      :thumbImageStyle="{width: '80px', height: '80px', margin: '10px'}"
      :previewBoxStyle="{border: '0 solid #eee'}"
      :tapToClose="true"
      @close="closeHandler"
      @destroy="destroyHandler"
    />
    <!-- 内容 -->
    <div class="content" v-html="photoinfo.content"></div>
    <!--评论子组件 -->
    <comment-box :id="id"></comment-box>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import comment from "../subcomponents/Comment.vue";
export default {
  data() {
    return {
      id: this.$route.params.id, //从路由中获取到的图片id
      photoinfo: {} ,//图片详情
      list: [
        // {
        //   src: 'https://placekitten.com/600/400',
        //   w: 600,
        //   h: 600
        // },
        // {
        //   src: 'https://placekitten.com/1200/900',
        //   w: 1200,
        //   h: 900
        // }
      ],
    };
  },
  created() {
    this.getPhotoInfo();
    this.getThumbs();
  },
  methods: {
    getPhotoInfo() {
      //获取图片详情
      this.$http
        .get("api/getimageInfo/" + this.id)
        .then(result => {
          if (result.status === 200) {
            this.photoinfo = result.body;
          }
        })
        .catch(err => {
          Toast("获取图片详情失败");
        });
    },
    getThumbs(){
        this.$http.get("api/getthumimages/"+this.id).then((result) => {
            if(result.status === 200){
                //循环每个略缩图数据，补全图片的宽和高
                result.body.forEach(item=>{
                    item.w = 600
                    item.h = 400
                })
                this.list = result.body
            }
        }).catch((err) => {
            
        });
    },
    // 即将关闭的时候，调用这个处理函数
    closeHandler() {
      console.log('closeHandler')
    },
    // 完全关闭之后，调用这个函数清理资源
    destroyHandler() {
      console.log('destroyHandler')
    }
  },
  components: {
    //注册子组件的节点
    "comment-box": comment
  }
};
</script>
<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #0026a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
}
</style>