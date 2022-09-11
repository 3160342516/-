<template>
  <div>
    <!-- 没有 -->
    <van-cell
      v-if="article.cover.type === 0"
      :title="article.title"
      :label="label"
    />
    <!-- 一张 -->
    <van-cell
      v-else-if="article.cover.type === 1"
      :title="article.title"
      :label="label"
    />
    <!-- 三张 -->
    <van-cell v-else title="三张">
      <template #label>
        <van-image
          v-for="(item, index) in article.cover.images"
          :key="index"
          width="100"
          height="100"
          :src="item"
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    label() {
      const { aut_name, comm_count, pubdata } = this.article
      return `${aut_name} ${comm_count}评论 ${pubdata}`
    }
  }
}
</script>

<style></style>
