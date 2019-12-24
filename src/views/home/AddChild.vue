<template>
  <el-dialog 
    :close-on-click-modal="!isFirst"
    :close-on-press-escape="false"
    :show-close="false"
    center
    custom-class="add-dialog my-dialog"
    @close="close"
    :visible.sync="show">
    <div class="my-dialog--title" slot="title">
      <div>{{isFirst ? `请创建你的第一个分店管理员账号` : `创建分店管理员账号`}}</div>
      <div style="font-size: 20px">{{isFirst ? `可以给该店店长使用` : `（不能与已创建的分店管理员账号名一致）`}}</div>
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
          placeholder="请输入2-12个字符，建议汉字，如：二店"
        ></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="userName">
        <el-input
          v-model="form.userName"
          placeholder="请输入4-12个英文字母（数字或英文字母）"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passWord">
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
      <div class="all-center">
        <el-button type="text" v-if="!isFirst" class="dialog-btn dialog-btn--exit" @click="close(false)">取消</el-button>
        <el-button type="text" @click="save" class="dialog-btn">保存</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import Vue from "vue";
import { validateLen } from './rule'
import { mapActions, mapState, } from 'vuex';

export default {
  name: "AddChild",
  props: {
    isShow: Boolean,
    isFirst: Boolean,
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
              if (!/^[\w\u4e00-\u9fa5]+$/g.test(value)) {
                cb(new Error('保存失败，账号只能由中英文、数字、字母构成'));
              } else {
                validateLen(value, `分店店名`, cb, 2, 12)
              }
            },
          },
        ],
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
    async save() {
      this.$refs.form.validate(async (vaild, params) => {
        const { form, isFirst, user, } = this;
        const obj = { ...form };
        if (isFirst) {
          obj.version = user.version
        }

        if (vaild) {
          await this.addEndUser({
            form: obj,
            isFirst
          });
          this.$emit('update:isShow', false);
          this.show = false;
          
        } else {
          this.$errorForm(params);
        }
      });
    },
    ...mapActions([
      'addEndUser'
    ]),
    close() {
      this.$emit('update:isShow', false)
      this.form = {
        branchStoreName: '',
        userName: '',
        passWord: '',
        passWord1: '',
      }
    }
  },
  computed: {
    ...mapState([
      'user'
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
