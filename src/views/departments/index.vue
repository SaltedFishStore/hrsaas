<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <tree-tools :tree-node="company" is-root />

        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <tree-tools slot-scope="{ data }" :tree-node="data" @delDepts="getDepartments" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import { getDepartments } from '@/api/departments'
import { transListToTreeData } from '@/utils'

export default {
  components: {
    TreeTools
  },
  data() {
    return {
      departs: [],
      defaultProps: {
        label: 'name'
      },
      company: {}
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    //  获取组织架构
    async getDepartments() {
      const result = await getDepartments()
      this.company = { name: result.companyName, manager: '负责人' }
      this.departs = transListToTreeData(result.depts, '')
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
