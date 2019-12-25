<template>
  <SettingLayout>
    <div class="account-page">
      <header class="account-header">账号管理</header>
      <div class="account-body">
        <AccountItem label="当前登录账号" :value="user.userName" />
        <AccountItem label="账号类型" :value="user.accountType" />

        <template v-if="role !== 2">
          <template v-if="role !== 0">
            <AccountItem label="版本状态" :value="user.versionStr" />
            <AccountItem label="有效期" :value="user.expireDuration | expire" />
            <AccountItem label="到期时间" :value="user.overTimeStr" />
          </template>
          
          <AccountItem label="版本状态" v-else>
            <div v-for="child in userChildren" :key="child.objectId" class="account-child">
              <div style="margin-bottom: 32px">
                <span>{{child.branchStoreName}}</span>
                <span style="margin-left: 32px;">{{child.versionStr}}</span>
              </div>
              <AccountItem label="有效期" :value="child.expireDuration | expire" />
              <AccountItem label="到期时间" :value="child.overTimeStr" />
            </div>
          </AccountItem>
        </template>
        
      </div>
    </div>
  </SettingLayout>
</template>

<script>
import Vue from "vue";
import AccountItem from './cmps/AccountItem';
import { mapState, mapGetters } from 'vuex'

export default Vue.extend({
  name: "Staff",
  components: { AccountItem },
  props: {
    msg: String
  },
  computed: {
    ...mapState([
      'user', 'nowUser', 'userChildren',
    ]),
    ...mapGetters([
      'role'
    ])
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.account {
  &-page {
    font-size: 24px;
  }
  &-header {
    border-bottom: 5px solid #bbb;
    padding: 0 0 24px 32px;
  }
  &-body {
    padding: 32px;
  }
  &-child {
    border-bottom: 1px solid #bbb;
    &+& {
      margin-top: 32px;
    }
  }
}
</style>
