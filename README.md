# 这是一个vue项目
## 制作首页App组件
1. 完成Header区域，使用的是Mint-UI中的Header组件
2. 制作底部的Tabbar区域，使用的是MUI的Tabbar.html
   + 在制作购物车 小图标的时候，操作会多一些
   + 先把 扩展图标的css样式拷贝到项目中
   + 拷贝 扩展字体库 ttf 文件，到项目中
   + 为购物车小图标，添加如下样式：mui-icon mui-icon-extra mui-icon-extra-cart
3. 要在中间区域放置一个router-view来展示路由匹配的组件

## 改造 tabbar 为 router-link

## 设置路由高亮

## 点击 tabbar 中的路由链接，展示对应的路由组件

## 制作首页轮播图

## 加载首页轮播数据
1. 获取数据，如何获取数据，使用vue-resource
2. 使用vue-resource 的 this.$http.get 获取数据
3. 获取到的数据，要保存到data身上
4. 使用v-for循环渲染每个item项

## 改造九宫格样式

## 改造 新闻咨询 路由链接

## 新闻资讯页面制作
1. 绘制界面，使用MUI中的media-list.html
2. 使用vue-resource 获取数据
3. 渲染真实数据


## 实现 新闻资讯列表 点击跳转到新闻详情
1. 把列表中的每一项改造为 router-link，同时 在跳转的时候应该提供唯一的ID标识符
2. 创建新闻详情的组件页面 NewsInfo.vue
3. 在路由模块中，将新闻详情的 路由地址 和组件页面对应起来


## 实现新闻详情的 页面布局

## 单独封装一个comment.vue 评论子组件
1. 先创建一个单独的comment.vue 组件模版
2. 在需要使用comment 组件的页面中，先手动导入comment组件
  + 'import comment from './comment.vue''
3. 在父组件中，使用'components'属性，将刚才导入的comment组件，注册为自己的子组件
4. 将注册子组件时候的，注册名称，以标签形式，在页面中 引用即可

## 获取所有的评论数据显示到页面中

## 实现点击加载更多评论的功能
1，为加载更多按钮，绑定点击事件，在事件中，请求 下一页数据
2，点击加载更多，让pageindex++，然后重新调用this.getComments()方法重新获取数据
3，为了防止新数据覆盖老数据的情况，我们在点击加载更多的时候，每当获取到新数据，应该让
老数据拼接新数据