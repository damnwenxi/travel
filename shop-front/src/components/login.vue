<template>
  <div class="container">
    <el-form status-icon label-width="100px" class="demo-ruleForm">
      <el-form-item label="邮箱/手机号">
        <el-input type="text" v-model="email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "./config";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    submitForm() {
      axios
        .post(BASE_URL + "/user/login", {
          email: this.email,
          password: this.password
        })
        .then(res => {
          if (res.status == 200) {
            // 注册成功保存token到localstorage,并跳转
            window.localStorage.setItem("token", res.data.token);
            if (res.data.user.role == 0) {
              this.$router.push({ path: "/" });
              sessionStorage.user = res.data.user.name;
              sessionStorage.user_id = res.data.user.id;
              sessionStorage.user_role = res.data.user.role;
            } else {
              this.$router.push({ path: "/admin" });
              sessionStorage.user = res.data.user.name + "(管理员)";
              sessionStorage.user_id = res.data.user.id;
              sessionStorage.user_role = res.data.user.role;
            }
          } else {
            this.$notify({
              title: "警告",
              message: res.data.msg,
              type: "warning"
            });
          }
        });
    },
    resetForm() {
      (this.email = ""), (this.password = "");
    }
  }
};
</script>

<style scoped>
.container {
  width: 50%;
  margin: 0 auto;
  padding-top: 200px;
}
</style>
