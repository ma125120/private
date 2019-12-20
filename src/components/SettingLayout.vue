<template>
  <div class="setting-layout box">
    <MyHeader></MyHeader>
    <div class="setting-body flex box">
      <SideTabs class="setting-tabs"></SideTabs>
      <div class="setting-right--body" style="flex: 1;">
        <slot></slot>
      </div>
      
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import SideTabs from '@/views/setting/cmps/SideTabs';

export default Vue.extend({
  name: "HelloWorld",
  components: { SideTabs, },
  props: {
    msg: String
  },
  
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.setting-body {
  padding: 24px;
}
.setting-tabs {
  margin-right: 24px;
}
.setting-right--body {
  padding: 24px;
  background: #fff;
}
</style>
