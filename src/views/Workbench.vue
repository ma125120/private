<template>
  <div class="home">
    <div class="column">
      <MyHeader></MyHeader>
      <TableHeader v-model="date" @change="changeDate"></TableHeader>
      <div class="flex all-table box">
        <ReserveTable class="rev-table"></ReserveTable>
        <div class="column right-table box">
          <ActTable class="act-table"></ActTable>
          <RecordTable class="rev-record-table"></RecordTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import ReserveTable from "@/components/ReserveTable";
import ActTable from "@/components/ActTable";
import RecordTable from "@/components/RecordTable";
import TableHeader from "@/components/TableHeader";
import dayjs from 'dayjs';
import { DATE_STR_DETAIL } from '../util/date';

export default {
  name: "home",
  components: {
    ReserveTable,
    ActTable,
    RecordTable,
    TableHeader
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
      const start = val + ` 08:00:00`;
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
