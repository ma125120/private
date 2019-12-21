<template>
  <el-input-number 
    v-model="val" 
    controls-position="right" 
    @change="change"
    />
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "MyNumber",
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Number | String,
      default: 0,
    }
  },
  created() {
    this.val = +(this.value) || 0;
  },
  watch: {
    val(val) {
      this.$emit("change", val || 0);
    },
    value(val) {
      this.val = val || 0;
    }
  },
  data() {
    return {
      val: 0
    };
  },
  methods: {
    change(val) {
      this.$emit("change", val || 0);
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.primary {
  background: #ec9d29;
  color: #fff;
  font-size: 20px;
  border-radius: 4px;
  width: 114px;
  height: 42px;
}
</style>
