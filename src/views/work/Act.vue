<template>
  <div class="adverse">
    <div class="column max-vh">
      <MyHeader></MyHeader>
      <TableHeader></TableHeader>
      <div class="flex all-table box flex-1">
        <ActTable class="rev-table">
          <MyScale :width="30" url="work" size="sm" />
        </ActTable>
        <div class="column right-table box">
          <MyScale :width="30" url="reverse" pos="relative" text="预约分布表" />
          <MyScale :width="30" url="record" pos="relative" text="预约记录表" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { DATE_STR_DETAIL } from '@/util/date';

export default {
  name: "Act",
  components: {
  
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // width: 524px;
  margin-left: 6px;
}
.act-table {
  margin-bottom: 6px;
}
</style>
