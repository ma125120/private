<template>
  <el-input 
    v-model="val" 
    type="text"
    min="0"
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
    },
    text: {
      type: String,
      default: ''
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
      if (val >= 0) {
        this.$emit("change", val || 0);
      } else {
        this.$nerror(`${this.text}只能输入数字`);
        this.val = 0
        this.$emit("change", this.val);
      }
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
