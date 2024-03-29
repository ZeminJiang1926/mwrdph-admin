// Vue
import Vue from 'vue'
import App from './App'
// store
import store from '@/store/index'
// 多国语
import i18n from './i18n'
// 核心插件
import d2Admin from '@/plugin/d2admin'

// 菜单和路由设置
import router from './router'
import menuHeader from '@/menu/header'
import menuAside from '@/menu/aside'
import { frameInRoutes } from '@/router/routes'
// [ 可选插件组件 ] 图表
import VCharts from 'v-charts'
// [ 可选插件组件 ] 右键菜单
// 核心插件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { GridLayout, GridItem } from 'vue-grid-layout'
// [ 可选插件组件 ] 区域划分组件
import SplitPane from 'vue-splitpane'
import Axios from 'axios'
import pluginExport from '@d2-projects/vue-table-export'
import pluginImport from '@d2-projects/vue-table-import'
import VueVideoPlayer from 'vue-video-player'
import VueAMap from 'vue-amap'
Vue.use(d2Admin)
Vue.use(VCharts)
Vue.use(ElementUI)
Vue.use(pluginExport)
Vue.use(pluginImport)
Vue.use(VueVideoPlayer)
Vue.use(VueAMap)
Vue.component('d2-grid-layout', GridLayout)
Vue.component('d2-grid-item', GridItem)
Vue.component('SplitPane', SplitPane)
VueAMap.initAMapApiLoader({
  key: 'your amap key',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})
Vue.prototype.$axios = Axios
Axios.defaults.baseURL = '/api'
Axios.defaults.headers.post['Content-Type'] = 'application/json'
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', frameInRoutes)
    // 设置顶栏菜单
    this.$store.commit('d2admin/menu/headerSet', menuHeader)
    // 设置侧边栏菜单
    this.$store.commit('d2admin/menu/asideSet', menuAside)
    // 初始化菜单搜索功能
    this.$store.commit('d2admin/search/init', menuHeader)
  },
  mounted () {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  }
}).$mount('#app')
