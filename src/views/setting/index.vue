<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <el-row style="height: 60px;">
              <el-button type="primary" icon="el-icon-plus" size="small">新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table v-loading="loading" :data="roleList" border>
              <el-table-column header-align="center" align="center" type="index" label="序号" width="120" />
              <el-table-column header-align="center" align="center" prop="name" label="角色名称" width="240" />
              <el-table-column header-align="center" prop="description" label="角色描述" />
              <el-table-column header-align="center" align="center" label="操作">
                <el-button size="mini" type="success">分配权限</el-button>
                <el-button size="mini" type="primary">编辑</el-button>
                <el-button size="mini" type="danger">删除</el-button>
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
                <el-input disabled style="width: 400px;" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input disabled style="width: 400px;" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input disabled style="width: 400px;" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" disabled style="width: 400px;" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getRoleList } from '@/api/setting'

export default {
  data() {
    return {
      roleList: [], // 角色列表
      page: {
        page: 1,
        pagesize: 2,
        total: 0
      },
      loading: false
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 获取角色列表
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
    }
  }
}
</script>

<style>
</style>
