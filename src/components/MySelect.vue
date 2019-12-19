<template>
  <el-select v-model="val" @change="change" placeholder="请选择" clearable>
    <el-option
      v-for="item in options"
      :key="item[idKey]"
      :label="item[labelKey]"
      :value="item[idKey]"
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
    value: String,
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    labelKey: {
      type: String,
      default: 'name'
    },
    idKey: {
      type: String,
      default: 'objectId'
    },
  },
  created() {
    this.val = this.value;
  },
  watch: {
    val(val) {
      this.$emit("change", val);
    },
    value(val) {
      this.val = val;
    }
  },
  data() {
    return {
      val: ""
    };
  },
  methods: {
    change(val) {
      this.$emit("change", val);
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
