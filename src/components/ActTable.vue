<template>
  <div class="act--table m-table" ref="root">
    <div class="table-header align-center">
      <div class="bold">实际到店表</div>
      <el-button type="primary" @click="isShow = true">新增项目</el-button>
    </div>
    <el-table :data="acts" border style="width: 100%" height="340">
      <el-table-column label="" align="center" width="118px">
        <div slot-scope="{ row, $index }" class="align-center">
          {{ $index + 1 }}
          <img src="img/edit.png" alt="" class="edit-icon" @click="edit(row)" />
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
        prop="startTime"
        align="center"
        width="118px"
        label="离店时间"
      >
        <div slot-scope="{ row }">
          {{ row.endTime | time }}
        </div>
      </el-table-column>
      <el-table-column
        prop="startTime"
        align="center"
        width="118px"
        label="缴费状态"
      >
        <div slot-scope="{ row }">
          {{ row.status | payStatus }}
        </div>
      </el-table-column>
      <el-table-column
        prop="roomCharge"
        align="center"
        width="118px"
        label="房间费"
      ></el-table-column>
      <el-table-column
        prop="snackFee"
        align="center"
        width="118px"
        label="小吃费"
      ></el-table-column>
      <el-table-column
        prop="shouldPay"
        align="center"
        width="118px"
        label="应收总金额"
      ></el-table-column>
      <el-table-column
        prop="discount"
        align="center"
        width="118px"
        label="优惠金额"
      ></el-table-column>
      <el-table-column
        prop="actMoney"
        align="center"
        width="118px"
        label="实收总金额"
      ></el-table-column>
      <el-table-column
        prop="payTypeStr"
        align="center"
        width="118px"
        label="付款方式"
      ></el-table-column>
      <el-table-column
        fixed="right"
        prop="duration"
        align="center"
        width="118px"
        label="实际时长/h"
      ></el-table-column>
      <!-- <el-table-column prop="" align="center" label="其他">
        <div slot-scope="{ row }">{{ row.endTime | time }}</div>
      </el-table-column> -->
    </el-table>
    <AddAct :isShow.sync="isShow" :obj="obj"></AddAct>
  </div>
</template>

<script>
import Vue from "vue";
import dayjs from "dayjs";
import AddAct from '@/views/table/AddAct';
import { mapState } from 'vuex';

let nowDate = dayjs(Date.now());

export default Vue.extend({
  name: "ActTable",
  components: { AddAct },
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
      isShow: false,
      obj: {},
      tableData: []
    };
  },
  computed: {
    ...mapState([
      'acts'
    ])
  },
  methods: {
    edit(obj) {
      this.isShow = true;
      this.obj = obj;
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.table-header {
  padding: 11px 6px;
  background: #fff;
  & .el-button {
    width: 80px;
    height: 26px;
    font-size: 14px;
    padding: 0;
    margin-left: 12px;
  }
}
.edit-icon {
  width: 24px;
  padding-left: 12px;
  margin-top: -4px;
  cursor: pointer;
}
.act--table {
  background: #fff;
  position: relative;
}
</style>
