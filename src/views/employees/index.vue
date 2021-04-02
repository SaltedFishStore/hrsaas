<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <span slot="before">共{{ page.total }}条记录</span>
        <template slot="after">
          <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table v-loading="loading" :data="employeesList" border>
          <el-table-column align="center" label="序号" sortable type="index" />
          <el-table-column align="center" label="姓名" sortable prop="username" />
          <el-table-column align="center" label="工号" sortable prop="workNumber" />
          <el-table-column align="center" label="聘用形式" sortable prop="formOfEmployment" />
          <el-table-column align="center" label="部门" sortable prop="departmentName" />
          <el-table-column align="center" label="入职时间" sortable prop="timeOfEntry" />
          <el-table-column align="center" label="账户状态" sortable prop="enableState" />
          <el-table-column align="center" label="操作" sortable fixed="right" width="280">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="end" align="middle" style="height: 60px">
          <el-pagination
            layout="prev, pager, next"
            :page-size="page.size"
            :current-page="page.page"
            :total="page.total"
            @current-change="pageChange"
          />
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getEmployeesList } from '@/api/employees'

export default {
  data() {
    return {
      employeesList: [], // 员工列表
      page: {
        page: 1,
        size: 5,
        total: 0
      },
      loading: false
    }
  },
  created() {
    this.getEmployeesList()
  },
  methods: {
    async getEmployeesList() {
      this.loading = true
      const { total, rows } = await getEmployeesList(this.page)
      this.page.total = total
      this.employeesList = rows
      this.loading = false
    },
    pageChange(newPage) {
      this.page.page = newPage
      this.getEmployeesList()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
