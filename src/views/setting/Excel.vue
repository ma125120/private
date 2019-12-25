<template>
  <SettingLayout>
    <div class="excel-page">
      <div class="align-center excel-header">
        <MySelect
          :options="userChildren"
          labelKey="branchStoreName"
          v-model="form.branchStoreId"
          placeholder="请选择分店名称"
        />
        <div class="md-el">
          <el-radio-group v-model="rangeId">
            <el-radio :label="item.id" v-for="item in options" :key="item.id">{{ item.name }}</el-radio>
          </el-radio-group>
        </div>
        <el-date-picker
          v-model="form.range"
          @change="changeDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </div>
      <div class="all-center" style="margin-top: 60px;">
        <el-button type="primary" @click="exportAct">导出实际到店表</el-button>
        <div class="md-mh"></div>
        <el-button type="primary" @click="exportRecord">导出预约记录表</el-button>
      </div>
      <div class="single-text all-center">（导出文件格式是EXCEL表格）</div>
    </div>
  </SettingLayout>
</template>

<script>
import Vue from "vue";
import { getLastWeekRange, getLastMonthRange, getTodayRange, isSameRange } from '@/util/date'
import { mapGetters, mapState } from 'vuex';
import { actHeader, exportExcel, recordHeader } from '../../util/excel';

const options = [
  { id: 1, name: '上周', range: getLastWeekRange(), },
  { id: 2, name: '上个月', range: getLastMonthRange(), },
  { id: 3, name: '今天', range: getTodayRange(), },
  { id: 4, name: '自定义', range: [], },
]
let isHost = false;

export default Vue.extend({
  name: "Excel",
  props: {
    msg: String
  },
  data() {
    return {
      options,
      rangeId: 1,
      form: {
        range: options[0].range,
        branchStoreId: '',
      }
    }
  },
  methods: {
    changeDate(val) {
      let obj = options.find(v => isSameRange(v.range, val));
      if (obj) {
        this.rangeId = obj.id;
        isHost = true;
        setTimeout(() => isHost = false, 30)
      }
    },
    async exportAct() {
      const { branchStoreId, range, } = this.form;
      if (!branchStoreId) {
        this.$nerror('请选择分店名称');
        return ;
      }

      let res = await this.$api.act.getList(this.nowUser.companyId, branchStoreId, range[0], range[1])
      exportExcel(res, actHeader, '实际到店表', true);
    },
    async exportRecord() {
      const { branchStoreId, range, } = this.form;
      if (!branchStoreId) {
        this.$nerror('请选择分店名称');
        return ;
      }

      let res = await this.$api.record.getList(this.nowUser.companyId, branchStoreId, range[0], range[1])
      exportExcel(res, recordHeader, '预约记录表', true);
    },
  },
  watch: {
    rangeId(id) {
      let obj = options.find(v => v.id === id);
      if (obj && !isHost) {
        this.form.range = obj.range;
      }
    },
  },
  computed: {
    ...mapState([
      'userChildren',
      'nowUser',
    ])
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.md-el {
  margin: 0 32px;
}
.excel-header {
  border-bottom: 5px solid #bbb;
  padding: 12px 0 24px 32px;
}
.md-mh {
  width: 80px;
}
.single-text {
  margin-top: 36px;
  font-size: 16px;
  color: #101010;
}
</style>
