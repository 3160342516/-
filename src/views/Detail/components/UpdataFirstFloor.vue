<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar
      class="navbar"
      :title="`${floorlist.reply_count}条评论`"
      left-arrow
      @click-left="setisfool"
    />

    <!-- 评论 -->
    <van-cell :title="floorlist.aut_name">
      <!-- 左侧头像 -->
      <template #icon>
        <van-image
          round
          width="1rem"
          height="1rem"
          :src="floorlist.aut_photo"
        />
      </template>
      <!-- 右侧点赞图标 -->
      <template #default>
        <van-icon name="good-job-o" />
        赞
      </template>
      <!-- 下方描述信息 -->
      <template #label>
        <div>
          <p>{{ floorlist.content }}</p>
          <p class="discuss-pubdate">
            <span>{{ floorlist | label }}</span>
            <van-button type="default" size="mini" round
              >回复{{ floorlist.reply_count }}</van-button
            >
          </p>
        </div>
      </template>
    </van-cell>
    <!-- 分割线 -->
    <van-divider>全部回复</van-divider>
    <!-- 评论的回复 -->
    <van-list
      v-model="loading"
      :finished="finished"
      immediate-check
      finished-text="没有更多了"
      @load="getComments"
    >
      <van-cell v-for="item in list" :key="item.con_id" :title="item.aut_name">
        <!-- 左侧头像 -->
        <template #icon>
          <van-image round width="1rem" height="1rem" :src="item.aut_photo" />
        </template>
        <!-- 右侧点赞图标 -->
        <template #default>
          <van-icon name="good-job-o" />
          赞
        </template>
        <!-- 下方描述信息 -->
        <template #label>
          <div>
            <p>{{ item.content }}</p>
            <p class="discuss-pubdate">
              <span>{{ item | label }}</span>
              <van-button type="default" size="mini" round
                >回复{{ item.reply_count }}</van-button
              >
            </p>
          </div>
        </template>
      </van-cell>
    </van-list>
    <!-- 回复按钮 -->
    <van-button type="default" class="floor-btn" @click="ishow = true"
      >发布评论</van-button
    >

    <!-- 回复框 -->
    <van-popup
      class="floor-popup"
      v-model="ishow"
      position="bottom"
      :style="{ height: '15%' }"
    >
      <updata-popup v-if="ishow"></updata-popup>
    </van-popup>
  </div>
</template>

<script>
import UpdataPopup from './UpdataPopup'
import { getCommentsAPI, ToSendCommentsAPI } from '@/api'
import dayjs from 'dayjs'
export default {
  components: { UpdataPopup },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      ishow: false
    }
  },
  props: {
    floorlist: {
      Path: Object,
      require: true
    }
  },
  created() {
    console.log(this.floorlist)
  },
  methods: {
    /* 获取评论的回复 */
    async getComments() {
      try {
        const type = 'c'
        const source = this.floorlist.com_id
        const { data } = await getCommentsAPI(type, source, this.offset)
        if (data.data.results.length < 10) {
          this.finished = true
          this.loading = false
        }
        this.list.push(...data.data.results)
        this.offset = data.data.last_id
      } catch (error) {}
    },
    /* 对评论回复 */
    async ToSendComments() {
      await ToSendCommentsAPI()
    },
    setisfool() {
      this.$emit('setisfool')
    }
  },
  filters: {
    label(val) {
      const { pubdate } = val
      return `${dayjs(pubdate).fromNow()}`
    }
  },
  watch: {
    ispopup() {
      if (this.ispopup === false) {
        this.$emit('pike', this.popup)
      }
    }
  }
}
</script>

<style scoped lang="less">
:deep(.navbar) {
  background-color: #fff !important;
  .van-ellipsis {
    color: unset !important;
  }
  .van-nav-bar__arrow {
    color: unset !important;
  }
}

.discuss-pubdate {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .span {
    margin-right: 10px !important;
  }
  .van-button {
    width: 2rem;
  }
}
.van-image {
  margin-right: 20px;
}
:deep(.floor-btn) {
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  color: #666;
  width: 100%;
}
.floor-popup {
  padding: 0.42667rem 0 0.42667rem 0.42667rem;
}
</style>
