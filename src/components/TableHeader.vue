<template>
  <div class="my-table--header between-center">
    <div class="align-center">
      <el-button type="primary" @click="$router.push('/reverse')"
        >添加预约</el-button
      >
      <div class="bj-time">北京时间13:00</div>
    </div>
    <div class="align-center">
      <el-date-picker
        v-model="date1"
        @change="changeDate"
        :clearable="false"
        value-format="yyyy-MM-dd"
        align="right"
        type="date"
        placeholder="选择日期"
        :picker-options="options"
      >
      </el-date-picker>
      <div class="bold week-day">星期{{ day }}</div>
    </div>
    <div class="align-center">
      <div class="blue-block"></div>
      <div class="block-item">已预定</div>
      <div class="white-block block-item"></div>
      <div class="b">未预定</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { shortcuts } from "@/util/date";
import { now, weeks } from "@/util/date";
import dayjs from "dayjs";
import { mapState, mapActions } from 'vuex';

export default Vue.extend({
  name: "TableHeader",
  model: {
    event: "change",
    prop: "date"
  },
  props: {
    date: {
      type: String || Number,
      default: now
    }
  },
  created() {},
  data() {
    return {
      date1: now,
      options: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
        shortcuts
      }
    };
  },
  methods: {
    changeDate(val) {
      this.$emit("change", val);
      this.changeDay(val)
    },
    ...mapActions([
      'changeDay'
    ])
  },
  computed: {
    day() {
      return weeks[dayjs(this.date1).day()];
    },
    ...mapState([
      'selectDay',
    ])
  },
  watch: {
    selectDay(val) {
      this.date1 = val;
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.my-table--header {
  margin: 12px;
  background: #807e7d;
  padding: 8px 32px 8px 60px;
  font-size: 20px;
  color: #fff;
}
.bj-time {
  margin-left: 32px;
}
.blue-block,
.white-block {
  background: #0d6dcc;
  width: 30px;
  height: 26px;
}
.white-block {
  background: #fff;
}
.block-item {
  margin: 0 12px;
}
.week-day {
  margin-left: 12px;
}
</style>
