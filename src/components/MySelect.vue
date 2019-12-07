<template>
  <el-select v-model="val" @change="change" placeholder="请选择" clearable>
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name"
      :value="item.id + ''"
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
    }
  },
  created() {
    this.val = this.value;
  },
  watch: {
    val(val) {
      this.$emit("change", val);
    }
  },
  data() {
    return {
      val: ""
    };
  },
  methods: {
    change(val) {
      console.log(val);
      this.$emit("change", val);
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
