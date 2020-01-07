<template>
  <SettingLayout>
    <div class="shop-page my-dialog">
      <header class="account-header">管理子账号</header>
      <header class="shop-header align-center" style="margin: 24px 32px;">
        <el-button 
          type="primary" 
          icon="el-icon-plus"
          :class="`${disabled ? 'dis' : ''}`"
          @click="add">创建新子账号</el-button>
        <div style="margin-left: 32px;color: #101010; font-size: 18px;">
          （子账号建议给普通店员共用，只有工作台权限，没有设置权限，最多可创建10个）
        </div>
      </header>
      <el-table :data="childAccount" class="shop-table" style="width: 100%">
        <el-table-column
          prop="userName"
          align="center"
          label="账号"
        ></el-table-column>
        <el-table-column
          prop="passWord"
          align="center"
          label="密码"
        ></el-table-column>
        <el-table-column
          prop="startTime"
          align="center"
          label="所属分店"
        >
          <div slot-scope="{ row }" class="all-center column">
            <div v-for="item in row.branchStoreNames" :key="item">{{item}}</div>
          </div>
        </el-table-column>
        <el-table-column
          prop="startTime"
          align="center"
          label="操作"
        >
          <div slot-scope="{ row }" class="all-center">
            <img src="img/edit.png" alt="" class="table-icon" @click="edit(row)" />
            <el-popconfirm
              title="确认删除该子账号信息吗？"
              @onConfirm="del(row)"
            >
              <img 
                src="img/trash.png" 
                alt="" 
                slot="reference" 
                class="table-icon table-icon--del" />
            </el-popconfirm>
          </div>
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
    this.$store.dispatch(`getChildAccounts`)
  },
  methods: {
    add() {
      if (this.disabled) {
        this.$nerror(`子账号最多创建10个`)
      } else {
        this.$pushNamed('childNew')
      }
    },
    edit(obj) {
      this.$router.push(this.$routes.childEdit + `?id=${obj.objectId}`);
      // this.obj = obj;
      // this.isEdit = true;
    },
    del(obj) {
      this.$store.dispatch(`del_child_account`, obj);
    },
  },
  computed: {
    ...mapState([
      'childAccount',
      'user',
    ]),
    disabled() {
      // return true;
      return this.childAccount.length >= 10;
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
