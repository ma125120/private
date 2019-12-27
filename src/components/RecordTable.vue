<template>
  <div class="record--table m-table" ref="root">
    <div class="no-text add-mt" v-if="records.length === 0">暂无数据</div>
    <el-table 
      :data="records"
      border
      empty-text="."
      @click.native="showPop()"
      :row-class-name="getRowClass"
      @row-contextmenu="showPop"
      style="width: 100%" 
      :height="this.$route.path === '/work/record' ? height1 : height"
    >
      <el-table-column label="预约 记录表" width="60px" align="center" fixed="left">
        <div slot-scope="{ row, $index }" class="all-center">
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
        
        prop="duration"
        align="center"
        :formatter="$filters.duration"
        width="118px"
        label="预计时长"
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
        label="备注"
      ></el-table-column>
      <el-table-column
        prop="staffName"
        align="center"
        width="208px"
        label="预订员工"
      ></el-table-column>
    </el-table>

    <el-popover
      placement="bottom"
      width="40"
      trigger="manual"
      popper-class="my-pop"
      v-model="visible"
    >
      <div class="pop-item" @click="$router.push(`/reverse?id=${activeId}`)">
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

<script lang="ts">
import Vue from "vue";
import { records, formatRecord } from "@/util/index";
import dayjs from "dayjs";
import { mapGetters, mapState, mapActions } from 'vuex';
let nowDate = dayjs(Date.now());
const height1 = (window.innerHeight - 74 - 72 - 76)

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
      tableData: [],
      visible: false,
      obj: null,
      x: 0,
      y: 0,
      height: 340, 
      height1,
    };
  },
  computed: {
    ...mapGetters([
      'realRecords'
    ]),
    ...mapState([
      'records'
    ]),
    activeId() {
      return this.obj && this.obj.objectId;
    }
  },
  methods: {
    ...mapActions([
      'delRecord',
    ]),
    getRowClass({row, rowIndex}) {
      if (row.objectId === this.activeId) {
        return 'green-border'
      }
      return ''
    },
    showPop(row, column, evt) {
      if (!row) {
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
        this.x = clientX;
        this.y = clientY;
      }

      setTimeout(() => {
        this.obj = row;

        this.visible = true;
      }, 50)
    },
    async del() {
      await this.delRecord(this.obj);

      this.obj = null;
      this.visible = false;
    },
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
