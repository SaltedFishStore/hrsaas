<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <tree-tools :tree-node="company" is-root @addDepts="addDepts" />

        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <tree-tools slot-scope="{ data }" :tree-node="data" @delDepts="getDepartments" @addDepts="addDepts" @editDepts="editDepts" />
        </el-tree>
      </el-card>
    </div>

    <!-- 弹层组件 -->
    <add-dept ref="addDept" :show-dialog.sync="showDialog" :tree-node="node" @addDepts="getDepartments" />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import AddDept from './components/add-dept'
import { getDepartments } from '@/api/departments'
import { transListToTreeData } from '@/utils'

export default {
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      departs: [],
      defaultProps: {
        label: 'name'
      },
      company: {},
      showDialog: false, // 控制弹层组件的显示隐藏
      node: null, // 存储点击新增时的部门
      loading: false
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    //  获取组织架构
    async getDepartments() {
      this.loading = true // 显示loading
      const result = await getDepartments()
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      this.departs = transListToTreeData(result.depts, '')
      this.loading = false // 关闭loading
    },
    // 添加子部门
    addDepts(node) {
      // 显示弹层
      this.showDialog = true
      this.node = node
    },
    editDepts(node) {
      this.showDialog = true
      this.node = node
      // 调用子组件方法获取部门详情
      this.$refs.addDept.getDepartDetail(node.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>
