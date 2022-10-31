<template>
  <div id="app">
    <router-view></router-view>
    <FooterMusic v-show="$store.state.isFooterMusic"/>
  </div>
</template>

<script>
import Home from '@/view/Home.vue'
import FooterMusic from '@/components/item/FooterMusic.vue'

export default {
  name: 'App',
  components: {
    Home,
    FooterMusic
  }
}
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.icon{
  width: .4rem;
  height: .4rem;
}
</style>
