<template>
  <div class="container">
    <h1>订单管理</h1>
    <el-table :data="order" style="width: 100%">
      <el-table-column prop="id" label="订单号"></el-table-column>
      <el-table-column prop="good_id" label="商品编号"></el-table-column>
      <el-table-column prop="user_id" label="用户id"></el-table-column>
      <el-table-column prop="c_date" label="创建时间"></el-table-column>
      <el-table-column prop="state" label="订单状态">
        <template slot-scope="scope">
          <span>{{state(scope.row.state)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="交易价格"></el-table-column>
      <el-table-column prop="pay_date" label="付款时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "../config";
export default {
  data() {
    return {
      order: []
    };
  },
  mounted() {
    axios({
      url: BASE_URL + "/order/all?id=0",
      method: "get",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      this.order = res.data;
    });
  },
  methods: {
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
    handleEdit(id) {
      console.log(id);
    },
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
    }
  }
};
</script>

<style scoped>
</style>
