<template>
  <header>
    <div class="container">
      <p class="title">
        <router-link to="/">去哪儿旅游</router-link>
      </p>

      <ul class="menu">
        <li class="menu-item" v-if="user_role">
          <router-link to="/card"><router-link to="/admin">后台管理</router-link></router-link>
        </li>
        <li class="menu-item">
          <router-link to="/card"><router-link :to="{name:'order',query:{id:user_id}}">个人中心</router-link></router-link>
        </li>
        <li class="menu-item" v-if="!user">
          <router-link to="/register">注册</router-link>
        </li>
        <li class="menu-item" v-if="!user">
          <router-link to="/login">登录</router-link>
        </li>
        <li class="menu-item" v-if="user">
          <router-link to="/card">{{user}}</router-link>
        </li>
        <li class="menu-item" v-if="user">
          <a href="javascript:void(0);" @click="logout">[退出登录]</a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      user: "",
      user_id:'',
      user_role:''
    };
  },
  inject:['reload'],
  mounted() {
    this.user = sessionStorage.user;
    this.user_id = sessionStorage.user_id;
    this.user_role =parseInt(sessionStorage.user_role);
  },
  methods:{
    logout(){
      sessionStorage.clear();
      this.$router.push({path:'/'});
      this.reload();
    }
  }
};
</script>

<style scoped>
header {
  background: rgba(255, 255, 255, 0.94);
  width: 100%;
  height: 70px;
  position: fixed;
  top: 0;
  z-index: 10;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}
.container {
  width: 80%;
  margin: 0 auto;
  height: 70px;
}
.title {
  float: left;
  display: inline-block;
  line-height: 70px;
  font-size: 1.6em;
}
.menu {
  display: block;
  float: right;
  height: 70px;
}
.menu .menu-item {
  padding-left: 30px;
  display: block;
  float: left;
  line-height: 70px;
}
a:hover {
  color: rgb(180, 69, 89);
}
</style>
