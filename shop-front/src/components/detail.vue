<template>
  <div class="container">
    <br>
    <h2>产品详情</h2>
    <el-row>
      <el-card :body-style="{ padding: '0px' }">
        <div class="img_box clearfix">
          <img :src="imgList[0]" class="image">
          <div class="infos">
            <h2>名称：{{detail.title}}</h2>
            <h2>地点：{{detail.addr}}</h2>
            <h2>起止时间：{{format(detail.date1)}} ---- {{format(detail.date2)}}</h2>
            <h3>库存：{{detail.stock}}</h3>
            <p>描述：{{detail.description}}</p>
            <h2>当前售价：{{detail.price_offer}}</h2>
          </div>
        </div>

        <div style="padding: 14px;">
          <span>{{detail.title}}</span>
          <div class="bottom clearfix">
            <time class="time">{{ detail.c_date }}</time>
            <el-button
              class="button"
              type="primary"
              @click="addcart(detail.id,detail.price_offer)"
            >加入购物车</el-button>
            <el-button
              class="button"
              type="success"
            > <router-link :to="{name:'settle',query:{id:detail.id}}">立即购买</router-link> </el-button>
          </div>
        </div>
      </el-card>
    </el-row>
    <br>
    <br>

    <div class="imgBox container">
      <img :src=img alt="" v-for="img in imgList" :key="img">
    </div>

    <hr>
    <br>
    <br>
    <h2>评论列表</h2>
    <br>
    <div class="comment">
      <el-form class="demo-form-inline">
        <el-form-item label="添加评论">
          <el-input type="textarea" v-model="say"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">发表</el-button>
        </el-form-item>
      </el-form>

      <div class="block">
        <el-timeline>
          <li v-for="comment in comments" :key="comment.id">
            <el-timeline-item :timestamp="comment.c_date" placement="top">
              <el-card>
                <h4>{{comment.content}}</h4>
                <p>
                  {{comment.user_name}} 提交于 {{comment.c_date}}
                  <el-button class="button" type="text">热度:{{comment.likes}}</el-button>
                </p>
              </el-card>
            </el-timeline-item>
          </li>
          <h2 v-if="!comments" style="text-align:center; padding:30px;">该商品暂无评论</h2>
        </el-timeline>
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
      detail: "",
      comments: "",
      say: "",
      imgList: []
    };
  },
  mounted() {
    const id = this.$route.query.id;
    axios.get(BASE_URL + "/goods/detail?id=" + id).then(res => {
      //   console.log(res.data);
      this.detail = res.data[0];
      this.imgList = res.data[0].cover.split(',');

      if(!this.imgList[this.imgList.length-1]){
        this.imgList.pop();
      }
    });

    axios.get(BASE_URL + "/comment?id=" + id).then(res => {
      this.comments = res.data.comments;
      //   console.log(this.comments);
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
            message: res.data.msg
          });
          // this.order_id = res.data.order_id;
        } else {
          this.$message({
            type: "warnning",
            message: res.data.msg
          });
        }
      });
    },

    format(time) {
      if (time) return time.slice(0, 10);
      else return "2019-03-30";
    },

    onSubmit() {
      axios({
        url: BASE_URL + "/comment/add",
        method: "post",
        data: {
          content: this.say,
          good_id: this.$route.query.id
        },
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
        .then(res => {
          if (res.status == 200) {
            this.$message({
              type: "success",
              message: "发表评论成功!"
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "warning",
            message: "登录信息已过期或您没有登录!"
          });
        });
    }
  }
};
</script>

<style scoped>
.infos {
  padding: 20px;
  width: 50%;
  float: left;
  margin-left: 10%;
}

.imgBox img{
  max-width: 100%;
  height: auto;
}
.infos p {
  padding: 20px;
}
.infos h2 {
  line-height: 2em;
}

.comment {
  width: 80%;
  margin: 0 auto;
}
.container {
  width: 80%;
  margin: 0 auto;
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
  margin-right: 20px;
  float: right;
}

.image {
  max-width: 30%;
  float: left;
  padding: 20px;
  max-height: 300px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
