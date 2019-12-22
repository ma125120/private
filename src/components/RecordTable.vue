<template>
  <div class="record--table m-table" ref="root">
    <el-table :data="records" border style="width: 100%" height="340">
      <el-table-column label="预约" width="60px">
        <div slot-scope="{ row, $index }" class="align-center">
          {{ $index + 1 }}
        </div>
      </el-table-column>
      <el-table-column
        prop="roomName"
        align="center"
        width="118px"
        label="房间"
      ></el-table-column>
      <el-table-column
        prop="mobile"
        align="center"
        width="118px"
        label="电话"
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
        :formatter="$filters.duration"
        width="118px"
        label="预计时长/h"
      ></el-table-column>
      <el-table-column
        prop="endTime"
        align="center"
        width="118px"
        label="离店时间"
      >
        <div slot-scope="{ row }">{{ row.endTime | time }}</div>
      </el-table-column>
      <el-table-column
        prop="count"
        align="center"
        width="118px"
        label="人数"
      ></el-table-column>
      <el-table-column
        prop="note"
        align="center"
        width="208px"
        label="备注"
      ></el-table-column>
      <el-table-column
        prop="staffName"
        align="center"
        width="208px"
        label="预定员工"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { records, formatRecord } from "@/util/index";
import dayjs from "dayjs";
import { mapGetters, mapState } from 'vuex';
let nowDate = dayjs(Date.now());

export default Vue.extend({
  name: "RecordTable",
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
      // records,
      tableData: []
    };
  },
  computed: {
    ...mapGetters([
      'realRecords'
    ]),
    ...mapState([
      'records'
    ])
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
.record--table {
  background: #fff;
  text-align: center;
  position: relative;
}
</style>
