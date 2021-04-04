<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <span slot="before">共{{ page.total }}条记录</span>
        <template slot="after">
          <el-button size="small" type="warning" @click="$router.push('/import?type=user')">导入</el-button>
          <el-button size="small" type="danger" @click="exportData">导出</el-button>
          <el-button size="small" type="primary" @click="showDialog = true">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table v-loading="loading" :data="employeesList" border>
          <el-table-column align="center" label="序号" sortable type="index" />
          <el-table-column align="center" label="姓名" sortable prop="username" />
          <el-table-column align="center" label="工号" sortable prop="workNumber" />
          <el-table-column align="center" label="聘用形式" sortable prop="formOfEmployment" :formatter="formEmployment" />
          <el-table-column align="center" label="部门" sortable prop="departmentName" />
          <el-table-column align="center" label="入职时间" sortable prop="timeOfEntry">
            <template slot-scope="{ row }">{{ row.timeOfEntry | formatDate }}</template>
          </el-table-column>
          <el-table-column align="center" label="账户状态" sortable prop="enableState">
            <template slot-scope="{ row }">
              <el-switch :value="row.enableState === 1" />
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" sortable fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button type="text" size="small" @click="$router.push('/employees/detail/' + row.id)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="editRole(row.id)">角色</el-button>
              <el-button type="text" size="small" @click="deleteElmployee(row.id)">删除</el-button>
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

    <!-- 弹层组件 -->
    <add-employee :show-dialog.sync="showDialog" />
    <!-- 分配角色弹层 -->
    <assign-role ref="assignRole" :show-role-dialog.sync="showRoleDialog" :user-id="userId" />
  </div>
</template>

<script>
import { getEmployeesList, delEmployee } from '@/api/employees'
import EmployeesEnum from '@/api/constant/employees'
import AddEmployee from './components/add-employee'
import { formatDate } from '@/filters'
import AssignRole from './components/assign-role'

export default {
  components: {
    AddEmployee,
    AssignRole
  },
  data() {
    return {
      showDialog: false,
      showRoleDialog: false,
      employeesList: [], // 员工列表
      page: {
        page: 1,
        size: 5,
        total: 0
      },
      loading: false,
      userId: null
    }
  },
  created() {
    this.getEmployeesList()
  },
  methods: {
    async editRole(id) {
      this.userId = id
      // 调用子组件获取员工角色
      await this.$refs.assignRole.getUserDetailById(id)
      this.showRoleDialog = true
    },
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
    },
    formEmployment(row, column, cellValue, index) {
      const hireType = EmployeesEnum.hireType
      const obj = hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    async deleteElmployee(id) {
      try {
        await this.$confirm('是否确定删除该员工吗？')
        await delEmployee(id)
        this.getEmployeesList()
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 导出
    exportData() {
      // 表头对应关系
      const headers = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      import('@/vendor/Export2Excel').then(async excel => {
        // 获取所用数据
        const { rows } = await getEmployeesList({ page: 1, size: this.page.total })
        const data = this.formtaJSON(headers, rows)
        excel.export_json_to_excel({
          header: Object.keys(headers),
          data,
          filename: '员工信息表',
          autoWidth: true,
          bookType: 'xlsx'
        })
      })
    },
    // 将数据转成二维数组
    formtaJSON(headers, rows) {
      return rows.map(item => {
        return Object.keys(headers).map(key => {
          // 将入职日期和转正日期格式化
          if (headers[key] === 'timeOfEntry' || headers[key] === 'correctionTime') {
            return formatDate(item[headers[key]])
          }
          // 格式化聘用形式
          if (headers[key] === 'formOfEmployment') {
            const en = EmployeesEnum.hireType.find(obj => obj.id === item[headers[key]])
            return en ? en.value : '未知'
          }

          return item[headers[key]]
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
