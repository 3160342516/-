<template>
  <div>
    <!-- 个人信息导航条 -->
    <van-nav-bar
      class="navber"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!--  信息修改-->
    <!-- 头像 -->
    <input
      type="file"
      ref="file"
      hidden
      accept=" .png, .pdf , .jpg"
      @change="selectPhoto"
    />
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image round width="0.8rem" height="0.8rem" :src="avator" />
    </van-cell>
    <!-- 昵称 -->
    <van-cell title="昵称" :value="message.name" is-link @click="ifname = true">
    </van-cell>
    <!-- 性别 -->
    <van-cell
      title="性别"
      :value="gender[message.gender]"
      is-link
      @click="ifgender = true"
    >
    </van-cell>
    <!-- 生日 -->
    <van-cell
      title="生日"
      :value="message.birthday"
      is-link
      @click="ifbirthday = true"
    >
    </van-cell>

    <!-- 弹出层 -->
    <!-- 昵称 -->
    <van-popup
      position="bottom"
      :style="{ height: '100%' }"
      v-model="ifname"
      duration="0.3"
    >
      <updata-name
        @ifname="ifname = false"
        v-model="textname"
        @pdate="information"
      ></updata-name>
    </van-popup>
    <!-- 性别 -->
    <van-popup position="bottom" :style="{ height: '50%' }" v-model="ifgender">
      <updata-gender
        @ifgender="ifgender = false"
        :gender="+message.gender"
        @pdate="information"
      ></updata-gender>
    </van-popup>
    <!-- 生日 -->
    <van-popup
      position="bottom"
      :style="{ height: '50%' }"
      v-model="ifbirthday"
    >
      <updata-picker
        :birthday="message.birthday"
        @picker="ifbirthday = false"
        @pdate="information"
      ></updata-picker>
    </van-popup>
    <!-- 头像 -->
    <van-popup
      v-model="isShowPhoto"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <updata-avator
        v-if="isShowPhoto"
        :avator.sync="avator"
        :photo="photo"
      ></updata-avator>
    </van-popup>
  </div>
</template>

<script>
import { resolveToBase64 } from '@/utils'
import { getPersonageNformation } from '@/api'
import UpdataAvator from './components/UpdataAvator'
import UpdataName from './components/UpdataName.vue'
import UpdataGender from './components/UpdataGender.vue'
import UpdataPicker from './components/UpdataPicker.vue'
export default {
  components: { UpdataAvator, UpdataName, UpdataGender, UpdataPicker },
  created() {
    this.information()
  },
  data() {
    return {
      isShowPhoto: false,
      ifname: false,
      ifgender: false,
      ifbirthday: false,
      message: [],
      gender: ['男', '女'],
      photo: '',
      avator: '',
      textname: ''
    }
  },
  methods: {
    // 个人信息
    async information() {
      const { data } = await getPersonageNformation()
      this.message = data.data
      this.textname = data.data.name
    },
    async selectPhoto() {
      const file = this.$refs.file.files[0]
      const base64 = await resolveToBase64(file)
      this.photo = base64
      this.isShowPhoto = true
      this.$refs.file.value = ''
    }
  },
  computed: {}
}
</script>

<style scoped lang="less">
.navber {
  background-color: #3396fc;
  :deep(.van-nav-bar__title) {
    color: #fff !important;
  }
  :deep(.van-icon) {
    color: #fff !important;
  }
}
</style>
