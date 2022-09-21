<!-- eslint-disable vue/no-unused-components -->
<template>
  <div>
    <!-- 头部导航栏 -->
    <van-nav-bar
      class="navbar"
      title="黑马头条"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="detail-box">
      <updata-the-article-details
        :details="detailist"
        @update="getAarticiles"
      ></updata-the-article-details>

      <!-- 评论模块 -->
      <updata-discuss :details="detailist"></updata-discuss>
    </div>
    <!-- 发布评论弹出层 -->

    <van-popup
      class="floor-popup"
      v-model="ishow"
      position="bottom"
      :style="{ height: '15%' }"
    >
      <updata-popup :detailist="detailist"></updata-popup>
    </van-popup>

    <!-- 底部导航栏 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="ishow = !ishow"
        >写评论</van-button
      >
      <van-icon name="comment-o" color="#777" />
      <van-icon v-if="istar" color="#777" name="star-o" @click="collections" />
      <van-icon v-else color="#ff9632" name="star" @click="cancelColleCtions" />
      <van-icon color="#777" name="good-job-o" />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
  </div>
</template>

<script>
import UpdataTheArticleDetails from './components/UpdataTheArticleDetails.vue'
import UpdataPopup from './components/UpdataPopup.vue'
import UpdataDiscuss from './components/UpdataDiscuss.vue'
import { getAarticilesAPI, collectionsAPI, cancelColleCtionsAPI } from '@/api'
export default {
  name: 'detail',
  components: { UpdataTheArticleDetails, UpdataPopup, UpdataDiscuss },
  props: {
    articleID: {
      path: [Number, String],
      require: true
    }
  },
  data() {
    return {
      detailist: {},
      istar: false,
      ishow: false
    }
  },
  created() {
    this.getAarticiles()
  },
  methods: {
    /* 获取文章 */
    async getAarticiles() {
      try {
        const id = this.articleID
        const { data } = await getAarticilesAPI(id)
        // console.log(data)
        this.detailist = data.data
      } catch (error) {
        if (error.response.status === 404) {
          this.$toast.fail('文章不存在了~')
        } else {
          throw error
        }
      }
    },
    /* 点击收藏 */
    async collections() {
      try {
        const id = this.detailist.art_id
        await collectionsAPI(id)
        this.istar = !this.istar
      } catch {
        throw error
      }
    },
    /* 取消收藏 */
    async cancelColleCtions() {
      try {
        const id = this.detailist.art_id
        await cancelColleCtionsAPI(id)
        this.istar = !this.istar
      } catch {
        throw error
      }
    }
  }
}
</script>

<style scoped lang="less">
/* 动态 */
/* ----- */
.detail-box {
  height: calc(100vh - 1.22667rem - 1.17333rem);
  overflow: auto;
}
:deep(.navbar) {
  background-color: #3296fa;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.comments {
  width: 3.76rem;
  height: 0.61333rem;
  border: 0.02667rem solid #eee;
  font-size: 0.4rem;
  line-height: 0.61333rem;
  color: #a7a7a7;
}
.article-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 88px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .comment-btn {
    width: 282px;
    height: 46px;
    border: 2px solid #eeeeee;
    font-size: 30px;
    line-height: 46px;
    color: #a7a7a7;
  }
  .van-icon {
    font-size: 40px;
    .van-info {
      font-size: 16px;
      background-color: #e22829;
    }
  }
}
.popup {
  width: 100%;
}
.floor-popup {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.42667rem 0 0.42667rem 0.42667rem;
}
// display: flex;
// align-items: center;
// width: 100%;
// justify-content: center;
</style>
