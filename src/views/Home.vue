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
            <h4 class="self-title all-center box">映如简介：美团点评官方特邀讲师，美团点评运营咨询师， 餐饮老板内参、懒熊体育、美沃斯等独家合作讲师，前小米科技、得到App高级产品经理…… </h4>
          </div>
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
        let user = await this.$api.user.login(this.form.userName, this.form.passWord);
        this.$notify.success({ title: '消息', message: '登陆成功' });
        this.setUser(user)
      } catch(err) {
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
}
.self-intro {
  margin-top: 32px;
  background: #fff;
  padding: $padding;
}
.self-img {
  width: 365px;
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
</style>
