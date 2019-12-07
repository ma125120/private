<template>
  <div class="act--table" ref="root">
    <div class="table-header">
      <div class="bold">实际到店表</div>
    </div>
    <el-table :data="tableData" border style="width: 100%" height="340">
      <el-table-column label="" align="center" width="118px">
        <div slot-scope="{ row, $index }" class="align-center">
          {{ $index + 1 }}
          <i class="el-icon-edit table-edit--icon hover"></i>
        </div>
      </el-table-column>
      <el-table-column
        prop="roomName"
        align="center"
        width="118px"
        label="房间"
      ></el-table-column>
      <el-table-column
        prop="startTime"
        align="center"
        width="118px"
        label="到店时间"
      >
        <div slot-scope="{ row }">
          {{ row.startTime | time }}
        </div>
      </el-table-column>
      <el-table-column
        fixed="right"
        prop="duration"
        align="center"
        width="118px"
        label="实际时长/h"
      ></el-table-column>
      <el-table-column
        prop="endTime"
        align="center"
        width="118px"
        label="离店时间"
      >
        <div slot-scope="{ row }">{{ row.endTime | time }}</div>
      </el-table-column>
      <el-table-column prop="" align="center" label="其他">
        <!-- <div slot-scope="{ row }">{{ row.endTime | time }}</div> -->
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import dayjs from "dayjs";
let nowDate = dayjs(Date.now());

export default Vue.extend({
  name: "ActTable",
  props: {
    now: String
  },
  mounted() {
    // setTimeout(() => {
    //   this.$refs.root.querySelector(".el-table__body-wrapper").scrollLeft = 120
    // }, 100)
  },
  data() {
    return {
      tableData: [
        {
          id: 1,
          roomName: "dsa",
          startTime: "2019-09-20 06:12",
          endTime: "2019-09-20 08:12",
          duration: 2
        },
        {
          id: 2,
          roomName: "手打",
          startTime: "2019-09-20 16:12",
          endTime: "2019-09-20 20:12",
          duration: 4
        }
      ]
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.table-header {
  padding: 6px;
  background: #fff;
}
.table-edit--icon {
  color: #e51c23;
  font-size: 24px;
  padding-left: 6px;
}
.act--table {
  background: #fff;
  position: relative;
}
</style>
