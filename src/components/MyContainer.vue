<template>
  <div class="home">
    <div class="column">
      <header class="home-header">私人影院预约管理&订单记录系统</header>
      <TableHeader v-model="date"></TableHeader>
      <slot></slot>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import { rooms } from "@/util/index";
import TableHeader from "@/components/TableHeader";

export default {
  name: "MyContainer",
  components: {
    TableHeader
  },
  data() {
    return {
      // rooms,
      date: this.$now
    };
  }
};
</script>

<style lang="scss" scoped>
.home-header {
  color: #ec9d29;
  font-size: 36px;
  padding: 24px;
  text-align: left;
  background: #fff;
}
.all-table {
  padding: 12px;
  box-sizing: border-box;
}
.rev-table {
  flex: 1;
  overflow-x: hidden;
}
.right-table {
  width: 524px;
  margin-left: 6px;
}
.act-table {
  margin-bottom: 6px;
}
</style>
