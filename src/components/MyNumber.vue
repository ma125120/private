<template>
  <el-input 
    v-model="val" 
    type="text"
    min="0"
    :maxlength="maxlength"
    :disabled="disabled"
    controls-position="right" 
    @change="change"
    @input="input"
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
      default: '',
    },
    text: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isFee: {
      type: Boolean,
      default: false,
    },
    maxlength: {
      type: Number,
      default: -1,
    },
  },
  created() {
    this.val = +(this.value) || '';
  },
  watch: {
    val(val) {
      this.$emit("change", val || '');
    },
    value(val) {
      if (val < 0) {
        this.$nerror(`${this.text}必须大于0`);
        this.val = 0;
        return ;
      }
      
      this.val = val || '';
    }
  },
  data() {
    return {
      val: 0
    };
  },
  methods: {
    change(val) {
      let reg = /^\d+$/g;
      if (this.isFee) {
        reg = /^[\d\.]+$/g;
      }
      if (val && reg.test(val)) {
        this.$emit("change", val || 0);
      } else {
        this.$nerror(`输入失败, ${this.text}只能输入数字${this.isFee ? '和点号' : ''}`);
        this.val = ''
        this.$emit("change", this.val);
      }
    },
    input(val) {
      val = val || '0';
      let reg = /^\d+$/g;
      if (this.isFee) {
        reg = /^[\d\.]+$/g;
      }
      if (val && reg.test(val)) {

      } else {
        this.$nerror(`输入失败, ${this.text}只能输入数字${this.isFee ? '和点号' : ''}`);
        this.val = val.slice(0, -1)
      }

      let { name } = this;
      this.$emit('input', val || 0, name, name === 'roomCharge' ? 'snackFee' : 'roomCharge')
    },
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
