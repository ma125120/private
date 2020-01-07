<template>
  <SettingLayout>
    <div class="staff-page">
      <header class="staff-header align-center">
        <div style="margin: 0 40px">店员管理</div>
        <el-button type="primary" icon="el-icon-plus" @click="isShow = true">创建店员</el-button>
      </header>
      <el-table :data="staffList" class="staff-table" style="width: 100%">
        <el-table-column label="员工ID" width="180px" align="left">
          <div slot-scope="{ row, $index }" class="">
            {{ padId($index + 1) }}
          </div>
        </el-table-column>
        <el-table-column
          prop="clerkName"
          align="center"
          label="店员姓名"
        ></el-table-column>
        <el-table-column
          align="center"
          label="状态"
        >
          <div slot-scope="{ row }">
            {{ row.clerkType | clerkType }}
          </div>
        </el-table-column>
        <el-table-column
          prop="startTime"
          align="center"
          label="操作"
        >
          <div slot-scope="{ row }" :style="`padding: ${row.clerkType !== 1 ? '20px 0' : ''}`">
            <el-popconfirm
              title="确认停用此店员账号吗？"
              @onConfirm="stopStaff(row)"
              v-if="row.clerkType === 1"
            >
              <el-button 
                type="text"
                slot="reference" 
                class="my-table-btn">停用</el-button>
            </el-popconfirm>
          </div>
        </el-table-column>
      </el-table>
    </div>
    <AddDialog :isShow.sync="isShow" type="staff" :obj.sync="obj"></AddDialog>
  </SettingLayout>
</template>

<script>
import Vue from "vue";
import { mapState } from 'vuex'
import AddDialog from './cmps/AddDialog'

export default Vue.extend({
  name: "Staff",
  components: { AddDialog },
  props: {
    msg: String
  },
  data() {
    return {
      isShow: false,
      obj: null,
    }
  },
  async created() {
    await setTimeout(() => {}, 10)
    this.$store.dispatch(`getStaffList`)
  },
  methods: {
    editStaff(obj) {
      this.obj = obj;
      this.isShow = true;
    },
    stopStaff(obj) {
      this.$store.dispatch(`edit_staff`, { ...obj, clerkType: 2 });
    },
    padId(index) {
      return `${index}`.padStart(3, `0`)
    }
  },
  computed: {
    ...mapState([
      'staffList',
    ]),
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.staff {
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
