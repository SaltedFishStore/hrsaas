<template>
  <el-dialog title="新增角色" :visible="showDialog" @close="btnCancel">
    <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="roleForm.name" style="width: 80%" />
      </el-form-item>
      <el-form-item label="角色描述" prop="description">
        <el-input v-model="roleForm.description" style="width: 80%" />
      </el-form-item>
    </el-form>

    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button @click="btnCancel">取消</el-button>
        <el-button type="primary" @click="btnConfirm">确认</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleDetail, updateRole, addRole } from '@/api/setting'

export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      roleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', triger: 'blur' }]
      }
    }
  },
  methods: {
    btnConfirm() {
      this.$refs.roleForm.validate(async valid => {
        if (valid) {
          if (this.roleForm.id) {
            // 编辑
            await updateRole(this.roleForm)
          } else {
            // 新增
            await addRole(this.roleForm)
          }
          // 表单校验重置
          this.$refs.roleForm.resetFields()
          // 通知父组件重新获取数据
          this.$emit('update')
          // 关闭弹层
          this.$emit('update:showDialog', false)
        }
      })
    },
    btnCancel() {
      // 清除表单数据
      this.roleForm = {}
      // 重置校验规则
      this.$refs.roleForm.resetFields()
      this.$emit('update:showDialog', false)
    },
    async getRoleDetail(id) {
      this.roleForm = await getRoleDetail(id)
    }
  }
}
</script>

<style>

</style>
