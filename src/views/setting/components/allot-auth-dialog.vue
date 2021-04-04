<template>
  <el-dialog title="分配权限" :visible="showPerDialog" @close="btnCancel">
    <el-tree
      ref="permTree"
      :data="permData"
      show-checkbox
      :props="{ label: 'name' }"
      :default-checked-keys="permIds"
      node-key="id"
    />

    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" @click="btnCancel">取消</el-button>
        <el-button size="small" type="primary" @click="btnConfirm">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getPermissionList } from '@/api/permisson'
import { assignPerm } from '@/api/setting'
import { transListToTreeData } from '@/utils'

export default {
  props: {
    showPerDialog: Boolean
  },
  data() {
    return {
      permData: [], // 权限数据
      permIds: [], // 权限点数据
      roleId: ''
    }
  },
  methods: {
    async getPermissionList() {
      // 获取所有开启状态的权限点
      this.permData = transListToTreeData(await getPermissionList({ enVisiable: '1' }), '0')
    },
    btnCancel() {
      this.$emit('update:showPerDialog', false)
    },
    async btnConfirm() {
      await assignPerm({ id: this.roleId, permIds: this.$refs.permTree.getCheckedKeys() })
      this.$emit('update:showPerDialog', false)
    }
  }
}
</script>

<style>

</style>
