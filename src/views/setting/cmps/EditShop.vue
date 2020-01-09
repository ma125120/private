<template>
  <el-dialog 
    :show-close="false"
    center
    custom-class="add-dialog my-dialog"
    @close="close"
    :visible.sync="show">
    <div class="my-dialog--title" slot="title">
      <div>编辑分店管理员账号</div>
      <div style="font-size: 20px">（不能与已创建的分店管理员账号名一致）</div>
    </div>
    <el-form 
      :model="form" 
      :rules="rules"
      ref="form"
      label-width="120px"
      label-position="right">
      <el-form-item label="账号" prop="userName">
        <el-input
          v-model="form.userName"
          placeholder="请输入4-12个字符（数字或字母）"
        ></el-input>
      </el-form-item>
      <el-form-item label="原密码">
        <el-input
          v-model="form.oldPassword"
          disabled
          placeholder="请输入6-12个字符"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="passWord">
        <el-input
          v-model="form.passWord"
          placeholder="请输入6-12个字符"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="passWord1">
        <el-input
          v-model="form.passWord1"
          placeholder="请输入6-12个字符"
        ></el-input>
      </el-form-item>
      <div class="all-center">
        <el-button type="text" class="dialog-btn dialog-btn--exit" @click="close">取消</el-button>
        <el-button type="text" @click="save" class="dialog-btn">保存</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import Vue from "vue";
import { validateLen } from '@/views/home/rule'
import { mapActions, } from 'vuex';

export default {
  name: "EditShop",
  props: {
    isShow: Boolean,
    obj: Object,
  },
  data() {
    const validatePwd1 = (rule, value, cb) => {
      // eslint-disabled
      if (value != this.form.passWord) {
        cb(new Error('保存失败，2遍密码需一致'));
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
      },
      rules: {
        userName: [
          { required: true, message: "账号还没有填写" },
          {
            validator(rule, value, cb) {
              if (!/^[a-zA-Z]+$/g.test(value)) {
                cb(new Error('保存失败，账号只能由英文字母构成'));
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
              validateLen(value, `密码`, cb, 6, 12)
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
      },
    }
  },
  created() {
    this.show = this.isShow;
    this.convertObj(this.obj)
  },
  watch: {
    isShow(val) {
      this.show = val;
    },
    obj(val) {
      this.convertObj(val)
    }
  },
  methods: {
    async save() {
      this.$refs.form.validate(async (vaild, params) => {
        if (vaild) {
          await this.editShopUser(this.form);
          this.close();
          this.show = false;
        } else {
          this.$errorForm(params);
        }
      });
    },
    ...mapActions([
      'editShopUser'
    ]),
    close() {
      this.$emit('update:isShow', false);
    },
    convertObj(obj = {}) {
      let data = obj || {};
      this.form = {
        ...data,
        passWord: '',
        passWord1: '',
        oldPassword: data.passWord,
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.add-dialog.el-dialog {
  width: 600px;
}
</style>
