<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      immediate-check
      finished-text="没有更多了"
      @load="getComments"
    >
      <van-cell
        v-for="(item, index) in commentslist"
        :key="index"
        :title="item.aut_name"
      >
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
              <van-button
                type="default"
                size="mini"
                round
                @click="isfirst(item)"
                >回复{{ item.reply_count }}</van-button
              >
            </p>
          </div>
        </template>
      </van-cell>
    </van-list>

    <!-- -------- -->
    <van-popup v-model="isfloor" position="bottom" :style="{ height: '100%' }">
      <updata-first-floor
        :floorlist="floorlist"
        @setisfool="setisfool"
      ></updata-first-floor>
    </van-popup>
  </div>
</template>

<script>
import UpdataFirstFloor from './UpdataFirstFloor.vue'
import { mapState, mapMutations } from 'vuex'
import dayjs from '@/utils/dayjs'
import { getCommentsAPI } from '@/api'
export default {
  components: { UpdataFirstFloor },
  props: {},
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      isfloor: false,
      offset: null,
      floorlist: {}
      //   commentslist: {}
    }
  },
  methods: {
    ...mapMutations(['SET_COMMENTSLIST']),
    async getComments() {
      /* 获取文章评论 */
      try {
        const type = 'a'
        const source = this.$route.params.articleID
        const { data } = await getCommentsAPI(type, source, this.offset)
        console.log(data.data)
        this.SET_COMMENTSLIST([...this.list, ...data.data.results])
        if (data.data.results.length < 10) {
          this.finished = true
          this.loading = false
        }
        this.offset = data.data.end_id
      } catch (error) {
        console.log(error)
      }
    },
    isfirst(item) {
      this.floorlist = item
      this.isfloor = true
    },
    setisfool() {
      this.isfloor = false
    }
  },
  computed: {
    ...mapState(['commentslist'])
  },
  filters: {
    label(val) {
      const { pubdate } = val
      return `${dayjs(pubdate).fromNow()}`
    }
  }
}
</script>

<style scoped lang="less">
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
</style>
