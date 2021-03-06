<template>
  <div class="reverse-table m-table" @click="showPop(undefined)">
    <div class="table-outer">
      <div class="no-text" v-if="realRecords.length === 0">暂无数据</div>
      <div class="extra-bold">预约分布表</div>
      <div class="table-inner" ref="table" @scroll="scrollWatch">
        <div
          class="table"
          cellspacing="0"
          cellpadding="0"
          :style="`width: ${(headers.length) * 114}px; height: ${height1}px`"
        >
          
          <div class="bold-tr tr">
            <div class="td" v-for="text in headers" :key="text">{{ text }}</div>
          </div>
          <div class="tr" v-for="record in realRecords" :key="record.roomId">
            <div class="td hover" :title="record.roomName">
              <div class="td-div ellipsis">{{ record.roomName }}</div>
            </div>
            <div class="td" v-for="text in comHeaders" :key="text"></div>
            <el-popover
              v-for="child in record.children"
              :key="child.objectId"
              placement="bottom"
              trigger="manual"
              v-model="child.visible"
            >
              <div class="table-note">
                <div>顾客电话：{{ child.mobile }}</div>
                <div>到店时间：{{ child.startTimeStr }}</div>
                <div>时长：{{ child.durationStr }}</div>
                <div>离店时间：{{ child.endTimeStr }}</div>
                <div v-if="child.note">备注：{{ child.note }}</div>
              </div>
              <div
                class="td-section hover"
                @mouseenter="
                  child.visible = true;
                "
                @mouseleave="child.visible = false"
                @contextmenu.prevent="
                  showPop(child.objectId, $event);
                  child.visible = false;
                "
                :style="
                  `width: ${child.width *
                    114}px; position: absolute; left: ${114 *
                    (child.left + 1)}px; top: ${50 * child.top}px`
                "
                slot="reference"
              />
            </el-popover>
          </div>
        </div>

        <div
          v-show="this.left > 114"
          class="left-fixed--table"
          :style="`top: ${this.top * -1 + 50}px; z-index: 6;`"
        >
          <!-- <div class="tr">
            <div class="bold td">预约分布表</div>
          </div> -->
          <div class="tr" v-for="record in realRecords" :key="record.recordId">
            <div class="ellipsis hover td" :title="record.roomName">
              <div class="td-div ellipsis">{{ record.roomName }}</div>
            </div>
          </div>
        </div>
<!-- 顶部table -->
        <table
          class="top-fixed--table"
          v-show="this.top > 50"
          :style="`left: ${this.left * -1 + 114}px; top: 0; z-index: 5;`"
          :width="`${(headers.length - 1) * 114}px`"
        >
          <div class="tr">
            <div class="td" v-for="text in headers.slice(1)" :key="text">{{ text }}</div>
          </div>
        </table>
      </div>
    </div>

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
      <el-popconfirm title="确认删除本行预约信息吗？" @onConfirm="del">
        <div class="pop-item" slot="reference">
          <i class="el-icon-delete-solid"></i>删除该条
        </div>
      </el-popconfirm>

      <div
        slot="reference"
        :style="`position: fixed; top: ${y}px; left: ${x}px`"
      ></div>
    </el-popover>
    <slot></slot>
  </div>
</template>

<script>
// @ is an alias to /src
import { formatRecord } from "@/util/index";
import { mapState, mapGetters, mapActions } from 'vuex';
const height1 = (window.innerHeight - 84 - 100)
const headers = new Array(24)
  .fill(0)
  .map((v, i) => i + ":00")
  // .concat(new Array(8).fill(0).map((v, i) => i + ":00"));

export default {
  name: "ReserveTable",
  components: {},
  computed: {
    comHeaders() {
      return this.headers.slice(1)
    },
    ...mapState([
      // 'records',
    ]),
    ...mapGetters([
      'realRecords',
    ])
  },
  watch: {
    realRecords(list) {
      this.records = list;
    }
  },
  data() {
    return {
      direction: "",
      visible: false,
      activeId: "",
      top: 0,
      left: 0,
      x: 0,
      y: 0,
      records: [],
      height1,
      // records: formatRecord(records),
      headers: ["预约分布表", ...headers]
    };
  },
  created() {
    document.addEventListener('click', this.closePop)
  },
  destroyed() {
    document.removeEventListener('click', this.closePop)
  },
  methods: {
    closePop(evt) {
      this.showPop();
    },
    ...mapActions([
      'delRecord',
    ]),
    scrollWatch(event) {
      const { scrollTop, scrollLeft } = this.$refs.table;
      const diffTop = Math.abs(scrollTop - this.top);
      const diffLeft = Math.abs(scrollLeft - this.left);
      this.direction = diffTop > diffLeft ? "top" : "left";

      this.top = scrollTop;
      this.left = scrollLeft;
    },
    showPop(id, evt) {
      this.activeId = id;

      let isShow = evt !== undefined;
      if (evt) {
        const { clientX, clientY } = evt;
        this.x = clientX + 32;
        this.y = clientY;
      }

      if (this.visible) {
        this.visible = false;
      }
      setTimeout(() => {
        this.visible = isShow;
      }, 50)
    },
    async del() {
      await this.delRecord({ objectId: this.activeId });

      this.activeId = undefined;
      this.visible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
$gray: #ebeef5;
.reverse-table {
  text-align: center;
}
.table-outer {
  width: 100%;
  height: 100%;
  // height: 400px;
  overflow: hidden;
  position: relative;
  background: #fff;
}
.table-inner {
  width: 100%;
  height: 100%;
  overflow: auto;
}

table,
.table {
  border-collapse: separate;
  table-layout: fixed;
  background: #fff;
  border: 1px solid $gray;
  border-bottom: none;
  border-right: none;
  border-spacing: 0;
}
tr {
  position: relative;
}
.tr {
  display: flex;
}
.table {
  position: relative;
  .bold-tr .td:first-of-type,
  .bold-tr td:first-of-type {
    font-weight: bold;
  }
}
.left-fixed--table,
.top-fixed--table {
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
}
.left-fixed--table {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.12);
  z-index: 2;
  bottom: 10px;
  & .td {
    border-right: 0;
  }
}
.top-fixed--table {
  z-index: 1;
}

td,
.td {
  width: 114px;
  box-sizing: border-box;
  padding: 0 6px;
  max-width: 114px;
  height: 50px;
  border-bottom: 1px solid $gray;
  border-right: 1px solid $gray;
  display: flex;
  align-items: center;
  justify-content: center;
}

.td-section {
  background: #0d6dcc;
  height: 50px;
  border: 1px solid $gray;
  position: absolute;
  top: 0;
  left: 300px;
}
.table-note {
  font-size: 18px;
}
.extra-bold {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 8;
  width: 114px;
  height: 50px;
  line-height: 50px;
  background: #fff;
  border-right: 1px solid $gray;
  border-bottom: 1px solid $gray;
  text-align: center;
  font-weight: bold;
}
</style>
