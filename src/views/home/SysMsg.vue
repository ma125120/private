<template>
  <div :class="`sys-msg ${single ? 'msg-pagebox' : ''}`" >
    <header>
      <div class="align-center msg-header">
        <img src="img/msg.png" alt="" class="msg-icon" />
        <h4 class="msg--title">系统消息</h4>
      </div>
      <div 
        class="look-all align-center hover"
        @click="$pushNamed('msg')"
        v-if="!single"
      >
        查看全部<i class="el-icon-d-arrow-right"></i>
      </div>
    </header>
    <ul class="msg-ul" :style="ulStyle">
      <li
        class="msg-li"
        v-for="(msg, index) in sysMsgs"
        :key="msg.text">
        <div class="msg-text">{{index + 1}}、{{msg.text}}</div> 
        <div class="msg-time">{{msg.time}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from 'vuex';

export default Vue.extend({
  name: "HelloWorld",
  props: {
    msg: String,
    single: {
      type: Boolean,
      default: true,
    }
  },
  computed: {
    ...mapState([
      'sysMsgs',
    ]),
    ulStyle() {
      return this.single ? `` : `height: 800px; overflow-y: auto`
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.msg-icon {
  width: 42px;
  margin-right: 12px;
}
.msg--title {
  font-size: 30px;
}
.msg {
  &-li {
    font-size: 20px;
    line-height: 36px;
    margin-bottom: 28px;
  }
  &-text {
    color: #BD0D0D;
    text-align: justify;
  }
  &-time {
    text-align: right;
    margin-top: 8px;
  }
}
.look-all {
  font-size: 20px;
  margin-right: 4px;
  padding: 21px 0;
  border-bottom: 1px solid #bbb;
  margin-bottom: 32px;
  & i {
    font-size: 24px;
    color: #bbb;
  }
}
.msg-pagebox {
  background: #fff;
  padding: 32px 36px;
  & .msg-text {
    color: #000;
    padding-bottom: 20px;
  }
  .msg-header {
    margin-bottom: 32px;
  }
}
</style>
