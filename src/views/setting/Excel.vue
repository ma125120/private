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
          :picker-options="pickerOptions"
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
import dayjs from 'dayjs'
import { filterRecord } from '../../util';

const options = [
  { id: 1, name: '上周', range: getLastWeekRange(), },
  { id: 2, name: '上个月', range: getLastMonthRange(), },
  { id: 3, name: '今天', range: getTodayRange(), },
  { id: 4, name: '自定义', range: [], },
];
let isHost = false;

export default Vue.extend({
  name: "Excel",
  props: {
    msg: String
  },
  created() {
    if (!this.form.branchStoreId && this.userChildren && this.userChildren.length > 0) {
      this.form.branchStoreId = this.userChildren[0].objectId;
    }
  },
  data() {
    let _this = this;

    return {
      pickerOptions: {
        disabledDate(time) {
          return _this.startTime ? dayjs(time.getTime()).isBefore(dayjs(_this.startTime)) : false;
        },
      },
      options,
      rangeId: 1,
      form: {
        range: options[0].range,
        branchStoreId: '',
      },
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
    changeAccount(val) {
      const user = this.userChildren.find(v => v.objectId === val);
      const time = dayjs(user.createTime);
      let _options = options;
      // 不在上个月，取0，2，3
      if (time.isAfter(dayjs(options[1].range[1]).subtract(1, 'day'))) {
        _options = [ options[0], ...options.slice(2) ]
      } else if (time.isAfter(dayjs(options[0].range[1]).subtract(1, 'day'))) {
        // 不在上周，只取2，3
        _options = options.slice(2);
      }

      this.options = _options;
      if (!_options.every(v => isSameRange(v.range, this.form.range))) {
        this.form.range = _options[0].range;
        this.rangeId = _options[0].id;
      }
    },
    async exportAct() {
      const { branchStoreId, range, } = this.form;
      if (!branchStoreId) {
        this.$nerror('请选择分店名称');
        return ;
      }
      if (!range[0] || !range[1]) {
        this.$nerror('请选择日期范围');
        return ;
      }

      // const name = this.userChildren.find(v => v.objectId === branchStoreId).branchStoreName;
      let res = await this.$api.act.getList(this.nowUser.companyId, branchStoreId, 
      dayjs(range[0]).subtract(1, 'day').format(`YYYY-MM-DD`), 
      dayjs(range[1]).add(2, 'day').format(`YYYY-MM-DD`))
      exportExcel(res, actHeader, '实际到店表', range[0], range[1], `实际到店表`);
    },
    async exportRecord() {
      const { branchStoreId, range, } = this.form;
      if (!branchStoreId) {
        this.$nerror('请选择分店名称');
        return ;
      }

      const name = this.userChildren.find(v => v.objectId === branchStoreId).branchStoreName;
      let res = await this.$api.record.getList(this.nowUser.companyId, branchStoreId, 
      dayjs(range[0]).subtract(1, 'day').format(`YYYY-MM-DD`), 
      dayjs(range[1]).add(2, 'day').format(`YYYY-MM-DD`))
      res = res.filter(v => dayjs(v.startTime).isAfter(dayjs(range[0])) && dayjs(v.startTime).isBefore(dayjs(range[1]).add(1, 'day')))
      exportExcel(res, recordHeader, '预约记录表', range[0], range[1], `预约记录表${name}`);
    },
  },
  watch: {
    rangeId(id) {
      let obj = options.find(v => v.id === id);
      if (obj && !isHost) {
        this.form.range = obj.range;
      }
    },
    userChildren(children) {
      const { branchStoreId, } = this.form;
      if (!branchStoreId) {
        this.form.branchStoreId = children[0].objectId;
      }
    },
    // 'form.branchStoreId'(val, old) {
    //   if (val != old) {
    //     this.changeAccount(val)
    //   }
    // }
  },
  computed: {
    ...mapState([
      'userChildren',
      'nowUser',
    ]),
    currentUser() {
      return this.userChildren.find(v => v.objectId === this.form.branchStoreId)
    },
    startTime() {
      const user = this.currentUser;
      if (user) {
        return user.createTime
      }

      return undefined;
    }
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
