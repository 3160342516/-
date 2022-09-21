<template>
  <div>
    <van-picker
      title="更新性别"
      show-toolbar
      :columns="ingender"
      @cancel="$emit('ifgender')"
      @confirm="upgender"
      :default-index="index"
      ref="picker"
    />
  </div>
</template>

<script>
import { upPersonageNformation } from '@/api'
export default {
  props: {
    gender: {
      type: Number,
      require: true
    }
  },
  data() {
    return {
      ingender: ['男', '女'],
      index: 1
    }
  },
  created() {},
  methods: {
    async upgender() {
      this.$toast.loading()
      try {
        const br = this.$refs.picker.getValues()
        const gender = br[0] === '男' ? 0 : 1
        await upPersonageNformation({
          gender
        })
        this.$toast.success('成功')
        this.$emit('ifgender')
        this.$emit('pdate')
      } catch (error) {
        this.$toast.fail('失败')
      }
    }
  }
}
</script>

<style></style>
