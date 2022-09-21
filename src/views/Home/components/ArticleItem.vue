<template>
  <div>
    <!-- 没有 -->
    <van-cell
      v-if="article.cover.type === 0"
      :title="article.title"
      :label="label"
      :to="{
        name: 'detail',
        params: { articleID: article.art_id }
      }"
    />
    <!-- 一张 -->
    <van-cell
      v-else-if="article.cover.type === 1"
      :title="article.title"
      :label="label"
      :to="{
        name: 'detail',
        params: { articleID: article.art_id }
      }"
    />
    <!-- 三张 -->
    <van-cell
      v-else
      :title="article.title"
      :to="{
        name: 'detail',
        params: { articleID: article.art_id }
      }"
    >
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
import dayjs from '@/utils/dayjs'
export default {
  props: {
    article: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    label() {
      const { aut_name, comm_count, pubdate } = this.article
      return `${aut_name} ${comm_count}评论 ${dayjs(pubdate).fromNow()}`
    }
  }
}
</script>

<style></style>
