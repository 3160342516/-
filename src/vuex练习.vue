<template>
  <div>
    <!-- <router-view></router-view> -->
    <h1>{{ count }}</h1>
    <h3>十倍为:{{ bigNum }}</h3>
    <button @click="SET_COUNT(10)">点击加十</button>
  </div>
</template>

<script>
// rem适配
// 1．让rem动起来
// - yarn add amfe-flexible
// 2.盒子使用rem
// 自动的识别css中px，并将其转成rem
// post-css css的预处理器
// - postcss 自己能干的事很少，下载插件
// 1. 下载 yarn add postcss-pxtorem
// 2. 告诉postcss，我要使用这个插件, -postcssrc js
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations(['SET_COUNT'])
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['bigNum'])
  }
}
</script>

<style scoped></style>
