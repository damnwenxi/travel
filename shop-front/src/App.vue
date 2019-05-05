<template>
  <div id="app">

    <Header v-if="isRouterAlive" :key="$route.fullPath"></Header>
    <!-- <div style="margin-top: 70px;"></div> -->
    <div class="router-container">
      <router-view v-if="isRouterAlive"></router-view>
    </div>

    <Footer></Footer>

  </div>
</template>

<script>
import Header from './components/header'
import Footer from './components/footer'
export default {
  name: 'App',
  data(){
    return{
      isRouterAlive:true
    }
  },
  components:{
    Header,Footer
  },
  provide(){
    return{
      reload:this.reload
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(()=>{
        this.isRouterAlive = true;
      })
    }
  }
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
  text-decoration: none;
  list-style: none;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
html,body,#app{
  height: 100%;
}
.router-container{
  margin: 0 auto;
  margin-top: 70px;
  width: 80%;
  min-height: 80%;
}
a:hover{
  cursor: pointer;
}
</style>
