<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <template slot="after">
          <el-button type="primary" size="small" @click="addPermission('0', 1)">添加权限模块</el-button>
        </template>
      </page-tools>

      <el-card>
        <!-- 放置权限列表 -->
        <el-table :data="list" row-key="id">
          <el-table-column label="名称" prop="name" />
          <el-table-column label="标识" prop="code" />
          <el-table-column label="描述" prop="description" />
          <el-table-column label="操作">
            <template slot-scope="{ row }">
              <el-button v-if="row.type !== 2" type="text" @click="addPermission(row.id, 2)">添加</el-button>
              <el-button type="text" @click="editPermission(row.id)">编辑</el-button>
              <el-button type="text" @click="delPermission(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <perm-dialog ref="perDialog" :show-dialog.sync="showDialog" :param="param" />
    </div>
  </div>
</template>

<script>
import { getPermissionList, delPermission } from '@/api/permisson'
import { transListToTreeData } from '@/utils'
import PermDialog from './components/perm-dialog'

export default {
  components: {
    PermDialog
  },
  data() {
    PermDialog
    return {
      list: [],
      showDialog: false,
      param: null
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      this.list = transListToTreeData(await getPermissionList(), '0')
    },
    async delPermission(id) {
      try {
        await this.$confirm('是否确定删除')
        await delPermission(id)
        this.$message.success('删除成功')
        this.getPermissionList()
      } catch (error) {
        console.log('🚀 ~ file: index.vue ~ line 53 ~ delPermission ~ error', error)
      }
    },
    async editPermission(id) {
      await this.$refs.perDialog.getPermissionDetail(id)
      this.showDialog = true
    },
    addPermission(pid, type) {
      this.param = { pid, type }
      this.showDialog = true
    }
  }
}
</script>

<style>
</style>
