<template>
  <div class="home">
    <router-link to="/some">点击跳转到About页面</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import { getMessageApi } from "@/api/api";

export default {
  name: "Home",
  created() {
    getMessageApi({
      username: "4545",
      password: '123321'
    }).then(res => {
      console.log(res)
    })
  }
};
</script>
