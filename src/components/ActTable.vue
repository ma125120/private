<template>
  <div class="act--table m-table" ref="root" style="width: 100%; height: 100%;min-height: 340px;">
    <div class="table-header align-center">
      <div class="bold">实际到店表</div>
      <el-button type="primary" @click="isShow = true">新增项目</el-button>
    </div>
    <div class="no-text add-mt" v-if="acts.length === 0">暂无数据</div>
    <el-table 
      :data="acts" 
      border 
      style="width: 100%;"
      :row-class-name="getRowClass"
      empty-text="."
      @click.native="showPop()"
      @row-contextmenu="showPop"
      >
      <el-table-column label="" align="center" width="80px" fixed="left">
        <div slot-scope="{ row, $index }" class="align-center">
          <template v-if="$index !== acts.length - 1">
            {{ $index + 1 }}
            <img src="img/edit.png" alt="" class="edit-icon" @click="edit(row)" />
          </template>
          <template v-else>
            金额总计
          </template>
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
        <div slot-scope="{ row }" :class="`${row.status === 2 ? 'red-text' : ''}`">
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
        prop="count"
        align="center"
        width="68px"
        label="人数"
      ></el-table-column>
      <el-table-column
        prop="note"
        align="center"
        width="288px"
        label="房费以外的收费项目明细"
      ></el-table-column>
      <el-table-column
        prop="staffName"
        align="center"
        width="288px"
        label="员工"
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

    <el-popover
      placement="bottom"
      width="40"
      trigger="manual"
      popper-class="my-pop"
      v-model="visible"
    >
      <div class="pop-item" @click="edit(obj)">
        <i class="el-icon-edit"></i>编辑该条
      </div>
      <el-popconfirm title="确定要删除本行信息吗？" @onConfirm="del">
        <div class="pop-item" slot="reference">
          <i class="el-icon-delete-solid"></i>删除该条
        </div>
      </el-popconfirm>

      <div
        slot="reference"
        :style="`position: fixed; top: ${y}px; left: ${x}px; z-index: 10;`"
      ></div>
    </el-popover>

    <slot />
  </div>
</template>

<script>
import Vue from "vue";
import dayjs from "dayjs";
import AddAct from '@/views/table/AddAct';
import { mapState, mapActions } from 'vuex';

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
      visible: false,
      obj: null,
      x: 0,
      y: 0,
      tableData: [],
    };
  },
  computed: {
    ...mapState([
      'acts'
    ]),
    activeId() {
      return this.obj && this.obj.objectId
    }
  },
  methods: {
    edit(obj) {
      this.isShow = true;
      this.obj = obj;
      this.visible = false;
    },
    getRowClass({row, rowIndex}) {
      if (row.objectId === this.activeId) {
        return 'green-border'
      }
      return ''
    },
    showPop(row, column, evt) {
      if (!row || !row.objectId) {
        this.obj = null;
        this.visible = false;
        return ;
      }

      evt.preventDefault();
      if (this.visible) {
        this.visible = false;
      }
      if (evt) {
        const { clientX, clientY } = evt;
        this.x = clientX + 32;
        this.y = clientY;
      }

      setTimeout(() => {
        this.obj = row;

        this.visible = true;
      }, 50)
    },
    async del() {
      await this.delAct(this.obj);

      this.activeId = null;
      this.visible = false;
    },
    ...mapActions([
      'delAct'
    ]),
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
  margin-top: 0px;
  cursor: pointer;
}
.act--table {
  background: #fff;
  position: relative;
}
.pop-item {
  text-align: center;
  padding: 6px 12px;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  i {
    margin-right: 6px;
  }
}

</style>
