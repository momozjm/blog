<template>
  <div class="login">
    <van-cell-group>
      <van-field
        label="用户名"
        placeholder="请输入用户名"
        :border="false"
        v-model="formData.username"
        :error="error.username"
      />
      <van-field
        label="密码"
        placeholder="请输入密码"
        :border="false"
        v-model="formData.password"
        :error="error.password"
      />
      <van-field
        label="密码"
        placeholder="请再次输入密码"
        :border="false"
        v-model="formData.password2"
        :error="error.password2"
      />
    </van-cell-group>
    <van-cell-group>
      <van-button type="primary" :loading="loginLoading" @click="handleSubmit()">提交</van-button>
    </van-cell-group>
  </div>
</template>

<script>
import { cellGroup, field, button, Toast } from "vant";
import { handleLoginApi } from "@/api/api";
export default {
  data() {
    return {
      formData: {},
      error: {
        username: false,
        password2: false
      },
      loginLoading: false
    };
  },
  components: {
    vanCellGroup: cellGroup,
    vanField: field,
    vanButton: button
  },
  watch: {
    formData: {
      handler(newValue) {
        if (newValue.username) {
          this.error.username = false;
        } else {
          this.error.username = true;
        }
        if (newValue.password) {
          this.error.password = false;
        } else {
          this.error.password = true;
        }
      },
      deep: true
    }
  },
  methods: {
    handleSubmit() {
      this.validateForm();
      const keys = Object.keys(this.error);
      for (const item of keys) {
        if (this.error[item]) return;
      }
      this.loginLoading = true
      handleLoginApi({
        username: this.formData.username,
        password: this.formData.password
      }).then(res => {
        this.loginLoading = false
        if (res.code === 200) {
          Toast.success(res.message);
        } else {
          Toast.fail(res.message);
        }
      });
    },
    validateForm() {
      const { username, password } = this.formData;
      if (!username || username.trim().length === 0) {
        this.error.username = true;
      }
      if (!password || password.trim().length === 0) {
        this.error.password = true;
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>
