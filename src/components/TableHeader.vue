<template>
  <div class="my-table--header between-center box">
    <div class="align-center">
      <el-button type="primary" @click="$router.push('/reverse')"
        >添加预约</el-button
      >
      <div class="bj-time">北京时间{{time}}</div>
    </div>
    <div class="align-center">
      <div :class="`el-icon-arrow-left date-icon ${canPrev ? '' : 'dis-btn'}`" @click="del"></div>
      <el-date-picker
        v-model="date1"
        @change="changeDate"
        :clearable="false"
        value-format="yyyy-MM-dd"
        align="right"
        type="date"
        ref="date"
        placeholder="选择日期"
        :picker-options="options"
      >
      </el-date-picker>
      <div class="el-icon-arrow-right date-icon" @click="addDate"></div>
      <div class="bold week-day hover" @click="pickerDate">星期{{ day }}</div>
    </div>
    <div class="align-center">
      <div class="blue-block"></div>
      <div class="block-item">已预定</div>
      <div class="white-block block-item"></div>
      <div class="b">未预定</div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { shortcuts } from "@/util/date";
import { now, weeks, getToday } from "@/util/date";
import dayjs from "dayjs";
import { mapState, mapActions, mapMutations } from 'vuex';

export default Vue.extend({
  name: "TableHeader",
  model: {
    event: "change",
    // prop: "date"
  },
  props: {
    // date: {
    //   type: String || Number,
    //   default: now
    // }
  },
  created() {
    this.date1 = this.selectDay;
    this.getTime();
  },
  destroyed() {
    clearInterval(this.tid);
  },
  data() {
    let disFn = (time) => {
      let nowTime = this.nowUser && dayjs(this.nowUser.createTime).subtract(1, 'day').valueOf() || Date.now();
      // let nowTime = this.nowUser && dayjs(this.nowUser.createTime).subtract(0, 'day').valueOf() || Date.now();
      return time.getTime() < nowTime;
    }
    let selectDay = this.selectDay;

    return {
      date1: selectDay || now,
      time: '',
      options: {
        disabledDate: disFn,
        shortcuts
      }
    };
  },
  methods: {
    changeDate(val) {
      this.$emit("change", val);
      this.changeDay(val);
    },
    ...mapActions([
      'changeDay'
    ]),
    ...mapMutations([
      'addDate',
      'delDate'
    ]),
    getTime() {
      this.time = getToday().hm;
      this.tid = setInterval(() => {
        this.time = getToday().hm;
      }, 1000 * 60)
    },
    del() {
      if (this.canPrev) {
        this.delDate();
      }
    },
    pickerDate() {
      this.$refs.date.focus()
    }
  },
  computed: {
    day() {
      return weeks[dayjs(this.date1).day()];
    },
    ...mapState([
      'selectDay',
      'nowUser'
    ]),
    canPrev() {
      return dayjs(this.date1).isAfter(dayjs(this.nowUser.createTime).subtract(1, 'day'))
    }
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
  margin: 12px 12px 0;
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
.date-icon {
  font-size: 28px;
  cursor: pointer;
}
.el-icon-arrow-left {
  margin-right: 12px;
}
.el-icon-arrow-right {
  margin-left: 12px;
}
</style>
