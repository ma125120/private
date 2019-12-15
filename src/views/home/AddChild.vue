<template>
  <el-dialog 
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    center
    custom-class="add-dialog my-dialog"
    :visible.sync="show">
    <div class="my-dialog--title" slot="title">
      <div>请创建你的第一个分店管理员账号</div>
      <div>可以给该店店长使用</div>
    </div>
    <el-form 
      :model="form" 
      :rules="rules"
      ref="form"
      label-width="120px"
      label-position="right">
      <el-form-item label="分店店名" prop="branchStoreName">
        <el-input
          
          v-model="form.branchStoreName"
          placeholder="请输入分店店名"
        ></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="userName">
        <el-input
          
          v-model="form.userName"
          placeholder="请输入4-12个英文字母"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passWord">
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
        <el-button type="text" @click="save" class="dialog-btn">保存</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import Vue from "vue";
import { validateLen } from './rule'
import { mapActions, } from 'vuex';

export default {
  name: "HelloWorld",
  props: {
    isShow: Boolean,
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
        branchStoreName: '',
        userName: '',
        passWord: '',
        passWord1: '',
      },
      rules: {
        branchStoreName: [
          { required: true, message: "分店店名还没有填写" },
          {
            validator(rule, value, cb) {
              validateLen(value, `分店店名`, cb, 2, 12)
            },
          },
        ],
        userName: [
          { required: true, message: "账号还没有填写" },
          {
            validator(rule, value, cb) {
              validateLen(value, `账号`, cb, 4, 12)
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
  },
  watch: {
    isShow(val) {
      this.show = val;
    }
  },
  methods: {
    save() {
      this.$refs.form.validate((vaild, params) => {
        if (vaild) {
          this.addEndUser(this.form);
        } else {
          this.$errorForm(params);
        }
      });
    },
    ...mapActions([
      'addEndUser'
    ])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.add-dialog.el-dialog {
  width: 600px;
}
</style>
