<template>
  <div>
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        class="search"
        v-model="keywords"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        show-action
        @cancel="$router.push('/')"
        @search="onSearch"
        @focus="isShowSearchResult = false"
      />
    </form>

    <component
      :is="componnetName"
      :keywords="keywords"
      @change-keywords="onSearch"
    ></component>
    <!-- <search-history></search-history>
    <search-result></search-result>
    <search-suggestion></search-suggestion> -->
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
export default {
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  computed: {
    ...mapState(['histories']),
    componnetName() {
      if (this.keywords === '') return 'SearchHistory'
      if (this.isShowSearchResult) return 'SearchResult'
      return 'SearchSuggestion'
    }
  },
  methods: {
    ...mapMutations(['SET_HISTORIES']),
    onSearch(keywords) {
      const distinctHistories = [...new Set([keywords, ...this.histories])]
      this.SET_HISTORIES(distinctHistories)
      this.keywords = keywords
      this.isShowSearchResult = true
    }
  }
}
</script>

<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
