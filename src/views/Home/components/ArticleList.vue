<template>
  <div class="article">
    <van-pull-refresh v-model="isLoading" @refresh="getNextPageArticle">
      <van-list
        v-model="loading"
        @load="getNextPageArticle"
        offset="100"
        :immediate-check="false"
        :finished="finished"
        :error.sync="error"
        error.text="出错的，点击刷新一下"
        finished-text="被榨干了"
      >
        <article-item
          v-for="item in articles"
          :key="item.art_id"
          :article="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<!-- 属性 -->
<!-- @load: 触底的时候触发load事件 -->
<!-- offset: 滚动条和底部距离多少的时候触发load事件, 默认值是300px -->
<!-- immediate-check: 初渲染的时候是否执行load事件, 默认值是true  -->
<!-- v-model="loading" -->
<!-- loading为true,load事件不会被触发 -->
<!-- loading为false的时候,load事件会被触发 -->
<!-- loading会在load事件执行后,被van-list组件自动设置为ture, 需要手动的改为false -->
<!-- finished:Boolean. false:load事件会被触发 true:load事件不会被出发了, 并且显示finished-text的文本 -->
<script>
import { getArticle } from '@/api'

import ArticleItem from './ArticleItem.vue'
export default {
  name: 'Article',
  components: { ArticleItem },
  props: {
    id: [String, Number]
  },
  data() {
    return {
      articles: [],
      loading: false,
      finished: false,
      error: false,
      isLoading: false,
      preTimestamp: ''
    }
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    async getFirstPageArticle() {
      try {
        const { data } = await getArticle(this.id, +new Date())
        this.articles = data.data.results
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    },
    async getNextPageArticle() {
      try {
        const { data } = await getArticle(this.id, this.preTimestamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }

        if (this.isLoading) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.article {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;
  //   &::-webkit-scrollbar {
  //     width: 8px;
  //     background-color: #36f9ea;
  //   }
  //   &::-webkit-scrollbar-thumb {
  //     background-color: #f579d3;
  //   }
}
</style>
