<template>
  <div class="home">
    <div class="column max-vh">
      <MyHeader></MyHeader>
      <TableHeader></TableHeader>
      <div class="flex all-table box flex-1">
        <ReserveTable class="rev-table">
          <MyScale :width="30" url="reverse" />
        </ReserveTable>
        <div class="column right-table box">
          <ActTable class="act-table">
            <MyScale :width="24" url="act" />
          </ActTable>
          <RecordTable class="rev-record-table">
            <MyScale :width="24" url="record" />
          </RecordTable>
        </div>
      </div>
    </div>

    <NewUser></NewUser>
  </div>
</template>

<script>

import NewUser from "@/views/work/NewUser";

import dayjs from 'dayjs';
import { DATE_STR_DETAIL } from '../util/date';

export default {
  name: "home",
  components: {
    NewUser,
  },
  data() {
    return {
      date: this.$now
    };
  },
  created() {
    this.$store.dispatch('getAllRecords')
  },
  methods: {
    changeDate(val) {
      const start = val + ` 00:00:00`;
      const end = dayjs(val).add(1, 'day').add(7, 'hour').format(DATE_STR_DETAIL + ':ss')
      
    }
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
<style lang="scss">
body div.el-popover {
  background: #ddd;
  border-color: #ddd;
}
</style>