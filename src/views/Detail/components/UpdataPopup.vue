<template>
  <div class="popup">
    <div class="popup-message">
      <van-field
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      >
      </van-field>
      <van-button class="popup-release" @click="ToSendComments"
        >发布</van-button
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { ToSendCommentsAPI } from '@/api'
export default {
  props: {
    detailist: {
      path: Object,
      require: true
    }
  },
  require() {
    this.show = this.ishow
  },
  data() {
    return {
      message: '',
      ispopup: true
    }
  },
  computed: {
    ...mapState(['commentslist'])
  },
  created() {},
  methods: {
    ...mapMutations(['SET_COMMENTSLIST']),
    async ToSendComments() {
      const target = this.$route.params.articleID
      if (target === '') return this.$toast.fail('请输入评论内容')
      try {
        const content = this.message
        const {
          data: {
            data: { new_obj }
          }
        } = await ToSendCommentsAPI(target, content, target)
        this.SET_COMMENTSLIST([new_obj, ...this.commentslist])
        this.$toast.success('评论成功')
      } catch (error) {}
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
.van-popup {
  display: flex;
  align-items: center;
  padding: 0.42667rem 0 0.42667rem 0.42667rem;

  .popup-message {
    display: flex;
    align-items: center;
    width: 100%;
  }
  .popup-release {
    width: 2rem;
    border: none;
    padding: 0;
    color: #6ba3d8;
    margin-right: 25px;
  }
  .van-cell {
    background-color: #f5f7f9 !important;
  }
}
</style>
