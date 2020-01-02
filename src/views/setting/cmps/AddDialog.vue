<template>
  <el-dialog 
    :show-close="false"
    center
    custom-class="add-dialog my-dialog"
    @close="close"
    :visible.sync="show">
    <div class="my-dialog--title" slot="title">
      <div>{{text}}</div>
      <div>（不能与已创建的{{text}}一致）</div>
    </div>
    <el-input
      v-model="name"
      :autofocus="true"
      ref="input"
      placeholder=""
    ></el-input>
    <div class="between-center" style="margin-top: 24px;">
      <el-button type="text" class="dialog-btn dialog-btn--exit" @click="close(false)">取消</el-button>
      <el-button type="text" @click="save" class="dialog-btn">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Vue from "vue";
import { mapActions, } from 'vuex';

export default {
  name: "AddDialog",
  props: {
    isShow: Boolean,
    obj: Object,
    type: {
      type: String,
      default: 'staff'
    }
  },
  data() {
    return {
      show: false,
      name: '',
    }
  },
  created() {
    this.show = this.isShow;
    this.name = this.obj && this.obj[this.nameField];
  },
  watch: {
    isShow(val) {
      this.show = val;
      
    },
    show(val) {
      if (!val) return ;
      
      setTimeout(() => {
        const el = document.querySelector('.my-dialog input')
        el && el.focus();
      }, 100)
    },
    obj(val) {
      this.name = this.obj && this.obj[this.nameField];
    }
  },
  computed: {
    text() {
      return this.type === 'staff' ? '店员名' : '房间名';
    },
    nameField() {
      return this.type === `staff` ? 'clerkName' : 'roomName'
    }
  },
  methods: {
    ...mapActions([
    
    ]),
    async save() {
      if (!this.name) {
        this.$nerror(`必须输入${this.text}`);
        return ;
      }

      let params = this.obj ? ({ ...this.obj, [this.nameField]: this.name, }) : { [this.nameField]: this.name}

      await this.$store.dispatch(`${this.obj && this.obj.objectId ? 'edit' : 'add'}_${this.type}`, params)
      this.close();
    },
    close(val) {
      this.$emit('update:isShow', val)
      this.name = '';
      this.$emit('update:obj', null)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.add-dialog.el-dialog {
  width: 480px;
}

</style>
