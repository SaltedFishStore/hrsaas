<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width: 100%">
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <!-- 下拉菜单 -->
        <el-col>
          <el-dropdown size="small" @command="operateDepts">
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="dle">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartementsById } from '@/api/departments'

export default {
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 操作节点
    operateDepts(type) {
      if (type === 'add') {
        // 添加子部门
      } else if (type === 'edit') {
        // 编辑部门
      } else {
        // 删除部门
        this.$confirm('是否确认删除改部门').then(() => {
          return delDepartementsById(this.treeNode.id)
        }).then(() => {
          // 删除成功会进入这里
          this.$emit('delDepts') // 通知父组件进行数据更新
          this.$message.success('删除成功')
        })
      }
    }
  }
}
</script>
