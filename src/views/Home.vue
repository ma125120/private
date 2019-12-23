<template>
  <div class="home">
    <div class="column">
      <MyHeader></MyHeader>
      <div class="page-body">
        <el-form inline class="login-form all-center" v-if="!user">
          <el-input
            class="my-input"
            v-model="form.userName"
            placeholder="账号"
          ></el-input>
          <el-input
            class="my-input"
            v-model="form.passWord"
            type="password"
            placeholder="密码"
          ></el-input>
          <el-button type="primary" @click="login" :disabled="disabled">登录</el-button>
        </el-form>

        <section class="self-intro">
          <div class="intro-top flex">
            <img src="img/self/home.jpg" alt="" class="self-img">
            <h4 class="self-title box">
              <span>映如简介：美团点评官方特邀讲师，美团点评运营咨询师， 餐饮老板内参、懒熊体育、美沃斯等独家合作讲师，前小米科技、得到App高级产品经理</span>
              <span style="font-weight: 400">······</span>
              <span style="color: #bd0d0d;" class="hover" @click="$pushNamed('intro')">
                <i class="el-icon-d-arrow-right"></i>
                <span>点击查看更多</span>
              </span>
              
            </h4>
          </div>
          <header class="teach-header left-pad align-center">
            <img src="img/listen.png" alt="" class="listen-img" />
            <h3>映如老师的服务</h3>
          </header>
          <main class="intro-main">
            <ul class="intro-ul left-pad">
              <li class="intro-item">1、美团点评店铺整店装修（文案卖点提炼+图片设计）</li>
              <li class="intro-item">2、推广通日常维护、开关、出价，评论回复（此服务包月托管）​</li>
              <li class="intro-item">
                <div>3、竞品调研+定位策划</div>
                <div>附近3公里竞品做详细调研，包括竞品的产品价格体系、定位卖点等，然后映如给予店铺差异化定位方案、产品体系建议。美团点评做差异化定位包装（在激烈竞争的环境下，准确的好定位是制胜秘诀，它意味着精准抓目标用户、高转化竞争力，开业前必做，能指导准确的房间主题装修定位。）</div>
              </li>
              <li class="intro-item">4、映如 美团点评运营顾问（包季）</li>
            </ul>
            <div class="flex-end">
              <div class="intro-chat">详询服务 请加右侧映如微信 909903974 <i class="el-icon-d-arrow-right"></i></div>
              <img src="img/code.jpg" alt="" class="intro-code">
            </div>
          </main>
        </section>
      </div>
    </div>

    <AddChild :isShow="isShowAddChild"></AddChild>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapState, } from 'vuex'
import AddChild from './home/AddChild'

export default {
  name: "home",
  components: {
    AddChild
  },
  data() {
    return {
      date: this.$now,
      form: {
        userName: '18810013034',
        passWord: '123456',
      }
    };
  },
  created() {

  },
  methods: {
    async login() {
      try {
        console.log(this.$api)
        let user = await this.$api.user.login(this.form.userName, this.form.passWord);
        // this.$notify.success({ title: '消息', message: '登陆成功' });
        this.setUser(user)
        this.$store.commit('setLogin', true);
      } catch(err) {
        console.log(err)
        this.$alertCb(err.msg)
      }
    },
    ...mapActions([
      'setUser',
    ]),
  },
  computed: {
    disabled() {
      return !(this.form.userName && this.form.passWord)
    },
    ...mapState([
      'isShowAddChild',
      'user',
    ]),
  }
};
</script>

<style lang="scss">
@mixin input {
  background: $input-place;
  color: #fff;
  font-size: 28px;
  width: 460px;
  height: 70px;
}
.login-form {
  margin-top: 20px;
  padding: 32px;
  background: #fff;
  .my-input {
    margin-right: 36px;
  }
  .my-input input,
  .my-input {
    @include input;
    &::placeholder,
    &:-internal-autofill-selected {
      @include input;
      -webkit-box-shadow: 0 0 0px 1000px $input-place inset;
      -webkit-text-fill-color: #fff;
    }
  }
  .el-button--primary {
    width: 120px;
    height: 70px;
    font-size: 28px;
  }
}
</style>

<style lang="scss" scoped>
.page-body {
  padding: $padding;
  padding-top: 0;
}
.self-intro {
  margin-top: 20px;
  background: #fff;
  padding: 36px;
}
.self-img {
  width: 365px;
  height: 243px;
  margin-right: 24px;
}
.self-title {
  width: 535px;
  padding: 30px;
  background: #F0EDED;
  font-size: 28px;
  line-height: 32px;
}
.intro-top {
  justify-content: center;
}
.left-pad {
  padding-left: 12px;
}
.teach-header {
  &.h3 {
    font-size: 28px;
  }
  font-size: 28px;
  padding-bottom: 20px;
  border-bottom: 1px solid #bbb;
  margin-top: 32px;
  img {
    width: 40px;
    margin-right: 16px;
    margin-bottom: -4px;
  }
}
.intro {
  &-item {
    font-size: 20px;
    line-height: 1.5;
    margin: 20px 0;
  }
  &-chat {
    font-size: 20px;
    color: #fff;
    background: $color;
    border-radius: 8px;
    padding: 20px;
  }
  &-code {
    width: 112px;
    margin-left: 32px;
  }
}
</style>
