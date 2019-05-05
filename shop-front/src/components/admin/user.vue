<template>
  <div class="container">
    <h1>用户管理</h1>
    <el-table :data="user" style="width: 100%">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="用户名"></el-table-column>
      <el-table-column prop="phone" label="手机"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="c_date" label="加入时间"></el-table-column>
      <!-- <el-table-column prop="avatar" label="头像"></el-table-column> -->
      <el-table-column prop="role" label="权限"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">设为管理</el-button>
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
      user: []
    };
  },
  mounted() {
    axios({
      url: BASE_URL + "/user/all?id=0",
      method: "get",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      this.user = res.data.user;
    });
  },
  methods: {
    handleEdit(id) {
      //删除操作
      this.$confirm("确定要将此用户设置为管理员吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios({
            url: BASE_URL + "/user/set?id=" + id,
            method: "get",
            headers: {
              Authorization: localStorage.getItem("token")
            }
          })
            .then(res => {
              if (res.status == 200) {
                this.$message({
                  type: "success",
                  message: "设置管理员成功!"
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
            message: "已取消设置"
          });
        });
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
            url: BASE_URL + "/user/delete?id=" + id,
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
              console.log(err);
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
