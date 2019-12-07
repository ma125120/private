<template>
  <el-date-picker
    v-model="date1"
    @change="changeDate"
    value-format="yyyy-MM-dd"
    align="right"
    type="date"
    placeholder="选择日期"
    :picker-options="options"
  >
  </el-date-picker>
</template>

<script lang="ts">
import Vue from "vue";
import { now, weeks, shortcuts } from "@/util/date";
import dayjs from "dayjs";

export default Vue.extend({
  name: "MyDatePicker",
  model: {
    event: "change",
    prop: "date"
  },
  props: {
    date: {
      type: String || Number,
      default: now
    },
    startTime: String,
    clearable: {
      type: Boolean,
      default: true
    }
  },
  created() {},
  data() {
    let _this = this;
    return {
      date1: now,
      options: {
        disabledDate(time) {
          return _this.startTime ? time.getTime() < _this.startTime : false;
        },
        shortcuts
      }
    };
  },
  methods: {
    changeDate(val) {
      this.$emit("change", val);
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
