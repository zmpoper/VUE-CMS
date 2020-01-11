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
1. 为加载更多按钮，绑定点击事件，在事件中，请求 下一页数据
2. 点击加载更多，让pageindex++，然后重新调用this.getComments()方法重新获取数据
3. 为了防止新数据覆盖老数据的情况，我们在点击加载更多的时候，每当获取到新数据，应该让
老数据调用数组的conact方法，拼接上新数组

## 发表评论
1. 把文本框做双向数据绑定
2. 为发表按钮绑定一个事件
3. 校验评论内容是否为空，如果为空，可以用Toast弹框
4. 通过 vue-resource 发送一个请求，把评论内容提交给服务器
5. 当发表评论后，刷新显示最新的评论
  + 如果调用getComments 方法重新刷新评论列表的话，可能只能得到最后一页的评论，前几页的评论获取不到
  + 换一种思路：当评论成功后，在客户端，手动拼接出一个最新的评论对象，然后调用数组的unshift方法，把
  最新的评论，追加到data中comments 的开头，这样就能完美实现刷新评论列表的需求


## 改造图片分析 按钮为 路由的链接并显示赌赢的组件页面

## 绘制 图片列表 组件页面结构并美化样式
1. 制作顶部滑动条
2. 制作 底部的图片列表
### 制作顶部滑动条的坑们：
1. 需要借助于MUI 中的tab-top-webview-main.html
2. 需要把slider区域的 mui-fullscreen 类去掉
3. 滑动条无法正常触发滑动，通过检查官方文档，发现这是JS组件，需要被初始化一下
 + 导入mui.js
 + 调用官方提供的方式 去初始化
 ```
   mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
``` 
4. 我们在初始化 滑动条的时候，导入了mui.js 但是 控制台报错
```
    Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
```
  + 经过我们合理的推测，觉得 可能是mui.js 中用到了 'caller', 'callee',and
    arguments 东西，但是webpack 打包好的 bundle.js 中， 默认是启用严格模式的，
    所以，这两者冲突了
  +  解决方案： 1. 把mui.js 中的 非严格 模式的代码改掉，但是不现实。2. 把webpack
     打包时候的严格模式禁用掉
     [babel-plugin-transform-remove-strict-mode](https://github.com/genify/babel-plugin-transform-remove-strict-mode)

  +  [去除谷歌浏览器滑动警告，使其滑动更为流畅](https://developer.mozilla.org/zh-CN/docs/Web/CSS/touch-action)

5. 刚进入图片分享页面，滑动条无法正常工作，经过分析，如果要初始化，滑动条，必须等DOM加载完毕
   + 解决方法： 将初始化滑动的代码，搬到mounted生命周期函数中
6. 当滑动条 调试ok后，发现tabbar 无法正常工作了，这时候 我们需要把每个tabbar按钮
的样式中 mui-tab-item 重新改一下名字
7. 获取所有分类，并渲染分类列表：
### 制作图片列表区域
1. 图片列表需要使用懒加载技术，我们可以使用Mint-UI提供的现成的组件'lazy-load'
2. 根据'lazy-load'的使用文档，尝试使用
3. 渲染图片列表数据

### 实现了图片列表的 懒加载改造和样式美化

## 实现了点击图片 跳转到 图片详情页面
1. 在改造li成router-link的时候，需要使用tag属性指定要渲染为哪种元素

## 实现 详情页面的布局和美化，同时获取数据渲染页面

## 实现 图片详情中 略缩图的功能
1. 使用 插件 vue-preview 这个略缩图插件
2. 获取到所有图片的列表，然后使用v-for指令渲染数据