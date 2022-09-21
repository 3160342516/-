<template>
  <div>
    <van-nav-bar
      title="更改昵称"
      left-text="取消"
      right-text="保存"
      @click-left="$emit('ifname')"
      @click-right="upuser"
    />
    <van-field
      v-model="textname"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="起个名字吧"
      show-word-limit
      v-show="true"
    />
  </div>
</template>

<script>
import { upPersonageNformation } from '@/api'
export default {
  props: {
    value: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      ifname: false,
      textname: this.value
    }
  },
  methods: {
    loading() {
      this.$toast.loading({
        message: '保存中~',
        forbidClick: true,
        duration: 0
      })
    },
    async upuser() {
      this.loading()
      const textname = this.textname
      if (textname.length === 0) return this.$toast.success('请输入内容')
      try {
        await upPersonageNformation({
          name: textname
        })
        this.$toast.success('保存成功')
        this.$emit('ifname')
        this.$emit('pdate')
      } catch (error) {
        if (error.response && erroe.response.status === 400) {
          this.$toast.fail('保存失败，再试一次吧')
        } else {
          console.dir(error)
          this.$toast.clear()
        }
      }
    }
  }
}
</script>

<style></style>
