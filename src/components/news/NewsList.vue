<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
          <!-- 如果只是单纯的地址不需要单引号，也不需要绑定to(:to)，但是这里要用到拼接变量，所以加单引号，注意体会 -->
        <router-link :to="'/home/newsinfo/'+item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            <h1>{{item.title}}</h1>
            <p class="mui-ellipsis">
                <!-- todo 时间过滤|dateFormat -->
                <span>发表时间：{{item.add_time|dateFormat}}</span>
                <span>点击：{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
      <!-- <li class="mui-table-view-cell mui-media">
        <a href="javascript:;">
          <img class="mui-media-object mui-pull-left" src="images/muwu.jpg" />
          <div class="mui-media-body">
            <h1>木屋</h1>
            <p class="mui-ellipsis">想要这样一间小木屋，夏天挫冰吃瓜，冬天围炉取暖.</p>
          </div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media">
        <a href="javascript:;">
          <img class="mui-media-object mui-pull-left" src="images/cbd.jpg" />
          <div class="mui-media-body">
            <h1>CBD</h1>
            <p class="mui-ellipsis">烤炉模式的城，到黄昏，如同打翻的调色盘一般.</p>
          </div>
        </a>
      </li> -->
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
    data(){
        return{
            newslist: [] //新闻列表
        }
    },
    created () {
      this.getNewsList()  
    },
    methods: {
       getNewsList(){
           this.$http.get('api/getnewslist').then((result) => {
               //todo
             if (result.status === 200) {
                 this.newslist = result.body;
              }
           }).catch((err) => {
               Toast("获取新闻列表失败！");
           });
       }
    }
};
</script>
<style lang="scss" scoped>
.mui-table-view{
    li{
        h1{font-size:14px}
        .mui-ellipsis{
            font-size: 12px;
            color: #226aff;
            display: flex;
            justify-content: space-between;//两边对齐

        }
    }
}
</style>