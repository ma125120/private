<template>
  <SettingLayout>
    <div class="new-child-page my-dialog">
      <header class="account-header">子账号编辑</header>
      <el-form 
        :model="form" 
        :rules="rules"
        ref="form"
        class="add-dialog"
        label-width="160px"
        label-position="right">
        <el-form-item label="账号" prop="userName">
          <el-input
            v-model="form.userName"
            placeholder="请输入4-12个字符（数字或英文字母）"
          ></el-input>
        </el-form-item>
        <el-form-item label="原密码" prop="oldPassWord">
          <el-input
            v-model="form.oldPassword"
            disabled
            placeholder="请输入6-12个字符（数字或英文字母）"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="passWord">
          <el-input
            v-model="form.passWord"
            placeholder="请输入6-12个字符（数字或英文字母）"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passWord1">
          <el-input
            v-model="form.passWord1"
            placeholder="请输入6-12个字符（数字或英文字母）"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属分店" prop="branchStoreIds">
          <MyCheckbox
            v-model="form.branchStoreIds"
            :options="userChildren"
            placeholder="请选择"
          ></MyCheckbox>
        </el-form-item>
        <el-form-item label="权限" prop="branchStoreId">
          <div class="my-label">工作台</div>
          
        </el-form-item>
        <div class="all-center">
          <div class="border-btn hover" @click="back">取消</div>
          <el-button type="primary" @click="save" class="dialog-btn">保存</el-button>
        </div>
      </el-form>
    </div>
    
  </SettingLayout>
</template>

<script>
import Vue from "vue";
import { validateLen } from '@/views/home/rule'
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  name: "EditShop",
  props: {
    isShow: Boolean,
    obj: Object,
  },
  computed: {
    ...mapState([
      'userChildren'
    ]),
    ...mapGetters([
      'childNames'
    ])
  },
  data() {
    const validatePwd1 = (rule, value, cb) => {
      // eslint-disabled
      if (value != this.form.passWord) {
        cb(new Error('保存失败，2遍密码需一致'));
      } else if (!/^\w+$/g.test(value)) {
        cb(new Error('密码只能由数字或英文组成'));
      } else {
        validateLen(value, `确认密码`, cb, 6, 12)
      }
    }
    return {
      show: false,
      form: {
        userName: '',
        passWord: '',
        passWord1: '',
        branchStoreIds: [],
      },
      rules: {
        userName: [
          { required: true, message: "账号还没有填写" },
          {
            validator(rule, value, cb) {
              if (!/^\w+$/g.test(value)) {
                cb(new Error('保存失败，账号只能由数字或英文字母构成'));
              } else {
                validateLen(value, `账号`, cb, 4, 12)
              }
            },
            trigger: 'change',
          },
        ],
        passWord: [
          { required: true, message: "密码还没有填写" },
          {
            validator(rule, value, cb) {
              if (!/^\w+$/g.test(value)) {
                cb(new Error('密码只能由数字或英文组成'));
              } else {
                validateLen(value, `密码`, cb, 6, 12)
              }
            },
            trigger: 'change',
          },
        ],
        passWord1: [
          { required: true, message: "确认密码还没有填写" },
          {
            validator: validatePwd1,
            trigger: 'change',
          },
        ],
        branchStoreIds: [
          { required: true, message: "还没有选择所属分店" },
          {
            validator(rule, value, cb) {
              if (value.length <= 0) {
                cb(new Error('还没有选择所属分店'))
              } else {
                cb();
              }
            },
            trigger: 'change',
          },
        ]
      },
    }
  },
  async created() {
    let { id } = this.$route.query;
    if (!id) return ;

    let user = await this.$api.user.getChildAccount(id);
    this.form = {
      ...user,
      oldPassword: user.passWord,
      passWord: '',
      passWord1: '',
    }
    // this.convertObj(this.obj)
  },
  watch: {
    isShow(val) {
      this.show = val;
    },
    obj(val) {
      // this.convertObj(val)
    }
  },
  methods: {
    async save() {
      this.$refs.form.validate(async (vaild, params) => {
        if (vaild) {
          let form = { ...this.form }
          form.branchStoreNames = form.branchStoreIds.map(v => this.childNames[v])
          await this.editChildAccount(form);
          this.$pushNamed('child')
          this.close();
          this.show = false;
        } else {
          this.$errorForm(params);
        }
      });
    },
    ...mapActions([
      'editChildAccount'
    ]),
    close() {
      this.$emit('update:isShow', false);
    },
    back() {
      this.$pushNamed('child')
    },
    convertObj(obj = {}) {
      let data = obj || {};
      this.form = {
        ...data,
        passWord: '',
        passWord1: '',
        branchStoreIds: [],
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.add-dialog {
  width: 600px;
}
.account-header {
  border-bottom: 5px solid #bbb;
  padding: 0 0 32px 32px;
  margin-bottom: 24px;
}
.new-child {
  &-page {
    font-size: 24px;
    label .el-checkbox__label,
    .my-label {
      font-size: 18px;
    }
  }
}
</style>
