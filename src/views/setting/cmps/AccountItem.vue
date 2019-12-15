<template>
  <div class="account-item flex">
    <div class="account-item--label">{{label}}</div>
    <div class="account-item--value" style="flex: 1">
      <template v-if="value">{{value}}</template>
      <template v-else><slot></slot></template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AccountItem",
  props: {
    value: String,
    label: String
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.account-item {
  margin-bottom: 32px;
  &--label {
    font-size: 24px;
    width: 8em;
  }
}
</style>
