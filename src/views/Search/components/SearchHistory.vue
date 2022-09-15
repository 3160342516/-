<template>
  <div>
    <!-- 标头 -->
    <van-cell title="搜索历史">
      <template #extra>
        <van-icon name="delete-o" v-if="!isEidt" @click="isEidt = true" />

        <div v-else>
          <span @click="$store.commit('SET_HISTORIES', [])">全部删除</span>
          &nbsp;
          <span @click="isEidt = false">完成</span>
        </div>
      </template>
    </van-cell>
    <!-- 搜索历史 -->
    <van-cell
      v-for="item in histories"
      :key="item"
      :title="item"
      @click="!isEidt && $emit('change-keywords', item)"
    >
      <template #extra>
        <van-icon
          name="close"
          v-show="isEidt"
          @click="
            $store.commit(
              'SET_HISTORIES',
              histories.filter((i) => item !== i)
            )
          "
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      isEidt: false
    }
  },
  computed: {
    ...mapState(['histories'])
  }
}
</script>

<style></style>
