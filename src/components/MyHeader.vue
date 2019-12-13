<template>
  <div class="my-header between-center">
    <header class="home-header all-center">
      <img src="img/logo.png" alt="" style="width: 150px;">
      <div>私人影院预约管理&订单记录系统</div>
    </header>
    <MyNav></MyNav>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "MyHeader",
  components: {},
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.home-header {
  color: #ec9d29;
  font-size: 36px;
  padding: 24px;
  text-align: left;
  
}
.my-header {
background: #fff;
}
</style>
