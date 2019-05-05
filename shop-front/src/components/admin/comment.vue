<template>
  <div class="container">
    <h1>评论管理</h1>
    <el-table :data="comment" style="width: 100%">
      <el-table-column prop="user_name" label="用户"></el-table-column>
      <el-table-column prop="good_id" label="商品"></el-table-column>
      <el-table-column prop="c_date" label="发表时间"></el-table-column>
      <el-table-column prop="content" width="300" label="内容"></el-table-column>
      <el-table-column prop="likes" label="热度"></el-table-column>
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
      comment: []
    };
  },
  mounted() {
    axios({
      url: BASE_URL + "/comment/all?id=0",
      method: "get",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      this.comment = res.data.comment;
    });
  },
  methods: {
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
    }
  }
};
</script>

<style scoped>
</style>
