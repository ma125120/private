<template>
  <div :class="`${text ? 'text-scale flex column' : ''}`">
    <div v-if="text">{{text}}</div>
    <img 
      :src="`img/${size}.png`" 
      alt=""
      :style="`width: ${width}px`"
      @click="$pushNamed(url)"
      :class="`${pos === 'abs' ? 'abs-img' : 'normal-img'} hover`"
      />
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "MyScale",
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    size: {
      type: 'bg' | 'sm',
      default: 'bg',
    },
    width: {
      type: Number,
      default: 30,
    },
    url: {
      type: String,
      default: 'reverse',
    },
    text: {
      type: String,
      default: ''
    },
    pos: {
      type: String,
      default: 'abs'
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
// .normal-img {

// }
.abs-img {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 9;
}
.text-scale {
  font-size: 18px;
  width: 154px;
  height: 120px;
  box-sizing: border-box;
  padding: 12px 0 6px 0;
  background: #fff;
  border: 1px solid #101010;
  justify-content: space-between;
  align-items: center;
}
</style>
