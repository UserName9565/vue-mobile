<!-- home -->
<template>
  <div class="app-container">
    <div class="warpper">
      <h1 class="demo-home__title"><img src="https://imgs.solui.cn/weapp/logo.png" /><span>VUE H5开发模板</span></h1>
      <h2 class="demo-home__desc">
        A vue h5 template with Vant UI
      </h2>
    </div>
    <router-view :key="key" />
    <!-- <van-cell icon="success" v-for="item in list" :key="item" :title="item" /> -->
    <van-tabbar fixed v-model="active" @change="onChange">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="good-job-o">签字</van-tabbar-item>
      <van-tabbar-item icon="home-o">盖章</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// 请求接口
import {getUserInfo} from '@/api/user.js'
export default {
  components: {},
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  },
  data() {
    return {
      active: 0,
      list: [
        'Vue-cli4',
        'VantUI组件按需加载',
        'Sass',
        'Webpack 4',
        'Vue-router',
        'Vuex',
        'Axios封装',
        'rem适配方案',
        '多环境配置',
        '生产环境cdn优化首屏加速',
        'babel低版本浏览器兼容',
        'Eslint+Pettier统一开发规范'
      ]
    }
  },


  mounted() {
    this.initData()
  },

  methods: {
    // 请求数据案例
    initData() {
      // 请求接口数据，仅作为展示，需要配置src->config下环境文件
      getUserInfo()
        .then(() => {})
        .catch(() => {})
    },
    onChange(index) {
       if(index==0){
           this.$router.push('/')
       }else if(index==1){
         this.$router.push('/sign')
       }else if(index==2){
         this.$router.push('/signarure')
       }
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  .warpper {
    padding: 12px;
    .demo-home__title {
      margin: 0 0 6px;
      font-size: 32px;
      .demo-home__title img,
      .demo-home__title span {
        display: inline-block;
        vertical-align: middle;
      }
      img {
        width: 32px;
      }
      span {
        margin-left: 16px;
        font-weight: 500;
      }
    }
    .demo-home__desc {
      margin: 0 0 20px;
      color: rgba(69, 90, 100, 0.6);
      font-size: 14px;
    }
  }
}
</style>
