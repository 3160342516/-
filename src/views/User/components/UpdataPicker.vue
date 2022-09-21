<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="upPicker"
      @cancel="$emit('picker')"
    />
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
import { upPersonageNformation } from '@/api'
export default {
  props: {
    birthday: {
      type: String,
      require: true
    }
  },
  created() {},
  data() {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2022, 9, 17),
      currentDate: new Date(this.birthday)
    }
  },
  methods: {
    async upPicker() {
      this.$toast.loading()
      try {
        const birthday = dayjs(this.currentDate).format('YYYY-MM-DD')
        await upPersonageNformation({
          birthday
        })
        this.$toast.success('成功')
        this.$emit('picker')
        this.$emit('pdate')
      } catch (error) {
        console.log(error)
        this.$toast.fail('失败')
      }
    }
  }
}
</script>

<style></style>
