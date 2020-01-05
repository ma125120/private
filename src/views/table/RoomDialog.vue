<template>
  <el-dialog 
    :show-close="false"
    center
    :append-to-body="true"
    custom-class="add-dialog my-dialog"
    @close="close"
    :visible.sync="show">
    <div class="my-dialog--title" slot="title">
      <div style="font-size: 24px;">保存失败</div>
    </div>
    <div class="room-dialog-body">
      请先用管理员账号去 设置-房间管理页，创建房间，这里必须选择房间才能保存成功
    </div>
    <div class="between-center" style="margin-top: 24px;">
      <div class="room-dialog--btn" @click="close(false)">知道了</div>
      <div class="room-dialog--btn with-color" v-if="two" @click="toRoom">去房间管理</div>
    </div>
  </el-dialog>
</template>

<script>
import Vue from "vue";
import { mapActions, } from 'vuex';

export default {
  name: "RoomDialog",
  props: {
    isShow: Boolean,
    two: Boolean,
  },
  data() {
    return {
      show: false,
    }
  },
  created() {
    this.show = this.isShow;
  },
  watch: {
    isShow(val) {
      this.show = val;
    },
  },
  computed: {

  },
  methods: {
    ...mapActions([
    
    ]),
    close(val) {
      this.$emit('update:isShow', val)
    },
    toRoom() {
      this.close(false);
      this.$pushNamed('room')
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.add-dialog.el-dialog {
  width: 480px;
}
.room-dialog--btn {
  flex: 1;
  text-align: center;
  margin: 24px 0;
  cursor: pointer;
  font-size: 20px;
  &.with-color {
    color: $color;
  }
}
.room-dialog-body {
  font-size: 20px;
  margin-top: -12px;
}
</style>
