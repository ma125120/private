<template>
  <div class="" v-if="isFirst">
    <div 
      class="new1 fixed" 
      v-if="active === 0"
      :style="`left: ${pos[0][0].left}px; top: ${pos[0][0].top}px;`">
      <div class="new-text">
        <img 
          class="new-img fixed" 
          src="img/new.png" alt="" 
          :style="`left: ${pos[0][0].left + 6}px; top: ${pos[0][0].top - 28}px;`"
        />
        <ul>
          <li class="new-li">新手指引1：</li>
          <li class="new-li">点击左上角“添加预约”按钮，可以创建任意日期的预约信息，</li>
          <li class="new-li">但注意请先去“设置”区的“房间管理”里创建房间信息。</li>
          <li class="new-li">预约信息创建完后，该预约信息会同步展示到预约分布表和右下角的预约记录表，方便查找。</li>
        </ul>
        <div class="flex-end">
          <div class="new-btn" @click="next">朕知道了</div>
        </div>
      </div>
    </div>

    <div 
      class="new1 fixed" 
      v-if="active === 1"
      :style="`left: ${pos[1][0].left - 608}px; top: ${pos[1][0].top - 80}px;`">
      <div class="new-text">
        <img 
          class="new-img fixed" 
          src="img/new.png" alt="" 
          :style="`left: ${pos[1][0].left - 12}px; top: ${pos[1][0].top - 28}px; transform: rotate(60deg)`"
        />
        <ul>
          <li class="new-li">新手指引2：</li>
          <li class="new-li">这是预约记录表，用来展示你店里接过的每一条预约信息，</li>
          <li class="new-li">方便你以后有问题核查、联系快迟到的预约顾客。</li>
        </ul>
        <div class="flex-end">
          <div class="new-btn" @click="next">朕知道了</div>
        </div>
      </div>
    </div>

    <div 
      class="new1 fixed" 
      v-if="active === 2"
      :style="`left: ${pos[2][0].left - 606}px; top: ${pos[2][0].top - 100}px;`">
      <div class="new-text">
        <img 
          class="new-img fixed" 
          src="img/new.png" alt="" 
          :style="`left: ${pos[2][0].left - 0}px; top: ${pos[2][0].top - 28}px; transform: rotate(60deg)`"
        />
        <ul>
          <li class="new-li">新手指引3：</li>
          <li class="new-li">这是实际到店表，用来记录真实到店的每一波顾客的信息，</li>
          <li class="new-li">方便你以后对账、有问题核查，</li>
          <li class="new-li">左上角点击“新增项目”按钮，即可开始创建。</li>
        </ul>
        <div class="flex-end">
          <div class="new-btn" @click="next">朕知道了</div>
        </div>
      </div>
    </div>

    <div 
      class="new1 fixed" 
      v-if="active === 3"
      :style="`right: 80px; bottom: 80px;`">
      <div class="new-text">
        <img 
          class="new-img fixed" 
          src="img/new.png" alt=""
          :style="`left: ${pos[3][0].left + 12}px; top: ${pos[3][0].top - 92}px; transform: rotate(210deg)`"
        />
        <img 
          class="new-img fixed" 
          src="img/new.png" alt=""
          :style="`left: ${pos[3][1].left - 24}px; top: ${pos[3][1].top - 28}px; transform: rotate(70deg)`"
        />
        <img 
          class="new-img fixed" 
          src="img/new.png" alt=""
          :style="`left: ${pos[3][2].left - 30}px; top: ${pos[3][2].top - 76}px; transform: rotate(120deg)`"
        />
        <ul>
          <li class="new-li">新手指引4：</li>
          <li class="new-li">可以放大/缩小查看表格，</li>
          <li class="new-li">想放大看哪个表就点哪个！！</li>
          <li class="new-li">指引完毕，请先去“设置”里完成“房间管理”，这样才能添加预约信息</li>
        </ul>
        <div class="flex-end">
          <div class="align-center">
            <div class="text-btn" @click="close">知道了</div>
            <div class="new-btn" @click="next" v-if="role !== 2">去“房间管理”</div>
          </div>
        </div>
      </div>
    </div>

    <div class="new-dialog" v-if="active <= 3"></div>
    <!-- <div class="new-dialog can" v-else @click="close"></div> -->
  </div>
</template>

<script>
import Vue from "vue";
import { mapState, mapGetters, mapActions } from 'vuex';

const getRect = (name) => {
  const el = document.querySelector(name);
  if (el) {
    return el.getBoundingClientRect();
  }

  return {};
}
export default Vue.extend({
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      pos: {
        0: [
          { top: 0, left: 0, }
        ],
        1: [
          { top: 0, left: 0, }
        ],
        2: [
          { top: 0, left: 0, }
        ],
        3: [
          { top: 0, left: 0, },
          { top: 0, left: 0, },
          { top: 0, left: 0, }
        ],
      },
      active: 0,
    }
  },
  mounted() {
    this.getPos();
  },
  computed: {
    ...mapGetters([
      'isFirst',
      'role'
    ]),
  },
  methods: {
    close() {
      this.skipTeach();
      this.active = this.active + 1;
    },
    getPos() {
      setTimeout(() => {
        this.getPos0();
        this.getPos1();
        this.getPos2();
        this.getPos3();
      })
    },
    getPos0() {
      const { top, left, bottom, } = getRect(`.add-reverse-wrap .el-button`)
      this.$set(this.pos[0], `0`, { top: bottom + 12, left: left + 24, })
    },
    getPos1() {
      const { top, left, bottom, } = getRect(`.record--table .el-table__header thead th`)
      this.$set(this.pos[1], `0`, { top: bottom + 12, left: left - 24, })
    },
    getPos2() {
      const { top, left, bottom, } = getRect(`.act--table .el-table__header thead th`)
      this.$set(this.pos[2], `0`, { top: bottom + 12, left: left - 24, })
    },
    getPos3() {
      this.getAbsImg(`reverse-table`, 0);
      this.getAbsImg(`act--table`, 1);
      this.getAbsImg(`record--table`, 2);
    },
    getAbsImg(name, key) {
      const { top, left, bottom, } = getRect(`.${name} .abs-img`)
      this.$set(this.pos[3], key, { top: bottom + 12, left: left - 24, })
    },
    next() {
      this.active = this.active + 1;
      if (this.active > 3) {
        this.skipTeach();
        this.$pushNamed('room')
      }
    },
    ...mapActions([
      'skipTeach'
    ])
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.new-text {
  width: 628px;
  box-sizing: border-box;
  background: $color;
  color: #fff;
  font-size: 24px;
  line-height: 1.5;
  padding: 18px 51px 18px 60px;
}
.new-li {
  line-height: 1.5;
}
.new-btn {
  margin-top: 12px;
  cursor: pointer;
  background: #fff;
  color: #000;
  font-size: 20px;
  padding: 0 24px;
  text-align: center;
  height: 52px;
  line-height: 52px;
}
.fixed {
  position: fixed;
  z-index: 11;
}
.new-img {
  width: 63px;
}
.new-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  pointer-events: all;
  &.can {
    pointer-events: auto;
    cursor: pointer;
  }
}
.text-btn {
  line-height: 50px;
  margin-top: 12px;
  margin-right: 12px;
  border: 1px solid #fff;
  padding: 0 24px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
