<template>
  <div class="home">
    <div class="column">
      <MyHeader></MyHeader>
      <div class="page-body">
        <SysMsg />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapState, mapGetters, } from 'vuex'

import SysMsg from './SysMsg'

export default {
  name: "home",
  components: {
    SysMsg,
  },
  data() {
    return {
      date: this.$now,
      form: {
        userName: '18810013034',
        passWord: '123456',
      },
      show: false,
    };
  },
  created() {

  },
  methods: {

  },
  computed: {
    ...mapState([
      'isShowAddChild',
      'user',
      'sysMsgs'
    ]),
    ...mapGetters([
      'invaildNames',
      'isReload'
    ])
  }
};
</script>

<style lang="scss">
.page-body {
  padding: 20px;
}
</style>
