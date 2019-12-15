<template>
  <SettingLayout>
    <div class="room-page">
      <header class="room-header align-center">
        <div style="margin: 0 40px">房间管理</div>
        <el-button type="primary" icon="el-icon-plus" @click="isShow = true">创建房间</el-button>
      </header>
      <el-table :data="roomList" class="room-table" style="width: 100%" height="340">
        <el-table-column
          prop="roomName"
          align="left"
          label="房间名"
        ></el-table-column>
        <el-table-column
          prop="startTime"
          align="center"
          label="操作"
        >
          <div slot-scope="{ row }" class="all-center">
            <img src="img/edit.png" alt="" class="table-icon" @click="edit(row)" />
            <el-popconfirm
              title="确认删除本房间信息吗？"
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
    <AddDialog :isShow.sync="isShow" type="room" :obj.sync="obj"></AddDialog>
  </SettingLayout>
</template>

<script>
import Vue from "vue";
import { mapState } from 'vuex'
import AddDialog from './cmps/AddDialog'

export default Vue.extend({
  name: "room",
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
    this.$store.dispatch(`getRoomList`)
  },
  methods: {
    edit(obj) {
      this.obj = obj;
      this.isShow = true;
    },
    del(obj) {
      this.$store.dispatch(`del_room`, obj);
    },
  },
  computed: {
    ...mapState([
      'roomList',
    ])
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.room {
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
      cursor: pointer;
      width: 32px;
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
