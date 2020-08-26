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
    </van-cell-group>
    <van-cell-group>
      <van-button type="default" @click="goRegister">注册</van-button>
      <van-button type="primary" :loading="loginLoading" @click="handleSubmit()">登录</van-button>
      <van-button type="primary" @click="handleSearch()">查询</van-button>
      <van-button type="default" @click="clickButton">连接</van-button>
    </van-cell-group>
  </div>
</template>

<script>
import { cellGroup, field, button, Toast } from "vant";
import { handleLoginApi, handleSearchApi } from "@/api/api";
export default {
  data() {
    return {
      formData: {},
      error: {
        username: false,
        password: false
      },
      loginLoading: false
    };
  },
  created() {
    console.log(this);
    // 这里的sockets是挂在在this上的，不是挂在this.$socket
    // this.sockets.listener.subscribe('chaTmessage', (data) => {
    //   console.log('返回了', data) // 能执行
    // })
  },
  sockets: {
    // chaTmessage(data) {//'chaTmessage'事件返回值
    //   console.log('接收')
    //   console.log(data);
    // },
    // hello(data) {//'hello'事件返回值
    //   console.log(data, 11111111);
    // },
    // message(data) {
    //   console.log(data);
    // }
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
    clickButton: function() {
      // this.$socket.emit("hello", {roomName:'aaa',message:'你好'});//发送信息到后台hello事件
    },
    handleSubmit() {
      this.validateForm();
      const keys = Object.keys(this.error);
      for (const item of keys) {
        if (this.error[item]) return;
      }
      this.loginLoading = true;
      handleLoginApi({
        username: this.formData.username,
        password: this.formData.password
      }).then(res => {
        this.loginLoading = false;
        if (res.code === 200) {
          Toast.success(res.message);
        } else {
          Toast.fail(res.message);
        }
      });
    },
    handleSearch() {
      handleSearchApi({
        username: this.formData.username,
      }).then(res => {
        
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
    },
    goRegister() {
      this.$router.go("/register");
    }
  }
};
</script>

<style lang="less" scoped>
</style>
