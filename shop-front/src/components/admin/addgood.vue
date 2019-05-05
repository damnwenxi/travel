<template>
  <div class="container">
    <h2>添加旅游产品</h2>
    <br>
    <el-form ref="form" :model="form" label-width="80px">

      <el-form-item :inline="true" label="产品名称">
        <el-col class="line" :span="16">
          <el-input v-model="form.title"></el-input>
        </el-col>
        <el-col class="line" :span="2">请选择</el-col>
        <el-col class="line" :span="6">
          <el-select v-model="form.type" placeholder="分类">
            <li v-for="type in type_l" :key="type">
              <el-option :label="type" :value="type"></el-option>
            </li>
          </el-select>
        </el-col>
        
      </el-form-item>

      <el-form-item :inline="true" label="库存">
        <el-col class="line" :span="6">
          <el-input v-model="form.stock"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="上传商品详情图片">
        <el-upload
         :limit=5
          :headers="header"
          :on-success="handleCoverSuccess"
          class="upload-demo"
          action="http://localhost:8081/upload/img"
          :file-list="fileList"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">支持最多5张图片</div>
        </el-upload>
      </el-form-item>

      <el-form-item :inline="true" label="价格编辑">
        <el-col class="line" :span="6">
          成本价
          <el-input v-model="form.price_in"></el-input>
        </el-col>
        <el-col class="line" :span="3">-</el-col>
        <el-col class="line" :span="6">
          普通售价
          <el-input v-model="form.price_out"></el-input>
        </el-col>
        <el-col class="line" :span="3">-</el-col>
        <el-col class="line" :span="6">
          优惠价
          <el-input v-model="form.price_offer"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="地点">
          <el-select v-model="form.region" placeholder="地点">
            <li v-for="addr in address" :key="addr">
              <el-option :label="addr" :value="addr"></el-option>
            </li>
          </el-select>
      </el-form-item>

      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择开始日期"
            v-model="form.date1"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择结束日期"
            v-model="form.date2"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="产品描述">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即添加</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "../config";
export default {
  data() {
    return {
      header: {
        Authorization: localStorage.getItem("token")
      },
      fileList: [],
      form: {
        title: "",
        stock: "",
        price_in: "",
        price_out: "",
        price_offer: "",
        region: "",
        date1: "",
        date2: "",
        description: "",
        cover: "",
        type:""
      },
      address: [
        "北京市",
        "天津市",
        "上海市",
        "重庆市",
        "河北省",
        "山西省",
        "辽宁省",
        "吉林省",
        "黑龙江省",
        "江苏省",
        "浙江省",
        "安徽省",
        "福建省",
        "江西省",
        "山东省",
        "河南省",
        "湖北省",
        "湖南省",
        "广东省",
        "海南省",
        "四川省",
        "贵州省",
        "云南省",
        "陕西省",
        "甘肃省",
        "青海省",
        "台湾省",
        "内蒙古自治区",
        "广西壮族自治区",
        "西藏自治区",
        "宁夏回族自治区",
        "新疆维吾尔自治区",
        "香港特别行政区",
        "澳门特别行政区"
      ],
      type_l:["自驾游","国内游","境外游"]
    };
  },
  methods: {
    onSubmit() {
      //   console.log(this.form);
      //编辑之后更新数据到服务器
      axios({
        url: BASE_URL + "/goods/add",
        method: "post",
        data: this.form,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
        .then(res => {
          if (res.status == 200) {
            this.$message({
              type: "success",
              message: "添加成功!"
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "warning",
            message: "登录信息已过期或您没有权限!"
          });
        });
    },

    handleCoverSuccess(res) {
      for(var item in res.urls){
        this.form.cover += res.urls[item].url+',';
      }
    }
  },
  created() {
    //   console.log(this.$route.query);
  }
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  width: 80%;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
