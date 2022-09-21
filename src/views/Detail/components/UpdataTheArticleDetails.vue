<template>
  <div class="markdown-body">
    <!-- 头部 -->
    <h1 class="detail-title">{{ details.title }}</h1>
    <!-- 文章作者 -->
    <van-cell
      class="detail-cell"
      :title="details.aut_name"
      :label="details.pubdate"
    >
      <!-- 头像 -->
      <template #icon>
        <van-image
          class="detail-cell-img"
          round
          width="100"
          height="100"
          fit="cover"
          :src="details.aut_photo"
        />
      </template>
      <!-- 按钮 -->
      <template #right-icon>
        <van-button
          v-if="isbtn"
          round
          type="info"
          size="mini"
          @click="upfollowings"
          >+关注</van-button
        >
        <van-button
          v-else
          round
          type="info"
          size="mini"
          class="ysbtn"
          @click="CancelTheAttention"
          >已关注</van-button
        >
      </template>
    </van-cell>
    <!-- 文章详情 -->
    <div class="detail-text" v-html="details.content"></div>

    <!-- 分割线 -->
    <van-divider dashed>正文结束</van-divider>
  </div>
</template>

<script>
import { upfollowingsAPI, CancelTheAttentionAPI } from '@/api'
import 'github-markdown-css'
export default {
  props: {
    details: {
      path: Object,
      require: true
    }
  },
  data() {
    return {
      isbtn: true
    }
  },
  created() {
    this.isbtn = this.details.is_followed
  },
  methods: {
    /* 关注 */
    async upfollowings() {
      try {
        const id = this.details.aut_id
        await upfollowingsAPI(id)
        this.isbtn = false
      } catch (error) {
        this.$toast.fail('重试')
      }
    },
    /* 取关 */
    async CancelTheAttention() {
      try {
        const id = this.details.aut_id
        await CancelTheAttentionAPI(id)
        this.isbtn = true
      } catch (error) {
        this.$toast.fail('重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.detail-title {
  font-size: 0.53333rem;
  padding: 0.66667rem 0.42667rem;
  margin: 0;
  color: #3a3a3a;
}
.detail-cell {
  .detail-cell-img {
    margin-right: 10px;
    padding-top: 8px;
    width: 0.93333rem !important;
    height: 0.93333rem !important;
  }
  .van-button {
    margin-top: 0.35rem;
    width: 2.26667rem;
    height: 50px;
  }
}
.detail-text {
  padding: 0.73333rem 0.42667rem;
}
.ysbtn {
  color: #323233;
  background-color: #fff;
  border: 0.02667rem solid #ebedf0;
}
</style>
