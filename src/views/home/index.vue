<!-- home -->
<template>
<div>
    <!-- <van-cell icon="success" v-for="item in list" :key="item" :title="item" /> -->

</div>
</template>

<script>
// 请求接口
import {getUserInfo} from '@/api/sign.js'
export default {
  components: {},
 
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
    
    },
    
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
