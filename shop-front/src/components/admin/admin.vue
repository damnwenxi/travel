<template>
  <div id="admin">

    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      style="position:fixed;z-index:8;width:80%"
    >
      <el-menu-item index="1"><router-link :to="{name:'goods'}">商品管理</router-link></el-menu-item>
      <el-menu-item index="2"><router-link :to="{name:'order'}">订单管理</router-link></el-menu-item>
      <el-menu-item index="3"><router-link :to="{name:'user'}">用户管理</router-link></el-menu-item>
      <el-menu-item index="4"><router-link :to="{name:'comment'}">评论管理</router-link></el-menu-item>
    </el-menu>
    
    <router-view></router-view>

  </div>
</template>

<script>
import router from './router'
export default {
  name: 'admin',
  data(){
      return{
          activeIndex: "1",
      }
  },
  router,
  methods: {
    handleSelect(key, keyPath) {
    }
  }
}
</script>

<style scoped>
.container{
    padding-top: 70px;
}
#admin{
  z-index: 9;
  overflow: hidden;
  width: 100%;
}
</style>
