<template>
  <SettingLayout>
    <div class="shop-page">
      <header class="account-header">管理分店账号</header>
      <header class="shop-header align-center" style="margin: 24px 32px;">
        <el-button 
          type="primary" 
          icon="el-icon-plus" 
          :disabled="disabled"
          :class="`${disabled ? 'dis' : ''}`"
          @click="add">创建分店管理员账号</el-button>
        <div style="margin-left: 32px;color: #101010; font-size: 18px;">
          <template v-if="disabled">（你的分店账号名额已用完，如要增加请联系客服微信 2829672684 购买，分店管理员拥有其所属分店的所有功能权限） </template>
          <template v-else>（你有{{user.storeNumber}}个分店的创建名额，如需增加名额请联系客服微信2829672684购买，分店管理员拥有其所属店的所有功能权限） </template>
        </div>
      </header>
      <el-table :data="userChildren" class="shop-table" style="width: 100%">
        <el-table-column
          prop="branchStoreName"
          align="center"
          label="分店店名"
        ></el-table-column>
        <el-table-column
          prop="userName"
          align="center"
          label="分店管理员账号"
        ></el-table-column>
        <el-table-column
          prop="passWord"
          align="center"
          label="密码"
        ></el-table-column>
        <el-table-column
          prop="startTime"
          align="center"
          label="操作"
        >
          <div slot-scope="{ row }" class="all-center">
            <img src="img/edit.png" alt="" class="table-icon" @click="edit(row)" />
          </div>
        </el-table-column>
        <el-table-column
          align="center"
          prop="versionTable"
          label="状态"
        >
        </el-table-column>
      </el-table>
    </div>
    <AddChild :isShow.sync="isShow" :isFirst="false" :obj.sync="obj"></AddChild>
    <EditShop :isShow.sync="isEdit" :obj.sync="obj" />
  </SettingLayout>
</template>

<script>
import Vue from "vue";
import { mapState } from 'vuex'
import AddChild from '@/views/home/AddChild'
import EditShop from './cmps/EditShop'

export default Vue.extend({
  name: "shop",
  components: { AddChild, EditShop, },
  props: {
    msg: String
  },
  data() {
    return {
      isShow: false,
      obj: null,
      isEdit: false,
    }
  },
  async created() {
    await setTimeout(() => {}, 10)
    // this.$store.dispatch(`getShopList`)
  },
  methods: {
    add() {
      if (this.disabled) {
        this.$nerror(`你的分店管理员账号创建名额已用完`)
      } else {
        this.isShow = true;
      }
    },
    edit(obj) {
      this.obj = obj;
      this.isEdit = true;
    },
    del(obj) {
      this.$store.dispatch(`del_shop`, obj);
    },
  },
  computed: {
    ...mapState([
      'userChildren',
      'user',
    ]),
    disabled() {
      return this.userChildren.length >= this.user.storeNumber;
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.account-header {
  border-bottom: 5px solid #bbb;
  padding: 0 0 32px 32px;
}
.shop {
  &-page {
    font-size: 24px;
    .el-table {
      font-size: 20px;
    }
    .my-table-btn {
      font-size: 20px;
      color: #000;
      cursor: pointer;
    }
    .table-icon {
      &--del {
        width: 36px;
        margin-left: 40px;
        margin-bottom: -2px;
      }
    }
  }
  &-header {
    margin-bottom: 24px;
    button {
      font-size: 20px;
    }
  }
  &-table .el-table__header {
    & thead th {
      background: #F5F0F0;
      font-size: 20px;
      color: #000;
      font-weight: normal;
    }
  }
  
}
</style>
