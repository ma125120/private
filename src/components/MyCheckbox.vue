<template>
  <el-checkbox-group v-model="val" @change="change">
    <template v-if="type === 'default'">
      <el-checkbox 
        v-for="item in options"
        :key="item[idKey]"
        size="medium"
        :label="item[idKey]">{{item[labelKey]}}</el-checkbox>
    </template>
    <template v-else>
      <el-checkbox-button 
        v-for="item in options"
        :key="item[idKey]"
        size="medium"
        :label="item[idKey]">{{item[labelKey]}}</el-checkbox-button>
    </template>
  </el-checkbox-group>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "MyCheckbox",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: Array,
      default() {
        return [];
      }
    },
    type: {
      type: String,
      default: 'default'
    },
    labelKey: {
      type: String,
      default: 'branchStoreName'
    },
    idKey: {
      type: String,
      default: 'objectId'
    },
    options: {
      type: Array,
      default() {
        return [];
      }
    }
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
      val: []
    };
  },
  methods: {
    change(val) {
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
