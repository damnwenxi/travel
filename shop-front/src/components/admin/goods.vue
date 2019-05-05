<template>
  <div class="container">
    <h2 style="line-height:36px; margin-bottom:10px;">商品管理  <router-link style="float:right;margin-right:30px;" :to="{name:'add'}"><el-button size="medium" type="primary">添加商品</el-button></router-link> </h2>
    <el-table :data="goods" style="width: 100%">
      <el-table-column prop="id" label="货号"></el-table-column>
      <el-table-column prop="title" label="名称"></el-table-column>
      <el-table-column prop="c_date" label="入库时间"></el-table-column>
      <el-table-column prop="stock" label="库存"></el-table-column>
      <el-table-column prop="sold" label="已售"></el-table-column>
      <el-table-column prop="price_in" label="成本"></el-table-column>
      <el-table-column prop="price_out" label="售价"></el-table-column>
      <el-table-column prop="whos" label="管理员"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
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
      goods: []
    };
  },
  mounted() {
    axios.get(BASE_URL + "/goods/detail?id=0").then(res => {
      this.goods = res.data;
    });
  },
  methods: {
    handleEdit(_id) {
      this.$router.push({name:'edit',query:{id:_id}});
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
            url:BASE_URL + "/goods/delete?id=" + id,
            method: "get",
            headers: {
              Authorization: localStorage.getItem("token")
            }
          }).then(res => {
            if (res.status == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          }).catch(err=>{
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
