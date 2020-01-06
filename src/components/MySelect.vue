<template>
  <el-select 
    :style="`width: ${this.width}px`" 
    v-model="val" 
    @change="change" 
    :placeholder="placeholder"
    :no-data-text="empty" 
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
    empty: {
      type: String,
      default: '无数据'
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
  },
  computed: {
    empty() {
      return this.labelKey === 'roomName' ? '无数据，请先在 设置-房间管理 里添加'
        : this.labelKey === 'name' ? '无数据，可在 设置-员工管理 里添加' : '无数据'
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
