<template>
  <div>
    <h3>全部旅游产品</h3>

    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">全部</el-menu-item>
      <el-menu-item index="2">自驾游</el-menu-item>
      <el-menu-item index="3">境外游</el-menu-item>
      <el-menu-item index="4">国内游</el-menu-item>
    </el-menu>
    <br>
    <!-- 商品展示 -->
    <ul class="container">
      <li class="card" v-for="good in goods" :key="good.id">
        <el-card>
          <img :src="good.cover.split(',')[0]" class="image">
          <router-link :to="{name:'detail',query:{id:good.id}}">
            <p class="description">{{good.description}}...</p>
          </router-link>

          <p class="price">
            原价：
            <span class="price_normal">{{good.price_out}}</span>
            <span class="price_offer">团购价：{{good.price_offer}}</span>
          </p>
          <div style="padding: 14px;">
            <router-link :to="{name:'detail',query:{id:good.id}}" style="fontsize:1.2em;">
              <span>{{good.title}}</span>
            </router-link>

            <div class="bottom clearfix">
              <time class="time">{{good.c_date}}</time>
              <el-button type="text" class="button" @click="addcart(good.id,good.price_offer)">加入购物车</el-button>
            </div>
          </div>
        </el-card>
      </li>
    </ul>
    <!-- 翻页 -->
    <div class="pages">
      <div class="block">
        <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "./config";
export default {
  data() {
    return {
      goods: [],
      activeIndex: "1",
      all: []
    };
  },
  computed: {
    test() {
      return this.$store.state.goods;
    }
  },
  mounted() {
    axios.get(BASE_URL + "/goods/detail?id=0").then(res => {
      this.all = res.data;
      this.goods = res.data;
      //   console.log(this.goods);
    });
  },
  methods: {
    addcart(id, price) {
      axios({
        url: BASE_URL + "/order/add?id=" + id + "&price=" + price,
        method: "get",
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        if (res.status == 200) {
          this.$message({
            type: "success",
            message: "已为您添加到购物车!"
          });
        } else {
          this.$message({
            type: "warnning",
            message: res.data.msg
          });
        }
      });
    },
    handleSelect(key, keyPath) {
      var i = parseInt(key);
      if(i == 1){
        this.goods = this.all;
      }
      else if(i==2){
        this.goods = this.all.filter((item)=>{
          return item.type == "自驾游";
        });
      }else if(i == 3){
        this.goods = this.all.filter(item=>{
          return item.type == "境外游";
        })
      }else if(i == 4 ){
        this.goods = this.all.filter(item=>{
          return item.type == "国内游";
        })
      }
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
}
.description {
  line-height: 25px;
  height: 75px;
  overflow: hidden;
  margin: 10px;
}
.price {
  margin: 0 10px;
}
.price .price_normal {
  text-decoration: line-through;
}
.price .price_offer {
  display: inline-block;
  margin-right: 10px;
  font-size: 1.4em;
  color: red;
}
.pages {
  text-align: center;
  margin: 20px auto;
}
.container .card {
  order: 1;
  margin: 1%;
  width: 31%;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  height: 250px;
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
</style>
