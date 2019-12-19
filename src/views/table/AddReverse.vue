<template>
  <div class="add-reverse--page my-dialog">
    <MyHeader></MyHeader>
    <div class="add-reverse">
      <div class="fix-place"></div>
      <div class="add-fix align-center">
        <h3 class="add-title">预约信息</h3>
        <div class="btn-groups">
          <el-button type="primary" @click="save">保存</el-button>
          <el-popconfirm
            class="pd-btn"
            title="退出后，已编辑的信息将被删除"
            @onConfirm="save"
            @onCancel="$router.replace('/')"
          >
            <el-button type="primary" plain slot="reference"
              >返回到工作台</el-button
            >
          </el-popconfirm>

          <el-button
            type="primary"
            plain
            icon="el-icon-delete"
            v-if="$route.query.id"
            @click="dialogVisible = true"
            >删除本条预约记录</el-button
          >
        </div>
      </div>
      <el-form
        ref="form"
        class="my-form"
        :model="form"
        :rules="rules"
        label-width="228px"
        label-position="left"
      >
        <el-form-item label="房间" prop="roomId">
          <MySelect 
            v-model="form.roomId" 
            :options="roomList" 
            labelKey="roomName" />
        </el-form-item>
        <el-form-item label="到店日期" prop="startDate">
          <span 
            :class="`my-radio--label hover ${form.startDate === now ? 'active' : ''}`"
            @click="form.startDate = now">今天</span>
          <MyDatePicker v-model="form.startDate"></MyDatePicker>
        </el-form-item>
        <el-form-item label="到店时间" required>
          <div class="align-center">
            <MySelect 
              v-model="form.startHour" 
              :options="hoursWith0" 
              idKey="id" 
              labelKey="name"></MySelect>
            <div class="pad-width"></div>
            <MySelect
              v-model="form.startMinute"
              :options="minutesWith0"
               idKey="id" labelKey="name"
            ></MySelect>
          </div>
        </el-form-item>
        <el-form-item label="预计时长" required>
          <div class="align-center">
            <MySelect
              v-model="form.durationHour"
              @change="$emit('change')"
              :options="hours"
               idKey="id" labelKey="name"
            ></MySelect>
            <div class="pad-width"></div>
            <MySelect
              v-model="form.durationMinute"
               idKey="id" labelKey="name"
              @change="$emit('change')"
              :options="minutes"
            ></MySelect>
          </div>
        </el-form-item>
        <el-form-item label="人数" prop="count">
          <el-input
            style="width: 200px"
            type="number"
            v-model="form.count"
            placeholder="点击输入阿拉伯数字"
          ></el-input><span class="ml">人</span>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input
            type="textarea"
            maxlength="40"
            style="width: 200px"
            v-model="form.note"
            placeholder="多行输入，最多40字"
          ></el-input>
        </el-form-item>
        <el-form-item label="顾客手机号" prop="mobile">
          <el-input
            style="width: 200px"
            v-model="form.mobile"
            placeholder="点击输入阿拉伯数字"
          ></el-input>
        </el-form-item>
        <el-form-item label="员工" prop="staff">
          <MySelect v-model="form.staffId" :options="staffOptions"></MySelect>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>退出后，已编辑的信息将被删除</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$router.push('/')">取 消</el-button>
        <el-button type="primary" @click="del">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { now, hoursWith0, hours, minutesWith0, minutes, DATE_STR_DETAIL } from "@/util/date";
import { rooms, staffes } from "@/util/mock";
import { records, record2form, getReverseForm } from "@/util/index";
import dayjs from "dayjs";
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default Vue.extend({
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      dialogVisible: false,
      now,
      hoursWith0,
      hours,
      minutesWith0,
      minutes,
      rules: {
        roomId: [{ required: true, message: "请选择房间" }],
        startDate: [{ required: true, message: "请选择到店日期" }],
        startTime: [{ required: true, message: "请选择到店日期" }],
        duration: [
          {
            validator(rule, value, cb) {
              console.log(rule, value);
              if (!value || value === "0:0") {
                cb(new Error("请选择预计时长"));
              }
            },
            require: true,
            trigger: "change"
          }
        ]
      },
      form: getReverseForm()
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions([
      'addRecord',
    ]),
    async fetchData() {
      const { id } = this.$route.query;
      if (id) {
        let data = await this.$api.record.find(id);
        this.form = data;
        // const data = records.find(v => v.id + "" === id);
        // data && (this.form = record2form(data));
      }
    },
    computeStart() {
      this.startTime = this.startHour + this.startMinute;
    },
    computeDuration() {
      this.duration = this.durationHour + ":" + this.durationMinute;
    },
    save() {
      this.$refs.form.validate(async (vaild, params) => {
        if (vaild) {
          const form = this.getRealForm();
          await this.addRecord(form);

          this.$pushNamed('workplace');
        } else {
          const msg = params[Object.keys(params)[0]][0].message;
          this.$notify.error({
            title: "错误",
            message: msg
          });
        }
      });
    },
    getRealForm() {
      let form = { ...this.form };
      form.startTime = dayjs(form.startDate)
        .add( parseInt(form.startHour) , "hour")
        .add(parseInt(form.startMinute), "minute").format(DATE_STR_DETAIL);
      form.count = +form.count;
      form.endTime = dayjs(form.startTime)
        .add(parseInt(form.durationHour), "hour")
        .add(parseInt(form.durationMinute), "minute")
        .format(DATE_STR_DETAIL);
      form.roomName = this.roomMap[form.roomId];
      form.staffName = this.staffMap[form.staffId];
      form.duration = +form.durationHour + +form.durationMinute / 60;
      form.parentId = this.nowUser.objectId;
      form.superId = this.nowUser.companyId;

      return form;
    },
    back() {
      this.dialogVisible = true;
    },
    del() {
      const index = records.findIndex(v => v.id + "" === this.form.id);
      console.log(records, this.form);
      records.splice(index, 1);
      this.$router.replace("/");
    }
  },
  watch: {
    startHour() {
      this.computeStart();
    },
    startMinute() {
      this.computeStart();
    },
    durationHour() {
      this.computeDuration();
    },
    durationMinute() {
      this.computeDuration();
    }
  },
  computed: {
    ...mapState([
      'roomList',
      'nowUser',
      // 'staffOptions',
    ]),
    ...mapGetters([
      'staffOptions',
      'staffMap',
      'roomMap'
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
  padding-top: 24px;
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
</style>
