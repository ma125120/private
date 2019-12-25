<template>
  <el-select 
    :style="`width: ${this.width}px`" 
    v-model="val" 
    @change="change" 
    :placeholder="placeholder" 
    :disabled="disabled"
    :clearable="clearable">
    <el-option
      v-for="item in options"
      :key="item[idKey]"
      :label="item[labelKey]"
      :value="item[idKey] + ''"
    >
    </el-option>
  </el-select>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "MySelect",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: String || Number
    },
    placeholder: String,
    clearable: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    width: {
      type: Number,
      default: 290,
    },
    labelKey: {
      type: String,
      default: 'name'
    },
    idKey: {
      type: String,
      default: 'objectId'
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
  created() {
    this.val = this.value + '';
  },
  watch: {
    val(val) {
      this.$emit("change", val + '');
    },
    value(val) {
      this.val = val + '';
    }
  },
  data() {
    return {
      val: ""
    };
  },
  methods: {
    change(val) {
      this.$emit("change", val + '');
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
