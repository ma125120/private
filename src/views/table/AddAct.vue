<template>
  <el-dialog 
    :close-on-click-modal="true"
    :close-on-press-escape="false"
    :show-close="false"
    center
    custom-class="my-dialog sm-dialog"
    @close="close"
    :visible.sync="show">
    <div class="add-act">
      <el-form
        ref="dForm"
        class="my-form"
        :model="form"
        :rules="rules"
        label-width="228px"
        label-position="left"
      >
        <el-form-item label="房间" prop="roomId">
          <MySelect 
            v-model="form.roomId" 
            placeholder="请选择房间"
            :options="roomList" 
            labelKey="roomName" />
        </el-form-item>
        <el-form-item label="到店时间" required prop="startTime">
          <div class="align-center">
            <MySelect 
              v-model="form.startHour" 
              :options="hoursWith0"
              @change="computeTime"
              idKey="id" 
              :width="82"
              labelKey="name"></MySelect>
            <div class="pad-width"></div>
            <MySelect
              v-model="form.startMinute"
              :options="minutesWith0"
              @change="computeTime"
              :width="82"
               idKey="id" labelKey="name"
            ></MySelect>
          </div>
        </el-form-item>
        <el-form-item label="实际时长" required prop="duration">
          <div class="align-center">
            <MySelect
              v-model="form.durationHour"
              @change="computeTime();$emit('change')"
              :options="hours"
              :width="82"
               idKey="id" labelKey="name"
            ></MySelect>
            <div class="pad-width"></div>
            <MySelect
              v-model="form.durationMinute"
              @change="computeTime();$emit('change')"
              idKey="id" labelKey="name"
              :width="82"
              :options="minutes"
            ></MySelect>
          </div>
        </el-form-item>
        <el-form-item label="离店时间" required>
          <div class="align-center">
            <MySelect
              v-model="form.endHour" 
              :options="hoursWith0" 
              disabled
              idKey="id" 
              :width="82"
              labelKey="name"></MySelect>
            <div class="pad-width"></div>
            <MySelect
              v-model="form.endMinute"
              :options="minutesWith0"
              :width="82"
              disabled
               idKey="id" labelKey="name"
            ></MySelect>
          </div>
        </el-form-item>
        <el-form-item label="缴费状态" required prop="status">
          <MySelect
            v-model="form.status" 
            :options="actStatus" 
            idKey="id" 
            :width="120"
            labelKey="name"></MySelect>
        </el-form-item>
        <el-form-item label="房间费" prop="roomCharge">
          <MyNumber
            style="width: 290px"
            controls-position="right"
            v-model="form.roomCharge"
            name="roomCharge"
            isFee
            @input="computePay"
            text="房间费"
            placeholder="仅限阿拉伯数字输入"
          ></MyNumber><span class="ml">元</span>
        </el-form-item>
        <el-form-item label="小吃费" prop="snackFee">
          <MyNumber
            style="width: 290px"
            v-model="form.snackFee"
            controls-position="right"
            @input="computePay"
            name="snackFee"
            text="小吃费"
            isFee
            placeholder="仅限阿拉伯数字输入"
          ></MyNumber><span class="ml">元</span>
        </el-form-item>
        <el-form-item label="应收总金额" prop="shouldPay">
          <MyNumber
            style="width: 290px"
            v-model="form.shouldPay"
            controls-position="right"
            disabled
            text="应收总金额"
            isFee
            placeholder="仅限阿拉伯数字输入"
          ></MyNumber><span class="ml">元</span>
        </el-form-item>
        <el-form-item label="优惠金额" prop="discount">
          <MyNumber
            style="width: 290px"
            v-model="form.discount"
            controls-position="right"
            @input="computeAct"
            text="优惠金额"
            isFee
            placeholder="仅限阿拉伯数字输入"
          ></MyNumber><span class="ml">元</span>
        </el-form-item>
        <el-form-item label="实收总金额" prop="actMoney">
          <MyNumber
            style="width: 290px"
            v-model="form.actMoney"
            controls-position="right"
            @input="computeDiscount"
            text="实收总金额"
            isFee
            placeholder="仅限阿拉伯数字输入"
          ></MyNumber><span class="ml">元</span>
        </el-form-item>
        <el-form-item label="付款方式(可多选)">
          <MyCheckbox
            v-model="form.payType"
            type="button" 
            :options="payTypes" 
            idKey="id" 
            :width="120"
            labelKey="name"></MyCheckbox>
        </el-form-item>
        
        <el-form-item label="人数" prop="count">
          <MyNumber
            style="width: 290px"
            v-model="form.count"
            controls-position="right"
            text="人数"
            placeholder="仅限阿拉伯数字输入"
          ></MyNumber><span class="ml">人</span>
        </el-form-item>

        <el-form-item label="房间以外收费明细" prop="note">
          <el-input
            type="textarea"
            maxlength="100"
            style="width: 290px"
            v-model="form.note"
            placeholder="多行输入，最多100字"
          ></el-input>
        </el-form-item>
        <el-form-item label="员工" prop="staffId">
          <MySelect v-model="form.staffId" :options="staffOptions" placeholder="请选择员工"></MySelect>
        </el-form-item>

        <div class="dialog-footer">
          <el-button @click="close">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </el-form>
    </div>
    <RoomDialog :isShow.sync="isShowRoom" :two="role !== 2"></RoomDialog>
  </el-dialog>
</template>

<script>
import Vue from "vue";
import { now, hoursWith0, hours, minutesWith0, minutes, DATE_STR_DETAIL } from "@/util/date";
import { rooms, staffes } from "@/util/mock";
import { records, record2form, getActForm } from "@/util/index";
import dayjs from "dayjs";
import { actStatus, payTypes } from '@/types/sql'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import { validateNum } from '@/util/rule'
import validateRoom from './rule'
import RoomDialog from './RoomDialog'

const getNum = (num) => `${(+num).toFixed(2)}`//.replace(/\.00$/g, '').replace(/(\.\d)0$/g, (str, $1) => $1)

export default Vue.extend({
  name: "AddAct",
  components: { RoomDialog },
  props: {
    isShow: Boolean,
    obj: {
      type: Object,
      default() { return {} },
    },
  },
  data() {
    const self = this;

    return {
      isShowRoom: false,
      dialogVisible: false,
      now,
      show: true,
      actStatus, payTypes,
      hoursWith0,
      hours,
      minutesWith0,
      minutes,
      rules: {
        roomId: [{ required: true, message: "请选择房间" }],
        startDate: [{ required: true, message: "请选择到店日期" }],
        startTime: [{ required: true, message: "请选择到店时间" }],
        status: [{ required: true, message: "请选择缴费状态" }],
        payType: [{ required: true, message: "请选择付款方式" }],
      },
      form: { ...getActForm(), durationHour: "2", startDate: self.selectDay }
    };
  },
  created() {
    this.show = this.isShow;
    this.watchProps(this.obj)
  },
  methods: {
    ...mapActions([
      'addAct',
    ]),
    watchProps(obj) {
      if (obj && obj.objectId) {
        this.form = { ...obj }
      } else {
        this.form = { ...getActForm(), durationHour: "2", startDate: this.selectDay }
      }
    },
    async fetchData() {
      const { id } = this.$route.query;
      if (id) {
        let data = await this.$api.record.find(id);
        this.form = data;
      }
    },
    computeTime() {
      let form = { ...this.form, };
      if (!form.startDate) {
        form.startDate = this.selectDay;
        this.form.startDate = this.selectDay;
      }

      form.startTime = dayjs(form.startDate)
        .add(parseInt(form.startHour) , "hour")
        .add(parseInt(form.startMinute), "minute").format(DATE_STR_DETAIL);

      let endTime = dayjs(form.startTime)
        .add(parseInt(form.durationHour), "hour")
        .add(parseInt(form.durationMinute), "minute");
      this.form.endHour = (endTime.get('hour') + '').padStart(2, '0');
      this.form.endMinute = (endTime.get('minute') + '').padStart(2, '0');

      this.form.endTime = form.endTime = endTime.format(DATE_STR_DETAIL)
      this.form.startTime = form.startTime;
      this.form.duration = +(+form.durationHour + +form.durationMinute / 60).toFixed(2);
      
      return { ...this.form };
    },
    computePay(val, name, otherName) {
      const num = +(val === '.' ? 0 : val) + +(this.form[otherName] === '.' ? 0 : this.form[otherName])
      this.form.shouldPay = getNum(num);
      this.computeAct(this.form.discount)
    },
    computeDiscount(val) {
      if (!this.form.shouldPay) return ;
      this.form.discount = this.sub(val, this.form.shouldPay);
    },
    computeAct(val) {
      if (!this.form.shouldPay) return ;
      this.form.actMoney = this.sub(this.form.shouldPay, val);
    },
    sub(a, b) {
      return getNum((a === '.' ? 0 : a) - (b === '.' ? 0 : b));
    },
    save() {
      const form = this.getRealForm();
      if (validateRoom(form, this.roomList)) {
        this.isShowRoom = true;
        return ;
      }
      validateNum(form);
      this.$refs.dForm.validate(async (vaild, params) => {
        if (vaild) {
          // const form = this.getRealForm();
          await this.addAct(form);

          this.$emit('update:isShow', false);
        } else {
          this.$errorForm(params)
        }
      });
    },
    getRealForm() {
      let form = this.computeTime();
      form.count = +form.count || 0;
      form.discount = +form.discount || 0;
      form.shouldPay = +form.shouldPay || 0;
      form.snackFee = +form.snackFee || 0;
      form.status = +form.status || 0;
      form.roomCharge = +form.roomCharge || 0;
      form.actMoney = +form.actMoney || 0;
      form.roomName = this.roomMap[form.roomId] || '';
      form.staffName = this.staffMap[form.staffId] || '';
      form.duration = +form.durationHour + +form.durationMinute / 60;
      form.parentId = this.nowUser.objectId;
      form.superId = this.nowUser.companyId;

      return { ...form };
    },
    back() {
      this.dialogVisible = true;
    },
    del() {

    },
    close() {
      this.$emit('update:isShow', false);
      this.form = { ...getActForm(), durationHour: "2", };
    }
  },
  watch: {
    isShow(val) {
      this.show = val;
    },
    obj(val) {
      this.watchProps(val)
    },
    selectDay(date) {
      this.form.startDate = date;
    }
  },
  computed: {
    ...mapState([
      'roomList',
      'nowUser',
      'selectDay'
      // 'staffOptions',
    ]),
    ...mapGetters([
      'staffOptions',
      'staffMap',
      'roomMap',
      'role'
    ])
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.add-reverse {
  padding: 0 70px;
}
.add-fix {
  padding: 20px 0;
  border-bottom: 5px solid #bbb;
  position: fixed;
  top: 95px;
  left: 70px;
  right: 70px;
  background: #f0efef;
  z-index: 5;
}
.add-title {
  font-size: 28px;
  margin-right: 116px;
}
.fix-place {
  height: 85px;
}
.my-form {
  margin-top: -24px;
}
.ml {
  margin-left: 12px;
}
.pd-btn {
  margin: 0 12px;
}
.my-radio--label {
  font-size: 18px;
  margin-right: 32px;
  background: #fff;
  border: 1px solid #fff;
  color: #000;
  width: 120px;
  border-radius: 4px;
  @include all-center();
  display: inline-flex;
  &.active {
    color: $--color-primary;
    border: 1px solid $--color-primary;
  }
}
.dialog-footer {
  position: absolute;
  right: 32px;
  bottom: 32px;
}
</style>
