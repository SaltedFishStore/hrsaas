<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <tree-tools :tree-node="company" is-root />

        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <tree-tools slot-scope="{ data }" :tree-node="data" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'

export default {
  components: {
    TreeTools
  },
  data() {
    return {
      departs: [
        { name: '总裁办', manager: '朱小明', children: [{ name: '董事会' }] },
        { name: '行政部', manager: '球球' },
        { name: '人事部', manager: '茅台' }
      ],
      defaultProps: {
        label: 'name'
      },
      company: {
        name: '江苏传智播客教育科技股份有限公司',
        manager: '负责人'
      }
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
