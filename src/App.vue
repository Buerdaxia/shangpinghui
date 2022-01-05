<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口地方 -->
    <router-view></router-view>

    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/index';
import Footer from './components/Footer/index';
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    // 发送的home下的categoryList
    // 放在根组件中，只执行一次优化请求
    this.$store.dispatch('categoryList');
  }
}
</script>

<style>
</style>
