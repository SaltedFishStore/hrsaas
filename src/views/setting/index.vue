<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <el-row style="height: 60px;">
              <el-button type="primary" icon="el-icon-plus" size="small" @click="showDialog = true">新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table v-loading="loading" :data="roleList" border>
              <el-table-column header-align="center" align="center" type="index" label="序号" width="120" />
              <el-table-column header-align="center" align="center" prop="name" label="角色名称" width="240" />
              <el-table-column header-align="center" prop="description" label="角色描述" />
              <el-table-column header-align="center" align="center" label="操作">
                <template slot-scope="{ row }">
                  <el-button size="mini" type="success" @click="assignPerm(row.id)">分配权限</el-button>
                  <el-button size="mini" type="primary" @click="editRole(row.id)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="deleteRole(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-row type="flex" align="middle" justify="end" style="height: 60px;">
              <el-pagination
                layout="prev, pager ,next"
                :total="page.total"
                :page-size="page.pagesize"
                :current-page="page.page"
                @current-change="changePage"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="消息提示的文案"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top: 50px;">
              <el-form-item label="公司名称">
                <el-input v-model="formData.name" disabled style="width: 400px;" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="formData.companyAddress" disabled style="width: 400px;" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formData.mailbox" disabled style="width: 400px;" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="formData.remarks" type="textarea" disabled style="width: 400px;" rows="3" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>

    <!-- 弹层组件 -->
    <setting-dialog ref="dialog" :show-dialog.sync="showDialog" @update="getRoleList" />
    <!-- 分配权限弹层 -->
    <allot-auth-dialog ref="permDialog" :show-per-dialog.sync="showPerDialog" />
  </div>
</template>

<script>
import { getRoleList, getCompanyInfoById, deleteRoleById, getRoleDetail } from '@/api/setting'
import { mapGetters } from 'vuex'
import SettingDialog from './components/setting-dialog'
import AllotAuthDialog from './components/allot-auth-dialog'

export default {
  components: {
    SettingDialog,
    AllotAuthDialog
  },
  data() {
    return {
      showDialog: false,
      roleList: [], // 角色列表
      page: {
        page: 1,
        pagesize: 5,
        total: 0
      },
      loading: false,
      formData: {}, // 接收企业数据
      showPerDialog: false // 分配权限弹层显示隐藏
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.getRoleList() // 获取角色列表
    this.getCompanyInfo() // 获取公司信息
  },
  methods: {
    async getRoleList() {
      this.loading = true
      const { total, rows } = await getRoleList(this.page)
      this.page.total = total
      this.roleList = rows
      this.loading = false
    },
    changePage(newPage) {
      this.page.page = newPage
      this.getRoleList()
    },
    async getCompanyInfo() {
      this.formData = await getCompanyInfoById(this.companyId)
    },
    deleteRole(id) {
      this.$confirm('您确定删除该角色吗？').then(() => {
        return deleteRoleById(id)
      }).then(() => {
        this.$message.success('删除成功')
        this.getRoleList()
      })
    },
    editRole(id) {
      this.$refs.dialog.getRoleDetail(id)
      this.showDialog = true
    },
    async assignPerm(id) {
      const { permIds } = await getRoleDetail(id)
      await this.$refs.permDialog.getPermissionList()
      this.$refs.permDialog.permIds = permIds
      this.$refs.permDialog.roleId = id
      this.showPerDialog = true
    }
  }
}
</script>

<style>
</style>
