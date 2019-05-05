<template>
  <div class="container">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">购物车</el-menu-item>
      <el-menu-item index="2">未付款</el-menu-item>
      <el-menu-item index="3">进行中</el-menu-item>
      <el-menu-item index="4">历史订单</el-menu-item>
      <el-menu-item index="5">我的评论</el-menu-item>
    </el-menu>

    <!-- 购物车 -->
    <el-table :data="cart" style="width: 100%" v-if="show(1)">
      <el-table-column prop="id" label="订单编号"></el-table-column>
      <el-table-column prop="c_date" label="订单时间"></el-table-column>
      <el-table-column prop="good_id" label="商品ID"></el-table-column>
      <el-table-column prop="price" label="金额"></el-table-column>
      <el-table-column prop="state" label="订单状态">
        <template slot-scope="scope">
          <span>{{state(scope.row.state)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="pay_date" label="付款时间"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          <el-button
              size="mini"
              class="button"
              type="success"
            > <router-link :to="{name:'settle',query:{id:scope.row.good_id}}">结算</router-link> </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 待付款 -->
    <el-table :data="waitpay" style="width: 100%" v-if="show(2)">
      <el-table-column prop="id" label="订单编号"></el-table-column>
      <el-table-column prop="c_date" label="订单时间"></el-table-column>
      <el-table-column prop="good_id" label="商品ID"></el-table-column>
      <el-table-column prop="price" label="金额"></el-table-column>
      <el-table-column prop="state" label="订单状态">
        <template slot-scope="scope">
          <span>{{state(scope.row.state)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="pay_date" label="提交时间"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">取消订单</el-button>
          <el-button size="mini" type="primary" @click="handlePay(scope.row.id)">去付款</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 进行中 -->
    <el-table :data="active" style="width: 100%" v-if="show(3)">
      <el-table-column prop="good_id" label="商品ID"></el-table-column>
      <el-table-column prop="addr" label="收货信息"></el-table-column>
      <el-table-column prop="note" label="备注"></el-table-column>
      <el-table-column prop="price" label="金额"></el-table-column>
      <el-table-column prop="state" label="订单状态">
        <template slot-scope="scope">
          <span>{{state(scope.row.state)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="pay_date" label="付款时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleRecived(scope.row.id)">确认收货</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 历史订单 -->
    <el-table :data="order" style="width: 100%" v-if="show(4)">
      <el-table-column prop="id" label="订单编号"></el-table-column>
      <el-table-column prop="c_date" label="订单时间"></el-table-column>
      <el-table-column prop="good_id" label="商品ID"></el-table-column>
      <el-table-column prop="price" label="金额"></el-table-column>
      <el-table-column prop="state" label="订单状态">
        <template slot-scope="scope">
          <span>{{state(scope.row.state)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="pay_date" label="创建时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除订单</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 我的评论 -->
    <el-table :data="comments" style="width: 100%" v-if="show(5)">
      <el-table-column prop="good_id" label="评论商品"></el-table-column>
      <el-table-column prop="c_date" label="发表时间"></el-table-column>
      <el-table-column prop="content" width="300" label="内容"></el-table-column>
      <el-table-column prop="likes" label="热度"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDeleteC(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "./config";
export default {
  data() {
    return {
      activeIndex: "1",
      order: [],
      cart: [],
      waitpay: [],
      active: [],
      comments: []
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key.toString();
    },
    show(id) {
      return id == parseInt(this.activeIndex);
    },
    state(code) {
      switch (code) {
        case 0:
          return "购物车";
          break;
        case 1:
          return "未付款";
          break;
        case 2:
          return "进行中";
          break;
        case 3:
          return "已完成";
          break;
        default:
          return "异常状态";
      }
    },
    //删除评论
    handleDeleteC(id) {
      console.log(id);
      //删除操作
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios({
            url: BASE_URL + "/comment/delete?id=" + id,
            method: "get",
            headers: {
              Authorization: localStorage.getItem("token")
            }
          })
            .then(res => {
              if (res.status == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
            })
            .catch(err => {
              this.$message({
                type: "warning",
                message: "登录信息已过期或您没有权限!"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //删除订单
    handleDelete(id) {
      //   console.log(id);
      //删除操作
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios({
            url: BASE_URL + "/order/delete?id=" + id,
            method: "get",
            headers: {
              Authorization: localStorage.getItem("token")
            }
          })
            .then(res => {
              if (res.status == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
            })
            .catch(err => {
              this.$message({
                type: "warning",
                message: "登录信息已过期或您没有权限!"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //确认收获
    handleRecived(id) {
      this.$confirm("确定已经完成服务了吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios({
            url: BASE_URL + "/order/state?state=3&id=" + id,
            method: "get",
            headers: {
              Authorization: localStorage.getItem("token")
            }
          })
            .then(res => {
              if (res.status == 200) {
                this.$message({
                  type: "success",
                  message: "收货成功!"
                });
              }
            })
            .catch(err => {
              this.$message({
                type: "warning",
                message: "登录信息已过期或您没有权限!"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    //付款
    handlePay(id) {
      this.$prompt("请输入支付密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (value == "123456") {
            axios({
              url: BASE_URL + "/order/state?state=2&id=" + id,
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
              }
            });
          } else {
            this.$message({
              type: "info",
              message: "密码错误"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    //提交订单
    handleCommit(id) {
      this.$confirm("确定要提交订单吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(({ value }) => {
            axios({
              url: BASE_URL + "/order/state?state=1&id=" + id,
              method: "get",
              headers: {
                Authorization: localStorage.getItem("token")
              }
            }).then(res => {
              if (res.status == 200) {
                this.$message({
                  type: "success",
                  message: "订单成功提交，快去付款吧"
                });
              }
            });
          
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    }
  },

  mounted() {
    axios({
      url: BASE_URL + "/order?id=" + sessionStorage.user_id,
      method: "get",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => {
        if (res.status == 200) {
          this.order = res.data;
          var all = this.order;
          for (var i = 0; i < all.length; i++) {
            switch (all[i].state) {
              case 0:
                this.cart.push(all[i]);
                break;
              case 1:
                this.waitpay.push(all[i]);
                break;
              case 2:
                this.active.push(all[i]);
                break;
              default:
                break;
            }
          }
        } else {
          this.$notify({
            title: "警告",
            message: res.data.msg,
            type: "warning"
          });
        }
      })
      .catch(err => {
        console.log(err);
      });

    //获取评论
    axios({
      url: BASE_URL + "/comment/user?id=" + sessionStorage.user_id,
      method: "get"
    }).then(res => {
      // console.log(res.data);
      this.comments = res.data.comment;
    });
  }
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  padding-top: 20px;
}
</style>
