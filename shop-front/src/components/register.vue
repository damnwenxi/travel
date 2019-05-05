<template>
  <div class="container">
    <el-form ref="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="name"></el-input>
      </el-form-item>

      <el-form-item label="邮箱">
        <el-input v-model="email"></el-input>
      </el-form-item>

      <el-form-item label="手机号码">
        <el-input v-model="phone"></el-input>
      </el-form-item>

      <el-form-item label="密码">
        <el-input type="password" v-model="password1"></el-input>
      </el-form-item>

      <el-form-item label="确认密码">
        <el-input type="password" v-model="password2"></el-input>
      </el-form-item>

      <el-form-item label="性别">
        <el-radio-group v-model="sex">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit($event)">立即注册</el-button>
        <el-button>取消</el-button>
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
      name: "",
      email: "",
      phone: "",
      password1: "",
      password2: "",
      sex: ""
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("email", this.email);
      formData.append("phone", this.phone);
      formData.append("password1", this.password1);
      formData.append("password2", this.password2);
      formData.append("sex", this.sex);

      var req_url = BASE_URL + "/user/register";
      axios({
        method: "post",
        url: req_url,
        headers: {
          "Content-Type": "multipart/form-data"
        },
        data: formData
      }).then(res => {
        if (res.status == 200) {
          sessionStorage.user = res.data.user.name;
          sessionStorage.user_id = res.data.user.id;
          sessionStorage.user_role = res.data.user.role;

          // 注册成功保存token到localstorage,并跳转
          window.localStorage.setItem("token", res.data.token);
          this.$router.push({ path: "/" });
        } else {
          this.$notify({
            title: "警告",
            message: res.data.msg,
            type: "warning"
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.container {
  width: 70%;
  padding-top: 100px;
  margin: 0 auto;
}
</style>

