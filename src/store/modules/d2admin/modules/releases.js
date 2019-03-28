import util from '@/libs/util.js'

export default {
  namespaced: true,
  mutations: {
    /**
     * @description 显示版本信息
     * @param {Object} state vuex state
     */
    versionShow () {
      util.log.capsule('Admin', `v${process.env.VUE_APP_VERSION}`)
      console.log('这里是高速公路监测平台-后台管理，谢谢 ~')
    }
  }
}
