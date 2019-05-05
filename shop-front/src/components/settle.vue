<template>
  <div class="container">
    <br>
    <h2>订单结算页面</h2>
    <br>
    <el-row>
      <el-card :body-style="{ padding: '20px' }">
        <!-- 收获地址 -->
        <div class="infos">
          <p>姓名：{{infos.name}} 手机：{{infos.phone}}</p>
          <p>
            收货地址：
            <span>
              <el-input type="text" v-model="infos.addr"></el-input>
            </span>
          </p>
        </div>

        <div class="order">
          <p>名称：{{detail.title}}</p>
          <p>地点：{{detail.addr}}</p>
          <p>起止时间：{{format(detail.date1)}} ---- {{format(detail.date2)}}</p>
          <p>
            机票酒店：
            <el-select v-model="note" placeholder="机票酒店">
              <el-option label="自行处理" value="自行处理"></el-option>
              <el-option label="公司安排" value="公司安排"></el-option>
            </el-select>
          </p>
          <p>合计：{{detail.price_offer}}元</p>
        </div>

        <el-button class="button" @click="goBack()">返回</el-button>
        <el-button class="button" type="success" @click="payNow(detail.id, detail.price_offer)">立即结算</el-button>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "./config";
export default {
  data() {
    return {
      detail: "",
      infos: "",
      note: ""
    };
  },
  mounted() {
    const id = this.$route.query.id;
    axios.get(BASE_URL + "/goods/detail?id=" + id).then(res => {
      //   console.log(res.data);
      this.detail = res.data[0];
    });

    axios({
      url: BASE_URL + "/user/detail",
      method: "get",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      this.infos = res.data.user[0];
      // console.log(res);
    });
  },
  methods: {
    //付款
    payNow(id, price) {
      const addr = this.infos.addr;
      const note = this.note;
      axios({
        url:
          BASE_URL +
          "/order/add?id=" +
          id +
          "&price=" +
          price +
          "&addr=" +
          addr +
          "&note=" +
          note,
        method: "get",
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        if (res.status == 200) {
          const order_id = res.data.order_id;

          this.$prompt("请输入支付密码", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          })
            .then(({ value }) => {
              if (value == "123456") {
                // console.log(id);
                axios({
                  url: BASE_URL + "/order/state?state=2&id=" + order_id,
                  method: "get",
                  headers: {
                    Authorization: localStorage.getItem("token")
                  }
                }).then(res => {
                  if (res.status == 200) {
                    this.$message({
                      type: "success",
                      message: "付款成功"
                    });
                    this.$router.push({ path: "/order" });
                  } else {
                    this.$message({
                      type: "info",
                      message: res.data.msg
                    });
                  }
                });
              } else {
                axios({
                  url: BASE_URL + "/order/state?state=1&id=" + order_id,
                  method: "get",
                  headers: {
                    Authorization: localStorage.getItem("token")
                  }
                }).then(res => {
                  this.$message({
                    type: "info",
                    message: "密码错误，已为您添加到未付款订单"
                  });
                });
              }
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "取消输入"
              });
            });
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
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.container {
  width: 80%;
  margin: 0 auto;
}

.infos,
.order {
  padding: 10px 20px;
  background-color: #eee;
  border-radius: 5px;
  margin-bottom: 20px;
}
p {
  line-height: 2em;
}
p input {
  width: 60%;
  display: inline-block;
  font-size: 14px;
}
</style>
