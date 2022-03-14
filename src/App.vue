<template>
  <div id="app">
    <Header/>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <!-- 在Home、Search显示的，在注册、登陆隐藏 -->
    <Footer v-show="$route.meta.show"/>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    //通知Vuex发请求，获取数据，存储于仓库当中
    this.$store.dispatch("categoryList");
  },
}
</script>

<style>

</style>
