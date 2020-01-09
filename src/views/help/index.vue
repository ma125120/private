<template>
  <div class="help-layout box">
    <MyHeader></MyHeader>
    <div class="help-body flex box">
      <SideTabs :activeId.sync="activeId" @change="change" class="help-tabs"></SideTabs>
      <div class="help-right--body" style="flex: 1;">
        <div v-if="obj">
          <div class="help-problem" @click="$router.push(`/help?id=${activeId}`)">{{obj.problem}}</div>
          <p v-for="(item, i) in obj.answer" :key="i" class="help-answer">
            <template v-if="isImg(item)">
              <el-image 
                :src="getUrl(item)"
                fit="contain" 
                :preview-src-list="srcList">
                <div slot="error" class="load-error">图片加载失败，请检查链接</div>
              </el-image>
            </template>
            <template v-else>
              <div v-html="item"></div>
              <!-- {{item}} -->
            </template>
          </p>
        </div>
        <ul v-else>
          <li
            v-for="item in bodys[activeId]"
            :key="item.objectId"
            class="help-problem"
            @click="toOther(item.sort)"
          >
            {{ item.problem }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import SideTabs from './cmp/SideTabs'

const getUrl = (str = '') => str.replace(/^https/g, 'http');

export default Vue.extend({
  name: "HelloWorld",
  components: { SideTabs },
  props: {
    msg: String
  },
  data() {
    return {
      bodys: [],
      activeId: '1',
      obj: '',
    }
  },
  created() {
    this.activeId = this.$route.query.id || '1';
    this.getList();
  },
  methods: {
    getUrl,
    async getList() {
      const res = await this.$api.help.getList();
      this.bodys = res;
      const { id, sort } = this.$route.query;
      this.obj = this.bodys[id] && this.bodys[id].find(v => +v.sort === +sort);
    },
    isImg(str) {
      return /^https?\:\/\//g.test(str)
    },
    change() {
      this.obj = '';
      this.$router.push(`/help?id=${this.activeId}`)
    },
    toOther(sort) {
      this.$router.push(`/help?id=${this.activeId}&sort=${sort}`)
    }
  },
  watch: {
    '$route'({ query }) {
      const { id, sort } = query;
      this.activeId = id || '1';
      this.obj = this.bodys[id] && this.bodys[id].find(v => +v.sort === +sort);
    }
  },
  computed: {
    srcList() {
      return (this.obj.answer.filter(v => this.isImg(v))).map(v => getUrl(v))
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.help-body {
  padding: 24px;
}
.help-tabs {
  margin-right: 24px;
}
.help-right--body {
  padding: 24px;
  background: #fff;
}
.help-problem {
  font-size: 24px;
  line-height: 1.5;
  margin-bottom: 12px;
  &:hover {
    cursor: pointer;
    color: $color;
  }
}
.help-answer {
  font-size: 20px;
  margin-top: 16px;
  & img {
    width: 100%;
  }
}
.load-error {
  color: #999;
  text-align: center;
  font-size: 16px;
}
</style>
